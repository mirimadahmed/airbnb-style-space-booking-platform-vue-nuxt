import Repository from './Repository';

const resource = '/subscription/';
export default {
    post(email) {
        let obj = {
            email: email
        };
        return Repository.post(`${resource}`, obj);
    },
};
