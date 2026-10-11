# Changelog

All notable changes to the `nirium-mcp` package are documented here.

## 0.6.3 - 2026-10-11

### Added

- README: documents the 11 Treasury tools (`get_treasury_info`, `get_treasury_vault`, `get_treasury_vaults`, `get_treasury_strategy_asset`, `deploy_treasury_vault`, `deposit_to_treasury_vault`, `withdraw_from_treasury_vault`, `set_treasury_rebalance_manager`, `build_treasury_rebalance`, `submit_treasury_tx`, `execute_treasury_rebalance`), missing since they shipped. Text taken from each tool's own description in the code. Says which build an unsigned XDR, which signs with Nirium's own key (`execute_treasury_rebalance`, invite-only), and under what condition.

### Fixed

- `prepublishOnly: npm run build` added, so a future publish can't skip the build the way 0.6.1 did.
- README: "Run from source" and the LICENSE link pointed to the old `nirium-sdk` repo.
- Removed long dashes from README.

## 0.6.2 - 2026-10-11

Replaces 0.6.1, which was published broken (see below). No code change beyond the version bump.

### Fixed

- 0.6.1 was published from a directory where `npm install` had failed (the preexisting `@stellar/stellar-sdk` peer conflict with `@stellar/mpp`) and `npm run build` never ran, so the tarball shipped without `dist/`. `nirium-mcp@0.6.1` is deprecated on npm; do not install it.

## 0.6.1 - 2026-10-11

No new tools and no change to any tool. Package metadata and the reported version only.

### Changed

- The server version, the startup log line and the code header no longer have `0.6.0` written by hand. The version is read from `package.json`, so the server reports the version that was installed (0.6.0 reported itself correctly only until the next bump).
- `package.json` `repository` now points to `nirium-protocol/nirium` with `directory: packages/mcp`, and `bugs.url` to `nirium-protocol/nirium/issues` (both pointed to the old `nirium-sdk` repo).
