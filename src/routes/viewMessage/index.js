import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import ViewMessage from './ViewMessage';
import Layout from '../../components/Layout';
import NotFound from '../notFound/NotFound';

const title = 'ViewMessage';

export default {

  path: '/message/:threadId/:type',

  action({ store, params }) {

  	// From Redux Store
    const isAuthenticated = store.getState().runtime.isAuthenticated;

    // From URL
    const threadId = Number(params.threadId);
    const userType = params.type;

    if (!isAuthenticated) {
      return { redirect: '/login' };
    }

    if(userType != 'host' && userType != 'guest') {
      return {
        title,
        component: <Layout><NotFound title={title} /></Layout>,
        status: 404
      };
    }

    return {
      title,
      component: <UserLayout><ViewMessage threadId={threadId} userType={userType} /></UserLayout>,
    };
  },

};
