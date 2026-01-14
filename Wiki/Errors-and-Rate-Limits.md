# Errors and Rate Limits

This page covers common HTTP errors, and what to do about them.

## Common HTTP response codes

Close commonly uses:

- `200` — success
- `400` — invalid request / validation
- `401` — authentication required / invalid API key
- `402` — plan limit reached
- `403` — operation not allowed
- `404` — resource not found / endpoint not found
- `405` — method not supported
- `415` — unsupported format

Reference: https://developer.close.com/topics/http-response-codes/

## Rate limiting (429)

If you receive `429 Too Many Requests`, you should pause before retrying.

Close provides a `RateLimit` response header:

- `RateLimit: limit=100, remaining=50, reset=5`

…and a `Retry-After` header (in seconds).

This library automatically retries 429 responses up to the configured `maxRetries`.

Reference: https://developer.close.com/topics/rate-limits/

## Error messages & hints

This client tries to surface helpful hints for common mistakes.

Typical examples:

- 400: invalid search query / missing required fields
- 401: wrong API key, missing token
- 429: hit rate limit; retry after reset

If you need more context, log the thrown error and inspect:

- `error.status`
- `error.message`
- (sometimes) `error.body` / `error.response`
