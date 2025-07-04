import { faker } from '@faker-js/faker'

/**
 * Utility functions for working with LiveMocks and faker.js
 */

/**
 * Generate mock data based on a simple schema definition
 */
export function generateFromSchema(schema: any, count: number = 1): any {
  const generate = (schemaItem: any): any => {
    if (typeof schemaItem === 'string') {
      return generateByType(schemaItem)
    }
    
    if (Array.isArray(schemaItem)) {
      return schemaItem.map(generate)
    }
    
    if (typeof schemaItem === 'object' && schemaItem !== null) {
      const result: any = {}
      for (const [key, value] of Object.entries(schemaItem)) {
        result[key] = generate(value)
      }
      return result
    }
    
    return schemaItem
  }

  return count === 1 ? generate(schema) : Array.from({ length: count }, () => generate(schema))
}

/**
 * Generate data by type string
 */
export function generateByType(type: string): any {
  const [baseType, ...options] = type.split('.')
  
  switch (baseType) {
    case 'person':
      return handlePersonType(options)
    case 'company':
      return handleCompanyType(options)
    case 'address':
      return handleAddressType(options)
    case 'finance':
      return handleFinanceType(options)
    case 'internet':
      return handleInternetType(options)
    case 'date':
      return handleDateType(options)
    case 'text':
      return handleTextType(options)
    case 'number':
      return handleNumberType(options)
    case 'commerce':
      return handleCommerceType(options)
    case 'user':
      return generateUser()
    case 'product':
      return generateProduct()
    default:
      return faker.lorem.sentence()
  }
}

function handlePersonType(options: string[]): any {
  const subType = options[0] || 'firstName'
  switch (subType) {
    case 'firstName':
      return faker.person.firstName()
    case 'lastName':
      return faker.person.lastName()
    case 'fullName':
      return faker.person.fullName()
    case 'email':
      return faker.internet.email()
    case 'phone':
      return faker.phone.number()
    case 'avatar':
      return faker.image.avatar()
    default:
      return faker.person.firstName()
  }
}

function handleCompanyType(options: string[]): any {
  const subType = options[0] || 'name'
  switch (subType) {
    case 'name':
      return faker.company.name()
    case 'department':
      return faker.commerce.department()
    case 'jobTitle':
      return faker.person.jobTitle()
    case 'businessEmail':
      return faker.internet.email()
    default:
      return faker.company.name()
  }
}

function handleAddressType(options: string[]): any {
  const subType = options[0] || 'street'
  switch (subType) {
    case 'street':
      return faker.location.streetAddress()
    case 'city':
      return faker.location.city()
    case 'state':
      return faker.location.state()
    case 'country':
      return faker.location.country()
    case 'zipCode':
      return faker.location.zipCode()
    case 'coordinates':
      return {
        lat: faker.location.latitude(),
        lng: faker.location.longitude(),
      }
    default:
      return faker.location.streetAddress()
  }
}

function handleFinanceType(options: string[]): any {
  const subType = options[0] || 'amount'
  switch (subType) {
    case 'accountNumber':
      return faker.finance.accountNumber()
    case 'routingNumber':
      return faker.finance.routingNumber()
    case 'creditCardNumber':
      return faker.finance.creditCardNumber()
    case 'iban':
      return faker.finance.iban()
    case 'amount':
      return faker.finance.amount()
    case 'currency':
      return faker.finance.currencyCode()
    default:
      return faker.finance.amount()
  }
}

function handleInternetType(options: string[]): any {
  const subType = options[0] || 'url'
  switch (subType) {
    case 'url':
      return faker.internet.url()
    case 'domain':
      return faker.internet.domainName()
    case 'ipAddress':
      return faker.internet.ipv4()
    case 'userAgent':
      return faker.internet.userAgent()
    case 'password':
      return faker.internet.password()
    case 'username':
      return faker.internet.userName()
    default:
      return faker.internet.url()
  }
}

function handleDateType(options: string[]): any {
  const subType = options[0] || 'past'
  switch (subType) {
    case 'past':
      return faker.date.past()
    case 'future':
      return faker.date.future()
    case 'recent':
      return faker.date.recent()
    case 'birthdate':
      return faker.date.birthdate()
    default:
      return faker.date.past()
  }
}

function handleTextType(options: string[]): any {
  const subType = options[0] || 'sentence'
  switch (subType) {
    case 'sentence':
      return faker.lorem.sentence()
    case 'paragraph':
      return faker.lorem.paragraph()
    case 'sentences':
      return faker.lorem.sentences()
    case 'words':
      return faker.lorem.words()
    case 'slug':
      return faker.lorem.slug()
    default:
      return faker.lorem.sentence()
  }
}

function handleNumberType(options: string[]): any {
  const subType = options[0] || 'int'
  switch (subType) {
    case 'int':
      return faker.number.int()
    case 'float':
      return faker.number.float()
    case 'uuid':
      return faker.string.uuid()
    case 'randomId':
      return faker.string.alphanumeric(8)
    default:
      return faker.number.int()
  }
}

function handleCommerceType(options: string[]): any {
  const subType = options[0] || 'productName'
  switch (subType) {
    case 'productName':
      return faker.commerce.productName()
    case 'price':
      return faker.commerce.price()
    case 'department':
      return faker.commerce.department()
    case 'productDescription':
      return faker.commerce.productDescription()
    case 'productMaterial':
      return faker.commerce.productMaterial()
    default:
      return faker.commerce.productName()
  }
}

/**
 * Generate a complete user object
 */
export function generateUser() {
  return {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    avatar: faker.image.avatar(),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.location.country(),
      zipCode: faker.location.zipCode(),
    },
    company: {
      name: faker.company.name(),
      department: faker.commerce.department(),
      jobTitle: faker.person.jobTitle(),
    },
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }
}

/**
 * Generate a complete product object
 */
export function generateProduct() {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    department: faker.commerce.department(),
    material: faker.commerce.productMaterial(),
    inStock: faker.datatype.boolean(),
    quantity: faker.number.int({ min: 0, max: 1000 }),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }
}

/**
 * Export the faker instance
 */
export { faker }