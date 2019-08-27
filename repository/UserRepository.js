import Repository from './Repository';
const company_profile_resource = 'companies/';

export default {
  login(request) {
    return Repository.post('/company_login/', request);
  },
  register(request) {
    return Repository.post('/company_signup/', request)
  },
  getCompanyProfile (permalink) {
    return Repository.get(`${company_profile_resource}`+permalink);
  },
  updateVendorProfile (payload) {
    const form = new FormData()
    form.append('logo_image', payload.logo_image)
    form.append('address', payload.address)
    form.append('phone_no', payload.phone_no)
      return Repository.put(`${company_profile_resource}`+payload.permalink, form);
    }
};
