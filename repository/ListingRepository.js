import Repository from './Repository';

const resource = '/entities/';
export default {
  get(permalink) {
    return Repository.get(`${resource}${permalink}/`);
  },
  getAll(company_id) {
    return Repository.get(`${resource}company/${company_id}`)
  },
  getEntitySlots(company_id) {
    return Repository.get(`entity_slots/${company_id}`)
  },
  newListing(company_id, type, title, description, address, lat, lng) {
    return Repository.post(`${resource}`, {
      company_id, type, title, description, address, latitude: lat, longitude: lng
    })
  },
  getCustomFields(type_id) {
    return Repository.get(`custom_fields/entity_type/${type_id}`)
  },
  updateListing(listing) {
    return Repository.put(`${resource}${listing.permalink}/`, listing)
  },
  deleteListing(permalink) {
    return Repository.delete(`${resource}${permalink}/`)
  }
};
