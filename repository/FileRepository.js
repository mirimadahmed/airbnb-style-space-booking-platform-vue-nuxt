import axios from 'axios';

// const baseDomain = 'http://10.0.11.134:8000/';

// const baseDomain = 'https://api.yenvoo.com/';
const baseDomain = 'https://api.spacesly.com/';

const baseURL = `${baseDomain}api/`;
let axiosObj
let headersObj = { 'Cache-Control': 'no-cache', 'Content-Type': 'multipart/form-data' };
if (process.client) {
  if (localStorage.getItem('spacesly-token') !== null) {
    let auth = `Token ${localStorage.getItem('spacesly-token')}`;
    headersObj['Authorization'] = auth;
  }
  axiosObj = axios.create({
    baseURL,
    headers: headersObj,
  });
}
export default axiosObj;
