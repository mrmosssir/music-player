import axios from 'axios'
import qs from 'qs'

const hashParams = function () {
  var params = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
  while ( e = r.exec(q)) {
     params[e[1]] = decodeURIComponent(e[2]);
  }
  return params;
}

const login = function () {

  const url = `${process.env.AUTH_BASE_URL}/authorize`;

  const id = process.env.CLIENT_ID;
  const type = 'token';
  const redirect = process.env.SITE_DOMAIN;

  const query = `client_id=${id}&response_type=${type}&redirect_uri=${redirect}`;

  // 跳轉到 Spotify 登入頁
  location.href = `${url}?${query}`;
}

const adminToken = async function () {

  const auth = btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);
  const url = `${process.env.AUTH_BASE_URL}/api/token`;
  const body = {
    grant_type: "client_credentials",
    redirect_uri: process.env.SITE_DOMAIN,
    scope: "user-read-private user-read-email"
  }
  const config = {
    method: 'POST',
    url,
    headers: { 
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : qs.stringify(body)
  };

  const { data } = await axios(config);

  if (data.error) return false;

  // cookie.set('admin_token', data.access_token, data.expires_in);

  return data.access_token;
}

export { hashParams, login, adminToken };