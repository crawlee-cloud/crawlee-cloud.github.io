# Roadmap

A CLI-first platform for running large-scale scrapers on your own infrastructure.

## Current Version: v0.4.x ✅

- Apify-compatible REST API with input validation (Zod schemas)
- Docker-based Actor execution
- CLI for development and deployment (`crc init`, `crc dev`, `crc push`, `crc run`, `crc call`, `crc logs`, `crc status`)
- Datasets, Key-Value Stores, Request Queues
- Basic web dashboard
- Security config validation at startup
- User-scoped resources (IDOR protection)
- Environment variable support for Actor runs
- Cron scheduling, retry policies, run timeouts
- Webhooks with delivery tracking and retry logic
- Resource limits (memory caps per container)
- Prometheus metrics and health checks
- Graceful shutdown (SIGTERM/SIGINT handling)
- Database backup and restore utilities

---

## v0.1.0 ✅

- Initial Apify-compatible REST API
- Docker-based Actor execution
- CLI basics (`crc push`, `crc run`, `crc logs`)
- Datasets, Key-Value Stores, Request Queues
- Basic web dashboard

## v0.2.0 ✅

- `crc init` — Scaffold new Actor projects from templates
- `crc dev` — Local development mode with hot reload
- `crc status` — Check run status and resource usage
- Environment variable support (`-e` flag)
- Improved error messages
- Security hardening (input validation, config validation, CORS)

---

## v0.3.0 ✅ - Production Scraping at Scale

| Feature | Status |
|---------|--------|
| Cron scheduling | ✅ Shipped — schedules table + scheduler service |
| Retry policies | ✅ Shipped — configurable max retries and backoff |
| Run timeouts | ✅ Shipped — container timeout enforcement |
| Webhooks | ✅ Shipped — webhook deliveries with retry logic |
| Resource limits | ✅ Shipped — memory limits per container |

## v0.4.0 ✅ - Reliability & Operations

| Feature | Status |
|---------|--------|
| Metrics | ✅ Shipped — Prometheus /metrics endpoint |
| Health checks | ✅ Shipped — /health endpoint |
| Graceful shutdown | ✅ Shipped — SIGTERM/SIGINT handlers in API and runner |
| Backup & restore | ✅ Shipped — backup:create, backup:restore, backup:list scripts |

## v0.5.0 - Polish & Scaling

**Priority:** Improve developer experience and prepare for multi-worker deployments.

| Feature | Description |
|---------|-------------|
| Actor versioning | Complete the versioning workflow (table exists, workflow in progress) |
| API key scopes | Read-only vs full access keys |
| Improved dashboard | Better UX for UI users |
| Multi-worker runner scaling | Scale horizontally for parallel execution |
| Docs improvements | More guides and examples |

---

## Non-Goals

To keep focus, these are explicitly **not** on the roadmap:

- ❌ Web IDE for editing Actors
- ❌ Multi-tenant workspaces
- ❌ Complex RBAC/permissions
- ❌ Built-in proxy rotation (use your own)

---

## Contributing

Have ideas? [Open an issue on GitHub](https://github.com/crawlee-cloud/crawlee-cloud/issues)!

The best contributions are CLI improvements, bug fixes, and documentation.
