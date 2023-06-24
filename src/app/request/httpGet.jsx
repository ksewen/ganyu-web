import _ from 'lodash';

export default async function HttpGet(path, params, token) {
  const url = params
    ? process.env.NEXT_PUBLIC_HOST_URL +
      path +
      '?' +
      new URLSearchParams(_.pickBy(params, _.negate(_.isNil))).toString()
    : process.env.NEXT_PUBLIC_HOST_URL + path;

  const headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  if (token !== null) {
    headers.append('Authorization', 'Bearer ' + token);
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
      cache: 'no-cache',
    });
    if (!response.ok) {
      console.log('There was an error', response);
      return;
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.log('There was an error', error);
  }
}
