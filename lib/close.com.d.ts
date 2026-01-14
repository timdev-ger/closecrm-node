declare module 'closecrm-node' {
  export interface ClosecomOptions {
    baseUrl?: string;
    maxRetries?: number;
    retryDelay?: number;
  }

  export interface SearchOptions {
    query?: string;
    limit?: number;
    skip?: number;
    fields?: string;
    _limit?: number;
    _skip?: number;
    _fields?: string;
    [key: string]: any;
  }

  export interface PaginatedResponse<T> {
    data: T[];
    has_more: boolean;
    total_results?: number;
  }

  export interface BatchOptions {
    concurrency?: number;
    delayMs?: number;
    onProgress?: (completed: number, total: number) => void;
    continueOnError?: boolean;
  }

  export interface BatchResult<T> {
    results: T[];
    errors: Array<{ item: any; error: Error }>;
    total: number;
  }

  export interface Lead {
    id: string;
    name: string;
    display_name: string;
    description?: string;
    url?: string;
    status_id: string;
    status_label: string;
    organization_id: string;
    contacts?: Contact[];
    opportunities?: Opportunity[];
    tasks?: Task[];
    date_created: string;
    date_updated: string;
    created_by?: string;
    updated_by?: string;
    html_url?: string;
    custom?: Record<string, any>;
    addresses?: Address[];
    [key: string]: any;
  }

  export interface Contact {
    id: string;
    lead_id: string;
    name: string;
    title?: string;
    created_by?: string;
    date_created: string;
    date_updated: string;
    organization_id: string;
    emails?: EmailAddress[];
    phones?: PhoneNumber[];
    urls?: Url[];
    custom?: Record<string, any>;
    [key: string]: any;
  }

  export interface EmailAddress {
    email: string;
    type: string;
  }

  export interface PhoneNumber {
    phone: string;
    phone_formatted?: string;
    type: string;
    country?: string;
  }

  export interface Url {
    url: string;
    type: string;
  }

  export interface Address {
    label?: string;
    address_1?: string;
    address_2?: string;
    city?: string;
    state?: string;
    zipcode?: string;
    country?: string;
  }

  export interface Opportunity {
    id: string;
    lead_id: string;
    status_id: string;
    status_label?: string;
    status_type?: 'active' | 'won' | 'lost';
    value?: number;
    value_period?: 'one_time' | 'monthly' | 'annual';
    value_formatted?: string;
    value_currency?: string;
    confidence?: number;
    date_created: string;
    date_updated: string;
    date_won?: string;
    note?: string;
    lead_name?: string;
    user_id?: string;
    user_name?: string;
    created_by?: string;
    updated_by?: string;
    organization_id: string;
    custom?: Record<string, any>;
    [key: string]: any;
  }

  export interface Activity {
    id: string;
    lead_id: string;
    contact_id?: string;
    user_id: string;
    user_name?: string;
    organization_id: string;
    date_created: string;
    date_updated?: string;
    _type: string;
    [key: string]: any;
  }

  export interface Note extends Activity {
    _type: 'Note';
    note: string;
    note_html?: string;
  }

  export interface Email extends Activity {
    _type: 'Email';
    subject?: string;
    body_text?: string;
    body_html?: string;
    status?: string;
    direction?: 'incoming' | 'outgoing';
    to?: string[];
    cc?: string[];
    bcc?: string[];
    sender?: string;
    template_id?: string;
    envelope?: any;
    opens?: any[];
    clicks?: any[];
    thread_id?: string;
    [key: string]: any;
  }

  export interface Call extends Activity {
    _type: 'Call';
    direction?: 'inbound' | 'outbound';
    status?: string;
    duration?: number;
    phone?: string;
    recording_url?: string;
    voicemail_url?: string;
    note?: string;
    [key: string]: any;
  }

  export interface SMS extends Activity {
    _type: 'SMS';
    text: string;
    direction?: 'incoming' | 'outgoing';
    status?: string;
    phone?: string;
    local_phone?: string;
    [key: string]: any;
  }

  export interface Meeting extends Activity {
    _type: 'Meeting';
    title?: string;
    starts_at?: string;
    ends_at?: string;
    location?: string;
    note?: string;
    attendees?: string[];
    [key: string]: any;
  }

  export interface WhatsAppMessage extends Activity {
    _type: 'WhatsAppMessage';
    external_whatsapp_message_id: string;
    message_markdown: string;
    message_html?: string;
    direction?: 'incoming' | 'outgoing';
    status?: string;
    response_to_id?: string;
    integration_link?: string;
    attachments?: Array<{
      url: string;
      filename: string;
      content_type: string;
      size?: number;
    }>;
    [key: string]: any;
  }

  export interface Task {
    id: string;
    lead_id?: string;
    assigned_to: string;
    assigned_to_name?: string;
    text: string;
    date: string;
    is_complete: boolean;
    date_created: string;
    date_updated: string;
    created_by?: string;
    updated_by?: string;
    organization_id: string;
    [key: string]: any;
  }

  export interface CustomField {
    id: string;
    name: string;
    description?: string;
    type: 'text' | 'number' | 'choices' | 'date' | 'datetime' | 'url' | 'user';
    choices?: string[];
    accepts_multiple_values?: boolean;
    editable_with_roles?: string[];
    required?: boolean;
    custom_object_type_id?: string;
    organization_id: string;
    created_by?: string;
    date_created: string;
    date_updated: string;
    [key: string]: any;
  }

  export interface CustomObjectType {
    id: string;
    name: string;
    name_plural: string;
    description?: string;
    api_create_only?: boolean;
    editable_with_roles?: string[];
    fields?: CustomField[];
    back_reference_fields?: CustomField[];
    organization_id: string;
    date_created: string;
    date_updated: string;
    [key: string]: any;
  }

  export interface CustomObject {
    id: string;
    custom_object_type_id: string;
    lead_id: string;
    name: string;
    custom?: Record<string, any>;
    date_created: string;
    date_updated: string;
    organization_id: string;
    [key: string]: any;
  }

  export interface User {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    name?: string;
    image?: string;
    date_created: string;
    date_updated: string;
    organizations?: Organization[];
    [key: string]: any;
  }

  export interface Organization {
    id: string;
    name: string;
    date_created: string;
    date_updated: string;
    [key: string]: any;
  }

  export interface Pipeline {
    id: string;
    name: string;
    organization_id: string;
    date_created: string;
    date_updated: string;
    [key: string]: any;
  }

  export interface Status {
    id: string;
    label: string;
    type?: string;
    organization_id: string;
    [key: string]: any;
  }

  export interface EmailTemplate {
    id: string;
    name: string;
    subject?: string;
    body_text?: string;
    body_html?: string;
    is_shared?: boolean;
    created_by?: string;
    updated_by?: string;
    date_created: string;
    date_updated: string;
    organization_id: string;
    [key: string]: any;
  }

  export interface SavedSearch {
    id: string;
    name: string;
    query: string;
    type?: string;
    is_shared?: boolean;
    created_by?: string;
    date_created: string;
    date_updated: string;
    organization_id: string;
    [key: string]: any;
  }

  export interface Sequence {
    id: string;
    name: string;
    status?: 'active' | 'paused' | 'archived';
    created_by?: string;
    updated_by?: string;
    date_created: string;
    date_updated: string;
    organization_id: string;
    [key: string]: any;
  }

  export interface SequenceSubscription {
    id: string;
    sequence_id: string;
    contact_id: string;
    lead_id: string;
    sender_account_id?: string;
    sender_name?: string;
    state?: 'active' | 'paused' | 'finished';
    date_created: string;
    date_updated: string;
    date_paused?: string;
    organization_id: string;
    [key: string]: any;
  }

  export interface Report {
    id: string;
    name: string;
    type?: string;
    date_created: string;
    organization_id: string;
    [key: string]: any;
  }

  export interface Event {
    id: string;
    action: string;
    object_type: string;
    object_id: string;
    user_id?: string;
    date_created: string;
    organization_id: string;
    meta?: Record<string, any>;
    [key: string]: any;
  }

  export interface Webhook {
    id: string;
    url: string;
    events: string[];
    status?: 'active' | 'inactive';
    created_by?: string;
    date_created: string;
    date_updated: string;
    organization_id: string;
    [key: string]: any;
  }

  export interface EmailThread {
    id: string;
    subject?: string;
    participants?: string[];
    date_created: string;
    date_updated: string;
    organization_id: string;
    [key: string]: any;
  }

  export interface ConnectedAccount {
    id: string;
    type: string;
    email?: string;
    date_created: string;
    organization_id: string;
    [key: string]: any;
  }

  export interface Import {
    id: string;
    status: 'pending' | 'processing' | 'complete' | 'failed';
    date_created: string;
    organization_id: string;
    [key: string]: any;
  }

  export interface LeadResource {
    search(options?: SearchOptions): Promise<PaginatedResponse<Lead>>;
    create(data: Partial<Lead>): Promise<Lead>;
    read(id: string): Promise<Lead>;
    update(id: string, data: Partial<Lead>): Promise<Lead>;
    delete(id: string): Promise<void>;
    merge(data: { source: string; destination: string }): Promise<Lead>;
  }

  export interface ContactResource {
    search(options?: SearchOptions): Promise<PaginatedResponse<Contact>>;
    create(data: Partial<Contact>): Promise<Contact>;
    read(id: string): Promise<Contact>;
    update(id: string, data: Partial<Contact>): Promise<Contact>;
    delete(id: string): Promise<void>;
  }

  export interface NoteResource {
    search(options?: SearchOptions): Promise<PaginatedResponse<Note>>;
    create(data: Partial<Note>): Promise<Note>;
    read(id: string): Promise<Note>;
    update(id: string, data: Partial<Note>): Promise<Note>;
    delete(id: string): Promise<void>;
  }

  export interface EmailResource {
    search(options?: SearchOptions): Promise<PaginatedResponse<Email>>;
    create(data: Partial<Email>): Promise<Email>;
    read(id: string): Promise<Email>;
    update(id: string, data: Partial<Email>): Promise<Email>;
    delete(id: string): Promise<void>;
  }

  export interface CallResource {
    search(options?: SearchOptions): Promise<PaginatedResponse<Call>>;
    create(data: Partial<Call>): Promise<Call>;
    read(id: string): Promise<Call>;
    update(id: string, data: Partial<Call>): Promise<Call>;
    delete(id: string): Promise<void>;
  }

  export interface SMSResource {
    search(options?: SearchOptions): Promise<PaginatedResponse<SMS>>;
    create(data: Partial<SMS>): Promise<SMS>;
    read(id: string): Promise<SMS>;
    delete(id: string): Promise<void>;
  }

  export interface MeetingResource {
    search(options?: SearchOptions): Promise<PaginatedResponse<Meeting>>;
    create(data: Partial<Meeting>): Promise<Meeting>;
    read(id: string): Promise<Meeting>;
    update(id: string, data: Partial<Meeting>): Promise<Meeting>;
    delete(id: string): Promise<void>;
  }

  export interface WhatsAppMessageResource {
    search(options?: SearchOptions): Promise<PaginatedResponse<WhatsAppMessage>>;
    create(data: Partial<WhatsAppMessage>, queryParams?: { send_to_inbox?: boolean }): Promise<WhatsAppMessage>;
    read(id: string): Promise<WhatsAppMessage>;
    update(id: string, data: Partial<WhatsAppMessage>): Promise<WhatsAppMessage>;
    delete(id: string): Promise<void>;
  }

  export interface ActivityResource {
    search(options?: SearchOptions): Promise<PaginatedResponse<Activity>>;
    note: NoteResource;
    email: EmailResource;
    call: CallResource;
    sms: SMSResource;
    meeting: MeetingResource;
    whatsapp_message: WhatsAppMessageResource;
  }

  export interface OpportunityResource {
    search(options?: SearchOptions): Promise<PaginatedResponse<Opportunity>>;
    create(data: Partial<Opportunity>): Promise<Opportunity>;
    read(id: string): Promise<Opportunity>;
    update(id: string, data: Partial<Opportunity>): Promise<Opportunity>;
    delete(id: string): Promise<void>;
  }

  export interface TaskResource {
    search(options?: SearchOptions): Promise<PaginatedResponse<Task>>;
    create(data: Partial<Task>): Promise<Task>;
    read(id: string): Promise<Task>;
    update(id: string, data: Partial<Task>): Promise<Task>;
    delete(id: string): Promise<void>;
  }

  export interface CustomFieldSubResource {
    list(): Promise<PaginatedResponse<CustomField>>;
    create(data: Partial<CustomField>): Promise<CustomField>;
    read(id: string): Promise<CustomField>;
    update(id: string, data: Partial<CustomField>): Promise<CustomField>;
    delete(id: string): Promise<void>;
  }

  export interface CustomFieldResource {
    lead: CustomFieldSubResource;
    contact: CustomFieldSubResource;
    opportunity: CustomFieldSubResource;
    activity: CustomFieldSubResource;
    custom_object_type: CustomFieldSubResource;
  }

  export interface CustomActivityResource {
    search(type: string, options?: SearchOptions): Promise<PaginatedResponse<Activity>>;
    create(type: string, data: any): Promise<Activity>;
    read(type: string, id: string): Promise<Activity>;
    update(type: string, id: string, data: any): Promise<Activity>;
    delete(type: string, id: string): Promise<void>;
  }

  export interface CustomObjectTypeResource {
    list(options?: SearchOptions): Promise<PaginatedResponse<CustomObjectType>>;
    create(data: Partial<CustomObjectType>): Promise<CustomObjectType>;
    read(id: string): Promise<CustomObjectType>;
    update(id: string, data: Partial<CustomObjectType>): Promise<CustomObjectType>;
    delete(id: string): Promise<void>;
  }

  export interface CustomObjectResource {
    list(options?: SearchOptions): Promise<PaginatedResponse<CustomObject>>;
    create(data: Partial<CustomObject>): Promise<CustomObject>;
    read(id: string): Promise<CustomObject>;
    update(id: string, data: Partial<CustomObject>): Promise<CustomObject>;
    delete(id: string): Promise<void>;
  }

  export interface UserResource {
    me(): Promise<User>;
    list(options?: SearchOptions): Promise<PaginatedResponse<User>>;
    read(id: string): Promise<User>;
    update(id: string, data: Partial<User>): Promise<User>;
  }

  export interface OrganizationResource {
    list(options?: SearchOptions): Promise<PaginatedResponse<Organization>>;
    read(id: string): Promise<Organization>;
    update(id: string, data: Partial<Organization>): Promise<Organization>;
  }

  export interface PipelineResource {
    list(options?: SearchOptions): Promise<PaginatedResponse<Pipeline>>;
    create(data: Partial<Pipeline>): Promise<Pipeline>;
    read(id: string): Promise<Pipeline>;
    update(id: string, data: Partial<Pipeline>): Promise<Pipeline>;
    delete(id: string): Promise<void>;
  }

  export interface StatusSubResource {
    list(): Promise<PaginatedResponse<Status>>;
    create(data: Partial<Status>): Promise<Status>;
    read(id: string): Promise<Status>;
    update(id: string, data: Partial<Status>): Promise<Status>;
    delete(id: string): Promise<void>;
  }

  export interface StatusResource {
    lead: StatusSubResource;
    opportunity: StatusSubResource;
  }

  export interface EmailTemplateResource {
    search(options?: SearchOptions): Promise<PaginatedResponse<EmailTemplate>>;
    create(data: Partial<EmailTemplate>): Promise<EmailTemplate>;
    read(id: string): Promise<EmailTemplate>;
    update(id: string, data: Partial<EmailTemplate>): Promise<EmailTemplate>;
    delete(id: string): Promise<void>;
  }

  export interface SavedSearchResource {
    list(options?: SearchOptions): Promise<PaginatedResponse<SavedSearch>>;
    create(data: Partial<SavedSearch>): Promise<SavedSearch>;
    read(id: string): Promise<SavedSearch>;
    update(id: string, data: Partial<SavedSearch>): Promise<SavedSearch>;
    delete(id: string): Promise<void>;
  }

  export interface SequenceResource {
    search(options?: SearchOptions): Promise<PaginatedResponse<Sequence>>;
    create(data: Partial<Sequence>): Promise<Sequence>;
    read(id: string): Promise<Sequence>;
    update(id: string, data: Partial<Sequence>): Promise<Sequence>;
    delete(id: string): Promise<void>;
  }

  export interface SequenceSubscriptionResource {
    list(options?: SearchOptions): Promise<PaginatedResponse<SequenceSubscription>>;
    create(data: Partial<SequenceSubscription>): Promise<SequenceSubscription>;
    read(id: string): Promise<SequenceSubscription>;
    update(id: string, data: Partial<SequenceSubscription>): Promise<SequenceSubscription>;
    delete(id: string): Promise<void>;
  }

  export interface ReportResource {
    // List predefined metrics used in activity reports
    activity_metrics(): Promise<PaginatedResponse<any>>;
    
    // Get an activity report
    activity(data: {
      datetime_range?: { start: string; end: string };
      relative_range?: string;
      query?: any;
      users?: string[];
      type: 'overview' | 'comparison';
      metrics: string[];
    }): Promise<any>;
    
    // Get sent emails report grouped by template
    sent_emails(organizationId: string, options?: {
      user_id?: string;
      date_start?: string;
      date_end?: string;
    }): Promise<any>;
    
    // Get lead status change report
    lead_statuses(organizationId: string, options?: {
      date_start?: string;
      date_end?: string;
      query?: string;
      smart_view_id?: string;
    }): Promise<any>;
    
    // Get opportunity status change report
    opportunity_statuses(organizationId: string, options?: {
      user_id?: string;
      date_start?: string;
      date_end?: string;
      query?: string;
      smart_view_id?: string;
    }): Promise<any>;
    
    // Get custom report
    custom(organizationId: string, options?: {
      query?: string;
      x?: string;
      y?: string;
      interval?: string;
      transform_y?: 'sum' | 'avg' | 'min' | 'max';
      group_by?: string;
      start?: string;
      end?: string;
    }): Promise<any>;
    
    // Get custom report fields
    custom_fields(): Promise<any>;
    
    // Get opportunity funnel report (totals)
    funnel_totals(data: {
      pipeline: string;
      type: 'created-cohort' | 'active-stage-cohort';
      report_relative_range?: string;
      report_datetime_range?: { start: string; end: string };
      cohort_relative_range?: string;
      cohort_datetime_range?: { start: string; end: string };
      compared_relative_range?: string;
      compared_datetime_range?: string;
      compared_custom_range?: { start: string; end: string };
      query?: any;
      users?: string[];
    }): Promise<any>;
    
    // Get opportunity funnel report (stages)
    funnel_stages(data: {
      pipeline: string;
      type: 'created-cohort' | 'active-stage-cohort';
      report_relative_range?: string;
      report_datetime_range?: { start: string; end: string };
      cohort_relative_range?: string;
      cohort_datetime_range?: { start: string; end: string };
      compared_relative_range?: string;
      compared_datetime_range?: string;
      compared_custom_range?: { start: string; end: string };
      query?: any;
      users?: string[];
    }): Promise<any>;
  }

  export interface EventResource {
    search(options?: SearchOptions): Promise<PaginatedResponse<Event>>;
    read(id: string): Promise<Event>;
  }

  export interface WebhookResource {
    list(options?: SearchOptions): Promise<PaginatedResponse<Webhook>>;
    create(data: Partial<Webhook>): Promise<Webhook>;
    read(id: string): Promise<Webhook>;
    update(id: string, data: Partial<Webhook>): Promise<Webhook>;
    delete(id: string): Promise<void>;
  }

  export interface EmailThreadResource {
    list(options?: SearchOptions): Promise<PaginatedResponse<EmailThread>>;
    read(id: string): Promise<EmailThread>;
  }

  export interface ConnectedAccountResource {
    list(options?: SearchOptions): Promise<PaginatedResponse<ConnectedAccount>>;
    read(id: string): Promise<ConnectedAccount>;
  }

  export interface ImportResource {
    create(data: any): Promise<Import>;
    read(id: string): Promise<Import>;
  }

  export interface BulkResource {
    delete(data: { type: string; ids: string[] }): Promise<any>;
    email(data: any): Promise<any>;
    update(data: any): Promise<any>;
    action(data: any): Promise<any>;
  }

  export class QueryBuilder {
    constructor();
    where(field: string, operator: string, value: any): this;
    where(field: string, value: any): this;
    equals(field: string, value: any): this;
    notEquals(field: string, value: any): this;
    contains(field: string, value: string): this;
    greaterThan(field: string, value: number | string): this;
    lessThan(field: string, value: number | string): this;
    in(field: string, values: any[]): this;
    and(): this;
    or(): this;
    build(): string;
    toString(): string;
  }

  export default class Closecom {
    constructor(apiKey: string, options?: ClosecomOptions);

    lead: LeadResource;
    contact: ContactResource;
    activity: ActivityResource;
    opportunity: OpportunityResource;
    task: TaskResource;
    custom_field: CustomFieldResource;
    custom_activity: CustomActivityResource;
    custom_object_type: CustomObjectTypeResource;
    custom_object: CustomObjectResource;
    user: UserResource;
    organization: OrganizationResource;
    pipeline: PipelineResource;
    status: StatusResource;
    email_template: EmailTemplateResource;
    saved_search: SavedSearchResource;
    smart_view: SavedSearchResource;
    sequence: SequenceResource;
    sequence_subscription: SequenceSubscriptionResource;
    report: ReportResource;
    event: EventResource;
    webhook: WebhookResource;
    email_thread: EmailThreadResource;
    connected_account: ConnectedAccountResource;
    bulk: BulkResource;

    query(): QueryBuilder;
    paginate<T>(searchFn: Function, options?: SearchOptions): Promise<T[]>;
    stream<T>(searchFn: Function, options?: SearchOptions): AsyncIterableIterator<T>;
    batch<T>(items: any[], fn: (item: any, index: number) => Promise<T>, options?: BatchOptions): Promise<BatchResult<T>>;
  }
}