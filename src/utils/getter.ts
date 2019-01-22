import { Location } from '../types';

export const getAddress = (location: Location) => ({
  city: location.city,
  phone: location.phone,
  state: location.state,
  street: location.street,
  zipCode: location.zipCode
})