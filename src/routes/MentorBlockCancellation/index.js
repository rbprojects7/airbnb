import React from 'react';
import Layout from '../../components/Layout';
import MentorBlockCancellation from './MentorBlockCancellation';
import NotFound from '../notFound/NotFound';

const title = 'Cancel';

export default {

    path: '/block-cancellation/:blockId',

    action({ store, params }) {

        // From Redux Store
        const isAuthenticated = store.getState().runtime.isAuthenticated;

        // From URL
        const blockId = params.blockId;

        if (!isAuthenticated) {
            return { redirect: '/login' };
        }

        if (blockId === undefined || isNaN(blockId)) {
            return {
                title,
                component: <Layout><NotFound title={title} /></Layout>,
                status: 404,
            };
        }

        return {
            title,
            component: <Layout><MentorBlockCancellation blockId={Number(blockId)} /></Layout>,
        };
    },

};