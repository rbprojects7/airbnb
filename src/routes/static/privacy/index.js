import React from 'react';
import Layout from '../../../components/Layout';
import Page from '../../../components/Page';
const title = 'Privacy';
export default {

  path: '/privacy',

  async action({ locale }) {
    const data = await new Promise((resolve) => {
      require.ensure([], (require) => {
        try {
          resolve(require(`./privacy.${locale}.md`)); // eslint-disable-line import/no-dynamic-require
        } catch (e) {
          resolve(require('./privacy.md'));
        }
      }, 'privacy');
    });

    // return {
    //   title: title,
    //   chunk: 'privacy',
    //   component: <Layout><Page {...data} /></Layout>,
    // };
    return { redirect: '/page/privacy-services.pdf' };
  },

};