import Repository from './Repository';

const resource = '/entities/';
export default {
  get(permalink) {
    return Repository.get(`${resource}${permalink}/`);
  },
  getAll(company_id) {
    return Repository.get(`${resource}company/${company_id}`)
  },
  getEntitySlots(payload) {
    return Repository.get(`entity_slots/${payload.entity_id}?dnr_rate=`+payload.selectedDate)
  },
  modifyEntitySlots(payload) {
    if(payload.dnr){
      return Repository.post(`entity_dnr/${payload.entity_id}/${payload.slot_id}?dnr_date=`+payload.selectedDate)
    }
    else{
      return Repository.delete(`delete_entity_dnr/${payload.dnr_id}`)
    }
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
