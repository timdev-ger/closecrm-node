# Close.com Node.js API Client

A complete, modern Node.js wrapper for the [Close.com API](https://developer.close.com).
Built on the base of [closeio-node](https://github.com/closeio/closeio-node).

## Requirements

- Node.js 18+ (uses native `fetch()`)

## Installation

```bash
npm install closecrm-node
```

## Quick Start

```javascript
const Closecom = require('closecrm-node');

const api = new Closecom('your-api-key');

// Get current user
const user = await api.user.me();

// Search leads
const leads = await api.lead.search({ query: 'company:"Acme Inc"' });

// Create a lead
const newLead = await api.lead.create({
  name: 'Acme Inc',
  contacts: [{
    name: 'John Doe',
    emails: [{ email: '[email protected]' }]
  }]
});
```

## Configuration

```javascript
const api = new Closecom('your-api-key', {
  baseUrl: 'https://api.close.com/api/v1', // Optional: custom API endpoint
  maxRetries: 3,                             // Optional: retry on rate limits
  retryDelay: 1000                          // Optional: delay between retries (ms)
});
```

## TypeScript Support

This library includes comprehensive TypeScript definitions for full type safety and IntelliSense support.

```typescript
import Closecom, { Lead, Contact, SearchOptions } from 'closecrm-node';

const api = new Closecom(process.env.CLOSE_API_KEY!);

// Type-safe lead search
const searchOptions: SearchOptions = {
  query: 'status:"Potential"',
  limit: 50
};

const response = await api.lead.search(searchOptions);
const leads: Lead[] = response.data;

// Create a lead with type checking
const newLead: Lead = await api.lead.create({
  name: 'Acme Inc',
  contacts: [{
    name: 'John Doe',
    emails: [{ email: 'john.doe@acme.inc', type: 'office' }]
  }]
});
```

## Notes

- Pagination: All search/list endpoints accept `limit`/`skip` or `_limit`/`_skip` and map them to Close's `_limit`/`_skip` parameters. You can also pass `fields`/`_fields` to limit response payloads.
- Email threads: The `email_thread` resource uses the documented `/activity/emailthread/` endpoints.
- Rate limits: 429 retries honor `RateLimit-Reset` headers when present, otherwise fall back to `Retry-After` or the configured `retryDelay`.

## Wiki

This repo includes a small Wiki in the `Wiki/` folder with usage examples and a method-by-method resource overview.

- Start here: `Wiki/Home.md`
