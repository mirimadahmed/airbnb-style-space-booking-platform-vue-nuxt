import axios from 'axios';

const baseDomain = 'https://api.yenvoo.com/';
const baseURL = `${baseDomain}api/`;

export default axios.create({
    baseURL,
    headers: { 'Cache-Control': 'no-cache', 'content-type': 'application/json' },
});
