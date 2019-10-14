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

    path: '/cancellationprocess',

    action() {

        return {
            title: 'Cancellation Process',
            chunk: 'cancellationprocess',
            component: (<Layout>
                <LayoutContainer>
                    <TutorHereh1>Cancellation Process</TutorHereh1>
                    <TutorHereh3>
                        Mentors generally need firm commitments from parents in order to prepare their experiences and organise their time. Each mentor has a unique cancellation policy and in the event of a cancellation we offer a smooth communication channel and secure refund process.
                    </TutorHereh3>
                    <TutorHereContent>
                        <TutorHereh5>
                            <ul style={{ paddingLeft: 15 }}>
                                <li><Link to={"#block_1"} style={{ color: 'inherit' }}><p>Does TutorHere have a standard cancellation policy?</p></Link></li>
                                <li><Link to={"#block_2"} style={{ color: 'inherit' }}><p>Where does a mentor write their cancellation policy?</p></Link></li>
                                <li><Link to={"#block_3"} style={{ color: 'inherit' }}><p>Where is the mentor’s cancellation policy shown to parents?</p></Link></li>
                                <li><Link to={"#block_4"} style={{ color: 'inherit' }}><p>What are customer rights under the Consumer Contracts regulations 2013?</p></Link></li>
                                <li><Link to={"#block_5"} style={{ color: 'inherit' }}><p>How do I cancel a booking for my child’s experience?</p></Link></li>
                                <li><Link to={"#block_6"} style={{ color: 'inherit' }}><p>How do I cancel a session that I am mentoring?</p></Link></li>
                                <li><Link to={"#block_7"} style={{ color: 'inherit' }}>If a mentor cancels a session, will I be refunded?</Link></li>
                            </ul>
                        </TutorHereh5>
                        <CustomSeparator id="block_1" />
                        <TutorHereh3question>Does TutorHere have a standard cancellation policy?</TutorHereh3question>
                        <TutorHereh4body>
                            No. We are a platform and we leave mentor’s free to choose the policy that suits them best. It is important that mentors understand their legal obligations and we guide them through this during the listing process.
                        </TutorHereh4body>
                        <CustomSeparator id="block_2" />
                        <TutorHereh3question>Where does a mentor write their cancellation policy?</TutorHereh3question>
                        <TutorHereh4body>
                            You have one mandatory check box regarding the Consumer Credit regulations and your response will show on the listing overview. You also have the option to select some model phrases and the option to complete a free text box as part of your listing process. All of your selections are shown in the listing overview.
                        </TutorHereh4body>
                        <CustomSeparator id="block_3" />
                        <TutorHereh3question>Where is the mentor’s cancellation policy shown to parents?</TutorHereh3question>
                        <TutorHereh4body>
                            <ul style={{ paddingLeft: 15 }}>
                                <li style={{ marginBottom: 10 }}>The mentor’s policy is clearly shown on the listing page and the payment page.</li>
                                <li>The policy is shown again on the receipt and the cancellation form.</li>
                            </ul>
                        </TutorHereh4body>
                        <CustomSeparator id="block_4" />
                        <TutorHereh3question>What are customer rights under the Consumer Contracts regulations 2013?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>If the experience is classified as a leisure activity on a specific date, the 14 day ‘cooling off period’ under the Consumer Contracts regulations 2013 does not apply. Customers must read the specific cancellation policy provided by the mentor.</p>
                            If the experience is classified as an educational activity, the 14 day ‘cooling off period’ under the Consumer Contracts regulations 2013 states that the customer can cancel within 14 days of booking. The mentor will refund a pro-rata amount for the experience sessions already attended, and any one-off costs they have incurred in their preparation. After the 14 day period the mentor’s specific cancellation policy will apply.
                        </TutorHereh4body>
                        <CustomSeparator id="block_5" />
                        <TutorHereh3question>How do I cancel a booking for my child’s experience?</TutorHereh3question>
                        <TutorHereh4body>
                            Find the experience in your dashboard under Your Learning. Navigate to Upcoming experiences and clink on the Cancel link. Write a message for the mentor as a courtesy. Please refer to the mentor’s cancellation policy and clearly request any refund you feel you are entitled to.
                        </TutorHereh4body>
                        <CustomSeparator id="block_6" />
                        <TutorHereh3question>How do I cancel a session that I am mentoring?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>Be aware that cancelling a session could be extremely disruptive to a parent’s schedule. However, if you are forced to cancel due to some unforeseen circumstances you can do this through your dashboard. Notify parents as soon as possible.</p>
                            Navigate to Your Listings section and find the relevant bookings in your Upcoming Bookings section. Click cancel, complete the form and insert a message of explanation for parents. Doing this authorises Stripe to collect the funds from your account and refund the parent.
                        </TutorHereh4body>
                        <CustomSeparator id="block_7" />
                        <TutorHereh3question>If a mentor cancels a session, will I be refunded?</TutorHereh3question>
                        <TutorHereh4body>
                            Parents will be refunded the booking cost for any sessions that have not been attended yet and a pro rata amount of the service fee. Please read the mentor’s Cancellation Policy carefully as the mentor may specify their own conditions as well.
                        </TutorHereh4body>
                        <CustomSeparator id="block_8" />
                        <TutorHereh4body>If you have any questions about the cancellation policy please use the Live Chat feature or contact us using <a style={{ color: '#06B0CD' }} href={'mailto:hello@TutorHere.org'}>hello@TutorHere.org</a> - we’ll be happy to help.</TutorHereh4body>
                    </TutorHereContent>
                </LayoutContainer>
            </Layout>),
        };
    },

};
