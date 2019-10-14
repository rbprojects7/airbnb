import React from 'react';
import Layout from '../../../components/Layout';
import TutorHereh1 from '../../../components/submenus/Headers/TutorHere-h1';
import TutorHereh3 from '../../../components/submenus/Headers/TutorHere-h3';
import TutorHereh5 from '../../../components/submenus/Headers/TutorHere-h5';
import TutorHereh3question from '../../../components/submenus/Headers/TutorHere-h3-question';
import TutorHereh4body from '../../../components/submenus/Headers/TutorHere-h4-body';
import LayoutContainer from '../../../components/submenus/Layouts/LayoutContainer';
import CustomSeparator from '../../../components/submenus/Layouts/custom-separator';
import TutorHereContent from '../../../components/submenus/Layouts/TutorHereContent';
import Link from '../../../components/Link';

export default {

    path: '/servicefees',

    action() {

        return {
            title: 'Service Fees',
            chunk: 'servicefees',
            component: (<Layout>
                <LayoutContainer>
                    <TutorHereh1>Service Fees</TutorHereh1>
                    <TutorHereh3>
                        We have a transparent, commission based pricing structure. It is free to create a listing and there are no subscription fees. We set the service fees low so that you will always feel satisfied with the benefits of using the platform.
                    </TutorHereh3>
                    <TutorHereContent>
                        <TutorHereh5>
                            <ul style={{ paddingLeft: 15 }}>
                                <li><Link to={"#block_1"} style={{ color: 'inherit' }}><p>How does TutorHere make money to develop the platform?</p></Link></li>
                                <li><Link to={"#block_2"} style={{ color: 'inherit' }}><p>Launch offer.</p></Link></li>
                                <li><Link to={"#block_3"} style={{ color: 'inherit' }}>Third party payment processing fee.</Link></li>
                            </ul>
                        </TutorHereh5>
                        <CustomSeparator id="block_1" />
                        <TutorHereh3question>How does TutorHere make money to develop the platform?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>TutorHere collects a service fee from the parent and the mentor at each transaction.</p>
                            <ul style={{ paddingLeft: 15 }}>
                                <li style={{ marginBottom: 10 }}>We collect 5% service fee from the parent</li>
                                <li>We collect 5% service fee from the mentor</li>
                            </ul>
                        </TutorHereh4body>
                        <CustomSeparator id="block_2" />
                        <TutorHereh3question>Launch offer.</TutorHereh3question>
                        <TutorHereh4body>
                            During the launch period there are no service fees for mentors or parents.
                        </TutorHereh4body>
                        <CustomSeparator id="block_3" />
                        <TutorHereh3question>Third party payment processing fee.</TutorHereh3question>
                        <TutorHereh4body>
                            <p>We utilise a third party payment processing platform called Stripe Connect to ensure the highest standards of safety and security. Stripe provides a smooth payment and payout process and facilitates refunds. They charge TutorHere a fee of 1.4% + 20p for every successful payment. TutorHere also pays a standing charge of £2 per month for each active mentor, as well as 0.25% of the account volume and £0.10 per payout.</p>
                            Our service fees include the payment processing fees.
                        </TutorHereh4body>
                    </TutorHereContent>
                </LayoutContainer>
            </Layout>),
        };
    },

};
