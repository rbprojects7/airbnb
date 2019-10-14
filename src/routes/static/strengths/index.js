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
import HorizontalImage from '../../../components/submenus/Layouts/horizontal-image';
import VerticalImage from '../../../components/submenus/Layouts/vertical-image';
import TutorHereContent from '../../../components/submenus/Layouts/TutorHereContent';
import TabularFeatures from '../../../components/submenus/Layouts/tabular-features';
import SvgImage from './image.svg';
import VerbalImg from './verbal.svg';
import LogicImg from './logic.svg';
import VisualImg from './visual.svg';
import MusicalImg from './musical.svg';
import BodyImg from './body.svg';
import PeopleImg from './people.svg';
import InnerImg from './inner.svg';
import NaturalisticImg from './naturalistic.svg';
import SvgImageMobile from './imagemobile.svg';
import Link from '../../../components/Link';
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';

export default {

    path: '/strengths',

    action() {
        return {
            title: 'Strength Categories',
            chunk: 'strengths',
            component: (<Layout>
                <LayoutContainer>
                    <TutorHereh1>Strength Categories</TutorHereh1>
                    <TutorHereh3>
                        We’ve thought really carefully about how to categorise our learning experiences. You might expect us to divide experiences into conventional subject categories like maths, foreign languages, sports, crafts and so on. However, we think it is vital for both educators and parents to think about the development of a balanced person and wanted to find a better way to describe the categories of learning experiences.
                    </TutorHereh3>
                    <TutorHereContent>
                        <TutorHereh5>
                            <ul style={{ paddingLeft: 15 }}>
                                <li><Link to={"#block_1"} style={{ color: 'inherit' }}><p>What framework are you using to categorise learning experiences?</p></Link></li>
                                <li><Link to={"#block_2"} style={{ color: 'inherit' }}><p>What is the Multiple Intelligences theory?</p></Link></li>
                                <li><Link to={"#block_3"} style={{ color: 'inherit' }}><p>Why don’t we use traditional subjects for categorising learning experiences?</p></Link></li>
                                <li><Link to={"#block_4"} style={{ color: 'inherit' }}><p>What sort of learning falls into each area?</p></Link></li>
                                <li><Link to={"#block_5"} style={{ color: 'inherit' }}><p>What format should I write the descriptions in my listing?</p></Link></li>
                                <li><Link to={"#block_6"} style={{ color: 'inherit' }}><p>Can you help me if I’m still unsure?</p></Link></li>
                            </ul>
                        </TutorHereh5>
                        <CustomSeparator id="block_1" />
                        <TutorHereh3question>What framework are you using to categorise learning experiences?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>We are using the ‘Multiple Intelligences’ framework created by the psychologist <a style={{ color: '#06B0CD' }} target="_blank" rel="noopener noreferrer" href="http://multipleintelligencesoasis.org/about/" >Howard Gardner</a> to categorise the learning experiences. We call them ‘Strengths’.</p>
                            <Grid style={{ margin: 0, padding: 0, width: '100%' }}>
                                <Row style={{ margin: 0, padding: 0 }}>
                                    <Col xs={12} sm={12} md={6} lg={6} style={{ margin: '30px 0 0', padding: 0 }}>
                                        <Row style={{ margin: 0, padding: 0 }}>
                                            <Col xs={3} sm={3} md={3} lg={3} style={{ margin: 0, padding: 0 }}><Link to={"#section_11"} style={{ color: 'inherit' }}><HorizontalImage imgSrc={VerbalImg} caption={'Verbal'} /></Link></Col>
                                            <Col xs={3} sm={3} md={3} lg={3} style={{ margin: 0, padding: 0 }}><Link to={"#section_21"} style={{ color: 'inherit' }}><HorizontalImage imgSrc={LogicImg} caption={'Logic'} /></Link></Col>
                                            <Col xs={3} sm={3} md={3} lg={3} style={{ margin: 0, padding: 0 }}><Link to={"#section_12"} style={{ color: 'inherit' }}><HorizontalImage imgSrc={VisualImg} caption={'Visual'} /></Link></Col>
                                            <Col xs={3} sm={3} md={3} lg={3} style={{ margin: 0, padding: 0 }}><Link to={"#section_22"} style={{ color: 'inherit' }}><HorizontalImage imgSrc={MusicalImg} caption={'Musical'} /></Link></Col>
                                        </Row>
                                    </Col>
                                    <Col xs={12} sm={12} md={6} lg={6} style={{ margin: '30px 0 0', padding: 0 }}>
                                        <Row style={{ margin: 0, padding: 0 }}>
                                            <Col xs={3} sm={3} md={3} lg={3} style={{ margin: 0, padding: 0 }}><Link to={"#section_13"} style={{ color: 'inherit' }}><HorizontalImage imgSrc={BodyImg} caption={'Body'} /></Link></Col>
                                            <Col xs={3} sm={3} md={3} lg={3} style={{ margin: 0, padding: 0 }}><Link to={"#section_23"} style={{ color: 'inherit' }}><HorizontalImage imgSrc={PeopleImg} caption={'People'} /></Link></Col>
                                            <Col xs={3} sm={3} md={3} lg={3} style={{ margin: 0, padding: 0 }}><Link to={"#section_14"} style={{ color: 'inherit' }}><HorizontalImage imgSrc={InnerImg} caption={'Inner'} /></Link></Col>
                                            <Col xs={3} sm={3} md={3} lg={3} style={{ margin: 0, padding: 0 }}><Link to={"#section_24"} style={{ color: 'inherit' }}><HorizontalImage imgSrc={NaturalisticImg} caption={'Naturalistic'} /></Link></Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Grid>
                        </TutorHereh4body>
                        <CustomSeparator id="block_2" />
                        <TutorHereh3question>What is the Multiple Intelligences theory?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>This theory suggests that the traditional notion of intelligence, based on I.Q. testing, is too limited. Instead, Dr. Gardner proposes eight different intelligences to account for a broader range of human potential in children and adults.</p>
                            <p>The word ‘Intelligence’ drew criticism from the psychometric community who argued that these categories should be called traits or talents. However, the simple truth revealed was that many schools and cultures focus most of their attention on linguistic and logical-mathematical teaching and learning but we should also pay equal attention to individuals who show gifts in other significant areas: the artists, architects, musicians, naturalists, designers, dancers, therapists, entrepreneurs, and others who enrich and create value in our world.</p>
                        </TutorHereh4body>
                        <CustomSeparator id="block_3" />
                        <TutorHereh3question>Why don’t we use traditional subjects for categorising learning experiences?.</TutorHereh3question>
                        <TutorHereh4body>
                            <p>We don’t use subject categories as we want to emphasise overarching learning skills and behaviours over knowledge based content. This simple model helps teachers and parents be aware of the many doorways to presenting a topic, skill or learning experience and the many differing talents and receptive abilities of children.</p>
                            <p>This model for organising and searching for learning experiences avoids a hierarchy of subjects and celebrates the wide capacities and aptitudes to be nourished in the developing person.</p>
                            <p>We also think that the best learning experiences adopt an interdisciplinary approach that overcomes traditional barriers between different disciplines. This helps children to be able to understand and link concepts across many domains a key skill identified by future workplace skill forecasters.</p>
                        </TutorHereh4body>
                        <CustomSeparator id="block_4" />
                        <TutorHereh3question>What sort of learning falls into each area?</TutorHereh3question>
                        <TutorHereh4body>
                            <Grid style={{ margin: 0, padding: 0, width: '100%' }}>
                                <Row style={{ margin: 0, padding: 0 }}>
                                    <Col xs={12} sm={6} md={6} lg={6} style={{ margin: 0, padding: 0 }}>
                                        <TabularFeatures type={'left'}>
                                            <Row style={{ margin: 0, padding: 0 }}>
                                                <div id="section_11" style={{ padding: '30px 0', borderBottom: '1px solid #f5f5f5' }}>
                                                    <VerticalImage imgSrc={VerbalImg} caption={'Verbal'} />
                                                    <ul style={{ paddingLeft: 15 }}>
                                                        <li style={{ marginBottom: 10 }}>Reading and writing</li>
                                                        <li style={{ marginBottom: 10 }}>Thinking in words</li>
                                                        <li style={{ marginBottom: 10 }}>Remembering written and spoken information</li>
                                                        <li style={{ marginBottom: 10 }}>Using language to express and appreciate complex meanings</li>
                                                        <li style={{ marginBottom: 10 }}>Explaining things well and expanding vocabulary</li>
                                                        <li style={{ marginBottom: 10 }}>Understanding the order and meaning of words</li>
                                                        <li style={{ marginBottom: 10 }}>Reflecting abstractly on the use of language</li>
                                                        <li style={{ marginBottom: 10 }}>Debating and giving speeches</li>
                                                        <li style={{ marginBottom: 10 }}>Storytelling</li>
                                                        <li style={{ marginBottom: 10 }}>Using words to create images</li>
                                                        <li>Using humour, puns and word games Logic Strength</li>
                                                    </ul>
                                                </div>
                                                <div id="section_12" style={{ padding: '30px 0', borderBottom: '1px solid #f5f5f5' }}>
                                                    <VerticalImage imgSrc={VisualImg} caption={'Visual Strength'} />
                                                    <ul style={{ paddingLeft: 15 }}>
                                                        <li style={{ marginBottom: 10 }}>Drawing and painting</li>
                                                        <li style={{ marginBottom: 10 }}>Hand crafts</li>
                                                        <li style={{ marginBottom: 10 }}>Using and manipulating space</li>
                                                        <li style={{ marginBottom: 10 }}>Thinking and creating in three dimensions</li>
                                                        <li style={{ marginBottom: 10 }}>Capacity of mental imagery, spatial reasoning, image manipulation</li>
                                                        <li style={{ marginBottom: 10 }}>Graphic and artistic skills</li>
                                                        <li style={{ marginBottom: 10 }}>Putting puzzles together</li>
                                                        <li style={{ marginBottom: 10 }}>Interpreting pictures, graphs and charts</li>
                                                        <li style={{ marginBottom: 10 }}>Recognising patterns</li>
                                                        <li style={{ marginBottom: 10 }}>Working with maps and diagrams</li>
                                                        <li>Taking things apart and putting them back together</li>
                                                    </ul>
                                                </div>
                                                <div id="section_13" style={{ padding: '30px 0', borderBottom: '1px solid #f5f5f5' }}>
                                                    <VerticalImage imgSrc={BodyImg} caption={'Body Strength'} />
                                                    <ul style={{ paddingLeft: 15 }}>
                                                        <li style={{ marginBottom: 10 }}>Using one’s body</li>
                                                        <li style={{ marginBottom: 10 }}>Manipulating objects and using a variety of skills through mind-body union</li>
                                                        <li style={{ marginBottom: 10 }}>Dancing and sports</li>
                                                        <li style={{ marginBottom: 10 }}>Creating things with hands</li>
                                                        <li style={{ marginBottom: 10 }}>Physical coordination</li>
                                                        <li style={{ marginBottom: 10 }}>Using gross and fine motor skills</li>
                                                        <li style={{ marginBottom: 10 }}>Remembering by doing</li>
                                                        <li style={{ marginBottom: 10 }}>Engaging in risk taking with the body</li>
                                                        <li style={{ marginBottom: 10 }}>Acting, and mime</li>
                                                        <li style={{ marginBottom: 10, listStyle: 'none' }}>&nbsp;</li>
                                                        <li style={{ marginBottom: 10, listStyle: 'none' }}>&nbsp;</li>
                                                        <li style={{ marginBottom: 10, listStyle: 'none' }}>&nbsp;</li>
                                                        <li style={{ marginBottom: 10, listStyle: 'none' }}>&nbsp;</li>
                                                        <li style={{ marginBottom: 10, listStyle: 'none' }}>&nbsp;</li>
                                                        <li style={{ marginBottom: 15, listStyle: 'none' }}>&nbsp;</li>
                                                    </ul>
                                                </div>
                                                <div id="section_14" style={{ padding: '30px 0' }}>
                                                    <VerticalImage imgSrc={InnerImg} caption={'Inner Strength'} />
                                                    <ul style={{ paddingLeft: 15 }}>
                                                        <li style={{ marginBottom: 10 }}>Self awareness, self management, self motivation</li>
                                                        <li style={{ marginBottom: 10 }}>Authenticity</li>
                                                        <li style={{ marginBottom: 10 }}>Understanding one’s own motivations and emotions</li>
                                                        <li style={{ marginBottom: 10 }}>Reflecting, regulating and controlling own feelings and moods</li>
                                                        <li style={{ marginBottom: 10 }}>Understanding one’s own thoughts and feelings</li>
                                                        <li style={{ marginBottom: 10 }}>Using self knowledge in planning and directing one’s life</li>
                                                        <li style={{ marginBottom: 10 }}>Pursuing personal interests and setting individual plans and goals</li>
                                                        <li style={{ marginBottom: 10 }}>Receiving and being tuned to direct and subtle feedback</li>
                                                        <li>Appreciating the human condition</li>
                                                        <li style={{ marginBottom: 10, listStyle: 'none' }}>&nbsp;</li>
                                                    </ul>
                                                </div>
                                            </Row>
                                        </TabularFeatures>
                                    </Col>
                                    <Col xs={12} sm={6} md={6} lg={6} style={{ margin: 0, padding: 0 }}>
                                        <TabularFeatures type={'right'}>
                                            <Row style={{ margin: 0, padding: 0 }}>
                                                <div id="section_21" style={{ padding: '30px 0', borderBottom: '1px solid #f5f5f5' }}>
                                                    <VerticalImage imgSrc={LogicImg} caption={'Logic'} />
                                                    <ul style={{ paddingLeft: 15 }}>
                                                        <li style={{ marginBottom: 10 }}>Cognitive problem solving and operations</li>
                                                        <li style={{ marginBottom: 10 }}>Thinking about abstract ideas</li>
                                                        <li style={{ marginBottom: 10 }}>Analysing situations; examining how things work</li>
                                                        <li style={{ marginBottom: 10 }}>Conducting scientific experiments</li>
                                                        <li style={{ marginBottom: 10 }}>Solving complex computations</li>
                                                        <li style={{ marginBottom: 10 }}>Calculating, quantifying, considering propositions and hypothesis</li>
                                                        <li style={{ marginBottom: 10 }}>Perceiving relationships and connections</li>
                                                        <li style={{ marginBottom: 10 }}>Using symbolic thought and sequential reasoning skills</li>
                                                        <li style={{ marginBottom: 10 }}>Inductive and deductive thinking patterns</li>
                                                        <li style={{ marginBottom: 10, listStyle: 'none' }}>&nbsp;</li>
                                                        <li style={{ listStyle: 'none' }}>&nbsp;</li>
                                                    </ul>
                                                </div>
                                                <div id="section_22" style={{ padding: '30px 0', borderBottom: '1px solid #f5f5f5' }}>
                                                    <VerticalImage imgSrc={MusicalImg} caption={'Musical Strength'} />
                                                    <ul style={{ paddingLeft: 15 }}>
                                                        <li style={{ marginBottom: 10 }}>Creating, performing and appreciating music</li>
                                                        <li style={{ marginBottom: 10 }}>Singing and playing musical instruments</li>
                                                        <li style={{ marginBottom: 10 }}>Recognising musical patterns and tones</li>
                                                        <li style={{ marginBottom: 10 }}>Remembering songs and melodies</li>
                                                        <li style={{ marginBottom: 10 }}>Understanding musical structure, harmonies, rhythm and notes</li>
                                                        <li style={{ marginBottom: 10 }}>Matching feelings to music and rhythm</li>
                                                        <li style={{ marginBottom: 10, listStyle: 'none' }}>&nbsp;</li>
                                                        <li style={{ marginBottom: 10, listStyle: 'none' }}>&nbsp;</li>
                                                        <li style={{ marginBottom: 10, listStyle: 'none' }}>&nbsp;</li>
                                                        <li style={{ marginBottom: 10, listStyle: 'none' }}>&nbsp;</li>
                                                        <li style={{ listStyle: 'none' }}>&nbsp;</li>
                                                        <li style={{ listStyle: 'none' }}>&nbsp;</li>
                                                    </ul>
                                                </div>
                                                <div id="section_23" style={{ padding: '30px 0', borderBottom: '1px solid #f5f5f5' }}>
                                                    <VerticalImage imgSrc={PeopleImg} caption={'People Strength'} />
                                                    <ul style={{ paddingLeft: 15 }}>
                                                        <li style={{ marginBottom: 10 }}>Exercising empathy and compassion</li>
                                                        <li style={{ marginBottom: 10 }}>Understanding others’ needs, intentions and motivations</li>
                                                        <li style={{ marginBottom: 10 }}>Understanding and interacting effectively with others</li>
                                                        <li style={{ marginBottom: 10 }}>Using verbal and non verbal communication effectively</li>
                                                        <li style={{ marginBottom: 10 }}>Noting distinctions among others, such as moods and temperaments</li>
                                                        <li style={{ marginBottom: 10 }}>Entertaining multiple perspectives</li>
                                                        <li style={{ marginBottom: 10 }}>Social awareness, relationship management</li>
                                                        <li style={{ marginBottom: 10 }}>Resolving conflict in groups</li>
                                                        <li style={{ marginBottom: 10 }}>Enjoying friendships</li>
                                                        <li style={{ marginBottom: 10 }}>Leading, sharing, mediating</li>
                                                        <li style={{ marginBottom: 10 }}>Building consensus</li>
                                                        <li style={{ marginBottom: 10 }}>Helping others with their problems</li>
                                                        <li>Being an effective team member</li>
                                                    </ul>
                                                </div>
                                                <div id="section_24" style={{ padding: '30px 0' }}>
                                                    <VerticalImage imgSrc={NaturalisticImg} caption={'Naturalistic Strength'} />
                                                    <ul style={{ paddingLeft: 15 }}>
                                                        <li style={{ marginBottom: 10 }}>Interest and sensitivity to the features of the natural world</li>
                                                        <li style={{ marginBottom: 10 }}>Recognising, identifying and classifying flora and fauna</li>
                                                        <li style={{ marginBottom: 10 }}>Developing powers of observation in nature</li>
                                                        <li style={{ marginBottom: 10 }}>Interest in conservation and planetary flourishing</li>
                                                        <li style={{ marginBottom: 10 }}>Sensing patterns in and making connections to elements in nature</li>
                                                        <li style={{ marginBottom: 10 }}>Exploring human behaviours and habits, or those of other species</li>
                                                        <li style={{ marginBottom: 10 }}>Observing similarities, differences or changes in the environment</li>
                                                        <li style={{ marginBottom: 10 }}>Developing sensory perceptions</li>
                                                        <li>Categorising and cataloging things, noticing relationships in nature</li>
                                                    </ul>
                                                </div>
                                            </Row>
                                        </TabularFeatures>
                                    </Col>
                                </Row>
                            </Grid>
                        </TutorHereh4body>
                        <CustomSeparator id="block_5" />
                        <TutorHereh3question>What format should I write the descriptions in my listing?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>Think of your listing as your own personal website. Write descriptions in a clear and engaging way.</p>
                            <p>&nbsp;</p>
                            <NoMobileComponent>
                                <img alt="bookable-block" src={SvgImage} style={{ width: '100%' }} />
                            </NoMobileComponent>
                            <WithMobileComponent>
                                <img alt="bookable-block" src={SvgImageMobile} style={{ width: '100%' }} />
                            </WithMobileComponent>
                        </TutorHereh4body>
                        <CustomSeparator id="block_6" />
                        <TutorHereh3question>Can you help me if I’m still unsure?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>Yes!</p>
                            Drop us a line anytime to <a style={{ color: '#06B0CD' }} href={'mailto:hello@TutorHere.org'}>hello@TutorHere.org</a> or you can talk us using Live Chat.
                        </TutorHereh4body>
                    </TutorHereContent>
                </LayoutContainer>
            </Layout>),
        };
    },

};
