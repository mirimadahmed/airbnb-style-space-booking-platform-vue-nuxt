import Repository from './Repository';

export default {
  login(request) {
    return Repository.post('/login', request);
  },
  register(request) {
    return Repository.post('signup', request)
  }
};
