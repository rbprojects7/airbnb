import React from 'react';
import Layout from '../../../components/Layout';
import Page from '../../../components/Page';
const title = 'Terms';
export default {

  path: '/terms',

  async action({ locale }) {
    const data = await new Promise((resolve) => {
      require.ensure([], (require) => {
        try {
          resolve(require(`./terms.${locale}.md`)); // eslint-disable-line import/no-dynamic-require
        } catch (e) {
          resolve(require('./terms.md'));
        }
      }, 'terms');
    });

    // return {
    //   title: title,
    //   chunk: 'terms',
    //   component: <Layout><Page {...data} /></Layout>,
    // };
    return { redirect: '/page/terms-services.pdf' };
  },

};