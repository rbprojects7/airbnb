import {
  OPEN_LONGIN_MODAL,
  CLOSE_LONGIN_MODAL,
  OPEN_SIGNUP_MODAL,
  CLOSE_SIGNUP_MODAL,
  OPEN_FORGOT_PASSWORD_MODAL,
  CLOSE_FORGOT_PASSWORD_MODAL,
  OPEN_WISH_LIST_GROUP_MODAL,
  CLOSE_WISH_LIST_GROUP_MODAL,
  OPEN_WISH_LIST_MODAL,
  CLOSE_WISH_LIST_MODAL,
  OPEN_ADD_CHILD_MODAL,
  CLOSE_ADD_CHILD_MODAL,
  OPEN_SOCIAL_SHARE_MODAL,
  CLOSE_SOCIAL_SHARE_MODAL
} from '../constants';

export default function modalStatus(state = {}, action) {
  switch (action.type) {

    case OPEN_LONGIN_MODAL:
      return {
        ...state,
        isLoginModalOpen: action.isLoginModalOpen,
        isSignupModalOpen: action.isSignupModalOpen,
        isForgotPasswordOpen: action.isForgotPasswordOpen,
      };

    case CLOSE_LONGIN_MODAL:
      return {
        ...state,
        isLoginModalOpen: action.isLoginModalOpen
      };

    case OPEN_SIGNUP_MODAL:
      return {
        ...state,
        isSignupModalOpen: action.isSignupModalOpen,
        isLoginModalOpen: action.isLoginModalOpen,
      };

    case CLOSE_SIGNUP_MODAL:
      return {
        ...state,
        isSignupModalOpen: action.isSignupModalOpen
      };

    case OPEN_FORGOT_PASSWORD_MODAL:
      return {
        ...state,
        isForgotPasswordOpen: action.isForgotPasswordOpen,
        isLoginModalOpen: action.isLoginModalOpen,
      };

    case CLOSE_FORGOT_PASSWORD_MODAL:
      return {
        ...state,
        isForgotPasswordOpen: action.isForgotPasswordOpen
      };

    case OPEN_WISH_LIST_GROUP_MODAL:
      return {
        ...state,
        wishListGroupModalOpen: true
      };

    case CLOSE_WISH_LIST_GROUP_MODAL:
      return {
        ...state,
        wishListGroupModalOpen: false
      };

    case OPEN_WISH_LIST_MODAL:
      return {
        ...state,
        wishListModalOpen: action.payload.wishListModalOpen,
        listId: action.payload.listId
      };

    case CLOSE_WISH_LIST_MODAL:
      return {
        ...state,
        wishListModalOpen: false
      };

      case OPEN_ADD_CHILD_MODAL:
      return {
        ...state,
        addChildModalOpen: action.isAddChildModalOpen,
      };  

    case CLOSE_ADD_CHILD_MODAL: 
      return {
        ...state,
        addChildModalOpen: action.isAddChildModalOpen
      };

    case OPEN_SOCIAL_SHARE_MODAL:
      return {
        ...state,
        isSocialShareModalOpen: action.payload.isSocialShareModalOpen,
      };

    case CLOSE_SOCIAL_SHARE_MODAL:
      return {
        ...state,
        isSocialShareModalOpen: action.payload.isSocialShareModalOpen,
      };
    default:
      return {
        ...state,
      };
  }
}
