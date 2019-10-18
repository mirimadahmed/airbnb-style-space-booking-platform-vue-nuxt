import axios from 'axios';

// const baseDomain = 'http://10.0.11.134:8000/';
const baseDomain = 'https://api.yenvoo.com/';
// const baseDomain = 'https://api.spacesly.com/';

const baseURL = `${baseDomain}api/`;
let axiosObj
if (process.client) {
  axiosObj = axios.create({
    baseURL,
    headers: { 'Cache-Control': 'no-cache', 'content-type': 'application/json', 'Authorization': `Token ${localStorage.getItem('spacesly-token')}` },
  });
}
export default axiosObj;
