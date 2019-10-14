import React from 'react';
import UserLayout from '../../components/Layout/UserLayout';
import EditChildProfile from './EditChildProfile';

const title = 'Edit Child Profile';

export default {

    path: '/user/editChild',

    action({ store }) {

    // From Redux Store
        const isAuthenticated = store.getState().runtime.isAuthenticated;
        const data = store.getState().children;

        if (!isAuthenticated) {
            return { redirect: '/login' };
        }

        return {
            title,
            component: <UserLayout><EditChildProfile title={title} data={data}/></UserLayout>,
        };
    },

};
