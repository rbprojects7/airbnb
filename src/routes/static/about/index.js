import React from 'react';
import Layout from '../../../components/Layout';
import TutorHereh1 from '../../../components/submenus/Headers/TutorHere-h1';
import TutorHereh3 from '../../../components/submenus/Headers/TutorHere-h3';
import TutorHereh4 from '../../../components/submenus/Headers/TutorHere-h4';
import LayoutContainer from '../../../components/submenus/Layouts/LayoutContainer';
import TutorHereContent from '../../../components/submenus/Layouts/TutorHereContent';

export default {

    path: '/about',

    action() {

        return {
            title: 'About TutorHere',
            chunk: 'about',
            component: (<Layout>
                <LayoutContainer>
                    <TutorHereh1>About TutorHere</TutorHereh1>
                    <TutorHereh3>
                        <p style={{ marginBottom: 15 }}>TutorHere there are no bells or timetables or uniforms.</p>
                        <p style={{ marginBottom: 15 }}>Imagine a school without walls or prescribed curriculum.</p>
                        <p style={{ marginBottom: 15 }}>TutorHere emotional intelligence is as important as literacy.</p>
                      Imagine a new education system altogether.
                    </TutorHereh3>
                    <TutorHereContent>
                        <TutorHereh4>
                            <p>We think that parents should be given more freedom to choose the education that is right for their child. TutorHere aims to make this choice easy by providing one platform to search, arrange and record a lifetime of learning experiences.</p>
                            <p>&nbsp;</p>
                            <p>We create a platform for children to be self directed in their learning and where they can discover their true passions and individual talents.</p>
                            <p>&nbsp;</p>
                            <p>We think that children learn best from people who inspire. These people are all around us but they don’t necessarily end up as trained teachers in your local school. TutorHere makes it easy for all kinds of people to transform their hobbies, skills and life stories into amazing learning experiences for children. We call these people Mentors and they love to pass on their knowledge in their own time.</p>
                            <p>&nbsp;</p>
                            <p>This is your platform.</p>
                            <p>&nbsp;</p>
                            <p>It is made with love by people who think it’s time to reimagine education.</p>
                            <p>&nbsp;</p>
                            <p>&nbsp;</p>
                            <p>Welcome to TutorHere,</p>
                            <p>&nbsp;</p>
                            <p>TutorHere  <br />– Founder</p>
                        </TutorHereh4>
                    </TutorHereContent>
                </LayoutContainer>
            </Layout>),
        };
    },

};
