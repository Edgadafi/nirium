# Changelog

All notable changes to the `nirium-mcp` package are documented here.

## 0.6.1 - 2026-10-11

No new tools and no change to any tool. Package metadata and the reported version only.

### Changed

- The server version, the startup log line and the code header no longer have `0.6.0` written by hand. The version is read from `package.json`, so the server reports the version that was installed (0.6.0 reported itself correctly only until the next bump).
- `package.json` `repository` now points to `nirium-protocol/nirium` with `directory: packages/mcp`, and `bugs.url` to `nirium-protocol/nirium/issues` (both pointed to the old `nirium-sdk` repo).
