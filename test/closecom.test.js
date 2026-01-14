'use strict';

const { expect } = require('chai');
const Closecom = require('../lib/close.com');

describe('Closecom', () => {
  let api;
  const mockApiKey = 'test_api_key_123';

  beforeEach(() => {
    api = new Closecom(mockApiKey);
  });

  describe('Constructor', () => {
    it('should create instance with API key', () => {
      expect(api).to.be.instanceOf(Closecom);
      expect(api.apiKey).to.equal(mockApiKey);
    });

    it('should use default base URL', () => {
      expect(api.baseUrl).to.equal('https://api.close.com/api/v1');
    });

    it('should accept custom base URL', () => {
      const customApi = new Closecom(mockApiKey, {
        baseUrl: 'https://custom.api.com'
      });
      expect(customApi.baseUrl).to.equal('https://custom.api.com');
    });

    it('should use default retry settings', () => {
      expect(api.maxRetries).to.equal(3);
      expect(api.retryDelay).to.equal(1000);
    });

    it('should accept custom retry settings', () => {
      const customApi = new Closecom(mockApiKey, {
        maxRetries: 5,
        retryDelay: 2000
      });
      expect(customApi.maxRetries).to.equal(5);
      expect(customApi.retryDelay).to.equal(2000);
    });
  });

  describe('Resource Initialization', () => {
    it('should initialize lead resource', () => {
      expect(api.lead).to.be.an('object');
      expect(api.lead.search).to.be.a('function');
      expect(api.lead.create).to.be.a('function');
      expect(api.lead.read).to.be.a('function');
      expect(api.lead.update).to.be.a('function');
      expect(api.lead.delete).to.be.a('function');
      expect(api.lead.merge).to.be.a('function');
    });

    it('should initialize contact resource', () => {
      expect(api.contact).to.be.an('object');
      expect(api.contact.search).to.be.a('function');
      expect(api.contact.create).to.be.a('function');
      expect(api.contact.read).to.be.a('function');
      expect(api.contact.update).to.be.a('function');
      expect(api.contact.delete).to.be.a('function');
    });

    it('should initialize activity resources', () => {
      expect(api.activity).to.be.an('object');
      expect(api.activity.note).to.be.an('object');
      expect(api.activity.email).to.be.an('object');
      expect(api.activity.call).to.be.an('object');
      expect(api.activity.sms).to.be.an('object');
      expect(api.activity.meeting).to.be.an('object');
      expect(api.activity.whatsapp_message).to.be.an('object');
    });

    it('should initialize opportunity resource', () => {
      expect(api.opportunity).to.be.an('object');
      expect(api.opportunity.search).to.be.a('function');
    });

    it('should initialize task resource', () => {
      expect(api.task).to.be.an('object');
      expect(api.task.search).to.be.a('function');
    });

    it('should initialize custom_field resource', () => {
      expect(api.custom_field).to.be.an('object');
      expect(api.custom_field.lead).to.be.an('object');
      expect(api.custom_field.contact).to.be.an('object');
      expect(api.custom_field.opportunity).to.be.an('object');
      expect(api.custom_field.activity).to.be.an('object');
      expect(api.custom_field.custom_object_type).to.be.an('object');
    });

    it('should initialize custom_activity resource', () => {
      expect(api.custom_activity).to.be.an('object');
      expect(api.custom_activity.search).to.be.a('function');
      expect(api.custom_activity.create).to.be.a('function');
      expect(api.custom_activity.read).to.be.a('function');
      expect(api.custom_activity.update).to.be.a('function');
      expect(api.custom_activity.delete).to.be.a('function');
    });

    it('should initialize custom_object_type resource', () => {
      expect(api.custom_object_type).to.be.an('object');
      expect(api.custom_object_type.list).to.be.a('function');
      expect(api.custom_object_type.create).to.be.a('function');
      expect(api.custom_object_type.read).to.be.a('function');
      expect(api.custom_object_type.update).to.be.a('function');
      expect(api.custom_object_type.delete).to.be.a('function');
    });

    it('should initialize custom_object resource', () => {
      expect(api.custom_object).to.be.an('object');
      expect(api.custom_object.list).to.be.a('function');
      expect(api.custom_object.create).to.be.a('function');
      expect(api.custom_object.read).to.be.a('function');
      expect(api.custom_object.update).to.be.a('function');
      expect(api.custom_object.delete).to.be.a('function');
    });

    it('should initialize user resource', () => {
      expect(api.user).to.be.an('object');
      expect(api.user.me).to.be.a('function');
      expect(api.user.list).to.be.a('function');
    });

    it('should initialize webhook resource', () => {
      expect(api.webhook).to.be.an('object');
      expect(api.webhook.list).to.be.a('function');
      expect(api.webhook.create).to.be.a('function');
    });

    it('should initialize email_thread resource', () => {
      expect(api.email_thread).to.be.an('object');
      expect(api.email_thread.list).to.be.a('function');
      expect(api.email_thread.read).to.be.a('function');
    });

    it('should initialize connected_account resource', () => {
      expect(api.connected_account).to.be.an('object');
      expect(api.connected_account.list).to.be.a('function');
      expect(api.connected_account.read).to.be.a('function');
    });

    it('should initialize event resource', () => {
      expect(api.event).to.be.an('object');
      expect(api.event.search).to.be.a('function');
      expect(api.event.read).to.be.a('function');
    });

    it('should initialize report resource', () => {
      expect(api.report).to.be.an('object');
      expect(api.report.activity_metrics).to.be.a('function');
      expect(api.report.activity).to.be.a('function');
      expect(api.report.sent_emails).to.be.a('function');
      expect(api.report.lead_statuses).to.be.a('function');
      expect(api.report.opportunity_statuses).to.be.a('function');
      expect(api.report.custom).to.be.a('function');
      expect(api.report.custom_fields).to.be.a('function');
      expect(api.report.funnel_totals).to.be.a('function');
      expect(api.report.funnel_stages).to.be.a('function');
    });

    it('should initialize sequence resource', () => {
      expect(api.sequence).to.be.an('object');
      expect(api.sequence.search).to.be.a('function');
      expect(api.sequence.create).to.be.a('function');
      expect(api.sequence.read).to.be.a('function');
      expect(api.sequence.update).to.be.a('function');
      expect(api.sequence.delete).to.be.a('function');
    });

    it('should initialize sequence_subscription resource', () => {
      expect(api.sequence_subscription).to.be.an('object');
      expect(api.sequence_subscription.list).to.be.a('function');
      expect(api.sequence_subscription.create).to.be.a('function');
      expect(api.sequence_subscription.read).to.be.a('function');
      expect(api.sequence_subscription.update).to.be.a('function');
      expect(api.sequence_subscription.delete).to.be.a('function');
    });

    it('should initialize saved_search resource', () => {
      expect(api.saved_search).to.be.an('object');
      expect(api.saved_search.list).to.be.a('function');
      expect(api.saved_search.create).to.be.a('function');
      expect(api.saved_search.read).to.be.a('function');
      expect(api.saved_search.update).to.be.a('function');
      expect(api.saved_search.delete).to.be.a('function');
    });

    it('should initialize email_template resource', () => {
      expect(api.email_template).to.be.an('object');
      expect(api.email_template.search).to.be.a('function');
      expect(api.email_template.create).to.be.a('function');
      expect(api.email_template.read).to.be.a('function');
      expect(api.email_template.update).to.be.a('function');
      expect(api.email_template.delete).to.be.a('function');
    });

    it('should initialize status resource', () => {
      expect(api.status).to.be.an('object');
      expect(api.status.lead).to.be.an('object');
      expect(api.status.opportunity).to.be.an('object');
    });

    it('should initialize pipeline resource', () => {
      expect(api.pipeline).to.be.an('object');
      expect(api.pipeline.list).to.be.a('function');
      expect(api.pipeline.create).to.be.a('function');
      expect(api.pipeline.read).to.be.a('function');
      expect(api.pipeline.update).to.be.a('function');
      expect(api.pipeline.delete).to.be.a('function');
    });

    it('should initialize organization resource', () => {
      expect(api.organization).to.be.an('object');
      expect(api.organization.list).to.be.a('function');
      expect(api.organization.read).to.be.a('function');
      expect(api.organization.update).to.be.a('function');
    });

    it('should initialize bulk resource', () => {
      expect(api.bulk).to.be.an('object');
      expect(api.bulk.delete).to.be.a('function');
      expect(api.bulk.email).to.be.a('function');
      expect(api.bulk.update).to.be.a('function');
      expect(api.bulk.action).to.be.a('function');
    });

    it('should create smart_view alias for saved_search', () => {
      expect(api.smart_view).to.equal(api.saved_search);
    });
  });

  describe('_validateRequired', () => {
    it('should throw error when required field is missing', () => {
      expect(() => {
        api._validateRequired({}, ['name'], 'Lead');
      }).to.throw('Lead: Missing required fields: name');
    });

    it('should throw error when multiple required fields are missing', () => {
      expect(() => {
        api._validateRequired({}, ['name', 'email'], 'Contact');
      }).to.throw('Contact: Missing required fields: name, email');
    });

    it('should not throw error when all required fields are present', () => {
      expect(() => {
        api._validateRequired({ name: 'Test', email: 'test@example.com' }, ['name', 'email'], 'Contact');
      }).to.not.throw();
    });
  });

  describe('_handleError', () => {
    it('should add hint for 400 Bad Request', () => {
      const error = new Error('Bad Request');
      error.status = 400;
      error.response = {};
      
      const enhanced = api._handleError(error, {});
      expect(enhanced.hint).to.include('required fields');
    });

    it('should add hint for 401 Unauthorized', () => {
      const error = new Error('Unauthorized');
      error.status = 401;
      error.response = {};
      
      const enhanced = api._handleError(error, {});
      expect(enhanced.hint).to.include('API key');
    });

    it('should add hint for 403 Forbidden', () => {
      const error = new Error('Forbidden');
      error.status = 403;
      error.response = {};
      
      const enhanced = api._handleError(error, {});
      expect(enhanced.hint).to.include('permission');
    });

    it('should add hint for 404 Not Found', () => {
      const error = new Error('Not Found');
      error.status = 404;
      error.response = {};
      
      const enhanced = api._handleError(error, {});
      expect(enhanced.hint).to.include('not found');
    });

    it('should add hint for 429 Rate Limit', () => {
      const error = new Error('Too Many Requests');
      error.status = 429;
      error.response = {};
      
      const enhanced = api._handleError(error, {});
      expect(enhanced.hint).to.include('rate limit');
    });

    it('should preserve error properties', () => {
      const error = new Error('Test Error');
      error.status = 400;
      error.response = { detail: 'Invalid data' };
      
      const enhanced = api._handleError(error, { method: 'POST', path: '/lead/' });
      expect(enhanced.status).to.equal(400);
      expect(enhanced.response).to.deep.equal({ detail: 'Invalid data' });
      expect(enhanced.context).to.deep.equal({ method: 'POST', path: '/lead/' });
    });
  });

  describe('_sleep', () => {
    it('should resolve after specified milliseconds', async () => {
      const start = Date.now();
      await api._sleep(100);
      const duration = Date.now() - start;
      expect(duration).to.be.at.least(90);
    });
  });

  describe('query()', () => {
    it('should return a QueryBuilder instance', () => {
      const builder = api.query();
      expect(builder).to.have.property('where');
      expect(builder).to.have.property('equals');
      expect(builder).to.have.property('build');
    });
  });

  describe('QueryBuilder', () => {
    let builder;

    beforeEach(() => {
      builder = api.query();
    });

    it('should build simple equality query', () => {
      const query = builder.equals('status', 'Potential').build();
      expect(query).to.equal('status:Potential');
    });

    it('should handle values with spaces', () => {
      const query = builder.equals('name', 'Acme Inc').build();
      expect(query).to.equal('name:"Acme Inc"');
    });

    it('should build not equals query', () => {
      const query = builder.notEquals('status', 'Lost').build();
      expect(query).to.equal('status!:Lost');
    });

    it('should build contains query', () => {
      const query = builder.contains('name', 'Tech').build();
      expect(query).to.equal('name*Tech');
    });

    it('should build greater than query', () => {
      const query = builder.greaterThan('custom.employees', 100).build();
      expect(query).to.equal('custom.employees>100');
    });

    it('should build less than query', () => {
      const query = builder.lessThan('custom.value', 1000).build();
      expect(query).to.equal('custom.value<1000');
    });

    it('should build IN query', () => {
      const query = builder.in('custom.industry', ['Tech', 'Finance']).build();
      expect(query).to.equal('(custom.industry:"Tech" OR custom.industry:"Finance")');
    });

    it('should handle null values', () => {
      const query = builder.where('custom.field', null).build();
      expect(query).to.equal('custom.field is null');
    });

    it('should chain multiple conditions', () => {
      const query = builder
        .equals('status', 'Potential')
        .greaterThan('custom.employees', 50)
        .build();
      expect(query).to.equal('status:Potential custom.employees>50');
    });

    it('should convert to string', () => {
      const query = builder.equals('status', 'Potential').toString();
      expect(query).to.equal('status:Potential');
    });
  });

  describe('Lead Resource Validation', () => {
    it('should throw error when creating lead without name', async () => {
      try {
        await api.lead.create({});
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.include('Missing required fields: name');
      }
    });

    it('should throw error when reading lead without ID', async () => {
      try {
        await api.lead.read('');
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.include('Lead ID is required');
      }
    });

    it('should throw error when updating lead without ID', async () => {
      try {
        await api.lead.update('', { name: 'Test' });
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.include('Lead ID is required');
      }
    });

    it('should throw error when deleting lead without ID', async () => {
      try {
        await api.lead.delete('');
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.include('Lead ID is required');
      }
    });

    it('should throw error when merging leads without source', async () => {
      try {
        await api.lead.merge({ destination: 'lead_123' });
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.include('Missing required fields: source');
      }
    });

    // lead.convert() was removed (undocumented endpoint)
  });


  describe('Activity Sub-Resources', () => {
    it('should have all CRUD methods for note', () => {
      expect(api.activity.note.search).to.be.a('function');
      expect(api.activity.note.create).to.be.a('function');
      expect(api.activity.note.read).to.be.a('function');
      expect(api.activity.note.update).to.be.a('function');
      expect(api.activity.note.delete).to.be.a('function');
    });

    it('should have all CRUD methods for email', () => {
      expect(api.activity.email.search).to.be.a('function');
      expect(api.activity.email.create).to.be.a('function');
      expect(api.activity.email.read).to.be.a('function');
      expect(api.activity.email.update).to.be.a('function');
      expect(api.activity.email.delete).to.be.a('function');
    });

    it('should have all CRUD methods for call', () => {
      expect(api.activity.call.search).to.be.a('function');
      expect(api.activity.call.create).to.be.a('function');
      expect(api.activity.call.read).to.be.a('function');
      expect(api.activity.call.update).to.be.a('function');
      expect(api.activity.call.delete).to.be.a('function');
    });

    it('should have all methods for sms (no update)', () => {
      expect(api.activity.sms.search).to.be.a('function');
      expect(api.activity.sms.create).to.be.a('function');
      expect(api.activity.sms.read).to.be.a('function');
      expect(api.activity.sms.delete).to.be.a('function');
    });

    it('should have all CRUD methods for meeting', () => {
      expect(api.activity.meeting.search).to.be.a('function');
      expect(api.activity.meeting.create).to.be.a('function');
      expect(api.activity.meeting.read).to.be.a('function');
      expect(api.activity.meeting.update).to.be.a('function');
      expect(api.activity.meeting.delete).to.be.a('function');
    });

    it('should have all CRUD methods for whatsapp_message', () => {
      expect(api.activity.whatsapp_message.search).to.be.a('function');
      expect(api.activity.whatsapp_message.create).to.be.a('function');
      expect(api.activity.whatsapp_message.read).to.be.a('function');
      expect(api.activity.whatsapp_message.update).to.be.a('function');
      expect(api.activity.whatsapp_message.delete).to.be.a('function');
    });
  });

  describe('Custom Field Sub-Resources', () => {
    it('should have all methods for lead custom fields', () => {
      expect(api.custom_field.lead.list).to.be.a('function');
      expect(api.custom_field.lead.create).to.be.a('function');
      expect(api.custom_field.lead.read).to.be.a('function');
      expect(api.custom_field.lead.update).to.be.a('function');
      expect(api.custom_field.lead.delete).to.be.a('function');
    });

    it('should have all methods for contact custom fields', () => {
      expect(api.custom_field.contact.list).to.be.a('function');
      expect(api.custom_field.contact.create).to.be.a('function');
      expect(api.custom_field.contact.read).to.be.a('function');
      expect(api.custom_field.contact.update).to.be.a('function');
      expect(api.custom_field.contact.delete).to.be.a('function');
    });

    it('should have all methods for opportunity custom fields', () => {
      expect(api.custom_field.opportunity.list).to.be.a('function');
      expect(api.custom_field.opportunity.create).to.be.a('function');
      expect(api.custom_field.opportunity.read).to.be.a('function');
      expect(api.custom_field.opportunity.update).to.be.a('function');
      expect(api.custom_field.opportunity.delete).to.be.a('function');
    });

    it('should have all methods for activity custom fields', () => {
      expect(api.custom_field.activity.list).to.be.a('function');
      expect(api.custom_field.activity.create).to.be.a('function');
      expect(api.custom_field.activity.read).to.be.a('function');
      expect(api.custom_field.activity.update).to.be.a('function');
      expect(api.custom_field.activity.delete).to.be.a('function');
    });

    it('should have all methods for custom_object_type custom fields', () => {
      expect(api.custom_field.custom_object_type.list).to.be.a('function');
      expect(api.custom_field.custom_object_type.create).to.be.a('function');
      expect(api.custom_field.custom_object_type.read).to.be.a('function');
      expect(api.custom_field.custom_object_type.update).to.be.a('function');
      expect(api.custom_field.custom_object_type.delete).to.be.a('function');
    });
  });

  describe('Status Sub-Resources', () => {
    it('should have all methods for lead status', () => {
      expect(api.status.lead.list).to.be.a('function');
      expect(api.status.lead.create).to.be.a('function');
      expect(api.status.lead.read).to.be.a('function');
      expect(api.status.lead.update).to.be.a('function');
      expect(api.status.lead.delete).to.be.a('function');
    });

    it('should have all methods for opportunity status', () => {
      expect(api.status.opportunity.list).to.be.a('function');
      expect(api.status.opportunity.create).to.be.a('function');
      expect(api.status.opportunity.read).to.be.a('function');
      expect(api.status.opportunity.update).to.be.a('function');
      expect(api.status.opportunity.delete).to.be.a('function');
    });
  });
});
