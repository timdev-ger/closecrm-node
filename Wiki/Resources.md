# Resources (Full Reference)

This page documents **every public function** .

## Conventions

### Common return shapes

Collection endpoints typically return:

```json
{ "data": [/* items */], "has_more": true }
```

Single-object endpoints typically return the created/updated object (or a plain result object, depending on the API).

### Shared query parameters

For endpoints that support pagination / field selection, you can pass either:

- Close-native: `_skip`, `_limit`, `_fields`
- Convenience aliases: `skip`, `limit`, `fields` (the client converts them)

### Example setup

```js
const Closecom = require('closecrm-node');
const api = new Closecom(process.env.CLOSE_API_KEY);
```

---

## Leads (`api.lead`)

### `api.lead.search(options = {})`

Search leads. If `options.query` is not provided, the client can build a query string from the other properties in `options`.

```js
const res = await api.lead.search({
  query: 'company:"Acme"',
  limit: 100,
  skip: 0
});
```

### `api.lead.create(data)`

Create a lead. **Requires** `data.name`.

```js
const lead = await api.lead.create({ name: 'Acme Inc' });
```

### `api.lead.read(id)`

Fetch one lead by id.

### `api.lead.update(id, data)`

Update a lead.

### `api.lead.delete(id)`

Delete a lead.

### `api.lead.merge(data)`

Merge two leads. **Requires** `data.source` and `data.destination`.

---

## Contacts (`api.contact`)

### `api.contact.search(options = {})`

List/search contacts.

### `api.contact.create(data)`

Create a contact.

### `api.contact.read(id)`

Fetch one contact.

### `api.contact.update(id, data)`

Update a contact.

### `api.contact.delete(id)`

Delete a contact.

---

## Activities (`api.activity`)

### `api.activity.search(options = {})`

List/search activities across types.

### Notes (`api.activity.note`)

- `search(options = {})`
- `create(data)`
- `read(id)`
- `update(id, data)`
- `delete(id)`

### Emails (`api.activity.email`)

- `search(options = {})`
- `create(data)`
- `read(id)`
- `update(id, data)`
- `delete(id)`

### Calls (`api.activity.call`)

- `search(options = {})`
- `create(data)`
- `read(id)`
- `update(id, data)`
- `delete(id)`

### SMS (`api.activity.sms`)

- `search(options = {})`
- `create(data)`
- `read(id)`
- `delete(id)`

> Note: the client does **not** expose `update` for SMS.

### Meetings (`api.activity.meeting`)

- `search(options = {})`
- `create(data)`
- `read(id)`
- `update(id, data)`
- `delete(id)`

### WhatsApp messages (`api.activity.whatsapp_message`)

- `search(options = {})`
- `create(data, queryParams = {})` — supports extra query params on create
- `read(id)`
- `update(id, data)`
- `delete(id)`

---

## Opportunities (`api.opportunity`)

- `search(options = {})`
- `create(data)`
- `read(id)`
- `update(id, data)`
- `delete(id)`

---

## Tasks (`api.task`)

- `search(options = {})`
- `create(data)`
- `read(id)`
- `update(id, data)`
- `delete(id)`

---

## Custom fields (`api.custom_field`)

### Lead custom fields (`api.custom_field.lead`)

- `list()`
- `create(data)`
- `read(id)`
- `update(id, data)`
- `delete(id)`

### Contact custom fields (`api.custom_field.contact`)

- `list()`
- `create(data)`
- `read(id)`
- `update(id, data)`
- `delete(id)`

### Opportunity custom fields (`api.custom_field.opportunity`)

- `list()`
- `create(data)`
- `read(id)`
- `update(id, data)`
- `delete(id)`

### Activity custom fields (`api.custom_field.activity`)

- `list()`
- `create(data)`
- `read(id)`
- `update(id, data)`
- `delete(id)`

### Custom object type fields (`api.custom_field.custom_object_type`)

- `list()`
- `create(data)`
- `read(id)`
- `update(id, data)`
- `delete(id)`

---

## Custom activities (`api.custom_activity`)

Custom activities are addressed by `type`.

- `search(type, options = {})`
- `create(type, data)`
- `read(type, id)`
- `update(type, id, data)`
- `delete(type, id)`

Example:

```js
const type = 'my_custom_activity_type';
const res = await api.custom_activity.search(type, { limit: 50 });
```

---

## Custom object types (`api.custom_object_type`)

- `list(options = {})`
- `create(data)`
- `read(id)`
- `update(id, data)`
- `delete(id)`

## Custom objects (`api.custom_object`)

- `list(options = {})`
- `create(data)`
- `read(id)`
- `update(id, data)`
- `delete(id)`

---

## Users (`api.user`)

### `api.user.me()`

Returns the current user for the API key.

### `api.user.list(options = {})`

List users.

### `api.user.read(id)`

Get a user.

### `api.user.update(id, data)`

Update a user.

---

## Organizations (`api.organization`)

- `list(options = {})`
- `read(id)`
- `update(id, data)`

---

## Pipelines (`api.pipeline`)

- `list(options = {})`
- `create(data)`
- `read(id)`
- `update(id, data)`
- `delete(id)`

