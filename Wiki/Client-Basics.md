# Client Basics

This page explains how requests are made, how to pass query parameters, and how retries work.

## Constructor

```js
const Closecom = require('closecrm-node');

const api = new Closecom('your-api-key', {
  baseUrl: 'https://api.close.com/api/v1', // optional
  maxRetries: 3,                            // optional
  retryDelay: 1000                          // optional (ms)
});
```

### Options

- `baseUrl`: Override Close API base URL (rarely needed)
- `maxRetries`: How often to retry on rate limiting (HTTP 429)
- `retryDelay`: Fallback delay (ms) if the server doesn’t provide a usable header

## Passing query params

Most “list/search” methods accept pagination and field selection parameters.

Supported aliases:

- `limit` or `_limit`
- `skip` or `_skip`
- `fields` or `_fields`

Example:

```js
const leads = await api.lead.search({
  query: 'status:"Potential"',
  limit: 100,
  skip: 0,
  fields: 'id,name,status_label'
});
```

## Typical method patterns

Most resources follow the same pattern:

- `search(options)` for collections
- `create(data)`
- `read(id)`
- `update(id, data)`
- `delete(id)`

Some resources use `list(options)` instead of `search(options)`.

## Retries / rate limiting

If Close responds with **429 Too Many Requests**, the client retries automatically up to `maxRetries`.

Close provides rate limit hints via headers (see Close docs):

- `RateLimit: limit=..., remaining=..., reset=...`
- `Retry-After: <seconds>`

Reference: https://developer.close.com/topics/rate-limits/
