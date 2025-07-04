# LiveMocks - Faker.js Integration

LiveMocks provides powerful faker.js integration for generating realistic mock data in your API responses. This guide shows you how to use faker.js within your mock responses.

## Overview

The LiveMocks service is automatically available in your mock response processors through the sandbox environment. You can use it to generate realistic test data for your API endpoints.

## Available in Sandbox

When writing JavaScript code for your mock responses, you have access to:

- `liveMocks` - The complete LiveMocks service
- `faker` - Direct access to the faker.js instance
- `generateFromSchema(schema, count)` - Generate data from a schema
- `generateByType(type)` - Generate data by type string

## Quick Examples

### Basic Usage

```javascript
// Generate a single user
const user = liveMocks.generateUser()

// Generate multiple users
const users = liveMocks.generateMany(liveMocks.generateUser, 5)

// Generate a product
const product = liveMocks.generateProduct()

// Direct faker access
const email = faker.internet.email()
const name = faker.person.fullName()
```

### Using Generators

```javascript
// Person data
const firstName = liveMocks.generators.person.firstName()
const lastName = liveMocks.generators.person.lastName()
const email = liveMocks.generators.person.email()

// Company data
const companyName = liveMocks.generators.company.name()
const jobTitle = liveMocks.generators.company.jobTitle()

// Address data
const address = {
  street: liveMocks.generators.address.street(),
  city: liveMocks.generators.address.city(),
  state: liveMocks.generators.address.state(),
  country: liveMocks.generators.address.country()
}

// Financial data
const accountNumber = liveMocks.generators.finance.accountNumber()
const amount = liveMocks.generators.finance.amount(100, 1000)
```

### Using Type Strings

```javascript
// Simple type generation
const firstName = generateByType('person.firstName')
const companyName = generateByType('company.name')
const streetAddress = generateByType('address.street')

// Generate complete objects
const user = generateByType('user')
const product = generateByType('product')
```

### Schema-Based Generation

```javascript
// Define a schema
const userSchema = {
  id: 'number.uuid',
  name: 'person.fullName',
  email: 'person.email',
  company: {
    name: 'company.name',
    department: 'company.department'
  },
  address: {
    street: 'address.street',
    city: 'address.city',
    country: 'address.country'
  }
}

// Generate single user
const user = generateFromSchema(userSchema)

// Generate multiple users
const users = generateFromSchema(userSchema, 10)
```

## Complete Example Response

Here's a complete example of a mock response that returns a list of users:

```javascript
// Available in your mock processor code
const userCount = queryParams.count || 5

const users = liveMocks.generateMany(() => ({
  id: liveMocks.generators.number.uuid(),
  firstName: liveMocks.generators.person.firstName(),
  lastName: liveMocks.generators.person.lastName(),
  email: liveMocks.generators.person.email(),
  avatar: liveMocks.generators.person.avatar(),
  company: {
    name: liveMocks.generators.company.name(),
    department: liveMocks.generators.company.department(),
    jobTitle: liveMocks.generators.company.jobTitle()
  },
  address: {
    street: liveMocks.generators.address.street(),
    city: liveMocks.generators.address.city(),
    state: liveMocks.generators.address.state(),
    country: liveMocks.generators.address.country(),
    zipCode: liveMocks.generators.address.zipCode()
  },
  createdAt: liveMocks.generators.date.past(),
  updatedAt: liveMocks.generators.date.recent()
}), userCount)

// Return the response
JSON.stringify({
  data: users,
  total: users.length,
  page: 1,
  per_page: userCount
})
```

## Advanced Usage

### Seeding for Consistent Data

```javascript
// Seed for consistent results
liveMocks.seed(12345)

// Generate data (will be the same each time with same seed)
const user = liveMocks.generateUser()

// Reset to random
liveMocks.reset()
```

### Using with Request Data

```javascript
// Use request parameters to influence generation
const userId = params.id || liveMocks.generators.number.uuid()
const userName = queryParams.name || liveMocks.generators.person.fullName()

// Generate user with specific data
const user = {
  id: userId,
  name: userName,
  email: liveMocks.generators.person.email(),
  // ... other fields
}
```

### Dynamic Arrays

```javascript
// Generate arrays of different sizes
const productCount = Math.floor(Math.random() * 10) + 1
const products = liveMocks.generateMany(liveMocks.generateProduct, productCount)

// Shuffle existing arrays
const categories = ['Electronics', 'Books', 'Clothing', 'Sports']
const randomCategory = liveMocks.generators.array.arrayElement(categories)
```

## Available Generator Categories

### Person
- `firstName()` - Generate first name
- `lastName()` - Generate last name
- `fullName()` - Generate full name
- `email()` - Generate email address
- `phone()` - Generate phone number
- `avatar()` - Generate avatar URL

### Company
- `name()` - Generate company name
- `department()` - Generate department name
- `jobTitle()` - Generate job title
- `businessEmail()` - Generate business email

### Address
- `street()` - Generate street address
- `city()` - Generate city name
- `state()` - Generate state name
- `country()` - Generate country name
- `zipCode()` - Generate ZIP code
- `coordinates()` - Generate lat/lng coordinates

### Finance
- `accountNumber()` - Generate account number
- `routingNumber()` - Generate routing number
- `creditCardNumber()` - Generate credit card number
- `iban()` - Generate IBAN
- `amount(min, max)` - Generate monetary amount
- `currency()` - Generate currency code

### Internet
- `url()` - Generate URL
- `domain()` - Generate domain name
- `ipAddress()` - Generate IP address
- `userAgent()` - Generate user agent string
- `password()` - Generate password
- `username()` - Generate username

### Date
- `past()` - Generate past date
- `future()` - Generate future date
- `between(from, to)` - Generate date between two dates
- `recent()` - Generate recent date
- `birthdate()` - Generate birthdate

### Text
- `sentence()` - Generate sentence
- `paragraph()` - Generate paragraph
- `sentences(count)` - Generate multiple sentences
- `words(count)` - Generate multiple words
- `slug()` - Generate URL slug

### Numbers
- `int(min, max)` - Generate integer
- `float(min, max)` - Generate float
- `uuid()` - Generate UUID
- `randomId()` - Generate random ID

### Commerce
- `productName()` - Generate product name
- `price()` - Generate price
- `department()` - Generate department
- `productDescription()` - Generate product description
- `productMaterial()` - Generate product material

### Arrays
- `shuffle(array)` - Shuffle array
- `arrayElement(array)` - Pick random element
- `arrayElements(array, count)` - Pick multiple elements
- `multiple(generator, count)` - Generate multiple items

## Best Practices

1. **Use appropriate data types** - Choose generators that match your API's data structure
2. **Seed for consistency** - Use seeding when you need repeatable results
3. **Combine with request data** - Use query parameters and path parameters to influence generation
4. **Validate generated data** - Ensure generated data meets your API's validation rules
5. **Consider performance** - Don't generate excessive amounts of data in a single request

## Error Handling

If there's an error in your LiveMocks code, the sandbox will catch it and return a 400 error with details about what went wrong.

```javascript
try {
  const user = liveMocks.generateUser()
  return JSON.stringify(user)
} catch (error) {
  // This will be caught by the sandbox
  return JSON.stringify({ error: 'Failed to generate user data' })
}
```

This integration makes it easy to create realistic, dynamic mock data for your API endpoints while maintaining the flexibility to customize the data based on request parameters.