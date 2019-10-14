import React from 'react';
import Layout from '../../components/Layout';
import Profile from './Profile';
import NotFound from '../notFound/NotFound';

import fetch from '../../core/fetch';

const title = 'User Profile';

export default {

  path: '/users/show/:profileId?',

  async action({params, store}) {
    const data = store.getState().account.data;
    const profileId = params.profileId;
    let profile = 0;
    let isUser = false;
    if(profileId === null || profileId === undefined) {
      if(data) {
        isUser = true;
      }
    } else {
      profile = Number(profileId);
    }

    console.log('profile', profile);
    
    return {
      title,
      component: <Layout><Profile title={title} isUser={isUser} profileId={profile} /></Layout>,
    };
  },

};
