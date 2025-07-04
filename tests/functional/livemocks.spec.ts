import { test } from '@japa/runner'
import LiveMocks from 'App/Services/LiveMocks'
import { generateFromSchema, generateByType } from 'App/Helpers/LiveMocks'

test.group('LiveMocks Service', () => {
  test('should generate user data', async ({ assert }) => {
    const user = LiveMocks.generateUser()
    
    assert.isObject(user)
    assert.property(user, 'id')
    assert.property(user, 'firstName')
    assert.property(user, 'lastName')
    assert.property(user, 'email')
    assert.property(user, 'phone')
    assert.property(user, 'avatar')
    assert.property(user, 'address')
    assert.property(user, 'company')
    assert.property(user, 'createdAt')
    assert.property(user, 'updatedAt')
  })

  test('should generate product data', async ({ assert }) => {
    const product = LiveMocks.generateProduct()
    
    assert.isObject(product)
    assert.property(product, 'id')
    assert.property(product, 'name')
    assert.property(product, 'description')
    assert.property(product, 'price')
    assert.property(product, 'department')
    assert.property(product, 'material')
    assert.property(product, 'inStock')
    assert.property(product, 'quantity')
    assert.property(product, 'createdAt')
    assert.property(product, 'updatedAt')
  })

  test('should generate multiple items', async ({ assert }) => {
    const users = LiveMocks.generateMany(LiveMocks.generateUser, 3)
    
    assert.isArray(users)
    assert.lengthOf(users, 3)
    users.forEach(user => {
      assert.property(user, 'id')
      assert.property(user, 'firstName')
      assert.property(user, 'lastName')
    })
  })

  test('should use seeding for consistent results', async ({ assert }) => {
    LiveMocks.seed(12345)
    const user1 = LiveMocks.generateUser()
    
    LiveMocks.seed(12345)
    const user2 = LiveMocks.generateUser()
    
    assert.deepEqual(user1, user2)
    
    // Reset to random
    LiveMocks.reset()
  })

  test('should generate data by type', async ({ assert }) => {
    const firstName = generateByType('person.firstName')
    const companyName = generateByType('company.name')
    const user = generateByType('user')
    
    assert.isString(firstName)
    assert.isString(companyName)
    assert.isObject(user)
    assert.property(user, 'id')
    assert.property(user, 'firstName')
  })

  test('should generate data from schema', async ({ assert }) => {
    const schema = {
      id: 'number.uuid',
      name: 'person.fullName',
      email: 'person.email',
      company: {
        name: 'company.name',
        department: 'company.department'
      }
    }
    
    const result = generateFromSchema(schema)
    
    assert.isObject(result)
    assert.property(result, 'id')
    assert.property(result, 'name')
    assert.property(result, 'email')
    assert.property(result, 'company')
    assert.property(result.company, 'name')
    assert.property(result.company, 'department')
  })

  test('should generate multiple items from schema', async ({ assert }) => {
    const schema = {
      id: 'number.uuid',
      name: 'person.fullName'
    }
    
    const results = generateFromSchema(schema, 5)
    
    assert.isArray(results)
    assert.lengthOf(results, 5)
    results.forEach(result => {
      assert.property(result, 'id')
      assert.property(result, 'name')
    })
  })
})

test.group('LiveMocks Generators', () => {
  test('should generate person data', async ({ assert }) => {
    const firstName = LiveMocks.generators.person.firstName()
    const lastName = LiveMocks.generators.person.lastName()
    const email = LiveMocks.generators.person.email()
    
    assert.isString(firstName)
    assert.isString(lastName)
    assert.isString(email)
    assert.include(email, '@')
  })

  test('should generate company data', async ({ assert }) => {
    const companyName = LiveMocks.generators.company.name()
    const jobTitle = LiveMocks.generators.company.jobTitle()
    
    assert.isString(companyName)
    assert.isString(jobTitle)
  })

  test('should generate numbers', async ({ assert }) => {
    const int = LiveMocks.generators.number.int(1, 10)
    const float = LiveMocks.generators.number.float(1, 10)
    const uuid = LiveMocks.generators.number.uuid()
    
    assert.isNumber(int)
    assert.isNumber(float)
    assert.isString(uuid)
    assert.isAtLeast(int, 1)
    assert.isAtMost(int, 10)
  })

  test('should generate text', async ({ assert }) => {
    const sentence = LiveMocks.generators.text.sentence()
    const paragraph = LiveMocks.generators.text.paragraph()
    const words = LiveMocks.generators.text.words(3)
    
    assert.isString(sentence)
    assert.isString(paragraph)
    assert.isString(words)
  })

  test('should generate dates', async ({ assert }) => {
    const pastDate = LiveMocks.generators.date.past()
    const futureDate = LiveMocks.generators.date.future()
    
    assert.instanceOf(pastDate, Date)
    assert.instanceOf(futureDate, Date)
    assert.isBelow(pastDate.getTime(), Date.now())
    assert.isAbove(futureDate.getTime(), Date.now())
  })
})