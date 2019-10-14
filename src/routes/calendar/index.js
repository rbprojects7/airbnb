import React from 'react';
import Layout from '../../components/Layout';
import Calendar from './Calendar';

const title = 'Calendar';

export default {

    path: '/calendar',

    action() {
        return {
            title,
            component: <Layout><Calendar title={title} /></Layout>,
        };
    },

};
