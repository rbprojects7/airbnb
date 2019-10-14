import React from 'react';
import Layout from '../../../components/Layout';
import TutorHereh1 from '../../../components/submenus/Headers/TutorHere-h1';
import TutorHereh3 from '../../../components/submenus/Headers/TutorHere-h3';
import TutorHereh3question from '../../../components/submenus/Headers/TutorHere-h3-question';
import TutorHereh4body from '../../../components/submenus/Headers/TutorHere-h4-body';
import LayoutContainer from '../../../components/submenus/Layouts/LayoutContainer';
import TutorHereContent from '../../../components/submenus/Layouts/TutorHereContent';

export default {

    path: '/careers',

    action() {

        return {
            title: 'Careers at TutorHere',
            chunk: 'careers',
            component: (<Layout>
                <LayoutContainer>
                    <TutorHereh1>Careers at TutorHere</TutorHereh1>
                    <TutorHereh3>
                        <p>Are you an education rebel?</p>
                        <p>Are you a teacher with a vision for the future?</p>
                        <p>Are you a student filled with entrepreneurial spirit, looking for an internship or apprenticeship?</p>
                        Have you experienced and been inspired by an alternative education system as a parent or student?
                    </TutorHereh3>
                    <TutorHereContent>
                        <TutorHereh3question>Join us in our mission to reimagine education.</TutorHereh3question>
                        <TutorHereh4body>
                            As you can imagine, we don’t have many rules for people that work with us. We think that talented people need working environments with freedom, the space to master their skills and a deep sense of purpose. We offer all of these things in abundance.
                        </TutorHereh4body>
                        <hr />
                        <TutorHereh3question>Internships and apprenticeships from 15 upwards.</TutorHereh3question>
                        <TutorHereh4body>
                            <p>We can offer part-time apprenticeships, dissertation and project work in a wide range of areas including, but not limited to:</p>
                            <p>&nbsp;</p>
                            <ul style={{ paddingLeft: 15 }}>
                                <li style={{ marginBottom: 10 }}>Software Engineering</li>
                                <li style={{ marginBottom: 10 }}>UI/ UX</li>
                                <li style={{ marginBottom: 10 }}>Data Science</li>
                                <li style={{ marginBottom: 10 }}>Psychology</li>
                                <li style={{ marginBottom: 10 }}>Child Development</li>
                                <li style={{ marginBottom: 10 }}>Business</li>
                                <li style={{ marginBottom: 10 }}>Law</li>
                                <li style={{ marginBottom: 10 }}>Accountancy</li>
                                <li style={{ marginBottom: 10 }}>Marketing</li>
                                <li style={{ marginBottom: 10 }}>Graphic design and animation</li>
                                <li style={{ marginBottom: 10 }}>Blog writing</li>
                                <li style={{ marginBottom: 10 }}>Video blogging and film production</li>
                                <li>[Insert your superpower here]</li>
                            </ul>
                        </TutorHereh4body>
                        <hr />
                        <TutorHereh3question>Do you think you can contribute, work autonomously and have self direction?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>We are an agile, distributed and non-hierarchical organisation. We don’t believe in interviews but we make it easy for you to explore your ideas or pick up a task from our backlog and show your unique talents.</p>
                            <p>&nbsp;</p>
                            We’re happy to have a chat so drop us a line anytime to <a style={{ color: '#06B0CD' }} href="mailto:careers@TutorHere.org">careers@TutorHere.com</a>
                        </TutorHereh4body>
                    </TutorHereContent>
                </LayoutContainer>
            </Layout>),
        };
    },

};
