'use strict';

class Closecom {
  constructor(apiKey, options = {}) {
    this.apiKey = apiKey;
    this.baseUrl = options.baseUrl || 'https://api.close.com/api/v1';
    this.maxRetries = options.maxRetries || 3;
    this.retryDelay = options.retryDelay || 1000;

    this._initLeads();
    this._initContacts();
    this._initActivities();
    this._initOpportunities();
    this._initTasks();
    this._initCustomFields();
    this._initCustomFieldSchema();
    this._initCustomActivities();
    this._initCustomObjects();
    this._initUsers();
    this._initOrganizations();
    this._initMemberships();
    this._initRoles();
    this._initGroups();
    this._initPipelines();
    this._initStatus();
    this._initEmailTemplates();
    this._initSMSTemplates();
    this._initSavedSearches();
    this._initSequences();
    this._initSequenceSubscriptions();
    this._initReports();
    this._initEvents();
    this._initWebhooks();
    this._initEmailThreads();
    this._initConnectedAccounts();
    this._initComments();
    this._initFileUpload();
    this._initUnsubscribedEmails();
    this._initOutcomes();
    this._initIntegrationLinks();
    this._initExports();
    this._initFieldEnrichment();
    this._initSchedulingLinks();
    this._initPhoneNumbers();
    this._initDialer();
    this._initSendAs();
    this._initBulkActions();
  }

  _initLeads() {
    this.lead = {
      search: (options = {}) => {
        const params = this._normalizeSearchParams({ ...options });
        const querySource = { ...options };
        delete querySource.limit;
        delete querySource.skip;
        delete querySource.fields;

        if ('query' in options) {
          params.query = options.query;
        } else {
          const optionKeys = Object.keys(querySource);
          if (optionKeys.length > 0) {
            params.query = '';
            optionKeys.forEach((option) => {
              const optionWrapper = (!/^".*"$/.test(option) && / +/.test(option)) ? '"' : '';
              params.query += `${optionWrapper}${option}${optionWrapper}:${querySource[option]} `;
            });
          }
        }

        return this._get('/lead/', params);
      },
      
      create: (data) => {
        this._validateRequired(data, ['name'], 'Lead');
        return this._post('/lead/', data);
      },
      
      read: (id) => {
        if (!id) throw new Error('Lead ID is required');
        return this._get(`/lead/${id}/`);
      },
      
      update: (id, data) => {
        if (!id) throw new Error('Lead ID is required');
        return this._put(`/lead/${id}/`, data);
      },
      
      delete: (id) => {
        if (!id) throw new Error('Lead ID is required');
        return this._delete(`/lead/${id}/`);
      },
      
      merge: (data) => {
        this._validateRequired(data, ['source', 'destination'], 'Lead Merge');
        return this._post('/lead/merge/', data);
      },

    };
  }

  _initContacts() {
    this.contact = {
      search: (options = {}) => this._get('/contact/', this._normalizeSearchParams({ ...options })),
      create: (data) => this._post('/contact/', data),
      read: (id) => this._get(`/contact/${id}/`),
      update: (id, data) => this._put(`/contact/${id}/`, data),
      delete: (id) => this._delete(`/contact/${id}/`)
    };
  }

