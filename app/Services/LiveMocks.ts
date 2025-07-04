import { faker } from '@faker-js/faker'

/**
 * LiveMocks service provides faker.js functionality for generating
 * realistic mock data in API responses.
 */
export default class LiveMocks {
  /**
   * Get the faker instance for direct access
   */
  public static get faker() {
    return faker
  }

  /**
   * Generate common mock data types
   */
  public static generators = {
    // Personal information
    person: {
      firstName: () => faker.person.firstName(),
      lastName: () => faker.person.lastName(),
      fullName: () => faker.person.fullName(),
      email: () => faker.internet.email(),
      phone: () => faker.phone.number(),
      avatar: () => faker.image.avatar(),
    },

    // Business data
    company: {
      name: () => faker.company.name(),
      department: () => faker.commerce.department(),
      jobTitle: () => faker.person.jobTitle(),
      businessEmail: () => faker.internet.email(),
    },

    // Address information
    address: {
      street: () => faker.location.streetAddress(),
      city: () => faker.location.city(),
      state: () => faker.location.state(),
      country: () => faker.location.country(),
      zipCode: () => faker.location.zipCode(),
      coordinates: () => ({
        lat: faker.location.latitude(),
        lng: faker.location.longitude(),
      }),
    },

    // Financial data
    finance: {
      accountNumber: () => faker.finance.accountNumber(),
      routingNumber: () => faker.finance.routingNumber(),
      creditCardNumber: () => faker.finance.creditCardNumber(),
      iban: () => faker.finance.iban(),
      amount: (min = 0, max = 1000) => faker.finance.amount({ min, max }),
      currency: () => faker.finance.currencyCode(),
    },

    // Internet and tech
    internet: {
      url: () => faker.internet.url(),
      domain: () => faker.internet.domainName(),
      ipAddress: () => faker.internet.ipv4(),
      userAgent: () => faker.internet.userAgent(),
      password: () => faker.internet.password(),
      username: () => faker.internet.userName(),
    },

    // Date and time
    date: {
      past: () => faker.date.past(),
      future: () => faker.date.future(),
      between: (from: string | Date, to: string | Date) => faker.date.between({ from, to }),
      recent: () => faker.date.recent(),
      birthdate: () => faker.date.birthdate(),
    },

    // Text and content
    text: {
      sentence: () => faker.lorem.sentence(),
      paragraph: () => faker.lorem.paragraph(),
      sentences: (count = 3) => faker.lorem.sentences(count),
      words: (count = 5) => faker.lorem.words(count),
      slug: () => faker.lorem.slug(),
    },

    // Numbers and IDs
    number: {
      int: (min = 0, max = 100) => faker.number.int({ min, max }),
      float: (min = 0, max = 100) => faker.number.float({ min, max }),
      uuid: () => faker.string.uuid(),
      randomId: () => faker.string.alphanumeric(8),
    },

    // Commerce
    commerce: {
      productName: () => faker.commerce.productName(),
      price: () => faker.commerce.price(),
      department: () => faker.commerce.department(),
      productDescription: () => faker.commerce.productDescription(),
      productMaterial: () => faker.commerce.productMaterial(),
    },

    // Arrays and collections
    array: {
      shuffle: <T>(array: T[]) => faker.helpers.shuffle(array),
      arrayElement: <T>(array: T[]) => faker.helpers.arrayElement(array),
      arrayElements: <T>(array: T[], count?: number) => faker.helpers.arrayElements(array, count),
      multiple: <T>(generator: () => T, count = 3) => Array.from({ length: count }, generator),
    },
  }

  /**
   * Generate a complete user object
   */
  public static generateUser() {
    return {
      id: this.generators.number.uuid(),
      firstName: this.generators.person.firstName(),
      lastName: this.generators.person.lastName(),
      email: this.generators.person.email(),
      phone: this.generators.person.phone(),
      avatar: this.generators.person.avatar(),
      address: {
        street: this.generators.address.street(),
        city: this.generators.address.city(),
        state: this.generators.address.state(),
        country: this.generators.address.country(),
        zipCode: this.generators.address.zipCode(),
      },
      company: {
        name: this.generators.company.name(),
        department: this.generators.company.department(),
        jobTitle: this.generators.company.jobTitle(),
      },
      createdAt: this.generators.date.past(),
      updatedAt: this.generators.date.recent(),
    }
  }

  /**
   * Generate a complete product object
   */
  public static generateProduct() {
    return {
      id: this.generators.number.uuid(),
      name: this.generators.commerce.productName(),
      description: this.generators.commerce.productDescription(),
      price: this.generators.commerce.price(),
      department: this.generators.commerce.department(),
      material: this.generators.commerce.productMaterial(),
      inStock: faker.datatype.boolean(),
      quantity: this.generators.number.int(0, 1000),
      createdAt: this.generators.date.past(),
      updatedAt: this.generators.date.recent(),
    }
  }

  /**
   * Generate multiple items using a generator function
   */
  public static generateMany<T>(generator: () => T, count: number = 5): T[] {
    return Array.from({ length: count }, generator)
  }

  /**
   * Seed the faker instance for consistent results
   */
  public static seed(seed?: number) {
    if (seed !== undefined) {
      faker.seed(seed)
    }
  }

  /**
   * Reset faker to use random seed
   */
  public static reset() {
    faker.seed()
  }
}