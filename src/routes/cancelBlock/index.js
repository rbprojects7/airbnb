import React from 'react';
import Layout from '../../components/Layout';
import CancelBlock from './CancelBlock';
import NotFound from '../notFound/NotFound';

const title = 'Cancel';

export default {

    path: '/cancel-blocks/:listId',

    action({ store, params }) {

        // From Redux Store
        const isAuthenticated = store.getState().runtime.isAuthenticated;

        // From URL
        const listId = params.listId;

        if (!isAuthenticated) {
            return { redirect: '/login' };
        }

        if (listId === undefined || isNaN(listId)) {
            return {
                title,
                component: <Layout><NotFound title={title} /></Layout>,
                status: 404,
            };
        }

        return {
            title,
            component: <Layout><CancelBlock listId={Number(listId)} /></Layout>,
        };
    },

};