# Changelog

All notable changes to the `nirium-cli` package are documented here.

## Unreleased

## 2.0.0 - 2026-10-11

Breaking: three ways of passing a secret on the command line are gone. A key typed as an argument stays in your shell history and shows up in `ps` for anyone on the machine. The safe ways to supply a key are the environment variable (`NIRIUM_SECRET_KEY`, `FACILITATOR_API_KEY`) or the hidden prompt.

### Removed (breaking)

- `nirium pay --secret <key>` ([#108](https://github.com/nirium-protocol/nirium/pull/108)). Use `NIRIUM_SECRET_KEY`, or run `nirium config set secretKey` and type the key at the hidden prompt.
- `nirium config set secretKey <key>` and `nirium config set facilitatorApiKey <key>` ([#111](https://github.com/nirium-protocol/nirium/pull/111)). Run the same command with no value: in a terminal it asks for the key without echoing it, and without a terminal it reads the key from stdin. A key passed as an argument is refused and not saved.
- `nirium serve --api-key <key>` and `-k` ([#111](https://github.com/nirium-protocol/nirium/pull/111)). Use `FACILITATOR_API_KEY`, `nirium config set facilitatorApiKey`, or the hidden prompt. Without a terminal and without the variable, `serve` waits up to 10 seconds for the key on stdin and then exits with the missing-key error.

### Changed

- Depends on `nirium` `^0.16.0` ([#109](https://github.com/nirium-protocol/nirium/pull/109)). The scaffolds written by `nirium create` pin the same range.

### Added

### Added

- `nirium doctor --seller <url>` validates a remote x402 seller without paying ([#105](https://github.com/nirium-protocol/nirium/issues/105)). It checks for HTTP 402 with a decodable `PAYMENT-REQUIRED` header, that `network`, `asset`, `amount` and `payTo` are present and well formed, that `resource.url` is `https://`, and that a CORS preflight from a random origin does not return 5xx, that the 402 response exposes `PAYMENT-REQUIRED` and `PAYMENT-RESPONSE` (a preflight that lists them does not count), and that `PAYMENT-SIGNATURE` is allowed. `--json` still prints the report for CI. The probe never sends a payment. The `User-Agent` is `nirium-doctor/<version>` from this package's `package.json`.
