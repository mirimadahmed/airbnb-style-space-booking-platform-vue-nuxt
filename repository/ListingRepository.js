import Repository from './Repository';
import FileRepository from './FileRepository';

const resource = '/entities/';
const products_resource ='products/'

export default {
  get(permalink) {
    return Repository.get(`${resource}${permalink}/`);
  },
  getAll(company_id) {
    return Repository.get(`${resource}company/${company_id}`)
  },
  update_entity (payload) {
    return Repository.put(`${resource}`+payload.Entity.permalink+'/',payload);
  },
  getEntitySlots(payload) {
    return Repository.get(`entity_slots/${payload.entity_id}?date_dnr=`+payload.selectedDate)
  },
  modifyEntitySlots(payload) {
    if(payload.dnr){
      return Repository.post(`entity_dnr/${payload.entity_id}/${payload.slot_id}?dnr_date=`+payload.selectedDate)
    }
    else{
      return Repository.delete(`delete_entity_dnr/${payload.dnr_id}`)
    }
  },
  uploadEntityGalleryImages(payload) {
    const form = new FormData();
    payload.files.forEach(i=>{
      form.append('files', i);
    })
    form.append('entity_id', payload.entity_id);
    form.append('file_type', payload.file_type);
    return FileRepository.post('file_upload/', form);
  },
  createTimeSlots(timeslot) {
    return Repository.post(`${resource}/${timeslot.entity_id}/timings_conf/`, timeslot)
  },
  getLocations(coordinates) {
    return Repository.get(`https://maps.google.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&key=AIzaSyCEDDvJ8f9sb6oSid0pahWvhQlGmdxlMTM`)
  },
  changeTimeSlots(timeslot) {
    return Repository.put(`${resource}/${timeslot.entity_id}/timings_conf/`+timeslot.config_id)
  },
  newListing(new_entity) {
    return Repository.post(`${resource}`, new_entity)
  },
  getCustomFields(type_id) {
    return Repository.get(`custom_fields/entity_type/${type_id}`)
  },
  updateListing(listing) {
    return Repository.put(`${resource}${listing.Entity.permalink}/`, listing)
  },
  deleteListing(permalink) {
    return Repository.delete(`${resource}${permalink}/`)
  },
  //Pricings
  add_new_pricing (payload) {
    return Repository.post(`${products_resource}`, payload);
  },
  get_entity_pricings (entity_id) {
    return Repository.get(`${products_resource}`+entity_id);
  },
  update_pricing (payload) {
    return Repository.put(`${products_resource}`+payload.entity_id, payload);
  },
};
