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
- `update(id, data)`
- `delete(id)`

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

### System activity types (read-only)

These are generated automatically by Close and cannot be created or deleted.

#### Creations (`api.activity.creation`)
- `search(options = {})` / `read(id)`

#### Form submissions (`api.activity.form_submission`)
- `search(options = {})` / `read(id)`

#### Lead status changes (`api.activity.lead_status_change`)
- `search(options = {})` / `read(id)`

#### Opportunity status changes (`api.activity.opportunity_status_change`)
- `search(options = {})` / `read(id)`

#### Lead merges (`api.activity.lead_merge`)
- `search(options = {})` / `read(id)`

#### Task completions (`api.activity.task_completion`)
- `search(options = {})` / `read(id)`

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

### Shared custom fields (`api.custom_field.shared`)

Shared custom fields span multiple object types.

- `list()`
- `create(data)`
- `read(id)`
- `update(id, data)`
- `delete(id)`
- `associations.list(scfId)` — list object associations for a shared field
- `associations.create(scfId, data)` — add an association
- `associations.delete(scfId, id)` — remove an association

---

## Custom field schema (`api.custom_field_schema`)

- `read(objectType)` — e.g. `api.custom_field_schema.read('lead')`
- `update(objectType, data)`

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

### `api.user.availability(options = {})`

List user availability statuses.

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
- `render(data)` — render a template with dynamic data (lead/contact context)

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

## SMS templates (`api.sms_template`)

- `list(options = {})`
- `create(data)`
- `read(id)`
- `update(id, data)`
- `delete(id)`

---

## Comments (`api.comment`)

Comments can be attached to leads, opportunities, and other objects.

- `list(options = {})` — filter by `object_id` or `thread_id`
- `create(data)`
- `read(id)`
- `update(id, data)`
- `delete(id)`

## Comment threads (`api.comment_thread`)

- `list(options = {})`
- `read(id)`

---

## File upload (`api.file`)

Returns a signed S3 POST payload. Upload the file directly to S3 using the returned `url` and `fields`. Files are available for up to 24 hours.

- `upload(data)` — POST `/files/upload/`

```js
const { url, fields } = await api.file.upload({ name: ‘document.pdf’ });
// Use `url` and `fields` in a multipart/form-data POST to S3
```

---

## Unsubscribed emails (`api.unsubscribed_email`)

- `list(options = {})`
- `create(data)` — add an email to the unsubscribe list, e.g. `{ email: ‘user@example.com’ }`
- `delete(id)` — remove from unsubscribe list

---

## Outcomes (`api.outcome`)

Standardized call/meeting result labels.

- `list(options = {})`
- `create(data)`
- `read(id)`
- `update(id, data)`
- `delete(id)`

---

## Integration links (`api.integration_link`)

Custom tool connections shown in the Close UI on leads/contacts.

- `list(options = {})`
- `create(data)`
- `read(id)`
- `update(id, data)`
- `delete(id)`

---

## Memberships (`api.membership`)

User–organization membership records.

- `list(options = {})`
- `create(data)`
- `read(id)`
- `update(id, data)`
- `delete(id)`

---

## Roles (`api.role`)

Permission role definitions within an organization.

- `list(options = {})`
- `create(data)`
- `read(id)`
- `update(id, data)`
- `delete(id)`

---

## Groups (`api.group`)

Named collections of users.

- `list(options = {})`
- `create(data)`
- `read(id)`
- `update(id, data)`
- `delete(id)`

---

## Exports (`api.export`)

Asynchronous data extraction. Poll `read(id)` until `status === ‘complete’`.

- `list(options = {})`
- `read(id)` — get export status
- `lead(data)` — POST `/export/lead/` — start a lead export
- `opportunity(data)` — POST `/export/opportunity/` — start an opportunity export

```js
const exp = await api.export.lead({ query: ‘status:"Active"’ });
// poll
let result;
do {
  result = await api.export.read(exp.id);
} while (result.status !== ‘complete’);
console.log(result.download_url);
```

---

## Field enrichment (`api.field_enrichment`)

AI-powered field population. May consume credits.

- `enrich(data)` — POST `/field_enrichment/`

```js
await api.field_enrichment.enrich({
  lead_id: ‘lead_xxx’,
  field_id: ‘cf_yyy’
});
```

---

## Scheduling links (`api.scheduling_link`)

Meeting booking integrations (Calendly, etc.).

- `list(options = {})`
- `create(data)`
- `read(id)`
- `update(id, data)`
- `delete(id)`

---

## Phone numbers (`api.phone_number`)

Close-provisioned phone numbers.

- `list(options = {})` — list numbers in the org
- `create(data)` — provision a new number

---

## Dialer (`api.dialer`)

Dialer session management.

- `list(options = {})`
- `create(data)`
- `read(id)`
- `update(id, data)`
- `delete(id)`

---

## Send As (`api.send_as`)

Proxy email sending addresses.

- `list(options = {})`
- `create(data)`
- `read(id)`
- `update(id, data)`
- `delete(id)`

---

## Custom field schema (`api.custom_field_schema`)

Retrieve or update the schema definition for a given object type.

- `read(objectType)` — GET `/custom_field_schema/{objectType}/`
- `update(objectType, data)` — PUT `/custom_field_schema/{objectType}/`

---

## Bulk actions (`api.bulk`)

### Legacy shortcuts

- `delete(data)` — POST `/bulk_delete/`
- `email(data)` — POST `/bulk_email/`
- `update(data)` — POST `/bulk_update/`
- `action(data)` — POST `/bulk_action/`

### Structured sub-resources

Each sub-resource supports `list`, `create`, and `read(id)` to track async status.

#### `api.bulk.emails`
- `list(options = {})` / `create(data)` / `read(id)`

#### `api.bulk.edits`
- `list(options = {})` / `create(data)` / `read(id)`

#### `api.bulk.deletes`
- `list(options = {})` / `create(data)` / `read(id)`

#### `api.bulk.sequence_subscriptions`
- `list(options = {})` / `create(data)` / `read(id)`

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
