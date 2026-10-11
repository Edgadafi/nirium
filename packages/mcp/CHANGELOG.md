# Changelog

All notable changes to the `nirium-mcp` package are documented here.

## 0.6.2 - 2026-10-11

Replaces 0.6.1, which was published broken (see below). No code change beyond the version bump.

### Fixed

- 0.6.1 was published from a directory where `npm install` had failed (the preexisting `@stellar/stellar-sdk` peer conflict with `@stellar/mpp`) and `npm run build` never ran, so the tarball shipped without `dist/`. `nirium-mcp@0.6.1` is deprecated on npm; do not install it.

## 0.6.1 - 2026-10-11

No new tools and no change to any tool. Package metadata and the reported version only.

### Changed

- The server version, the startup log line and the code header no longer have `0.6.0` written by hand. The version is read from `package.json`, so the server reports the version that was installed (0.6.0 reported itself correctly only until the next bump).
- `package.json` `repository` now points to `nirium-protocol/nirium` with `directory: packages/mcp`, and `bugs.url` to `nirium-protocol/nirium/issues` (both pointed to the old `nirium-sdk` repo).
