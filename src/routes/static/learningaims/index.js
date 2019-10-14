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
import LearningAimsSvg1 from './LearningAims.svg';
import LearningAimsSvg2 from './LearningAims2.svg';

export default {

    path: '/learningaims',

    action() {

        return {
            title: 'Learning Aims',
            chunk: 'leaningaims',
            component: (<Layout>
                <LayoutContainer>
                    <TutorHereh1>Learning Aims</TutorHereh1>
                    <TutorHereh3>
                        This platform is dedicated to providing educational experiences and so we ask mentors to think carefully about what they want children to have learnt at the end of the day. This helps mentors to prepare their experience in the best frame of mind and it helps parents find a good match for their child.
                    </TutorHereh3>
                    <TutorHereContent>
                        <TutorHereh5>
                            <ul style={{ paddingLeft: 15 }}>
                                <li><Link to={"#block_1"} style={{ color: 'inherit' }}><p>What is a learning aim?</p></Link></li>
                                <li><Link to={"#block_2"} style={{ color: 'inherit' }}><p>How should a learning aim be written?</p></Link></li>
                                <li><Link to={"#block_3"} style={{ color: 'inherit' }}><p>How are the reflections related to the learning aims?</p></Link></li>
                                <li><Link to={"#block_4"} style={{ color: 'inherit' }}><p>What is the process from learning aims to reflections for the mentor?</p></Link></li>
                                <li><Link to={"#block_5"} style={{ color: 'inherit' }}><p>How many learning aims should a mentor list?</p></Link></li>
                                <li><Link to={"#block_6"} style={{ color: 'inherit' }}><p>How do I know which aims to choose?</p></Link></li>
                                <li><Link to={"#block_7"} style={{ color: 'inherit' }}><p>How do I make my learning aims for a range of ages and abilities?</p></Link></li>
                                <li><Link to={"#block_8"} style={{ color: 'inherit' }}><p>Should I discuss the learning aims with the children at the start of the experience?</p></Link></li>
                                <li><Link to={"#block_9"} style={{ color: 'inherit' }}><p>How often do mentors provide reflections?</p></Link></li>
                                <li><Link to={"#block_10"} style={{ color: 'inherit' }}><p>Can I change my learning aims for my experience?</p></Link></li>
                                <li><Link to={"#block_11"} style={{ color: 'inherit' }}><p>Where can I get some help with setting my learning aims?</p></Link></li>
                                <li><Link to={"#block_12"} style={{ color: 'inherit' }}>Do you have questions or suggestions about how we could improve this page?</Link></li>
                            </ul>
                        </TutorHereh5>
                        <CustomSeparator id="block_1" />
                        <TutorHereh3question>What is a learning aim?</TutorHereh3question>
                        <TutorHereh4body>
                            Learning aims on this platform are descriptions of what a child should know, understand and / or be able to do at the end of your experience.
                        </TutorHereh4body>
                        <CustomSeparator id="block_2" />
                        <TutorHereh3question>How should a learning aim be written?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>It can help to think about three aspects of learning. Skills to develop, knowledge to take away and perhaps most importantly, learning behaviours and characteristics.</p>
                            <p>&nbsp;</p>
                            <p>&nbsp;</p>
                            <p>For Example:</p>
                            <p>Skills:</p>
                            <ul style={{ paddingLeft: 15 }}>
                                <li style={{ marginBottom: 10 }}>To be able to throw and shape a pot on a wheel.</li>
                                <li style={{ marginBottom: 10 }}>To be able to groom and tack up a nervous horse.</li>
                                <li>To be able to control and time a serve.</li>
                            </ul>
                            <p>&nbsp;</p>
                            <p>Knowledge:</p>
                            <ul style={{ paddingLeft: 15 }}>
                                <li style={{ marginBottom: 10 }}>To know the difference between the queen, the worker and the drone honey bees.</li>
                                <li style={{ marginBottom: 10 }}>To know a range of opening moves in chess.</li>
                                <li>To know the creation of the world according to Norse mythology.</li>
                            </ul>
                            <p>&nbsp;</p>
                            <p>Behaviours:</p>
                            <ul style={{ paddingLeft: 15 }}>
                                <li style={{ marginBottom: 10 }}>Develop focus and concentration.</li>
                                <li style={{ marginBottom: 10 }}>Practice seeking helpful feedback.</li>
                                <li>Work persistently through challenges.</li>
                            </ul>
                        </TutorHereh4body>
                        <CustomSeparator id="block_3" />
                        <TutorHereh3question>How are the reflections related to the learning aims?</TutorHereh3question>
                        <TutorHereh4body>
                            Reflections given by mentors relate specifically to the learning aims that they provided in the experience description. The learning aims help parents and children understand the goals and expectations of the experience. The mentor’s learning aims are a kind of high level success criteria. They set out in advance the expectations for both the mentor and the child.
                        </TutorHereh4body>
                        <CustomSeparator id="block_4" />
                        <TutorHereh3question>What is the process from learning aims to reflections for the mentor?</TutorHereh3question>
                        <TutorHereh4body>
                            <img alt="learning-aims" src={LearningAimsSvg1} style={{ width: '100%' }} />
                        </TutorHereh4body>
                        <CustomSeparator id="block_5" />
                        <TutorHereh3question>How many learning aims should a mentor list?</TutorHereh3question>
                        <TutorHereh4body>
                            This is completely up to you. We suggest a minimum of four aims. You can write a maximum of twelve.
                        </TutorHereh4body>
                        <CustomSeparator id="block_6" />
                        <TutorHereh3question>How do I know which aims to choose?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>There may be some specific knowledge or skills you want teach but also think about the core behaviours and processes that you would like the children to develop during the course of your experience. These are often referred to as a growth mindset.</p>
                            <p>&nbsp;</p>
                            <img alt="learning-aims" src={LearningAimsSvg2} style={{ width: '100%' }} />
                        </TutorHereh4body>
                        <CustomSeparator id="block_7" />
                        <TutorHereh3question>How do I make my learning aims for a range of ages and abilities?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>It’s really valuable for children to learn in mixed age groups. Age mixing allows younger children to engage in and learn from activities that they could not do alone or with just playmates of the same age. They observe and emulate models of activities more advanced than their own; and receive emotional support and care beyond that which age-mates could provide.</p>
                            <p>Age mixing allows older children to develop their capacities to nurture and lead and allows older children to expand their understanding through teaching. Studies have shown that age-mixed play and learning is generally less competitive and more creative.</p>
                            In choosing your learning aims you can try to be aware of the optimal age range that might be suitable for your particular learning experience. It’s not necessary to expect every child to become competent in every learning aim by the end of the experience. The outcomes will depend greatly on age and individual differences. Exactly the same principles apply for mixed ability groups.
                        </TutorHereh4body>
                        <CustomSeparator id="block_8" />
                        <TutorHereh3question>Should I discuss the learning aims with the children at the start of the experience?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>Not necessarily, it depends on the age and the learning experience.</p>
                            <p>To learn means firstly to become aware of something you do not yet understand <a style={{ color: '#06B0CD' }} rel="noopener noreferrer" href="https://www.youtube.com/watch?v=2qiBEDh8f58" target="_blank">(Caleb Gattegno)</a>, and to work in such a way as to build your understanding. This could not be further from the ‘here’s a statement, now learn it’ approach, and puts the responsibility to learn firmly where it belongs – with the learner.</p>
                            <p>Then there’s the joy of discovery to be considered.</p>
                            As the Mentor, you can decide if you think it would be helpful to discuss the learning aims with the children in advance.
                        </TutorHereh4body>
                        <CustomSeparator id="block_9" />
                        <TutorHereh3question>How often do mentors provide reflections?</TutorHereh3question>
                        <TutorHereh4body>
                            Mentors are asked to provide reflections at the end of each separately paid for block. Mentors should choose a block length that makes sense as a reviewable period.
                        </TutorHereh4body>
                        <CustomSeparator id="block_10" />
                        <TutorHereh3question>Can I change my learning aims for my experience?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>You can edit your learning aims at any time and we very much encourage you to adapt them based on your experiences and the development of your activities.</p>
                            The best time to change your learning aims is at the end of a block. If you change your learning aims significantly, we encourage you to message parents that have already booked the experience to draw their attention to the changes.
                        </TutorHereh4body>
                        <CustomSeparator id="block_11" />
                        <TutorHereh3question>Where can I get some help with setting my learning aims?</TutorHereh3question>
                        <TutorHereh4body>
                            Use Live Chat or contact us at <a style={{ color: '#06B0CD' }} href="mailto:help@TutorHere.org">hello@TutorHere.org</a> - we would be happy to help.
                        </TutorHereh4body>
                        <CustomSeparator id="block_12" />
                        <TutorHereh3question>Do you have questions or suggestions about how we could improve this page?</TutorHereh3question>
                        <TutorHereh4body>
                            Please take a few minutes to let us know using <a style={{ color: '#06B0CD' }} href="mailto:help@TutorHere.org">hello@TutorHere.org</a> or by using Live Chat - we love hearing from you!
                        </TutorHereh4body>
                    </TutorHereContent>
                </LayoutContainer>
            </Layout>),
        };
    },

};
