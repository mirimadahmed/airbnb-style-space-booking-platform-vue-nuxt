import Repository from './Repository';

const resource = '/entities/';
export default {
    get(permalink) {
        return Repository.get(`${resource}${permalink}/`);
    },
};