  _initActivities() {
    this.activity = {
      search: (options = {}) => this._get('/activity/', this._normalizeSearchParams({ ...options })),
      
      note: {
        search: (options = {}) => this._get('/activity/note/', this._normalizeSearchParams({ ...options })),
        create: (data) => this._post('/activity/note/', data),
        read: (id) => this._get(`/activity/note/${id}/`),
        update: (id, data) => this._put(`/activity/note/${id}/`, data),
        delete: (id) => this._delete(`/activity/note/${id}/`)
      },
      
      email: {
        search: (options = {}) => this._get('/activity/email/', this._normalizeSearchParams({ ...options })),
        create: (data) => this._post('/activity/email/', data),
        read: (id) => this._get(`/activity/email/${id}/`),
        update: (id, data) => this._put(`/activity/email/${id}/`, data),
        delete: (id) => this._delete(`/activity/email/${id}/`)
      },
      
      call: {
        search: (options = {}) => this._get('/activity/call/', this._normalizeSearchParams({ ...options })),
        create: (data) => this._post('/activity/call/', data),
        read: (id) => this._get(`/activity/call/${id}/`),
        update: (id, data) => this._put(`/activity/call/${id}/`, data),
        delete: (id) => this._delete(`/activity/call/${id}/`)
      },
      
      sms: {
        search: (options = {}) => this._get('/activity/sms/', this._normalizeSearchParams({ ...options })),
        create: (data) => this._post('/activity/sms/', data),
        read: (id) => this._get(`/activity/sms/${id}/`),
        update: (id, data) => this._put(`/activity/sms/${id}/`, data),
        delete: (id) => this._delete(`/activity/sms/${id}/`)
      },
      
      meeting: {
        search: (options = {}) => this._get('/activity/meeting/', this._normalizeSearchParams({ ...options })),
        create: (data) => this._post('/activity/meeting/', data),
        read: (id) => this._get(`/activity/meeting/${id}/`),
        update: (id, data) => this._put(`/activity/meeting/${id}/`, data),
        delete: (id) => this._delete(`/activity/meeting/${id}/`)
      },
      
      whatsapp_message: {
        search: (options = {}) => this._get('/activity/whatsapp_message/', this._normalizeSearchParams({ ...options })),
        create: (data, queryParams = {}) => {
          const path = '/activity/whatsapp_message/';
          return this._request({ method: 'POST', path, body: data, params: queryParams });
        },
        read: (id) => this._get(`/activity/whatsapp_message/${id}/`),
        update: (id, data) => this._put(`/activity/whatsapp_message/${id}/`, data),
        delete: (id) => this._delete(`/activity/whatsapp_message/${id}/`)
      },

      // System read-only activity types
      creation: {
        search: (options = {}) => this._get('/activity/created/', this._normalizeSearchParams({ ...options })),
        read: (id) => this._get(`/activity/created/${id}/`)
      },

      form_submission: {
        search: (options = {}) => this._get('/activity/form_submission/', this._normalizeSearchParams({ ...options })),
        read: (id) => this._get(`/activity/form_submission/${id}/`)
      },

      lead_status_change: {
        search: (options = {}) => this._get('/activity/leadstatuschange/', this._normalizeSearchParams({ ...options })),
        read: (id) => this._get(`/activity/leadstatuschange/${id}/`)
      },

      opportunity_status_change: {
        search: (options = {}) => this._get('/activity/opportunitystatuschange/', this._normalizeSearchParams({ ...options })),
        read: (id) => this._get(`/activity/opportunitystatuschange/${id}/`)
      },

      lead_merge: {
        search: (options = {}) => this._get('/activity/leadmerge/', this._normalizeSearchParams({ ...options })),
        read: (id) => this._get(`/activity/leadmerge/${id}/`)
      },

      task_completion: {
        search: (options = {}) => this._get('/activity/taskcompleted/', this._normalizeSearchParams({ ...options })),
        read: (id) => this._get(`/activity/taskcompleted/${id}/`)
      }
    };
  }

  _initOpportunities() {
    this.opportunity = {
      search: (options = {}) => this._get('/opportunity/', this._normalizeSearchParams({ ...options })),
      create: (data) => this._post('/opportunity/', data),
      read: (id) => this._get(`/opportunity/${id}/`),
      update: (id, data) => this._put(`/opportunity/${id}/`, data),
      delete: (id) => this._delete(`/opportunity/${id}/`)
    };
  }

  _initTasks() {
    this.task = {
      search: (options = {}) => this._get('/task/', this._normalizeSearchParams({ ...options })),
      create: (data) => this._post('/task/', data),
      read: (id) => this._get(`/task/${id}/`),
      update: (id, data) => this._put(`/task/${id}/`, data),
      delete: (id) => this._delete(`/task/${id}/`)
    };
  }

