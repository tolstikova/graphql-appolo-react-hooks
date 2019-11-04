const authResolver = require('./auth');
const apartmentsResolver = require('./apartment');
const bookingResolver = require('./bookings');


const rootResolver = {
  ...authResolver,
  ...bookingResolver,
  ...apartmentsResolver
};

module.exports = rootResolver;
