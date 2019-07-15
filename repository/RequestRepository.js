import Repository from './Repository';

const resource = '/requests/';
export default {
    post(request) {
        return Repository.post(`${resource}`, request);
    },
};
