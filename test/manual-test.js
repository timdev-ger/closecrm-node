'use strict';

/**
 * Manual Testing Script
 * Run with: node test/manual-test.js
 * 
 * Set environment variable: CLOSE_API_KEY=your_api_key
 */

const Closecom = require('../lib/close.com');

async function runTests() {
  const apiKey = process.env.CLOSE_API_KEY;
  
  if (!apiKey) {
    console.error('❌ Error: CLOSE_API_KEY environment variable not set');
    console.log('Usage: CLOSE_API_KEY=your_key node test/manual-test.js');
    process.exit(1);
  }

  console.log('🚀 Starting Manual Tests...\n');

  const api = new Closecom(apiKey);
  let testLeadId;

  try {
    // Test 1: Get Current User
    console.log('1️⃣  Testing: api.user.me()');
    const user = await api.user.me();
    console.log('✅ Current user:', user.email);
    console.log('   Organization:', user.organizations?.[0]?.name);
    console.log();

    // Test 2: Search Leads
    console.log('2️⃣  Testing: api.lead.search()');
    const leadsResult = await api.lead.search({ limit: 5 });
    console.log('✅ Found leads:', leadsResult.data.length);
    console.log('   Has more:', leadsResult.has_more);
    if (leadsResult.data.length > 0) {
      console.log('   First lead:', leadsResult.data[0].display_name);
    }
    console.log();

    // Test 3: Create Lead
    console.log('3️⃣  Testing: api.lead.create()');
    const newLead = await api.lead.create({
      name: `Test Lead ${Date.now()}`,
      description: 'Created by manual test script',
      contacts: [{
        name: 'Test Contact',
        emails: [{ email: `test${Date.now()}@example.com`, type: 'office' }]
      }]
    });
    testLeadId = newLead.id;
    console.log('✅ Created lead:', newLead.id);
    console.log('   Name:', newLead.display_name);
    console.log();

    // Test 4: Read Lead
    console.log('4️⃣  Testing: api.lead.read()');
    const lead = await api.lead.read(testLeadId);
    console.log('✅ Read lead:', lead.id);
    console.log('   Contacts:', lead.contacts?.length || 0);
    console.log();

    // Test 5: Update Lead
    console.log('5️⃣  Testing: api.lead.update()');
    const updatedLead = await api.lead.update(testLeadId, {
      description: 'Updated by manual test script'
    });
    console.log('✅ Updated lead:', updatedLead.id);
    console.log('   Description:', updatedLead.description);
    console.log();

    // Test 6: Create Activity (Note)
    console.log('6️⃣  Testing: api.activity.note.create()');
    const note = await api.activity.note.create({
      lead_id: testLeadId,
      note: 'Test note created by manual test script'
    });
    console.log('✅ Created note:', note.id);
    console.log();

    // Test 7: Query Builder
    console.log('7️⃣  Testing: Query Builder');
    const query = api.query()
      .equals('name', newLead.name)
      .build();
    console.log('✅ Built query:', query);
    const queryResult = await api.lead.search({ query });
    console.log('   Found leads:', queryResult.data.length);
    console.log();

    // Test 8: Custom Fields
    console.log('8️⃣  Testing: api.custom_field.lead.list()');
    const customFields = await api.custom_field.lead.list();
    console.log('✅ Custom fields:', customFields.data.length);
    if (customFields.data.length > 0) {
      console.log('   First field:', customFields.data[0].name);
    }
    console.log();

    // Test 9: Pagination Helper
    console.log('9️⃣  Testing: api.paginate()');
    const allLeads = await api.paginate(
      api.lead.search.bind(api.lead),
      { limit: 10 }
    );
    console.log('✅ Paginated leads:', allLeads.length);
    console.log();

    // Test 10: Streaming
    console.log('🔟 Testing: api.stream()');
    let streamCount = 0;
    for await (const lead of api.stream(api.lead.search, { limit: 5 })) {
      streamCount++;
      if (streamCount >= 5) break;
    }
    console.log('✅ Streamed leads:', streamCount);
    console.log();

    // Test 11: Error Handling
    console.log('1️⃣1️⃣  Testing: Error Handling');
    try {
      await api.lead.read('invalid_id_12345');
    } catch (error) {
      console.log('✅ Error caught correctly');
      console.log('   Status:', error.status);
      console.log('   Hint:', error.hint);
    }
    console.log();

    // Test 12: Validation
    console.log('1️⃣2️⃣  Testing: Input Validation');
    try {
      await api.lead.create({});
    } catch (error) {
      console.log('✅ Validation works:', error.message);
    }
    console.log();

    // Cleanup: Delete Test Lead
    console.log('🧹 Cleanup: Deleting test lead');
    await api.lead.delete(testLeadId);
    console.log('✅ Test lead deleted');
    console.log();

    console.log('✅ All manual tests passed!\n');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('   Status:', error.status);
    console.error('   Hint:', error.hint);
    console.error('   Stack:', error.stack);
    
    // Cleanup on error
    if (testLeadId) {
      try {
        await api.lead.delete(testLeadId);
        console.log('🧹 Cleaned up test lead');
      } catch (cleanupError) {
        console.error('Failed to cleanup:', cleanupError.message);
      }
    }
    
    process.exit(1);
  }
}

runTests();