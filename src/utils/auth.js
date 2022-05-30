import axios from 'axios'
import qs from 'qs'

import cookie from '@/utils/cookie';

const login = function () {

  const url = `${process.env.AUTH_BASE_URL}/authorize`;

  const id = process.env.CLIENT_ID;
  const type = 'code';
  const redirect = process.env.SITE_DOMAIN;

  const query = `client_id=${id}&response_type=${type}&redirect_uri=${redirect}`;
  
  // 將狀態設定為 1: 處理中
  cookie.set('status', 1, 10);

  // 跳轉到 Spotify 登入頁
  location.href = `${url}?${query}`;
}

const code = function () {

  // 創建 URL 的實例
  const url = new URL(location.href);

  // 如果登入已在處理中 (url query 有 code) 就回傳
  if (!url.searchParams.has('code')) return '';
  else return url.searchParams.get('code');
}

const token = async function () {

  // 先看 url 有沒有 code
  const code = this.code();
  if (!code) return false;

  const auth = btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);
  const url = `${process.env.AUTH_BASE_URL}/api/token`;

  const config = {
    method: 'POST',
    url,
    headers: { 
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : qs.stringify({ grant_type: 'client_credentials', code, redirect_uri: process.env.SITE_DOMAIN })
  };

  const { data } = await axios(config);

  if (data.error) return false;

  cookie.set('token', data.access_token, data.expires_in);
  cookie.set('status', '2', 86400);

  return data.access_token;
}

const auth = { login, code, token };

export default auth;