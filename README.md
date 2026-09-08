# Athena Web Factory

Reusable Git-native technical core for building independent web assets.

## Status

**v0.2 hardening candidate.** This repository is not a production website and is deliberately non-indexable by default.

## Boundary

The factory owns reusable technical infrastructure. Each child asset owns its domain, brand, editorial identity, content model, navigation, commercial configuration, analytics property, Search Console property, and production repository.

SelectVerdict remains an independent reference asset; it is not a parent template and is not modified by factory development.

## Safety defaults

- placeholder URL: `https://example.invalid`
- status: `planned`
- `indexable: false`
- robots blocks crawling before explicit release
- affiliate links require an event id
- provider-neutral tracking event layer
- source QA rejects known reference/vendor leakage
- rendered-output QA checks metadata, canonical, robots, sitemap, placeholders, and internal links
- publication journal uses registered event types and correction events rather than history rewriting

## Commands

- `npm run build`
- `npm run qa`
- `npm run qa:production`
- `npm run journal:check`
- `npm run scaffold:check`
- `npm run new-site -- --out ../child-repo --asset-id WF-A003`

The scaffolder refuses to overwrite an existing directory and generates children in planned/non-indexable state.

No domain, production deployment, analytics property, Search Console property, vertical, or affiliate program is assigned to the factory starter.
