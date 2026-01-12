'use strict';

const { expect } = require('chai');
const Closecom = require('../lib/close.com');

// Note: These tests require a valid API key or mock server
// Set CLOSE_API_KEY environment variable to run against real API
// Or use a mock server for testing

describe('Integration Tests', () => {
  let api;
  const apiKey = process.env.CLOSE_API_KEY || 'test_key';
  const isLiveTest = !!process.env.CLOSE_API_KEY;

  before(function() {
    if (!isLiveTest) {
      this.skip(); // Skip integration tests if no API key provided
    }
    api = new Closecom(apiKey);
  });

  describe('Lead Operations', () => {
    let testLeadId;

    it('should search leads', async function() {
      this.timeout(5000);
      const result = await api.lead.search({ limit: 10 });
      expect(result).to.have.property('data');
      expect(result.data).to.be.an('array');
    });

    it('should create a lead', async function() {
      this.timeout(5000);
      const lead = await api.lead.create({
        name: 'Test Lead ' + Date.now()
      });
      expect(lead).to.have.property('id');
      expect(lead).to.have.property('name');
      testLeadId = lead.id;
    });

    it('should read a lead', async function() {
      this.timeout(5000);
      if (!testLeadId) this.skip();
      
      const lead = await api.lead.read(testLeadId);
      expect(lead.id).to.equal(testLeadId);
    });

    it('should update a lead', async function() {
      this.timeout(5000);
      if (!testLeadId) this.skip();
      
      const updated = await api.lead.update(testLeadId, {
        description: 'Updated description'
      });
      expect(updated.description).to.equal('Updated description');
    });

    it('should delete a lead', async function() {
      this.timeout(5000);
      if (!testLeadId) this.skip();
      
      await api.lead.delete(testLeadId);
      // Verify deletion by trying to read (should fail)
      try {
        await api.lead.read(testLeadId);
        expect.fail('Lead should have been deleted');
      } catch (error) {
        expect(error.status).to.equal(404);
      }
    });
  });

  describe('User Operations', () => {
    it('should get current user', async function() {
      this.timeout(5000);
      const user = await api.user.me();
      expect(user).to.have.property('id');
      expect(user).to.have.property('email');
    });

    it('should list users', async function() {
      this.timeout(5000);
      const result = await api.user.list();
      expect(result).to.have.property('data');
      expect(result.data).to.be.an('array');
    });
  });

  describe('Query Builder Integration', () => {
    it('should search leads with query builder', async function() {
      this.timeout(5000);
      const query = api.query()
        .equals('status', 'Potential')
        .build();
      
      const result = await api.lead.search({ query });
      expect(result).to.have.property('data');
    });
  });

  describe('Pagination', () => {
    it('should paginate through all leads', async function() {
      this.timeout(10000);
      const allLeads = await api.paginate(
        api.lead.search.bind(api.lead),
        { limit: 10 }
      );
      expect(allLeads).to.be.an('array');
    });
  });

  describe('Streaming', () => {
    it('should stream leads', async function() {
      this.timeout(10000);
      let count = 0;
      for await (const lead of api.stream(api.lead.search, { limit: 5 })) {
        expect(lead).to.have.property('id');
        count++;
        if (count >= 5) break; // Limit test iterations
      }
      expect(count).to.be.at.least(1);
    });
  });
});