  _initCustomFields() {
    this.custom_field = {
      lead: {
        list: () => this._get('/custom_field/lead/'),
        create: (data) => this._post('/custom_field/lead/', data),
        read: (id) => this._get(`/custom_field/lead/${id}/`),
        update: (id, data) => this._put(`/custom_field/lead/${id}/`, data),
        delete: (id) => this._delete(`/custom_field/lead/${id}/`)
      },
      
      contact: {
        list: () => this._get('/custom_field/contact/'),
        create: (data) => this._post('/custom_field/contact/', data),
        read: (id) => this._get(`/custom_field/contact/${id}/`),
        update: (id, data) => this._put(`/custom_field/contact/${id}/`, data),
        delete: (id) => this._delete(`/custom_field/contact/${id}/`)
      },
      
      opportunity: {
        list: () => this._get('/custom_field/opportunity/'),
        create: (data) => this._post('/custom_field/opportunity/', data),
        read: (id) => this._get(`/custom_field/opportunity/${id}/`),
        update: (id, data) => this._put(`/custom_field/opportunity/${id}/`, data),
        delete: (id) => this._delete(`/custom_field/opportunity/${id}/`)
      },
      
      activity: {
        list: () => this._get('/custom_field/activity/'),
        create: (data) => this._post('/custom_field/activity/', data),
        read: (id) => this._get(`/custom_field/activity/${id}/`),
        update: (id, data) => this._put(`/custom_field/activity/${id}/`, data),
        delete: (id) => this._delete(`/custom_field/activity/${id}/`)
      },
      
      custom_object_type: {
        list: () => this._get('/custom_field/custom_object_type/'),
        create: (data) => this._post('/custom_field/custom_object_type/', data),
        read: (id) => this._get(`/custom_field/custom_object_type/${id}/`),
        update: (id, data) => this._put(`/custom_field/custom_object_type/${id}/`, data),
        delete: (id) => this._delete(`/custom_field/custom_object_type/${id}/`)
      },

      shared: {
        list: () => this._get('/custom_field/shared/'),
        create: (data) => this._post('/custom_field/shared/', data),
        read: (id) => this._get(`/custom_field/shared/${id}/`),
        update: (id, data) => this._put(`/custom_field/shared/${id}/`, data),
        delete: (id) => this._delete(`/custom_field/shared/${id}/`),
        associations: {
          list: (scfId) => this._get(`/custom_field/shared/${scfId}/association/`),
          create: (scfId, data) => this._post(`/custom_field/shared/${scfId}/association/`, data),
          delete: (scfId, id) => this._delete(`/custom_field/shared/${scfId}/association/${id}/`)
        }
      }
    };
  }

  _initCustomFieldSchema() {
    this.custom_field_schema = {
      read: (objectType) => this._get(`/custom_field_schema/${objectType}/`),
      update: (objectType, data) => this._put(`/custom_field_schema/${objectType}/`, data)
    };
  }

  _initCustomActivities() {
    this.custom_activity = {
      search: (type, options = {}) => this._get(`/custom_activity/${type}/`, this._normalizeSearchParams({ ...options })),
      create: (type, data) => this._post(`/custom_activity/${type}/`, data),
      read: (type, id) => this._get(`/custom_activity/${type}/${id}/`),
      update: (type, id, data) => this._put(`/custom_activity/${type}/${id}/`, data),
      delete: (type, id) => this._delete(`/custom_activity/${type}/${id}/`)
    };
  }

  _initCustomObjects() {
    this.custom_object_type = {
      list: (options = {}) => this._get('/custom_object_type/', this._normalizeSearchParams({ ...options })),
      create: (data) => this._post('/custom_object_type/', data),
      read: (id) => this._get(`/custom_object_type/${id}/`),
      update: (id, data) => this._put(`/custom_object_type/${id}/`, data),
      delete: (id) => this._delete(`/custom_object_type/${id}/`)
    };

    this.custom_object = {
      list: (options = {}) => this._get('/custom_object/', this._normalizeSearchParams({ ...options })),
      create: (data) => this._post('/custom_object/', data),
      read: (id) => this._get(`/custom_object/${id}/`),
      update: (id, data) => this._put(`/custom_object/${id}/`, data),
      delete: (id) => this._delete(`/custom_object/${id}/`)
    };
  }

