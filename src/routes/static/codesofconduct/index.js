import React from 'react';
import Layout from '../../../components/Layout';
import TutorHereh1 from '../../../components/submenus/Headers/TutorHere-h1';
import TutorHereh3 from '../../../components/submenus/Headers/TutorHere-h3';
import TutorHereh5 from '../../../components/submenus/Headers/TutorHere-h5';
import TutorHereh3question from '../../../components/submenus/Headers/TutorHere-h3-question';
import TutorHereh4body from '../../../components/submenus/Headers/TutorHere-h4-body';
import LayoutContainer from '../../../components/submenus/Layouts/LayoutContainer';
import CustomSeparator from '../../../components/submenus/Layouts/custom-separator';
import TabularFeatures from '../../../components/submenus/Layouts/tabular-features';
import WithMobileComponent from '../../../components/submenus/Layouts/mobile-show';
import NoMobileComponent from '../../../components/submenus/Layouts/mobile-hide';
import TutorHereContent from '../../../components/submenus/Layouts/TutorHereContent';
import Link from '../../../components/Link';
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';

export default {

    path: '/codesofconduct',

    action() {
        return {
            title: 'Codes of Conduct',
            chunk: 'codesofconduct',
            component: (<Layout>
                <LayoutContainer>
                    <TutorHereh1>Codes of Conduct</TutorHereh1>
                    <TutorHereh3>
                        Every word we utter and every action we take are watched and learnt by the children around us.
                    </TutorHereh3>
                    <TutorHereContent>
                        <TutorHereh5>
                            <ul style={{ paddingLeft: 15 }}>
                                <li><Link to={"#block_1"} style={{ color: 'inherit' }}><p>Code of Conduct for Children</p></Link></li>
                                <li><Link to={"#block_2"} style={{ color: 'inherit' }}><p>Code of Conduct for Parents and Mentors</p></Link></li>
                                <li><Link to={"#block_3"} style={{ color: 'inherit' }}><p>Platform ethics</p></Link></li>
                                <li><Link to={"#block_4"} style={{ color: 'inherit' }}><p>Once I have a regular customer, why should I bother operating on the platform?</p></Link></li>
                            </ul>
                        </TutorHereh5>
                        <CustomSeparator id="block_1" />
                        <TutorHereh3question>Code of Conduct for Children</TutorHereh3question>
                        <TutorHereh4body>
                            <p>At the very start of any session, we recommend Mentors establish a code of conduct with the group in a warm and positive conversation suitable for the ages.</p>
                            <p>Children will use their own language but the mentor should be looking to agree the following basic understanding:</p>
                            <ul style={{ paddingLeft: 15 }}>
                                <li style={{ marginBottom: 10 }}>Appropriate attitude and gestures to others</li>
                                <li style={{ marginBottom: 10 }}>Appropriate language</li>
                                <li style={{ marginBottom: 10 }}>Respect for all the other participants and the environment</li>
                                <li style={{ marginBottom: 10 }}>Willingness to listen and follow instructions</li>
                                <li>Keeping mobile phones switched off and put away</li>
                            </ul>
                            <p>&nbsp;</p>
                            Mentors will do their best to manage behaviour of the group however parents will be asked to supervise or remove children who behave in a way that undermines the positive experience of the group as a whole.
                        </TutorHereh4body>
                        <CustomSeparator id="block_2" />
                        <TutorHereh3question>Code of Conduct for Parents and Mentors</TutorHereh3question>
                        <TutorHereh4body>
                            <p>All adults should be aware that they are role models for children.</p>
                            <Grid style={{ margin: 0, padding: 0, width: '100%' }}>
                                <NoMobileComponent>
                                    <Row style={{ margin: 0, padding: 0 }}>
                                        <Col xs={12} sm={6} md={6} lg={6} style={{ margin: 0, padding: 0 }}>
                                            <TutorHereh3question>Parent</TutorHereh3question>
                                        </Col>
                                        <Col xs={12} sm={6} md={6} lg={6} style={{ margin: 0, padding: 0 }}>
                                            <TabularFeatures type={'right'}>
                                                <TutorHereh3question>Mentors</TutorHereh3question>
                                            </TabularFeatures>
                                        </Col>
                                    </Row>
                                </NoMobileComponent>
                                <WithMobileComponent>
                                    <TutorHereh3question>Parent</TutorHereh3question>
                                </WithMobileComponent>
                                <Row style={{ margin: 0, padding: 0 }}>
                                    <Col xs={12} sm={6} md={6} lg={6} style={{ margin: 0, padding: 0 }}>
                                        <TabularFeatures type={'left'}>
                                            <Row style={{ margin: 0, padding: 0 }}>
                                                <p style={{ padding: '30px 0', borderBottom: '1px solid #f5f5f5' }}>Treat the other learners you encounter on the experience with respect and empathy.</p>
                                                <p style={{ padding: '30px 0', borderBottom: '1px solid #f5f5f5' }}>Moderate your speech, actions, activities, influences and expectations so that they are age appropriate for other learners you encounter on the experience.</p>
                                                <p style={{ padding: '30px 0', borderBottom: '1px solid #f5f5f5' }}>Arrive and collect on time.</p>
                                                <p style={{ padding: '30px 0', borderBottom: '1px solid #f5f5f5' }}>Be prepared - check your listing and correspondence so you have the right clothes and supplies.</p>
                                                <p style={{ padding: '30px 0', borderBottom: '1px solid #f5f5f5' }}>Give as much notice as possible for cancellations, they can affect the group dynamics and preparation.<br />&nbsp;</p>
                                                <p style={{ padding: '30px 0', borderBottom: '1px solid #f5f5f5' }}>Be contactable by the Mentor during the experience.</p>
                                                <p style={{ padding: '30px 0', borderBottom: '1px solid #f5f5f5' }}>Give mentors advance notice of any learning or behavioural difficulties.</p>
                                                <p style={{ padding: '30px 0', borderBottom: '1px solid #f5f5f5' }}>When in the presence of your children, talk about the mentor in a respectful and supportive way.</p>
                                                <p style={{ padding: '30px 0', borderBottom: '1px solid #f5f5f5' }}>Refrain from physical punishment of your child in the environment of the experience.</p>
                                                <p style={{ padding: '30px 0', borderBottom: '1px solid #f5f5f5' }}>Do not approach someone else’s child in order to discuss or chastise them because of their behaviour or actions towards your child. Speak directly to the child’s parents in private and to your mentor.</p>
                                                <p style={{ padding: '30px 0', borderBottom: '1px solid #f5f5f5' }}>Whilst you are arriving, collecting or involved in any learning experience you must refrain from smoking, taking illegal drugs or the consumption of alcohol.</p>
                                                <p style={{ padding: '30px 0' }}>Ask mentors for evidence of all safety precautions and procedures that you need to be confident about the safety of your child.</p>
                                            </Row>
                                        </TabularFeatures>
                                    </Col>
                                    <Col xs={12} sm={6} md={6} lg={6} style={{ margin: 0, padding: 0 }}>
                                        <TabularFeatures type={'right'}>
                                            <Row style={{ margin: 0, padding: 0 }}>
                                                <WithMobileComponent>
                                                    <div style={{ borderTop: '1px solid #f5f5f5' }}>
                                                        <TutorHereh3question>Mentors</TutorHereh3question>
                                                    </div>
                                                </WithMobileComponent>
                                                <p style={{ padding: '30px 0', borderBottom: '1px solid #f5f5f5' }}>Treat learners with respect and empathy.<br />&nbsp;</p>
                                                <p style={{ padding: '30px 0', borderBottom: '1px solid #f5f5f5' }}>Ensure speech, actions, activities, influences and expectations are age appropriate.<br />&nbsp;</p>
                                                <p style={{ padding: '30px 0', borderBottom: '1px solid #f5f5f5' }}>Be ready to start and conclude promptly.</p>
                                                <p style={{ padding: '30px 0', borderBottom: '1px solid #f5f5f5' }}>Be prepared with all your equipment and supplies. Plan well structured experiences.<br />&nbsp;</p>
                                                <p style={{ padding: '30px 0', borderBottom: '1px solid #f5f5f5' }}>Tell parents of changes to plan, timings and cancellations in good time. Make sure you have confirmation that parents have received the communication.</p>
                                                <p style={{ padding: '30px 0', borderBottom: '1px solid #f5f5f5' }}>Be contactable by the parents during the experience.</p>
                                                <p style={{ padding: '30px 0', borderBottom: '1px solid #f5f5f5' }}>Tell parents promptly if you experience learning or behavioural challenges.</p>
                                                <p style={{ padding: '30px 0', borderBottom: '1px solid #f5f5f5' }}>Talk about parents in a respectful and supportive way.<br />&nbsp;</p>
                                                <p style={{ padding: '30px 0', borderBottom: '1px solid #f5f5f5' }}>Keep your experience free from verbal or physical aggression.</p>
                                                <p style={{ padding: '30px 0', borderBottom: '1px solid #f5f5f5' }}>Manage behaviour according to the code of conduct you have established with the parents. Inform parents of any incident with the timeliness appropriate to this incident.</p>
                                                <p style={{ padding: '30px 0', borderBottom: '1px solid #f5f5f5' }}>Ensure learning experience environments are free from smoking, taking illegal drugs or the consumption of alcohol.<br />&nbsp;</p>
                                                <p style={{ padding: '30px 0' }}>Have all your safety certificates, risk assessments and other details easily accessible as new parents arrive so they can inspect them easily and ask questions if necessary.</p>
                                            </Row>
                                        </TabularFeatures>
                                    </Col>
                                </Row>
                            </Grid>
                        </TutorHereh4body>
                        <CustomSeparator id="block_3" />
                        <TutorHereh3question>Platform ethics</TutorHereh3question>
                        <TutorHereh4body>
                            <p>This is your platform. We are developing and growing it’s value rapidly so that parents, learners and mentors can be part of a new education system. This system minimises rules so that each person can have more freedom to teach and learn.</p>
                            <p>We invite feedback from the platform community so that we can keep improving and creating value. We think deeply about the pedagogical basis for our frameworks and believe that together we can reimagine education.</p>
                            We are committed to an education that helps children become free, resilient, creative human beings who lead lives of purpose and direction.
                        </TutorHereh4body>
                        <CustomSeparator id="block_4" />
                        <TutorHereh3question>Once I have a regular customer, why should I bother operating on the platform?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>Some of the features we think you will value are the secure messaging, payment system and automated cancellation policy.</p>
                            <p>We are collecting data to create a valuable online reputation for you. We are recording how many children and which children you teach as well as data on your reviews. Digital reputations may become more important for self employed people in the future. We will also make recommendations to people in the network of the children you mentor and children with similar profiles, so that we can promote your listings.</p>
                            <p>In the future we hope to be able to make suggestions to you about how you might use your skills and knowledge to meet learning demands beyond the scope of your current listings.</p>
                            <p>Operating through the platform is important to the child so that they can build a rich portfolio that has been verified by third party mentors like you. The more data they collect the more intelligent we can be in providing educational opportunities and support for them.</p>
                        </TutorHereh4body>
                        <CustomSeparator />
                        <TutorHereh3question>Can you help me if I’m still unsure?</TutorHereh3question>
                        <TutorHereh4body>
                            If you would like to comment or contribute to this article please use Live Chat or drop us a line at <a style={{ color: '#06B0CD' }} href={'mailto:hello@TutorHere.org'}>hello@TutorHere.org</a>
                        </TutorHereh4body>
                    </TutorHereContent>
                </LayoutContainer>
            </Layout>),
        };
    },

};
