import Repository from './Repository';

const resource = '/system_lists/';
export default {
    get() {
        return Repository.get(`${resource}`);
    },
};
