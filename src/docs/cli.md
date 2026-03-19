# CLI Guide

The Crawlee Cloud CLI provides command-line tools for managing Actors.

## Installation

```bash
npm install -g @crawlee-cloud/cli
```

Or use directly with npx:

```bash
npx @crawlee-cloud/cli <command>
```

After installation, you can use either `crawlee-cloud` or the short alias `crc`:

```bash
crawlee-cloud <command>
# Or the short alias
crc <command>
```

---

## Commands

### `init`

Create a new Actor project from a template.

```bash
crawlee-cloud init [name] [options]
```

**Options:**

| Flag             | Description                    |
| ---------------- | ------------------------------ |
| `--template, -t` | Template ID from Apify catalog |

**Example:**

```bash
# Interactive mode - prompts for name and template
crawlee-cloud init

# Quick start with specific template
crawlee-cloud init my-scraper --template ts-crawlee-cheerio
```

---

### `dev`

Run an Actor locally in development mode.

```bash
crawlee-cloud dev [options]
```

**Options:**

| Flag          | Description                        |
| ------------- | ---------------------------------- |
| `--watch, -w` | Enable file watching & auto-reload |

**Example:**

```bash
cd my-actor
crawlee-cloud dev           # Run once
crawlee-cloud dev --watch   # Run with hot reload
```

---

### `status`

Check the status of an Actor run.

```bash
crawlee-cloud status <run-id> [options]
```

**Options:**

| Flag             | Description               |
| ---------------- | ------------------------- |
| `--watch, -w`    | Watch for status updates  |
| `--interval, -i` | Watch interval in seconds |

**Example:**

```bash
crawlee-cloud status abc123
crawlee-cloud status abc123 --watch --interval 5
```

---

### `login`

Authenticate with your Crawlee Cloud server.

```bash
crawlee-cloud login [options]
```

**Options:**

| Flag           | Description     |
| -------------- | --------------- |
| `--url, -u`    | API base URL    |
| `--token, -t`  | API token       |

Without flags, you'll be prompted interactively. The token is validated against the server before saving.

**Examples:**

```bash
# Interactive login (prompts for URL and token)
crawlee-cloud login

# Non-interactive
crawlee-cloud login --url https://your-server.com --token your-api-token
```

Credentials are stored in `~/.crawlee-cloud/config.json`.

---

### `push`

Build and push an Actor to the registry.

```bash
crawlee-cloud push [actor-name]
```

**Options:**

| Flag            | Description               |
| --------------- | ------------------------- |
| `--tag, -t`  | Docker image tag for the build |
| `--no-build` | Skip local build step          |

**Example:**

```bash
cd my-actor
crawlee-cloud push my-scraper --tag 1.0.0
```

---

### `run`

Run an Actor locally with local file storage.

```bash
crawlee-cloud run [options]
```

**Options:**

| Flag          | Description                         |
| ------------- | ----------------------------------- |
| `--input, -i` | JSON input or path to JSON file    |
| `--no-purge`  | Do not purge storage before run     |

**Examples:**

```bash
# Run in current directory
cd my-actor
crawlee-cloud run

# Run with input
crawlee-cloud run --input '{"url": "https://example.com"}'

# Keep previous storage data
crawlee-cloud run --no-purge
```

Local storage is created in `./storage/` with datasets, key-value stores, and request queues.

---

### `logs`

Stream logs from a run.

```bash
crawlee-cloud logs <run-id> [options]
```

**Options:**

| Flag           | Description                  |
| -------------- | ---------------------------- |
| `--follow, -f` | Continuously stream new logs |
| `--tail, -n`   | Number of lines to show      |

**Example:**

```bash
crawlee-cloud logs abc123 --follow
```

---

### `call`

Call a remote Actor on the platform and optionally wait for results.

```bash
crawlee-cloud call <actor> [options]
```

**Options:**

| Flag              | Description                                    |
| ----------------- | ---------------------------------------------- |
| `--input, -i`     | Input JSON or path to JSON file                |
| `--env, -e`       | Environment variable KEY=VALUE (repeatable)    |
| `--wait, -w`      | Wait for run to finish                         |
| `--timeout, -t`   | Timeout in seconds (default: 3600)             |
| `--memory, -m`    | Memory in MB (default: 1024)                   |

**Examples:**

```bash
# Call an Actor
crawlee-cloud call my-scraper --input '{"url": "https://example.com"}'

# Call and wait for results
crawlee-cloud call my-scraper --wait --input '{"url": "https://example.com"}'

# Call with environment variables (use -e multiple times)
crc call my-actor -e KEY1=val1 -e KEY2=val2
```

> **Tip:** The `-e` flag can be repeated to pass multiple environment variables in a single call.

---

## Getting Your API Token

You need an API token to authenticate with Crawlee Cloud. There are two ways to get one:

### Via the Dashboard

1. Login to the dashboard at `http://localhost:3001`
2. Go to **Settings → API Keys**
3. Create a new API key

### Via the API

First, obtain a JWT token by logging in:

```bash
curl -X POST http://localhost:3000/v2/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@crawlee.cloud","password":"your-password"}'
```

Then create an API key using the JWT token:

```bash
curl -X POST http://localhost:3000/v2/auth/api-keys \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"name":"my-key"}'
```

Use the resulting API key as your token when running `crawlee-cloud login`.

---

## Configuration

Configuration is stored in `~/.crawlee-cloud/config.json`:

```json
{
  "apiBaseUrl": "https://your-server.com",
  "token": "your-api-token"
}
```

### Environment Variables

| Variable                | Description           |
| ----------------------- | --------------------- |
| `CRAWLEE_CLOUD_API_URL` | Override API base URL |
| `CRAWLEE_CLOUD_TOKEN`   | Override API token    |
