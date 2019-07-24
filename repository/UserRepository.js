import Repository from './Repository';

export default {
  login(request) {
    return Repository.post('/company_login/', request);
  },
  register(request) {
    return Repository.post('/company_signup/', request)
  }
};
