const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Booking {
      _id: ID!
      apartment: Apartment!
      user: User!
      createdAt: String!
      updatedAt: String!
    }

    type Apartment {
      _id: ID!
      title: String!
      description: String!
      city: String!
      metroStation: String!
      numberOfRooms: Int!
      type: String!
      price: Float!
      date: String!
      creator: User!
    }
    
    type User {
      _id: ID!
      email: String!
      password: String!
      createdApartments: [Apartment!]
    }
    
    input UserInput {
      email: String!
      password: String!
    }
    
    input ApartmentInput {
      title: String!
      description: String!
      price: Float!
      date: String! 
    }
    
    input ApartmentsFilterInput {
      city: String!
      metroStation: String!
      numberOfRooms: Int!
      type: String!
      priceFrom: Float!
      priceTo: Float!
      mostExpensive: Boolean!
    }
    
    type AuthData {
      userId: ID!
      token: String!
      tokenExpiration: Int! 
    }
  
    type RootQuery {
      apartments(filter: ApartmentsFilterInput): [Apartment!]!
      bookings: [Booking!]!
      login(email: String!, password: String!): AuthData!
    }
    
    type RootMutation {
      createApartment(apartmentInput: ApartmentInput): Apartment
      createUser(userInput: UserInput): User
      bookApartment(apartmentId: ID!): Booking!
      cancelBooking(bookingId: ID!): Apartment!
    }
  
    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `);

/**
 * type Apartment {
      _id: ID!
      title: String!
      description: String!
      city: String!
      metroStation: String!
      numberOfRooms: Int!
      type: String! // room, gostinka, flat, house

      address: // lit,liq,street,house

      price: Float!
      date: String!
      creator: User!
    }



 input ApartmentsFilterInput {
      city: String!
      metroStation: String!
      numberOfRooms: Int!
      type: String!
      priceFrom: Float!
      priceTo: Float!

      ***sorting***
      fromCheap
      toCheap

    }
 */