  _initUsers() {
    this.user = {
      me: () => this._get('/me/'),
      list: (options = {}) => this._get('/user/', this._normalizeSearchParams({ ...options })),
      read: (id) => this._get(`/user/${id}/`),
      update: (id, data) => this._put(`/user/${id}/`, data),
      availability: (options = {}) => this._get('/user/availability/', this._normalizeSearchParams({ ...options }))
    };
  }

  _initOrganizations() {
    this.organization = {
      list: (options = {}) => this._get('/organization/', this._normalizeSearchParams({ ...options })),
      read: (id) => this._get(`/organization/${id}/`),
      update: (id, data) => this._put(`/organization/${id}/`, data)
    };
  }

  _initMemberships() {
    this.membership = {
      list: (options = {}) => this._get('/membership/', this._normalizeSearchParams({ ...options })),
      create: (data) => this._post('/membership/', data),
      read: (id) => this._get(`/membership/${id}/`),
      update: (id, data) => this._put(`/membership/${id}/`, data),
      delete: (id) => this._delete(`/membership/${id}/`)
    };
  }

  _initRoles() {
    this.role = {
      list: (options = {}) => this._get('/role/', this._normalizeSearchParams({ ...options })),
      create: (data) => this._post('/role/', data),
      read: (id) => this._get(`/role/${id}/`),
      update: (id, data) => this._put(`/role/${id}/`, data),
      delete: (id) => this._delete(`/role/${id}/`)
    };
  }

  _initGroups() {
    this.group = {
      list: (options = {}) => this._get('/group/', this._normalizeSearchParams({ ...options })),
      create: (data) => this._post('/group/', data),
      read: (id) => this._get(`/group/${id}/`),
      update: (id, data) => this._put(`/group/${id}/`, data),
      delete: (id) => this._delete(`/group/${id}/`)
    };
  }

  _initPipelines() {
    this.pipeline = {
      list: (options = {}) => this._get('/pipeline/', this._normalizeSearchParams({ ...options })),
      create: (data) => this._post('/pipeline/', data),
      read: (id) => this._get(`/pipeline/${id}/`),
      update: (id, data) => this._put(`/pipeline/${id}/`, data),
      delete: (id) => this._delete(`/pipeline/${id}/`)
    };
  }

  _initStatus() {
    this.status = {
      lead: {
        list: () => this._get('/status/lead/'),
        create: (data) => this._post('/status/lead/', data),
        read: (id) => this._get(`/status/lead/${id}/`),
        update: (id, data) => this._put(`/status/lead/${id}/`, data),
        delete: (id) => this._delete(`/status/lead/${id}/`)
      },
      
      opportunity: {
        list: () => this._get('/status/opportunity/'),
        create: (data) => this._post('/status/opportunity/', data),
        read: (id) => this._get(`/status/opportunity/${id}/`),
        update: (id, data) => this._put(`/status/opportunity/${id}/`, data),
        delete: (id) => this._delete(`/status/opportunity/${id}/`)
      }
    };
  }

  _initEmailTemplates() {
    this.email_template = {
      search: (options = {}) => this._get('/email_template/', this._normalizeSearchParams({ ...options })),
      create: (data) => this._post('/email_template/', data),
      read: (id) => this._get(`/email_template/${id}/`),
      update: (id, data) => this._put(`/email_template/${id}/`, data),
      delete: (id) => this._delete(`/email_template/${id}/`),
      render: (data) => this._post('/email_template/render/', data)
    };
  }

  _initSMSTemplates() {
    this.sms_template = {
      list: (options = {}) => this._get('/sms_template/', this._normalizeSearchParams({ ...options })),
      create: (data) => this._post('/sms_template/', data),
      read: (id) => this._get(`/sms_template/${id}/`),
      update: (id, data) => this._put(`/sms_template/${id}/`, data),
      delete: (id) => this._delete(`/sms_template/${id}/`)
    };
  }

  _initSavedSearches() {
    this.saved_search = {
      list: (options = {}) => this._get('/saved_search/', this._normalizeSearchParams({ ...options })),
      create: (data) => this._post('/saved_search/', data),
      read: (id) => this._get(`/saved_search/${id}/`),
      update: (id, data) => this._put(`/saved_search/${id}/`, data),
      delete: (id) => this._delete(`/saved_search/${id}/`)
    };
    
    this.smart_view = this.saved_search;
  }

