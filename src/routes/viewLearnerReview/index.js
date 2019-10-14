import React from 'react';
import Layout from '../../components/Layout';
import ViewLearnerReview from './ViewLearnerReview';
import NotFound from '../notFound/NotFound';

const title = 'View Learners Review';

export default {

  path: '/review/viewReflection/:reservationId?/:blockUniqueId?/:id?',
  
  async action({ store, params, query }) {

    // From Redux Store
    const isAuthenticated = store.getState().runtime.isAuthenticated;
    const reservationId = params.reservationId;
    const blockUniqueId = params.blockUniqueId;
    const formPageId = params.id;
    const formBaseURI = "/review/viewReflection";
    const writeReviewURL = '?refer=/review/viewReflection' + '/' + reservationId + '/' + blockUniqueId ;
    if (!isAuthenticated) {
      return { redirect: '/login' + writeReviewURL };
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
      component: <Layout><ViewLearnerReview reservationId={Number(reservationId)} blockUniqueId={blockUniqueId} formPageId={formPageId} formBaseURI={formBaseURI} /></Layout>,
    };
  },

};
