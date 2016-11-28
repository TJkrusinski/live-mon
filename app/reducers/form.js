// @flow
import { SUBMIT_URL, INVALID_URL } from '../actions/form';

export default function counter(state: url = null, action: Object) {
  switch (action.type) {
    case SUBMIT_URL:
      return {
        url: action.url
      }
    case INVALID_URL:
      return {
        url: action.url,
        invalid: true,
        reason: action.reason
      }
    default:
      return state;
  }
}
