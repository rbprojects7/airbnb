import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import TripsContainer from './TripsContainer';

const title = 'Your Learning';

export default {

  path: '/experiences/:type',

  action({store, params}) {

  	// From Redux Store
    const isAuthenticated = store.getState().runtime.isAuthenticated;
    const type = params.type;
    if (!isAuthenticated) {
      return { redirect: '/login' };
    }

    return {
      title,
      component: <UserLayout><TripsContainer userType="guest" type={type} /></UserLayout>,
    };
  },

};
