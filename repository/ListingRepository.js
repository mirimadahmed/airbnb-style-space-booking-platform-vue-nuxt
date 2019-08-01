import Repository from './Repository';

const resource = '/entities/';
export default {
  get(permalink) {
    return Repository.get(`${resource}${permalink}/`);
  },
  getAll(company_id) {
    return Repository.get(`${resource}company/${company_id}`)
  },
  uploadEntityGalleryImages(payload) {
    const form = new FormData();
    payload.files.map(i=>{
      form.append('files', i); 
    })
    form.append('entity_id', payload.entity_id);
    form.append('file_type', payload.file_type);
    return Repository.post('file_upload/', form);
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