  _initSequences() {
    this.sequence = {
      search: (options = {}) => this._get('/sequence/', this._normalizeSearchParams({ ...options })),
      create: (data) => this._post('/sequence/', data),
      read: (id) => this._get(`/sequence/${id}/`),
      update: (id, data) => this._put(`/sequence/${id}/`, data),
      delete: (id) => this._delete(`/sequence/${id}/`)
    };
  }

  _initSequenceSubscriptions() {
    this.sequence_subscription = {
      list: (options = {}) => this._get('/sequence_subscription/', this._normalizeSearchParams({ ...options })),
      create: (data) => this._post('/sequence_subscription/', data),
      read: (id) => this._get(`/sequence_subscription/${id}/`),
      update: (id, data) => this._put(`/sequence_subscription/${id}/`, data),
      delete: (id) => this._delete(`/sequence_subscription/${id}/`)
    };
  }

  _initReports() {
    this.report = {
      // List predefined metrics used in activity reports
      activity_metrics: () => this._get('/report/activity/metrics/'),
      
      // Get an activity report (POST)
      activity: (data) => this._post('/report/activity/', data),
      
      // Get sent emails report grouped by template
      sent_emails: (organizationId, options = {}) => 
        this._get(`/report/sent_emails/${organizationId}/`, this._normalizeSearchParams({ ...options })),
      
      // Get lead status change report
      lead_statuses: (organizationId, options = {}) => 
        this._get(`/report/statuses/lead/${organizationId}/`, this._normalizeSearchParams({ ...options })),
      
      // Get opportunity status change report
      opportunity_statuses: (organizationId, options = {}) => 
        this._get(`/report/statuses/opportunity/${organizationId}/`, this._normalizeSearchParams({ ...options })),
      
      // Get custom report
      custom: (organizationId, options = {}) => 
        this._get(`/report/custom/${organizationId}/`, this._normalizeSearchParams({ ...options })),
      
      // Get custom report fields
      custom_fields: () => this._get('/report/custom/fields/'),
      
      // Get opportunity funnel report (totals)
      funnel_totals: (data) => this._post('/report/funnel/opportunity/totals/', data),
      
      // Get opportunity funnel report (stages)
      funnel_stages: (data) => this._post('/report/funnel/opportunity/stages/', data)
    };
  }

  _initEvents() {
    this.event = {
      // Close event does not support skip/limit, pass options through as-is :)
      search: (options = {}) => this._get('/event/', options),
      read: (id) => this._get(`/event/${id}/`)
    };
  }

  _initWebhooks() {
    this.webhook = {
      list: (options = {}) => this._get('/webhook/', this._normalizeSearchParams({ ...options })),
      create: (data) => this._post('/webhook/', data),
      read: (id) => this._get(`/webhook/${id}/`),
      update: (id, data) => this._put(`/webhook/${id}/`, data),
      delete: (id) => this._delete(`/webhook/${id}/`)
    };
  }

  _initEmailThreads() {
    this.email_thread = {
      list: (options = {}) => this._get('/activity/emailthread/', this._normalizeSearchParams({ ...options })),
      read: (id) => this._get(`/activity/emailthread/${id}/`)
    };
  }

  _initConnectedAccounts() {
    this.connected_account = {
      list: (options = {}) => this._get('/connected_account/', this._normalizeSearchParams({ ...options })),
      read: (id) => this._get(`/connected_account/${id}/`)
    };
  }

  _initComments() {
    this.comment = {
      list: (options = {}) => this._get('/comment/', this._normalizeSearchParams({ ...options })),
      create: (data) => this._post('/comment/', data),
      read: (id) => this._get(`/comment/${id}/`),
      update: (id, data) => this._put(`/comment/${id}/`, data),
      delete: (id) => this._delete(`/comment/${id}/`)
    };

    this.comment_thread = {
      list: (options = {}) => this._get('/comment_thread/', this._normalizeSearchParams({ ...options })),
      read: (id) => this._get(`/comment_thread/${id}/`)
    };
  }

