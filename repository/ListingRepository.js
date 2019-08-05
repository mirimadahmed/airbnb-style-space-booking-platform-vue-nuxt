import Repository from './Repository';
import FileRepository from './FileRepository';

const resource = '/entities/';
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
  }
};
