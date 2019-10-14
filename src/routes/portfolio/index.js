import React from 'react';
import Layout from '../../components/Layout';
import Portfolio from './Portfolio';

const title = 'Portfolio';

export default {

    path: '/portfolio',

    action() {
        return {
            title,
            component: <Layout><Portfolio title={title} /></Layout>,
        };
    },

};
