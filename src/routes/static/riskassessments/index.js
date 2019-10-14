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
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';

export default {

    path: '/riskassessments',

    action() {
        return {
            title: 'Risk Assessments',
            chunk: 'riskassessments',
            component: (<Layout>
                <LayoutContainer>
                    <TutorHereh1>Risk Assessments</TutorHereh1>
                    <TutorHereh3>
                        <p>Whatever you do with other people, from organising a party to holding a book club, you have a responsibility to do what you can to make sure people don’t get hurt. Doing a risk assessment can help with this.</p>
                        All mentors should be ready to show and discuss their Risk Assessments with parents.
                    </TutorHereh3>
                    <TutorHereContent>
                        <TutorHereh5>
                            <ul style={{ paddingLeft: 15 }}>
                                <li><Link to={"#block_1"} style={{ color: 'inherit' }}><p>What is a risk assessment?</p></Link></li>
                                <li><Link to={"#block_2"} style={{ color: 'inherit' }}><p>Common sense risk assessing.</p></Link></li>
                                <li><Link to={"#block_3"} style={{ color: 'inherit' }}><p>More formal risk assessing.</p></Link></li>
                                <li><Link to={"#block_4"} style={{ color: 'inherit' }}><p>Will it stop us from being able to do anything?</p></Link></li>
                                <li><Link to={"#block_5"} style={{ color: 'inherit' }}><p>Why write it down?</p></Link></li>
                                <li><Link to={"#block_6"} style={{ color: 'inherit' }}><p>What if something happens that I haven’t thought of?</p></Link></li>
                                <li><Link to={"#block_7"} style={{ color: 'inherit' }}><p>How to conduct a risk assessment.</p></Link></li>
                                <li><Link to={"#block_8"} style={{ color: 'inherit' }}><p>Sample risk assessments.</p></Link></li>
                                <li><Link to={"#block_9"} style={{ color: 'inherit' }}><p>Risk assessment template.</p></Link></li>
                            </ul>
                        </TutorHereh5>
                        <CustomSeparator id="block_1" />
                        <TutorHereh3question>What is a risk assessment?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>A risk assessment lists the different hazards that people might encounter whilst taking part in activities run by you.</p>
                            <p>Your risk assessment will be useful for you if:</p>
                            <ul style={{ paddingLeft: 15 }}>
                                <li><p>Everyone involved in activities for your group is aware of it and does what it says</p></li>
                                <li><p>You keep it up to date</p></li>
                                <li><p>It is realistic (you actually intend to do the things that you write down)</p></li>
                            </ul>
                            <p>Conducting a risk assessment for your group can seem like a big job, and it’s something people often find worrying. However, it doesn’t need to be complicated or difficult, and in most cases it is just a matter of common sense.</p>
                            <p>Remember, there is no point just having a risk assessment which goes in a drawer somewhere and never gets looked at. There is also no point in having one that says you won’t run any activities that might be hazardous, and then just ignoring it because it is too restrictive.</p>
                        </TutorHereh4body>
                        <CustomSeparator id="block_2" />
                        <TutorHereh3question>Common sense risk assessing.</TutorHereh3question>
                        <TutorHereh4body>
                            <p>People assess risk, and take action to minimise risk, all the time, everyday, in all sorts of situations. A lot of the time you don’t even notice you’re doing it.</p>
                            <p>Every time you cross the road, you assess the risk of being hit by a car, and make your decision about when and where to cross based on minimising this risk.</p>
                            <p>If you are taking care of children, you constantly assess the risk that they might injure themselves, and make decisions about what they are and are not allowed to do based on this.</p>
                            <p>Even just getting dressed in the morning, you assess the risk of getting very hot or very cold that day, and decide what to wear based on your assessment.</p>
                            <p>When you are organising activities with your group, you will also already be assessing risk in a common sense way, even if you’re not aware that you’re doing it.</p>
                        </TutorHereh4body>
                        <CustomSeparator id="block_3" />
                        <TutorHereh3question>More formal risk assessing.</TutorHereh3question>
                        <TutorHereh4body>
                            <p>When you conduct a risk assessment, you will think about the ways that harm could occur during your activities, and what you will do to reduce the risk of this happening. You will write down your thoughts and your decisions.</p>
                            <p>Most of the time, these will be the same decisions you would have made anyway, through common sense. However, you may also find that when you sit down to think about it, you identify possible hazards that might not have occurred to you.</p>
                            <p>The process of “conducting a risk assessment” helps ensure that your group has paid proper attention to reducing risk. Recording your decisions means you can refer to them in future and explain them to others.</p>
                        </TutorHereh4body>
                        <CustomSeparator id="block_4" />
                        <TutorHereh3question>Will it stop us from being able to do anything?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>Sometimes the idea of doing a risk assessment can make it feel scary to organise anything, in case something goes wrong and someone gets hurt.</p>
                            <p>Risk assessment is about achieving a balance between a reasonable level of risk, and being able to get on with organising your activities. Remember, no activity is completely free from risk, and doing a risk assessment is not about making your activities risk free.</p>
                            <p>Instead of trying to make your activities risk free, think about measures you can put in place to reduce risk. In particular, if you think something is particularly dangerous, and you are worried that someone will get hurt, think about what you change to make it less dangerous.</p>
                            <p>Imagine you wanted to run an activity with a bouncy castle for children. This is a popular activity and lots of children would really love it. However, if a child falls off the bouncy castle, they could get seriously injured. Because of this, when you do your risk assessment, you might decide to make some changes to your plans to reduce the risk of a child falling off and getting hurt. You might put some soft mats in front of the bouncy castle, and have a maximum number of children who are allowed to use it at one time. This way, the children can still enjoy the bouncy castle, but will be less likely to injure themselves.</p>
                        </TutorHereh4body>
                        <CustomSeparator id="block_5" />
                        <TutorHereh3question>Why write it down?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>Writing your decisions down can feel unnecessary, especially when they are things you would have done anyway. However, there are a number of reasons why it can be useful to put your decisions into a written risk assessment.</p>
                            <p>Writing a risk assessment helps you to think things through. Taking the time to sit down and write a risk assessment makes you focus on thinking about what the hazards are, and whether there is anything you could do to decrease their likelihood or severity. It gives you a structure in which to think this through, instead of relying on things just occurring to you.</p>
                            <p>Having a written risk assessment helps other people involved to take joint responsibility for risk. Doing a risk assessment provides an opportunity to discuss hazards and make joint decisions about them. You can then take shared responsibility for these decisions. In the bouncy castle example above, a written risk assessment, agreed by a designated group, sets out how many children are allowed on the bouncy castle at one time. This means that each volunteer who takes a turn supervising the castle can enforce the rule knowing they have the support of the group.</p>
                            <p>It may be difficult to make an insurance claim without a risk assessment. If you have public liability insurance, and want to make a claim because there has been an accident, you will probably need to prove that you did everything you could reasonably have done to avoid the accident. Having a written risk assessment can help to provide this evidence. This will only work if you stick to the decisions written in your risk assessment though! There’s no point having a risk assessment that says you will put soft mats in front of a bouncy castle, if you actually never do this.</p>
                        </TutorHereh4body>
                        <CustomSeparator id="block_6" />
                        <TutorHereh3question>What if something happens that I haven’t thought of?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>With the best will in the world, you cannot predict everything that might happen. Even if you have a written risk assessment, you must continue to make common sense judgments about danger and hazards as your activity goes on.</p>
                            <p>For example:</p>
                            <p>You might have thought through how to make your bouncy castle as safe as possible, but then someone spills a bottle of washing up liquid on it, making it very slippery! Common sense would tell you not to let children jump on the castle until it was clean and dry. Later, you could think about whether you think it was a one off event, or whether it might happen again. You might decide to add it to your written risk assessment for the future.</p>
                        </TutorHereh4body>
                        <CustomSeparator id="block_7" />
                        <TutorHereh3question>How to conduct a risk assessment.</TutorHereh3question>
                        <TutorHereh4body>
                            <p>You need to think through each element of your activity/equipment/venue. Think about what could go wrong, and what you are going to do to avoid this. Then write down your decisions, and the reasons you have made them. Make sure you include things that you have already planned to do (e.g. if you are already planning to use soft mats in front of the bouncy castle, you should still include this in the risk assessment). You may find it useful to write down your thoughts and decisions in a grid which includes what the hazards are and what you will do to avoid them. We have supplied a grid for your use <a style={{ color: '#06B0CD' }} rel="noopener noreferrer" target="_blank" href={'https://docs.google.com/document/d/1WURHxQN3hB9D6M_WjNJf8wuSPNthygJsN9lT02dLGS8/edit?usp=sharing'}>here.</a></p>
                        </TutorHereh4body>
                        <CustomSeparator id="block_8" />
                        <TutorHereh3question>Sample risk assessments.</TutorHereh3question>
                        <TutorHereh3question>Venue</TutorHereh3question>
                        <TutorHereh4body>
                            <p>Risk assessing a venue requires inspecting it thoroughly and working out where and how people could get hurt. Are there loose bits of carpet people could trip on? Could the floor be slippery if wet? Could someone be hurt carrying the tables around? Think about all the things that could cause problems, and what you have done or will do to minimise the risk.</p>
                            <p>&nbsp;</p>
                            <p>Example:</p>
                            <p style={{ padding: '20px 40px', background: '#E9EEEF' }}>Imagine you are mentoring in a village hall. You have noticed that if the tables are stacked incorrectly, they could fall and injure someone. To reduce this risk, you decide to instruct all parent helpers in how to stack the tables correctly. Once you have decided this, you should make a note of the hazard, and what you will do to avoid it, in your risk assessment.</p>
                            <a style={{ color: '#06B0CD' }} rel="noopener noreferrer" target="_blank" href={'https://docs.google.com/document/d/1rvE1GnLl5N0zmiGxrvFAaYRl-7qRUMTTCnw1T3u1_Bg/edit?usp=sharing'}>Sample risk assessment of a venue</a>
                        </TutorHereh4body>
                        <TutorHereh3question>Equipment</TutorHereh3question>
                        <TutorHereh4body>
                            <p>If you are risk assessing a specific piece of equipment, you need to think about how it will be used and how people could get hurt using it. Could it be dangerous if it is not well maintained? Could people be hurt if they don’t use it correctly? How will you try to ensure these things don’t happen?</p>
                            <p>&nbsp;</p>
                            <p>Example:</p>
                            <p style={{ padding: '20px 40px', background: '#E9EEEF' }}>Imagine you have bought a PA system to use at a drama experience. You identify that it is very heavy, and someone could injure themselves trying to lift it. To minimise this risk, you decide to buy a trolley, and make sure all helpers know that they should use this to move it around. Once you have decided this, you should write down the hazard, and what you have done to minimise it, in your risk assessment.</p>
                            <a style={{ color: '#06B0CD' }} rel="noopener noreferrer" target="_blank" href={'https://docs.google.com/document/d/1lDGv7UBPIw51c1A5cADS-FgTJPU3P-0UiyW4JIbxXlE/edit?usp=sharing'}>Sample risk assessment for a piece of equipment</a>
                        </TutorHereh4body>
                        <TutorHereh3question>Event / Activity</TutorHereh3question>
                        <TutorHereh4body>
                            <p>A risk assessment for an event or activity needs to include:</p>
                            <ul style={{ paddingLeft: 15 }}>
                                <li><p>The venue/where it will be held (see venue risk assessment).</p></li>
                                <li><p>The equipment that will be used (see equipment risk assessment).</p></li>
                                <li><p>The people who will be attending. Do they have any particular needs that might make them more likely to hurt themselves? Do you need to make sure children are supervised? Is there anyone attending that could hurt anyone else?</p></li>
                            </ul>
                            <p>&nbsp;</p>
                            <p>Example:</p>
                            <div style={{ padding: '20px 40px', background: '#E9EEEF', marginBottom: 10 }}>
                                <p>Imagine you are running a children’s cycling activity. You identify the following hazards:</p>
                                <ul style={{ paddingLeft: 15 }}>
                                    <li><p>If unsupervised, the children could take dangerous risks and potentially harm themselves.</p></li>
                                    <li><p>There is one child that sometimes gets angry and has in the past injured other children.</p></li>
                                </ul>
                                <p>&nbsp;</p>
                                <p>To minimise the risk of harm to the children, you decide to:</p>
                                <ul style={{ paddingLeft: 15 }}>
                                    <li><p>Make sure there is at least 1 adult per 6 children, so they can be properly supervised.</p></li>
                                    <li><p>Have one adult especially assigned to supporting the child who gets angry, so that they can take part and enjoy the activity while minimising risk to others.</p></li>
                                </ul>
                            </div>
                            <p>Once you have decided this, you should write it down in your risk assessment.</p>
                            <p>&nbsp;</p>
                            <p style={{ marginBottom: 20 }}>The activity itself: In what ways could people be hurt participating in the activity?</p>
                            <p>Example:</p>
                            <div style={{ padding: '20px 40px', background: '#E9EEEF', marginBottom: 10 }}>
                                <p>Imagine you are running a yoga class. You identify the following hazard:</p>
                                <ul style={{ paddingLeft: 15 }}>
                                    <li><p>People with existing back problems could injure themselves if they do something too strenuous.</p></li>
                                </ul>
                                <p>&nbsp;</p>
                                <p>To minimise the risk of injury, you decide to:</p>
                                <ul style={{ paddingLeft: 15 }}>
                                    <li><p>Ask all participants to tell the teacher about any existing injuries, so that the activity is appropriate for the participants.</p></li>
                                </ul>
                            </div>
                            <p>Once you have decided this, you should write it down in your risk assessment.</p>
                            <a style={{ color: '#06B0CD' }} rel="noopener noreferrer" target="_blank" href={'https://docs.google.com/document/d/1m84xEvv4IO7OwrcEfgwtZvMTiWU8E1YCX5vx2KUz3jY/edit?usp=sharing'}>Sample risk assessment of an activity</a>
                        </TutorHereh4body>
                        <CustomSeparator id="block_9" />
                        <TutorHereh3question>Risk assessment template.</TutorHereh3question>
                        <TutorHereh4body>
                            <p>We’ve supplied a blank grid should you need one to create your risk assessment.</p>
                            <a style={{ color: '#06B0CD' }} rel="noopener noreferrer" target="_blank" href={'https://docs.google.com/document/d/1WURHxQN3hB9D6M_WjNJf8wuSPNthygJsN9lT02dLGS8/edit?usp=sharing'}>Risk assessment template</a>
                        </TutorHereh4body>
                        <CustomSeparator id="block_10" />
                        <TutorHereh4body>If you have any further questions please contact us via Live Chat or email at <a style={{ color: '#06B0CD' }} href={'mailto:hello@TutorHere.org'}>hello@TutorHere.org</a></TutorHereh4body>
                    </TutorHereContent>
                </LayoutContainer>
            </Layout>),
        };
    },

};
