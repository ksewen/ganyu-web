import axios from 'axios';
import _ from 'lodash';

const BASE_URL = process.env.NEXT_PUBLIC_HOST_URL;

export default axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

export const formatUrl = (urlStr, params) =>
  urlStr +
  '?' +
  new URLSearchParams(_.pickBy(params, _.negate(_.isNil))).toString();