  _initFileUpload() {
    this.file = {
      // Returns a signed S3 POST payload. Use the returned fields/url to upload directly to S3.
      upload: (data) => this._post('/files/upload/', data)
    };
  }

  _initUnsubscribedEmails() {
    this.unsubscribed_email = {
      list: (options = {}) => this._get('/unsubscribed_email/', this._normalizeSearchParams({ ...options })),
      create: (data) => this._post('/unsubscribed_email/', data),
      delete: (id) => this._delete(`/unsubscribed_email/${id}/`)
    };
  }

  _initOutcomes() {
    this.outcome = {
      list: (options = {}) => this._get('/outcome/', this._normalizeSearchParams({ ...options })),
      create: (data) => this._post('/outcome/', data),
      read: (id) => this._get(`/outcome/${id}/`),
      update: (id, data) => this._put(`/outcome/${id}/`, data),
      delete: (id) => this._delete(`/outcome/${id}/`)
    };
  }

  _initIntegrationLinks() {
    this.integration_link = {
      list: (options = {}) => this._get('/integration_link/', this._normalizeSearchParams({ ...options })),
      create: (data) => this._post('/integration_link/', data),
      read: (id) => this._get(`/integration_link/${id}/`),
      update: (id, data) => this._put(`/integration_link/${id}/`, data),
      delete: (id) => this._delete(`/integration_link/${id}/`)
    };
  }

  _initExports() {
    this.export = {
      list: (options = {}) => this._get('/export/', this._normalizeSearchParams({ ...options })),
      read: (id) => this._get(`/export/${id}/`),
      lead: (data) => this._post('/export/lead/', data),
      opportunity: (data) => this._post('/export/opportunity/', data)
    };
  }

  _initFieldEnrichment() {
    this.field_enrichment = {
      enrich: (data) => this._post('/field_enrichment/', data)
    };
  }

  _initSchedulingLinks() {
    this.scheduling_link = {
      list: (options = {}) => this._get('/scheduling_link/', this._normalizeSearchParams({ ...options })),
      create: (data) => this._post('/scheduling_link/', data),
      read: (id) => this._get(`/scheduling_link/${id}/`),
      update: (id, data) => this._put(`/scheduling_link/${id}/`, data),
      delete: (id) => this._delete(`/scheduling_link/${id}/`)
    };
  }

  _initPhoneNumbers() {
    this.phone_number = {
      list: (options = {}) => this._get('/phone_number/', this._normalizeSearchParams({ ...options })),
      create: (data) => this._post('/phone_number/', data)
    };
  }

  _initDialer() {
    this.dialer = {
      list: (options = {}) => this._get('/dialer/', this._normalizeSearchParams({ ...options })),
      create: (data) => this._post('/dialer/', data),
      read: (id) => this._get(`/dialer/${id}/`),
      update: (id, data) => this._put(`/dialer/${id}/`, data),
      delete: (id) => this._delete(`/dialer/${id}/`)
    };
  }

  _initSendAs() {
    this.send_as = {
      list: (options = {}) => this._get('/send_as/', this._normalizeSearchParams({ ...options })),
      create: (data) => this._post('/send_as/', data),
      read: (id) => this._get(`/send_as/${id}/`),
      update: (id, data) => this._put(`/send_as/${id}/`, data),
      delete: (id) => this._delete(`/send_as/${id}/`)
    };
  }

  _initBulkActions() {
    this.bulk = {
      // Legacy convenience shortcuts (still functional)
      delete: (data) => this._post('/bulk_delete/', data),
      email: (data) => this._post('/bulk_email/', data),
      update: (data) => this._post('/bulk_update/', data),
      action: (data) => this._post('/bulk_action/', data),

      // Structured bulk_action sub-resources
      emails: {
        list: (options = {}) => this._get('/bulk_action/email/', this._normalizeSearchParams({ ...options })),
        create: (data) => this._post('/bulk_action/email/', data),
        read: (id) => this._get(`/bulk_action/email/${id}/`)
      },
      edits: {
        list: (options = {}) => this._get('/bulk_action/edit/', this._normalizeSearchParams({ ...options })),
        create: (data) => this._post('/bulk_action/edit/', data),
        read: (id) => this._get(`/bulk_action/edit/${id}/`)
      },
      deletes: {
        list: (options = {}) => this._get('/bulk_action/delete/', this._normalizeSearchParams({ ...options })),
        create: (data) => this._post('/bulk_action/delete/', data),
        read: (id) => this._get(`/bulk_action/delete/${id}/`)
      },
      sequence_subscriptions: {
        list: (options = {}) => this._get('/bulk_action/sequence_subscription/', this._normalizeSearchParams({ ...options })),
        create: (data) => this._post('/bulk_action/sequence_subscription/', data),
        read: (id) => this._get(`/bulk_action/sequence_subscription/${id}/`)
      }
    };
  }

