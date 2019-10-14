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
import WithMobileComponent from '../../../components/submenus/Layouts/mobile-show';
import NoMobileComponent from '../../../components/submenus/Layouts/mobile-hide';
import Link from '../../../components/Link';
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';

import Bookablemobile1 from './Bookablemobile1.svg';
import Bookablemobile2 from './Bookablemobile2.svg';
import Bookableweb1 from './Bookableweb1.svg';
import Bookableweb2 from './Bookableweb2.svg';
import Submenumobile from './Submenumobile.svg';
import Submenuweb from './Submenuweb.svg';

export default {

    path: '/sessionsandblocks',

    action() {
        return {
            title: 'Sessions and Blocks',
            chunk: 'sessionsandblocks',
            component: (<Layout>
                <LayoutContainer>
                    <TutorHereh1>Sessions and Blocks</TutorHereh1>
                    <TutorHereh3>
                        <p>Many educators have told us that the most valuable learning experiences occur over a series of lessons. This gives time for a learning relationship to develop with both the mentor and between peers. However, sometimes a one-off experience can spark an interest and makes a great introductory experience.</p>
                        <p>We make it possible for you to offer offer a fixed course or a one-off experience.</p>
                    </TutorHereh3>
                    <TutorHereContent>
                        <TutorHereh5>
                            <ul style={{ paddingLeft: 15 }}>
                                <li><Link to={"#block_1"} style={{ color: 'inherit' }}><p>What is a block?</p></Link></li>
                                <li><Link to={"#block_2"} style={{ color: 'inherit' }}><p>How many sessions go into a block?</p></Link></li>
                                <li><Link to={"#block_3"} style={{ color: 'inherit' }}><p>Can I offer different priced experiences?</p></Link></li>
                                <li><Link to={"#block_4"} style={{ color: 'inherit' }}><p>I’m a guitar teacher, I want an ongoing commitment, what should I do?</p></Link></li>
                                <li><Link to={"#block_5"} style={{ color: 'inherit' }}><p>I’m offering a one-off experience to give children a taster, how do I create a block?</p></Link></li>
                                <li><Link to={"#block_6"} style={{ color: 'inherit' }}><p>Where can I get some help with setting my price and designing my blocks?</p></Link></li>
                                <li><Link to={"#block_7"} style={{ color: 'inherit' }}><p>Do you have questions or suggestions about how we could improve this page?</p></Link></li>
                            </ul>
                        </TutorHereh5>
                        <CustomSeparator id="block_1" />
                        <TutorHereh3question>What is a block?</TutorHereh3question>
                        <TutorHereh4body>
                            <Grid style={{ padding: 0, margin: 0, width: '100%' }}>
                                <Row>
                                    <Col xs={12} md={3}>
                                        <p>A block is a complete bookable experience. A parent can choose a block and they will pay for this in one go. Each block is the same price.</p>
                                        <p>&nbsp;</p>
                                    </Col>
                                    <Col xs={12} md={9}>
                                        <NoMobileComponent>
                                            <img alt="bookable-block" src={Submenuweb} style={{ width: '100%' }} />
                                        </NoMobileComponent>
                                        <WithMobileComponent>
                                            <img alt="bookable-block" src={Submenumobile} style={{ width: '100%' }} />
                                        </WithMobileComponent>
                                    </Col>
                                </Row>
                            </Grid>
                        </TutorHereh4body>
                        <CustomSeparator id="block_2" />
                        <TutorHereh3question>How many sessions go into a block?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>That is completely up to you.</p>
                            <p>It could be one session or 20 sessions. The key thing is that you are asking parents to pay for the whole block in one go.</p>
                            <p>You will also be asked to do a review at the end of each block.</p>
                        </TutorHereh4body>
                        <CustomSeparator id="block_3" />
                        <TutorHereh3question>Can I offer different priced experiences?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>Each listing has one price. This means that if you want to offer experiences with a different value you need to create another listing.</p>
                            <p>However, you can create as many listings as you want!</p>
                            <p>You might want to offer a similar experience for different ages or with different equipment or learning aims. You might want to offer a similar experience but for a longer time. All of these differences might affect the price you want to charge.</p>
                        </TutorHereh4body>
                        <CustomSeparator id="block_4" />
                        <TutorHereh3question>I want an ongoing commitment, what should I do?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>For example, if you are a guitar teacher:</p>
                            <p>Choose a number of weeks that makes sense for payment. Make it affordable, five to six weeks is quite common.</p>
                            <p>When the parent is ready to pay for the next block, create a new listing and send a quick message to tell them it is ready.</p>
                            <p>You will be presented with the options (similar to below) when creating an experience, you will be able to select your dates and times of your choosing.</p>
                            <p>&nbsp;</p>
                            <NoMobileComponent>
                                <img alt="bookable-block" src={Bookableweb1} style={{ width: '100%' }} />
                            </NoMobileComponent>
                            <WithMobileComponent>
                                <img alt="bookable-block" src={Bookablemobile1} style={{ width: '100%' }} />
                            </WithMobileComponent>
                        </TutorHereh4body>
                        <CustomSeparator id="block_5" />
                        <TutorHereh3question>I’m offering a one-off experience, how do I create a block?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>For example, if you want to offer a bicycle maintenence course:</p>
                            <ul style={{ paddingLeft: 15 }}>
                                <li><p>You want parent to pay for one session.</p></li>
                                <li><p>Each session is a complete experience.</p></li>
                                <li><p>You will fill in a reflection for each child when this experience is over.</p></li>
                            </ul>
                            <p>&nbsp;</p>
                            <NoMobileComponent>
                                <img alt="bookable-block" src={Bookableweb2} style={{ width: '100%' }} />
                            </NoMobileComponent>
                            <WithMobileComponent>
                                <img alt="bookable-block" src={Bookablemobile2} style={{ width: '100%' }} />
                            </WithMobileComponent>
                        </TutorHereh4body>
                        <CustomSeparator id="block_6" />
                        <TutorHereh3question>Where can I get some help with setting my price and designing my blocks?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>Just contact us via Live Chat or email us at <a style={{ color: '#06B0CD' }} href={'mailto:hello@TutorHere.org'}>hello@TutorHere.org</a> and we will be more than happy to help!</p>
                        </TutorHereh4body>
                        <CustomSeparator id="block_7" />
                        <TutorHereh3question>Do you have questions or suggestions about how we could improve this page?</TutorHereh3question>
                        <TutorHereh4body>
                            Please take a few minutes to let us know using <a style={{ color: '#06B0CD' }} href={'mailto:hello@TutorHere.org'}>hello@TutorHere.org</a> or us the Live Chat feature - we love hearing from you!
                        </TutorHereh4body>
                    </TutorHereContent>
                </LayoutContainer>
            </Layout>),
        };
    },

};
