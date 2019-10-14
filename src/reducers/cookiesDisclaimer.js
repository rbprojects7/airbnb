import {
    SET_LOCALE_COOKIES_DISCLAIMER_START,
    SET_LOCALE_COOKIES_DISCLAIMER_ERROR
  } from '../constants';
  
  export default function cookiesDisclaimer(state = {}, action) {
    switch (action.type) {
  
      case SET_LOCALE_COOKIES_DISCLAIMER_START:
        return {
          ...state,
          availableCookiesDisclaimer: true,
        };
        
      case SET_LOCALE_COOKIES_DISCLAIMER_ERROR:
        return {
          ...state,
          availableCookiesDisclaimer: false,
        };

      default:
        return state;
    }
  }
  