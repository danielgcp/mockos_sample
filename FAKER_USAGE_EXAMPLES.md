# Faker.js Support in Response Processors

This document demonstrates how to use Faker.js in user-created dynamic response processors.

## Available in Processor Globals

The `faker` object is now available in all processor code alongside the existing globals:

- `queryParams` - Query string parameters
- `url` - Request URL
- `params` - Route parameters
- `body` - Request body
- `headers` - Request headers
- `content` - Original response body
- `faker` - **NEW** - Faker.js instance for generating fake data

## Usage Examples

### Basic Data Generation

```javascript
return JSON.stringify({
  id: faker.number.int(),
  name: faker.person.firstName(),
  email: faker.internet.email(),
  createdAt: faker.date.recent()
})
```

### Full User Profile

```javascript
return JSON.stringify({
  id: faker.number.int({ min: 1, max: 1000 }),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  avatar: faker.internet.avatar(),
  phone: faker.phone.number(),
  address: {
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    country: faker.location.country(),
    zipCode: faker.location.zipCode()
  },
  company: faker.company.name(),
  jobTitle: faker.person.jobTitle(),
  isActive: faker.datatype.boolean(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent()
})
```

### Dynamic Arrays

```javascript
const users = []
for (let i = 0; i < 5; i++) {
  users.push({
    id: faker.number.int(),
    name: faker.person.fullName(),
    email: faker.internet.email()
  })
}

return JSON.stringify({
  users: users,
  total: users.length,
  page: parseInt(queryParams.page) || 1
})
```

### Using Request Parameters

```javascript
const itemId = params.id || faker.string.uuid()
const itemName = queryParams.name || faker.commerce.productName()

return JSON.stringify({
  id: itemId,
  name: itemName,
  price: faker.commerce.price(),
  description: faker.commerce.productDescription(),
  category: faker.commerce.department(),
  inStock: faker.datatype.boolean(),
  sku: faker.string.alphanumeric(10).toUpperCase()
})
```

### Conditional Logic

```javascript
const userType = queryParams.type || 'regular'

let userData = {
  id: faker.number.int(),
  name: faker.person.fullName(),
  email: faker.internet.email()
}

if (userType === 'admin') {
  userData.permissions = ['read', 'write', 'delete']
  userData.lastLogin = faker.date.recent()
} else {
  userData.permissions = ['read']
  userData.subscriptionType = faker.helpers.arrayElement(['free', 'premium'])
}

return JSON.stringify(userData)
```

## Available Faker.js Methods

Some commonly used methods include:

- `faker.number.int()` - Random integer
- `faker.person.firstName()` - Random first name
- `faker.person.lastName()` - Random last name
- `faker.person.fullName()` - Random full name
- `faker.internet.email()` - Random email
- `faker.internet.url()` - Random URL
- `faker.string.uuid()` - Random UUID
- `faker.datatype.boolean()` - Random boolean
- `faker.date.recent()` - Recent date
- `faker.date.past()` - Past date
- `faker.commerce.productName()` - Random product name
- `faker.commerce.price()` - Random price
- `faker.location.city()` - Random city name
- `faker.helpers.arrayElement(array)` - Random element from array

For a complete list, visit the [Faker.js documentation](https://fakerjs.dev/).

## Error Handling

If your processor code uses invalid Faker.js methods, the system will return a 400 error with details:

```javascript
// This will cause an error:
return JSON.stringify({
  invalid: faker.nonExistentMethod()
})
```

Error response:
```json
{
  "message": "The preprocessor code crashed: faker.nonExistentMethod is not a function"
}
```

## Implementation Notes

- Faker.js is imported automatically - no need to import it in your processor code
- The same faker instance is used across all processors in the same request
- Each request gets fresh random data
- All existing processor globals remain available
- Error handling preserves the existing behavior for processor crashes