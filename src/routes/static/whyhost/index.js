import React from 'react';
import Layout from '../../../components/Layout';
import WhyHost from './WhyHost';
import { url, whyMentorPageMetaImage } from '../../../config.js';
const title = 'Become a Mentor';
const description = 'Anyone can become a mentor.Learning experiences are activities, projects and tutorials that are provided by local people who have a skill or passion to share with a child. You don’t have to be a trained teacher to offer a valuable learning experience';
const whyMentorImage = url + '/' + whyMentorPageMetaImage;
export default {

    path: '/whymentor',

    action() {
        return {
            title,
            description,
            image: whyMentorImage || '',
            component: <Layout><WhyHost title={title} /></Layout>,
        };
    },

};
