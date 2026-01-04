# Roadmap

A CLI-first platform for running large-scale scrapers on your own infrastructure.

## Current Version: v0.1.0 ✅

- Apify-compatible REST API
- Docker-based Actor execution
- CLI for deployment (`crc push`, `crc run`, `crc logs`)
- Datasets, Key-Value Stores, Request Queues
- Basic web dashboard

---

## v0.2.0 - CLI & Developer Experience

**Priority:** Make the CLI the best way to work with Crawlee Cloud.

| Feature | Description |
|---------|-------------|
| `crc init` | Scaffold new Actor projects from templates |
| `crc dev` | Local development mode with hot reload |
| `crc status` | Check run status and resource usage |
| Input validation | Validate inputs before running |
| Better errors | Actionable hints for common issues |

## v0.3.0 - Production Scraping at Scale

**Priority:** Run large scraping jobs reliably.

| Feature | Description |
|---------|-------------|
| Cron scheduling | Schedule runs with cron expressions |
| Retry policies | Automatic retries with configurable backoff |
| Run timeouts | Kill stuck runs automatically |
| Webhooks | HTTP callbacks on run completion |
| Multi-worker | Scale horizontally for parallel execution |
| Resource limits | Memory/CPU caps per run |

## v0.4.0 - Reliability & Operations

**Priority:** Production-grade stability.

| Feature | Description |
|---------|-------------|
| Metrics | Prometheus endpoints |
| Health checks | API and runner health monitoring |
| Graceful shutdown | Complete in-flight runs before stopping |
| Run history | Auto-cleanup old runs and data |
| Backup & restore | Database backup utilities |

## v0.5.0 - Polish

| Feature | Description |
|---------|-------------|
| Actor versioning | Deploy and rollback specific versions |
| API key scopes | Read-only vs full access keys |
| Improved dashboard | Better UX for UI users |
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
