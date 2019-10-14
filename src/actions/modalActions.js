import {
  OPEN_LONGIN_MODAL,
  CLOSE_LONGIN_MODAL,
  OPEN_SIGNUP_MODAL,
  CLOSE_SIGNUP_MODAL,
  OPEN_FORGOT_PASSWORD_MODAL,
  CLOSE_FORGOT_PASSWORD_MODAL,
  OPEN_ADD_CHILD_MODAL,
  CLOSE_ADD_CHILD_MODAL,
  OPEN_SOCIAL_SHARE_MODAL,
  CLOSE_SOCIAL_SHARE_MODAL
} from '../constants';
import {toggleClose} from './Menu/toggleControl';

export function openLoginModal() {

  return (dispatch, getState) => {
    dispatch({
      type: OPEN_LONGIN_MODAL,
      isLoginModalOpen: true,
      isSignupModalOpen: false,
      isForgotPasswordOpen: false
    });
    dispatch(toggleClose());
  };

}

export function closeLoginModal() {

  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_LONGIN_MODAL,
      isLoginModalOpen: false
    });
    dispatch(toggleClose());
  };

}


export function openSignupModal() {

  return (dispatch, getState) => {
    dispatch({
      type: OPEN_SIGNUP_MODAL,
      isSignupModalOpen: true,
      isLoginModalOpen: false
    });
  };

}

export function closeSignupModal() {

  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_SIGNUP_MODAL,
      isSignupModalOpen: false
    });
  };

}

export function openForgotPasswordModal() {

  return (dispatch, getState) => {
    dispatch({
      type: OPEN_FORGOT_PASSWORD_MODAL,
      isForgotPasswordOpen: true,
      isLoginModalOpen: false
    });
  };

}

export function closeForgotPasswordModal() {

  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_FORGOT_PASSWORD_MODAL,
      isForgotPasswordOpen: false
    });
  };

}

export function openAddChildModal() {

  return (dispatch, getState) => {
    dispatch({
      type: OPEN_ADD_CHILD_MODAL,
      isAddChildModalOpen: true,
    });
  };

}

export function openSocialShareModal() {

  return (dispatch, getState) => {
    dispatch({
      type: OPEN_SOCIAL_SHARE_MODAL,
      payload: {
        isSocialShareModalOpen: true,
      }
    });
  };

}

export function closeAddChildModal() {

  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_ADD_CHILD_MODAL,
      isAddChildModalOpen: false,
    });
  };

}

export function closeSocialShareModal() {

  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_SOCIAL_SHARE_MODAL,
      payload: {
        isSocialShareModalOpen: false
      }
    });
  };

}
