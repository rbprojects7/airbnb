import React from 'react';
import Layout from '../../components/Layout';
import ViewParentReview from './ViewParentReview';
import NotFound from '../notFound/NotFound';

const title = 'View Parent Review';

export default {

  path: '/review/view/:reservationId',

  async action({ store, params, query }) {

    // From Redux Store
    const isAuthenticated = store.getState().runtime.isAuthenticated;
    const reservationId = params.reservationId;
    if (!isAuthenticated) {
      return { redirect: '/login' };
    }

    if (reservationId === undefined || isNaN(reservationId)) {
      return {
        title,
        component: <Layout><NotFound title={title} /></Layout>,
        status: 404
      };
    }

    return {
      title,
      component: <Layout><ViewParentReview reservationId={Number(reservationId)} /></Layout>,
    };
  },

};
