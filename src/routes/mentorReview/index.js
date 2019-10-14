import React from 'react';
import Layout from '../../components/Layout';
import NotFound from '../notFound/NotFound';
import MentorReview from './MentorReview';
const title = 'Write Review Child';
export default {

    path: '/review/writeReflection/:blockUniqueId?/:id?',
    
    async action({ params, store, query }) {
        // From URI
        const isAuthenticated = store.getState().runtime.isAuthenticated;
        const blockUniqueId = params.blockUniqueId;
        const formPageId = params.id;
        const formBaseURI = "/review/writeReflection";
        const writeReviewURL = '?refer=/review/writeReflection' + '/' + blockUniqueId  ;
        if (!isAuthenticated) {
            return { redirect: '/login' + writeReviewURL };
        }

        if (blockUniqueId === undefined || isNaN(blockUniqueId)) {
            return {
                title,
                component: <Layout><NotFound title={title} /></Layout>,
                status: 404
            };
        }

        return {
            title,
            component: <Layout><MentorReview blockUniqueId={Number(blockUniqueId)} formPageId={Number(formPageId)} formBaseURI={formBaseURI} /></Layout>,
        };
    },

};
