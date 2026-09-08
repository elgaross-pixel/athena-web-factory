# Athena Web Factory

Reusable Git-native starter for building independent web assets.

## Status

**v0.1 starter under construction.** This repository is not a production website and is deliberately non-indexable by default.

## Design boundary

The factory provides reusable technical infrastructure only. Brand identity, editorial identity, content, domain, navigation, and commercial configuration belong to each site and must not be cloned from SelectVerdict or another asset.

## Safety defaults

- placeholder URL: `https://example.invalid`
- `indexable: false`
- `robots.txt` blocks crawling until an asset is explicitly approved
- affiliate links require a tracking event id
- QA rejects known SelectVerdict/vendor identity leakage
- the publication journal is append-only by operating policy

## Commands

- `npm run build`
- `npm run qa`
- `npm run journal:check`
- `npm run scaffold:check`

No domain, deployment, analytics account, Search Console property, or affiliate program is assigned to the starter.
