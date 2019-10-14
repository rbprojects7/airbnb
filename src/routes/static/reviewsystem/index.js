import React from 'react';
import Layout from '../../../components/Layout';
import TutorHereh1 from '../../../components/submenus/Headers/TutorHere-h1';
import TutorHereh3 from '../../../components/submenus/Headers/TutorHere-h3';
import TutorHereh5 from '../../../components/submenus/Headers/TutorHere-h5';
import TutorHereh3question from '../../../components/submenus/Headers/TutorHere-h3-question';
import TutorHereh4body from '../../../components/submenus/Headers/TutorHere-h4-body';
import LayoutContainer from '../../../components/submenus/Layouts/LayoutContainer';
import CustomSeparator from '../../../components/submenus/Layouts/custom-separator';
import WithMobileComponent from '../../../components/submenus/Layouts/mobile-show';
import NoMobileComponent from '../../../components/submenus/Layouts/mobile-hide';
import TutorHereContent from '../../../components/submenus/Layouts/TutorHereContent';
import SvgImage from './image.svg';
import SvgImageMobile from './imagemobile.svg';
import Reflections from './Reflections.png';
import ReflectionsMob from './ReflectionsMob.png';
import Link from '../../../components/Link';

export default {

    path: '/reviewsystem',

    action() {
        return {
            title: 'Review System',
            chunk: 'reviewsystem',
            component: (<Layout>
                <LayoutContainer>
                    <TutorHereh1>Our Review System</TutorHereh1>
                    <TutorHereh3>
                        <p>We keep paperwork to an absolute minimum so that mentors can spend their time providing a great experience, thinking, growing and engaging with parents and children in real time.</p>
                        <p>Sound simple? Let’s keep it that way.</p>
                    </TutorHereh3>
                    <TutorHereContent>
                        <TutorHereh5>
                            <ul style={{ paddingLeft: 15 }}>
                                <li><Link to={"#block_1"} style={{ color: 'inherit' }}><p>Why have we chosen the word reflections?</p></Link></li>
                                <li><Link to={"#block_2"} style={{ color: 'inherit' }}><p>Why are there no free text reflections from mentors?</p></Link></li>
                                <li><Link to={"#block_3"} style={{ color: 'inherit' }}><p>How are the reflections related to the learning aims?</p></Link></li>
                                <li><Link to={"#block_4"} style={{ color: 'inherit' }}><p>What is the process from learning aims to reflections for the mentor?</p></Link></li>
                                <li style={{ color: '#FF5F6C' }}><Link to={"#block_5"} style={{ color: 'inherit' }}><p>What 3-point scale is used?</p></Link></li>
                                <li><Link to={"#block_6"} style={{ color: 'inherit' }}><p>How often do mentors provide reflections?</p></Link></li>
                                <li><Link to={"#block_7"} style={{ color: 'inherit' }}><p>Is a mentor obliged to provide a reflections?</p></Link></li>
                                <li><Link to={"#block_8"} style={{ color: 'inherit' }}><p>Who sees my child’s reflections?</p></Link></li>
                                <li><Link to={"#block_9"} style={{ color: 'inherit' }}><p>What is the parent - mentor review?</p></Link></li>
                                <li><Link to={"#block_10"} style={{ color: 'inherit' }}><p>Where does the parent - mentor review appear?</p></Link></li>
                                <li style={{ color: '#FF5F6C' }}><Link to={"#block_11"} style={{ color: 'inherit' }}><p>Why can’t a parent comment on the child’s experience?</p></Link></li>
                                <li style={{ color: '#FF5F6C' }}><Link to={"#block_12"} style={{ color: 'inherit' }}><p>Why can’t a child review their learning experience?</p></Link></li>
                                <li><Link to={"#block_13"} style={{ color: 'inherit' }}><p>What else are you working on for the reflection process?</p></Link></li>
                                <li><Link to={"#block_14"} style={{ color: 'inherit' }}><p>Do you have more questions or ideas about reflections to share with us?</p></Link></li>
                            </ul>
                        </TutorHereh5>
                        <CustomSeparator id="block_1" />
                        <TutorHereh3question>Why have we chosen the word reflections.</TutorHereh3question>
                        <TutorHereh4body>
                            <p>We toyed with familiar words such as ‘reviews’ and ‘feedback’ but they didn’t feel right for using with children. We want to avoid a culture of testing and grading and have tried to distill the basic needs for both parties into a gentle, contemplative process.</p>
                        </TutorHereh4body>
                        <CustomSeparator id="block_2" />
                        <TutorHereh3question>Why are there no free text reflections from mentors?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>We wanted to make this process really straightforward and quick to complete. There’s nothing more effective than an old fashioned conversation if you’ve got something complicated to say.</p>
                        </TutorHereh4body>
                        <CustomSeparator id="block_3" />
                        <TutorHereh3question>How are the reflections related to the learning aims?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>Reflections given by mentors relate specifically to the learning aims they listed in the experience description. The learning aims help parents and children understand the goals and expectations of the experience. The mentor’s learning aims are a kind of high level success criteria. They set out in advance the expectations for both the mentor and the child.</p>
                        </TutorHereh4body>
                        <CustomSeparator id="block_4" />
                        <TutorHereh3question>What is the process from learning aims to reflections for the mentor?</TutorHereh3question>
                        <TutorHereh4body>
                            <NoMobileComponent>
                                <img alt="bookable-block" src={SvgImage} style={{ width: '100%' }} />
                            </NoMobileComponent>
                            <WithMobileComponent>
                                <img alt="bookable-block" src={SvgImageMobile} style={{ width: '100%' }} />
                            </WithMobileComponent>
                        </TutorHereh4body>
                        <CustomSeparator id="block_5" />
                        <TutorHereh3question>What 3-point scale is used?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>Learning is a process that never stops and it’s always difficult to pin point progress.</p>
                            <p>Our progress scale is:</p>
                            <p>&nbsp;</p>
                            <p><b>Understand:</b> I can describe and recall simple ideas and procedures.</p>
                            <p>&nbsp;</p>
                            <p><b>Apply:</b> I can link my ideas together, compare them and understand why they are important.</p>
                            <p>&nbsp;</p>
                            <p><b>Extend:</b> I can apply this to new situations, create new ideas and predict what will happen.</p>
                        </TutorHereh4body>
                        <CustomSeparator id="block_6" />
                        <TutorHereh3question>How often do mentors provide reflections?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>Mentors are asked to provide reflections at the end of each separately paid for block. Mentors should choose a block length that makes sense as a reviewable period.</p>
                        </TutorHereh4body>
                        <CustomSeparator id="block_7" />
                        <TutorHereh3question>Is a mentor obliged to provide a reflections?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>No. This is a peer to peer community so we try to avoid as many rules as we can. We prompt the mentor after the experience and you are welcome to send a message anytime. If you don’t receive a reflection you have the chance to mention this in the parent - mentor review.</p>
                        </TutorHereh4body>
                        <CustomSeparator id="block_8" />
                        <TutorHereh3question>Who sees my child’s reflections?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>Only you and anyone you give permission to.</p>
                        </TutorHereh4body>
                        <CustomSeparator id="block_9" />
                        <TutorHereh3question>What is the parent - mentor review?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>The parent - mentor review is a chance for parents to comment and rate their relationship or experience with the mentor. They can comment and rate the following things:</p>
                            <ul style={{ paddingLeft: 15 }}>
                                <li><p>Was the mentor approachable, warm and welcoming?</p></li>
                                <li><p>How was communication, timekeeping and organisation?</p></li>
                                <li><p>Did the mentor provide reflections on your child’s learning aims?</p></li>
                            </ul>
                            <p>&nbsp;</p>
                            <p style={{ fontSize: 14 }}>Example of the Reflection submission page.</p>
                            <NoMobileComponent>
                                <img alt="reflections" src={Reflections} style={{ width: '100%' }} />
                            </NoMobileComponent>
                            <WithMobileComponent>
                                <img alt="reflections" src={ReflectionsMob} style={{ width: '100%' }} />
                            </WithMobileComponent>
                        </TutorHereh4body>
                        <CustomSeparator id="block_10" />
                        <TutorHereh3question>Where does the parent - mentor review appear?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>The reviews you provide about mentors are public on your parent profile and public on the mentor’s profile.</p>
                        </TutorHereh4body>
                        <CustomSeparator id="block_11" />
                        <TutorHereh3question style={{ color: '#FF5F6C' }}>Why can’t a parent comment on the child’s experience?</TutorHereh3question>
                        <TutorHereh4body>
                            <p style={{ color: '#FF5F6C' }}>Normally, the parent is not present at the experience, it’s simply not fair.</p>
                        </TutorHereh4body>
                        <CustomSeparator id="block_12" />
                        <TutorHereh3question style={{ color: '#FF5F6C' }}>Why can’t a child review their learning experience?</TutorHereh3question>
                        <TutorHereh4body>
                            <p style={{ color: '#FF5F6C' }}>We are working on self-assessments for older children. These will be based on the learning aims as well.</p>
                        </TutorHereh4body>
                        <CustomSeparator id="block_13" />
                        <TutorHereh3question>What else are you working on for the reflection process?</TutorHereh3question>
                        <TutorHereh4body>
                            <ul style={{ paddingLeft: 15 }}>
                                <li><p>Enhanced reflection options for mentors that help with the development of a growth mindset.</p></li>
                                <li><p>Peer feedback - as we know that children learn so much from each other.</p></li>
                                <li><p>Arranging consultations with mentors via the platform.</p></li>
                            </ul>
                        </TutorHereh4body>
                        <CustomSeparator id="block_14" />
                        <TutorHereh3question>Do you have more questions or ideas about reflections to share with us?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>Please use Live Chat or email us at <a style={{ color: '#06B0CD' }} href={'mailto:hello@TutorHere.org'}>hello@TutorHere.org</a> - we love hearing your reflections!</p>
                        </TutorHereh4body>
                    </TutorHereContent>
                </LayoutContainer>
            </Layout>),
        };
    },

};
