const Apartment = require('../../models/apartment');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');

const apartments = async apartmentId => {
  try {
    const apartments = await Apartment.find({ _id: {$in: apartmentId}});
    return apartments.map(apartment => {
      return transformApartment(apartment);
    });
  } catch (err) {
    throw err;
  }
};

const singleApartment = async apartmentId => {
  try{
    const apartment = await Apartment.findById(apartmentId);
    return transformApartment(apartment);
  }catch (err) {
    throw err;
  }
};

const user = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdApartments: apartments.bind(this, user._doc.createdApartments)
    }
  } catch (err) {
    throw err;
  }
};

const transformApartment = apartment => {
  return {
    ...apartment._doc,
    _id: apartment.id,
    date: dateToString(apartment._doc.date),
    creator: user.bind(this, apartment.creator)
  };
};

const transformBooking = booking => {
  return {
    ...booking._doc,
    _id: booking.id,
    user: user.bind(this, booking._doc.user),
    event: singleApartment.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt)
  }
};

exports.user = user;
exports.apartments = apartments;
exports.singleApartment = singleApartment;
exports.transformApartment = transformApartment;
exports.transformBooking = transformBooking;
