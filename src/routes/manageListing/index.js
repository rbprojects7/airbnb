import React from 'react';
import ManageListing from './ManageListing';
import UserLayout from '../../components/Layout/UserLayout';
import { getPayoutDetails } from '../../actions/getPayoutDetails';

const title = "Manage Listing";
export default {

  path: '/experience',

  async action({ store }) {

    // From Redux Store
    let isAuthenticated = store.getState().runtime.isAuthenticated;
    store.dispatch(getPayoutDetails());

    if (!isAuthenticated) {
      return { redirect: '/login' };
    }

    return {
      title,
      component: <UserLayout><ManageListing /></UserLayout>,
    };
  },

};