  _normalizeSearchParams(options = {}) {
    const params = { ...options };

    if ('limit' in params) {
      params._limit = params.limit;
      delete params.limit;
    }
    if ('skip' in params) {
      params._skip = params.skip;
      delete params.skip;
    }
    if ('fields' in params) {
      params._fields = params.fields;
      delete params.fields;
    }

    return params;
  }

  _validateRequired(data, requiredFields, resourceName) {
    const missing = requiredFields.filter(field => !(field in data));
    if (missing.length > 0) {
      throw new Error(
        `${resourceName}: Missing required fields: ${missing.join(', ')}`
      );
    }
  }

  _handleError(error, context) {
    const enhancedError = new Error(error.message);
    enhancedError.status = error.status;
    enhancedError.response = error.response;
    enhancedError.context = context;

    if (error.status === 400) {
      enhancedError.hint = 'Check that all required fields are provided and data types are correct.';
    } else if (error.status === 401) {
      enhancedError.hint = 'Your API key may be invalid or expired.';
    } else if (error.status === 403) {
      enhancedError.hint = 'Your API key does not have permission for this action.';
    } else if (error.status === 404) {
      enhancedError.hint = 'The requested resource was not found. Check the ID.';
    } else if (error.status === 429) {
      enhancedError.hint = 'You have exceeded the rate limit. The request will be retried automatically.';
    }

    return enhancedError;
  }

  async _request(options, retryCount = 0) {
    const { method, path, body, params } = options;
    
    let url = `${this.baseUrl}${path}`;
    if (params && Object.keys(params).length > 0) {
      const queryString = new URLSearchParams(params).toString();
      url += `?${queryString}`;
    }

    const fetchOptions = {
      method: method || 'GET',
      headers: {
        'Authorization': `Basic ${Buffer.from(this.apiKey + ':').toString('base64')}`,
        'Content-Type': 'application/json',
        'User-Agent': 'closecrm-node (https://github.com/timdev-ger/closecrm-node)'
      }
    };

    if (body) {
      fetchOptions.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, fetchOptions);
      
      if (response.status === 429) {
        if (retryCount < this.maxRetries) {
          const retryAfterHeader = response.headers.get('Retry-After');
          const retryAfterMs = retryAfterHeader ? parseFloat(retryAfterHeader) * 1000 : null;
          const rateLimitMs = this._getRateLimitDelayMs(response.headers);
          const delayMs = rateLimitMs ?? retryAfterMs ?? this.retryDelay;

          await this._sleep(delayMs);
          return this._request(options, retryCount + 1);
        }
        throw new Error('Rate limit exceeded. Max retries reached.');
      }

      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        const error = new Error(data.error || data.errors || data || `HTTP ${response.status}`);
        error.status = response.status;
        error.response = data;
        throw this._handleError(error, { method, path, body, params });
      }

