import { combineReducers } from 'redux';

// Internal Reducers
import user from './user';
import runtime from './runtime';
import intl from './intl';
import content from './content';
import account from './account';
import siteSettings from './siteSettings';
import location from './listYourSpace';
import modalStatus from './modalReducer';
import listingFields from './listingFields';
import viewListing from './viewListing';
import currency from './currency';
import search from './search';
import toggle from './toggle';
import personalized from './personalized';
import mobileSearch from './mobileSearch';
import book from './book';
import reservation from './reservation';
import loader from './loader';
import calendar from './calendar';
import children from './children';
import blocks from './blocks';
import sticky from './stickyReducers';
import updateTime from './updateTime';
import listingAddress from './listingAddress';

// Site Admin
import userManagement from './siteadmin/users';
import listSettings from './siteadmin/listSettings';
import adminModalStatus from './siteadmin/adminModalReducer';
import adminListSettingsData from './siteadmin/adminListSettingsData';

// External Reducers
import { reducer as formReducer } from 'redux-form';
import {reducer as toastrReducer} from 'react-redux-toastr';
import {loadingBarReducer} from 'react-redux-loading-bar';

//Cancellation policies
import cancellationPolicies from './cancellationPolicies';
import cookiesDisclaimer from './cookiesDisclaimer';
import payout from './payout';

export default function createRootReducer({ apolloClient }) {
  return combineReducers({
    apollo: apolloClient.reducer(),
    //loadingBar: loadingBarReducer,
    user,
    runtime,
    intl,
    siteSettings,
    form: formReducer,
    content,
    account,
    userManagement,
    toastr: toastrReducer,
    location,
    children,
    modalStatus,
    listSettings,
    adminModalStatus,
    listingFields,
    adminListSettingsData,
    viewListing,
    currency,
    search,
    toggle,
    personalized,
    mobileSearch,
    book,
    reservation,
    loader,
    calendar,
    blocks,
    sticky,
    updateTime,
    cancellationPolicies,
    payout,
    listingAddress
  });
}


