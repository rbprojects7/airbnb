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

    path: '/safeguarding',

    action() {

        return {
            title: 'Safeguarding',
            chunk: 'safeguarding',
            component: (<Layout>
                <LayoutContainer>
                    <TutorHereh1>Safeguarding</TutorHereh1>
                    <TutorHereh3>
                        <p>The TutorHere platform is an introducer, not an employer or agent. Parents must take full responsibility to satisfy themselves about the safety and suitability of individual mentors and their offered learning experiences.</p>
                        <p>Please see our <a style={{ color: '#06B0CD' }} target={'_blank'} href={'/page/terms-services.pdf'}>Terms of Service</a> for full details.</p>
                    </TutorHereh3>
                    <TutorHereContent>
                        <TutorHereh5>
                            <ul style={{ paddingLeft: 15 }}>
                                <li><Link to={"#block_1"} style={{ color: 'inherit' }}><p>What safety provisions can be indicated on a learning experience listing?</p></Link></li>
                                <li><Link to={"#block_2"} style={{ color: 'inherit' }}><p>Is this a complete list of all possible safety provisions?</p></Link></li>
                                <li><Link to={"#block_3"} style={{ color: 'inherit' }}><p>Has TutorHere checked the safety provisions shown in the listings?</p></Link></li>
                                <li><Link to={"#block_4"} style={{ color: 'inherit' }}><p>Should I ask the Mentor to show me evidence of the safety provisions listed?</p></Link></li>
                                <li><Link to={"#block_5"} style={{ color: 'inherit' }}><p>What safety measures should I be looking for as a parent?</p></Link></li>
                                <li><Link to={"#block_6"} style={{ color: 'inherit' }}><p>What is a DBS check?</p></Link></li>
                                <li><Link to={"#block_7"} style={{ color: 'inherit' }}><p>Is a DBS check a legal requirement?</p></Link></li>
                                <li><Link to={"#block_8"} style={{ color: 'inherit' }}><p>Can I apply for my own DBS check?</p></Link></li>
                                <li><Link to={"#block_9"} style={{ color: 'inherit' }}><p>Who should I contact if I have any questions about safeguarding either as a Mentor, parent or child?</p></Link></li>
                                <li><Link to={"#block_10"} style={{ color: 'inherit' }}><p>Useful Resources for Mentors and Parents.</p></Link></li>
                            </ul>
                        </TutorHereh5>
                        <CustomSeparator id="block_1" />
                        <TutorHereh3question>What safety provisions can be indicated on a learning experience listing?</TutorHereh3question>
                        <TutorHereh4body>
                            <ul style={{ paddingLeft: 15 }}>
                                <li style={{ marginBottom: 10 }}>Basic DBS</li>
                                <li style={{ marginBottom: 10 }}>Enhanced DBS</li>
                                <li style={{ marginBottom: 10 }}>Risk Assessment</li>
                                <li style={{ marginBottom: 10 }}>Public Liability Insurance</li>
                                <li style={{ marginBottom: 10 }}>Smoke detector</li>
                                <li style={{ marginBottom: 10 }}>First aid training</li>
                                <li style={{ marginBottom: 10 }}>First aid kit</li>
                                <li>Safeguarding training</li>
                            </ul>
                        </TutorHereh4body>
                        <CustomSeparator id="block_2" />
                        <TutorHereh3question>Is this a complete list of all possible safety provisions?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>No.</p>
                            <p>This is just a snapshot of information to help parents make their initial enquiries. There are many other possible checks and safety provisions that may be necessary in various circumstances.</p>
                            If you are a mentor and would like to highlight more safety provisions, please do this in your description or profile.
                        </TutorHereh4body>
                        <CustomSeparator id="block_3" />
                        <TutorHereh3question>Has TutorHere checked the safety provisions shown in the listings?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>No.</p>
                            This information is a declaration by education providers and is not verified by us. It is the full responsibility of parents to make any checks they deem necessary.
                        </TutorHereh4body>
                        <CustomSeparator id="block_4" />
                        <TutorHereh3question>Should I ask the Mentor to show me evidence of the safety provisions listed?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>Yes.</p>
                            Ask for all the information you need to feel completely reassured that your child is safe. Your Mentor should be able to show you all relevant documents, equipment and precautions on request.
                        </TutorHereh4body>
                        <CustomSeparator id="block_5" />
                        <TutorHereh3question>What safety measures should I be looking for as a parent?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>As a parent you already make judgements everyday concerning the safety of your children. Each situation is unique and it wouldn’t be possible to list every scenario here. The age of your child, the nature of the activity, the location, other parties involved, whether you are present etc will all form part of your decision. As a platform we don’t want to prescribe safety requirements that may, in some circumstances be insufficient and in others be too onerous.</p>
                            <p>If you are in any doubt at all always ask for more information and reassurance.</p>
                            Never leave your child unattended in a situation where you have any doubts about the safety.
                        </TutorHereh4body>
                        <CustomSeparator id="block_6" />
                        <TutorHereh3question>What is a DBS check?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>Standard DBS checks show details of spent and unspent convictions, cautions, reprimands and final warnings held on police records.</p>
                            <p>Enhanced DBS checks show the same information as standard checks, plus any additional information held by local police considered relevant to the role in question.</p>
                            <p>Enhanced DBS with barred lists checks show the same information as Enhanced checks, but also include a check of the DBS barred lists. A person may have no criminal convictions but may still be barred from working with children.</p>
                            DBS information is only valid at the time of the check.
                        </TutorHereh4body>
                        <CustomSeparator id="block_7" />
                        <TutorHereh3question>Is a DBS check a legal requirement?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>No.</p>
                            Many companies and organisations state that employers must have a DBS Check, however, these are policies and procedures they have put in place for best practice purposes. Apart from certain regulated activities, there’s no legal requirement for anyone to have a DBS check.
                        </TutorHereh4body>
                        <CustomSeparator id="block_8" />
                        <TutorHereh3question>Can I apply for my own DBS check?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>Enhanced DBS checks can only be applied for by employers rather than employees or self-employed education providers.</p>
                            However, if you live in England or Wales, it is now possible to request your own basic DBS check for a fee of £25 directly from the Disclosure and Barring Service.
                        </TutorHereh4body>
                        <CustomSeparator id="block_9" />
                        <TutorHereh3question>Who should I contact if I have any questions about safeguarding either as a Mentor, parent or child?</TutorHereh3question>
                        <TutorHereh4body>
                            <p>The NSPCC helpline provides help and support to thousands of parents, professionals and families.</p>
                            <p><a style={{ color: '#06B0CD' }} href={'mailto:help@nspcc.org.uk'}>help@nspcc.org.uk</a></p>
                            <a style={{ color: '#06B0CD' }} href={'tel:08088005000'}>Call: 0808 800 5000</a>
                        </TutorHereh4body>
                        <CustomSeparator id="block_10" />
                        <TutorHereh3question>Useful Resources for Mentors and Parents.</TutorHereh3question>
                        <TutorHereh4body>
                            <p>Safeguarding Training</p>
                            <p>Prospero Teaching’s Safeguarding free accredited CPD course ensures you’re able to teach in UK schools and gives you an understanding of the UK’s safeguarding public sector framework. Divided into a series of video segments, their training focuses on the key elements of ensuring a safe environment for children and young people.</p>
                            <p><a style={{ color: '#06B0CD' }} rel="noopener noreferrer" href={'https://www.prosperoteaching.com'} target="_blank">prosperoteaching.com</a></p>
                            <p>&nbsp;</p>
                            <p>First Aid</p>
                            <p>Courses are regularly available throughout the UK at a range of venues. You can search for suitable courses and dates on the British Red Cross First Aid Training Website.</p>
                            <p><a style={{ color: '#06B0CD' }} rel="noopener noreferrer" href={'https://www.redcross.org.uk'} target="_blank">www.redcross.org.uk</a></p>
                            <p>&nbsp;</p>
                            <p>Disclosure & Barring Service</p>
                            <p>The Disclosure and Barring Service (DBS) helps employers make safer recruitment decisions. DBS is an executive non-departmental public body, sponsored by the Home Office.</p>
                            <p><a style={{ color: '#06B0CD' }} href={'mailto:customerservices@dbs.gov.uk'}>customerservices@dbs.gov.uk</a></p>
                            <p><a style={{ color: '#06B0CD' }} href={'tel:03000200190'}>DBS helpline: 03000 200 190</a></p>
                            <p><a style={{ color: '#06B0CD' }} href={'https://www.gov.uk/government/organisations/disclosure-and-barring-service'}>www.gov.uk/government/organisations/disclosure-and-barring-service</a></p>
                            <p>&nbsp;</p>
                            <p>The NSPCC helpline</p>
                            <p>This is a service adults can access by phone or online to get advice or share their concerns about a child, anonymously if they wish. It’s staffed by professional practitioners with backgrounds in jobs like teaching, healthcare and social work, who can answer all your safeguarding questions and concerns.</p>
                            <p><a style={{ color: '#06B0CD' }} href={'https://help@nspcc.org.uk'}>help@nspcc.org.uk</a></p>
                            <p><a style={{ color: '#06B0CD' }} href={'tel:08088005000'}>Call: 0808 800 5000</a></p>
                            <p>&nbsp;</p>
                            <p>Child Sex Offender Discloser Scheme</p>
                            <p>The child sex offender disclosure scheme allows parents, carers and guardians to formally ask the police to tell them if someone has a record for child sexual offences.</p>
                            <p><a style={{ color: '#06B0CD' }} href={'https://www.gov.uk/government/publications/child-sex-offender-disclosure-scheme-guidance'}>www.gov.uk/government/publications/child-sex-offender-disclosure-scheme-guidance</a></p>
                        </TutorHereh4body>
                        <CustomSeparator id="block_10" />
                        <TutorHereh4body>If you have any further questions please contact us via Live Chat or email at <a style={{ color: '#06B0CD' }} href={'mailto:hello@TutorHere.org'}>hello@TutorHere.org</a></TutorHereh4body>
                    </TutorHereContent>
                </LayoutContainer>
            </Layout>),
        };
    },

};
