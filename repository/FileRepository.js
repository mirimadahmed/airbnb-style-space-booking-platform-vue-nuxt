import axios from 'axios';

const baseDomain = 'https://api.yenvoo.com/';
const baseURL = `${baseDomain}api/`;
let axiosObj
if (process.client) {
  axiosObj = axios.create({
    baseURL,
    headers: { 'Cache-Control': 'no-cache', 'Content-Type': 'multipart/form-data', 'Authorization': `Token ${localStorage.getItem('spacesly-token')}` },
  });
}
export default axiosObj;
