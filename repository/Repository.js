import axios from 'axios';

// const baseDomain = 'https://api.yenvoo.com/';
const baseDomain = 'http://api.spacesly.com/';

const baseURL = `${baseDomain}api/`;
let axiosObj
if (process.client) {
  axiosObj = axios.create({
    baseURL,
    headers: { 'Cache-Control': 'no-cache', 'content-type': 'application/json', 'Authorization': `Token ${localStorage.getItem('spacesly-token')}` },
  });
}
export default axiosObj;
