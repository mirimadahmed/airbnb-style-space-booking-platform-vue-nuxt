import Repository from './Repository';

const resource = '/search/';
export default {
    get(params) {
        return Repository.get(`${resource}?${params}`);
    },
};