      return data;
      
    } catch (error) {
      if (error.name === 'TypeError' && retryCount < this.maxRetries) {
        await this._sleep(this.retryDelay);
        return this._request(options, retryCount + 1);
      }
      
      throw error;
    }
  }

  _get(path, params) {
    return this._request({ method: 'GET', path, params });
  }

  _post(path, body) {
    return this._request({ method: 'POST', path, body });
  }

  _put(path, body) {
    return this._request({ method: 'PUT', path, body });
  }

  _delete(path) {
    return this._request({ method: 'DELETE', path });
  }

  _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  _getRateLimitDelayMs(headers) {
    const resetHeaderNames = [
      'RateLimit-Reset',
      'Rate-Limit-Reset',
      'X-RateLimit-Reset',
      'X-Rate-Limit-Reset',
      'rate_reset'
    ];

    for (const name of resetHeaderNames) {
      const value = headers.get(name);
      if (!value) continue;

      const parsed = Number(value);
      if (!Number.isFinite(parsed)) continue;

      const nowMs = Date.now();

      // If value looks like epoch seconds (larger than a few days in seconds), treat accordingly
      if (parsed > 1e5) {
        const targetMs = parsed * 1000;
        return Math.max(targetMs - nowMs, 0);
      }

      // Otherwise treat as delta seconds
      return Math.max(parsed * 1000, 0);
    }

    return null;
  }

  query() {
    return new QueryBuilder();
  }

  async paginate(searchFn, options = {}) {
    const results = [];
    let skip = 0;
    const limit = options.limit || 100;
    
    while (true) {
      const response = await searchFn({
        ...options,
        limit,
        skip
      });
      
      if (!response.data || response.data.length === 0) {
        break;
      }
      
      results.push(...response.data);
      
      if (!response.has_more) {
        break;
      }
      
      skip += limit;
    }
    
    return results;
  }

  async *stream(searchFn, options = {}) {
    let skip = 0;
    const limit = options.limit || 100;
    
    while (true) {
      const response = await searchFn({
        ...options,
        limit,
        skip
      });
      
      if (!response.data || response.data.length === 0) {
        break;
      }
      
      for (const item of response.data) {
        yield item;
      }
      
      if (!response.has_more) {
        break;
      }
      
      skip += limit;
    }
  }

  async batch(items, fn, options = {}) {
    const {
      concurrency = 5,
      delayMs = 100,
      onProgress = null,
      continueOnError = false
    } = options;

    const results = [];
    const errors = [];
    let completed = 0;

    for (let i = 0; i < items.length; i += concurrency) {
      const chunk = items.slice(i, i + concurrency);
      
      const promises = chunk.map(async (item, index) => {
        try {
          const result = await fn(item, i + index);
          completed++;
          if (onProgress) onProgress(completed, items.length);
          return { success: true, result, item };
        } catch (error) {
          completed++;
          if (onProgress) onProgress(completed, items.length);
          if (!continueOnError) throw error;
          return { success: false, error, item };
        }
      });

      const chunkResults = await Promise.all(promises);
      
      chunkResults.forEach(r => {
        if (r.success) {
          results.push(r.result);
        } else {
          errors.push({ item: r.item, error: r.error });
        }
      });

      if (i + concurrency < items.length) {
        await this._sleep(delayMs);
      }
    }

    return { results, errors, total: items.length };
  }
}

class QueryBuilder {
  constructor() {
    this.conditions = [];
  }

  where(field, operator, value) {
    if (arguments.length === 2) {
      value = operator;
      operator = ':';
    }

    if (value === null) {
      this.conditions.push(`${field} is null`);
    } else if (typeof value === 'string' && value.includes(' ')) {
      this.conditions.push(`${field}${operator}"${value}"`);
    } else {
      this.conditions.push(`${field}${operator}${value}`);
    }

    return this;
  }

  equals(field, value) {
    return this.where(field, ':', value);
  }

  notEquals(field, value) {
    return this.where(field, '!:', value);
  }

  contains(field, value) {
    return this.where(field, '*', value);
  }

  greaterThan(field, value) {
    return this.where(field, '>', value);
  }

  lessThan(field, value) {
    return this.where(field, '<', value);
  }

  in(field, values) {
    const query = values.map(v => `${field}:"${v}"`).join(' OR ');
    this.conditions.push(`(${query})`);
    return this;
  }

  and() {
    return this;
  }

  or() {
    if (this.conditions.length > 0) {
      const last = this.conditions.pop();
      this.conditions.push(last + ' OR');
    }
    return this;
  }

  build() {
    return this.conditions.join(' ');
  }

  toString() {
    return this.build();
  }
}

module.exports = exports = Closecom;
module.exports.QueryBuilder = QueryBuilder;