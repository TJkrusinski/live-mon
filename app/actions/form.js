// @flow
export const SUBMIT_URL = 'SUBMIT_URL';
export const INVALID_URL = 'INVALID_URL';

export function submitURL(url) {
  return {
    type: SUBMIT_URL,
    url
  };
}

export function invalidURL(url, reason) {
  return {
    type: INVALID_URL,
    url: url,
    reason: reason || 'Invalid URL Provided'
  };
}
