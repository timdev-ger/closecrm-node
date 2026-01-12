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
      expect(api.lead.convert).to.be.a('function');
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

    it('should throw error when converting lead without lead_id', async () => {
      try {
        await api.lead.convert({});
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).to.include('Missing required fields: lead_id');
      }
    });
  });
});