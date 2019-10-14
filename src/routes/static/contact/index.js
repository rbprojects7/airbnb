import React from 'react';
import Layout from '../../../components/Layout';
import TutorHereh1 from '../../../components/submenus/Headers/TutorHere-h1';
import TutorHereh3 from '../../../components/submenus/Headers/TutorHere-h3';
import TutorHereh4 from '../../../components/submenus/Headers/TutorHere-h4';
import LayoutContainer from '../../../components/submenus/Layouts/LayoutContainer';
import TutorHereContent from '../../../components/submenus/Layouts/TutorHereContent';
import SvgImage from '../../../components/submenus/assets/svg-image';
import contactImg from './contact.svg';

export default {

    path: '/contact',

    action() {

        return {
            title: 'Contact us',
            chunk: 'contact',
            component: (<Layout>
                <LayoutContainer>
                    <TutorHereh1>Contact us</TutorHereh1>
                    <TutorHereh3>
                        At TutorHere we value you as a person. We want to be open, forward facing and approachable. There are several ways you can contact us and we aim to reply to your query promptly.
                    </TutorHereh3>
                    <TutorHereContent>
                        <TutorHereh4>
                            <p>Live chat is the fastest and most direct way to communicate with us - whatever your query. You can access live chat from the bottom right of your screen where this symbol is displayed.</p>
                            <SvgImage>
                                <img width="60" height="60" alt="contact" src={contactImg} />
                            </SvgImage>
                            Alternatively, email us using one of the relevant address below:
                            <p>&nbsp;</p>
                            <p><a style={{ color: '#06B0CD' }} href="mailto:help@TutorHere.org">help@TutorHere.org</a></p>
                            <p><a style={{ color: '#06B0CD' }} href="mailto:careers@TutorHere.org">careers@TutorHere.org</a></p>
                            <p><a style={{ color: '#06B0CD' }} href="mailto:privacy@TutorHere.org">privacy@TutorHere.org</a></p>
                            <p>&nbsp;</p>
                            Or write to us at:
                            <p>&nbsp;</p>
                            <p>TutorHere ltd<br />The Yard<br />Lewes Road<br />Forest Row<br />East Sussex<br />RH18 5AA</p>
                        </TutorHereh4>
                    </TutorHereContent>
                </LayoutContainer>
            </Layout>),
        };
    },

};