---

## Statuses (`api.status`)

### Lead statuses (`api.status.lead`)

- `list()`
- `create(data)`
- `read(id)`
- `update(id, data)`
- `delete(id)`

### Opportunity statuses (`api.status.opportunity`)

- `list()`
- `create(data)`
- `read(id)`
- `update(id, data)`
- `delete(id)`

---

## Email templates (`api.email_template`)

- `search(options = {})`
- `create(data)`
- `read(id)`
- `update(id, data)`
- `delete(id)`

---

## Saved searches / Smart views (`api.saved_search` / `api.smart_view`)

The client maps Close “saved searches” to `saved_search`, and also provides `smart_view` as an alias.

- `list(options = {})`
- `create(data)`
- `read(id)`
- `update(id, data)`
- `delete(id)`

---

## Sequences (`api.sequence`)

- `search(options = {})`
- `create(data)`
- `read(id)`
- `update(id, data)`
- `delete(id)`

## Sequence subscriptions (`api.sequence_subscription`)

- `list(options = {})`
- `create(data)`
- `read(id)`
- `update(id, data)`
- `delete(id)`

---

## Reports (`api.report`)

### `api.report.activity_metrics()`

List predefined metrics used in activity reports.

### `api.report.activity(data)`

Create an activity report (POST endpoint).

### `api.report.sent_emails(organizationId, options = {})`

Sent emails report grouped by template.

### `api.report.lead_statuses(organizationId, options = {})`

Lead status change report.

### `api.report.opportunity_statuses(organizationId, options = {})`

Opportunity status change report.

### `api.report.custom(organizationId, options = {})`

Custom report.

### `api.report.custom_fields()`

List available fields for custom reports.

### `api.report.funnel_totals(data)`

Opportunity funnel totals report (POST).

### `api.report.funnel_stages(data)`

Opportunity funnel stages report (POST).

---

## Events (`api.event`)

### `api.event.search(options = {})`

Search events. The client intentionally **does not normalize** `skip/limit` here; options are passed through as-is.

### `api.event.read(id)`

Get one event.

---

## Webhooks (`api.webhook`)

- `list(options = {})`
- `create(data)`
- `read(id)`
- `update(id, data)`
- `delete(id)`

---

## Email threads (`api.email_thread`)

Close exposes email threads via activity endpoints.

- `list(options = {})` — uses `/activity/emailthread/`
- `read(id)` — uses `/activity/emailthread/{id}/`

---

## Connected accounts (`api.connected_account`)

- `list(options = {})`
- `read(id)`

---

## Bulk actions (`api.bulk`)

Bulk endpoints accept payloads as defined by Close’s API.

- `delete(data)` — POST `/bulk_delete/`
- `email(data)` — POST `/bulk_email/`
- `update(data)` — POST `/bulk_update/`
- `action(data)` — POST `/bulk_action/`

---

## Helper utilities exposed by the client instance

These are part of the `Closecom` class in `close.com.js`. While they are “internal-ish” (underscore methods), they exist on the instance and are used throughout.

### Query builder

#### `api.query()`

Returns a new `QueryBuilder` instance.

```js
const q = api.query().equals('status', 'Potential').and().contains('company', 'Acme');
const res = await api.lead.search({ query: q.toString() });
```

#### `QueryBuilder.where(field, operator, value)`

Low-level method. If you call it with two args (`field, value`), operator defaults to `:`.

#### `QueryBuilder.equals(field, value)`

Adds `field:value`.

#### `QueryBuilder.notEquals(field, value)`

Adds `field!:value`.

#### `QueryBuilder.contains(field, value)`

Adds `field*value`.

#### `QueryBuilder.greaterThan(field, value)`

Adds `field>value`.

#### `QueryBuilder.lessThan(field, value)`

Adds `field<value`.

#### `QueryBuilder.in(field, values)`

Builds an OR group like `(field:"a" OR field:"b")`.

#### `QueryBuilder.and()` / `QueryBuilder.or()`

Helpers for chaining conditions.

#### `QueryBuilder.build()` / `QueryBuilder.toString()`

Returns the query string.

### Pagination helpers

#### `api.paginate(searchFn, options = {})`

Fetch **all pages** for any search/list function that returns the `{ data, has_more }` format.

```js
const allLeads = await api.paginate(api.lead.search, { query: 'status:"Potential"', limit: 100 });
```

#### `api.stream(searchFn, options = {})`

Async iterator version of `paginate()`, yielding items one-by-one.

```js
for await (const lead of api.stream(api.lead.search, { query: 'status:"Potential"' })) {
  console.log(lead.id);
}
```

### Batch helper

#### `api.batch(items, fn, options = {})`

Run operations in chunks with configurable concurrency, delay, and progress tracking.

Options:

- `concurrency` (default: `5`)
- `delayMs` (default: `100`)
- `onProgress(completed, total)`
- `continueOnError` (default: `false`)

Returns:

```json
{ "results": [/*...*/], "errors": [{ "item": {}, "error": {} }], "total": 123 }
```

---

## Need deeper examples?

Just contact me:

E-Mail: contact@timdev.info
Discord: timdev511
