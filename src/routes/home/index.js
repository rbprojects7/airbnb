import React from 'react';
import Home from './Home';
import fetch from '../../core/fetch';
import HomeLayout from '../../components/Layout/HomeLayout';
import {url, homePageMetaImage} from '../../config.js';
export default {

  path: '/',

  async action({store}) {
    const title = store.getState().siteSettings.data.siteTitle;
    //const description = store.getState().siteSettings.data.metaDescription;
    const description ='A peer to peer platform that provides a revolutionary alternative to school. Find inspiring mentors and learning experiences in your area. Keep a lifetime of records in one place.';
    const homeImage = url +  '/' + homePageMetaImage;
    return {
      title,
      description,
      image: homeImage || '',
      chunk: 'home',
      component: <HomeLayout><Home /></HomeLayout>,
    };
  },

};
