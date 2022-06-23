import axios from "axios";

const info = async function (token) {
  const url = `${process.env.API_BASE_URL}/me`;
  const config = {
    method: 'GET',
    url,
    headers: { 
      'Authorization': `Bearer ${token}`,
      // 'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  const { data } = await axios(config);
  return data;
}

export { info };