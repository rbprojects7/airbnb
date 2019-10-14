import React from 'react';
import Layout from '../../../components/Layout';
import Page from '../../../components/Page';
const title = 'Cookies';
export default {

  path: '/cookies',

  async action({ locale }) {
    const data = await new Promise((resolve) => {
      require.ensure([], (require) => {
        try {
          resolve(require(`./cookies.${locale}.md`)); // eslint-disable-line import/no-dynamic-require
        } catch (e) {
          resolve(require('./cookies.md'));
        }
      }, 'cookies');
    });

    // return {
    //   title: title,
    //   chunk: 'cookies',
    //   component: <Layout><Page {...data} /></Layout>,
    // };
    return { redirect: '/page/cookie-services.pdf' };
  },

};