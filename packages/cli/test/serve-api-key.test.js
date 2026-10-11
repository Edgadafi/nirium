/**
 * `serve` must never take the facilitator API key as a command-line argument.
 * Each run uses its own temporary HOME and port 0. No payment is made.
 */
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { Keypair } from '@stellar/stellar-sdk';

const cliRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cli = path.join(cliRoot, 'bin/nirium.js');
const PAY_TO = Keypair.random().publicKey();

// Resolves on exit, or as soon as the server reports it is listening (then kills it).
function serve(args, { stdin, env: extra = {} } = {}) {
    const home = fs.mkdtempSync(path.join(os.tmpdir(), 'nirium-cli-home-'));
    const env = { ...process.env, HOME: home, ...extra };
    if (!('FACILITATOR_API_KEY' in extra)) delete env.FACILITATOR_API_KEY;
    return new Promise((resolve) => {
        const child = spawn(process.execPath, [cli, 'serve', '--pay-to', PAY_TO, '--port', '0', ...args],
            { env, stdio: ['pipe', 'pipe', 'pipe'] });
        let stdout = '';
        let stderr = '';
        let listening = false;
        child.stdout.on('data', (d) => {
            stdout += d;
            if (!listening && stdout.includes('Listening')) { listening = true; child.kill(); }
        });
        child.stderr.on('data', (d) => { stderr += d; });
        child.stdin.end(stdin ?? '');
        child.on('close', (code) => resolve({ code, stdout, stderr, listening }));
    });
}

test('--api-key is refused with an explanation and exits 1 without starting', async () => {
    const r = await serve(['--api-key', 'fk-test-789']);
    assert.equal(r.code, 1);
    assert.equal(r.listening, false);
    assert.match(r.stderr, /no longer takes --api-key/);
    assert.match(r.stderr, /shell history/);
    assert.ok(!r.stderr.includes('fk-test-789') && !r.stdout.includes('fk-test-789'));
});

test('-k is refused the same way', async () => {
    const r = await serve(['-k', 'fk-test-789']);
    assert.equal(r.code, 1);
    assert.equal(r.listening, false);
    assert.match(r.stderr, /no longer takes --api-key/);
});

test('--api-key is not listed in serve --help', async () => {
    const r = await new Promise((resolve) => {
        const c = spawn(process.execPath, [cli, 'serve', '--help']);
        let out = '';
        c.stdout.on('data', (d) => { out += d; });
        c.on('close', () => resolve(out));
    });
    assert.ok(!r.includes('--api-key'));
});

test('FACILITATOR_API_KEY from the environment starts the server', async () => {
    const r = await serve([], { env: { FACILITATOR_API_KEY: 'fk-env' } });
    assert.equal(r.listening, true, r.stderr);
});

test('without a TTY and without the env var, the key is read from stdin', async () => {
    const r = await serve([], { stdin: 'fk-stdin\n' });
    assert.equal(r.listening, true, r.stderr);
    assert.ok(!r.stdout.includes('fk-stdin'), 'the key must not be printed');
});

test('no key anywhere exits 1 with the missing-key message', async () => {
    const r = await serve([], { stdin: '' });
    assert.equal(r.code, 1);
    assert.equal(r.listening, false);
    assert.match(r.stderr, /Missing facilitator API key/);
});
