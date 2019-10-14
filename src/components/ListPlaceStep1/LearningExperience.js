// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux Form
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
// Redux
import { connect } from 'react-redux';
// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
// Locale
import messages from '../../locale/messages';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
    Grid,
    Button,
    Row,
    FormGroup,
    Col,
    FormControl
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';
import updateStep1 from './updateStep1';
import { getListingData } from '../../actions/getListing';
import { UpdateStarListing } from '../../actions/Listing/UpdateStarListing';
import VerticalImage from '../submenus/Layouts/vertical-image';
import defaultPic from './StrengthsDefault.svg';
import VerbalImgSelected from './SelectedSvgs/Verbal.svg';
import LogicImgSelected from './SelectedSvgs/Logic.svg';
import VisualImgSelected from './SelectedSvgs/Visual.svg';
import MusicalImgSelected from './SelectedSvgs/Musical.svg';
import BodyImgSelected from './SelectedSvgs/Body.svg';
import PeopleImgSelected from './SelectedSvgs/People.svg';
import InnerImgSelected from './SelectedSvgs/Inner.svg';
import NaturalisticImgSelected from './SelectedSvgs/Naturalistic.svg';
import CustomStarRating from './CustomStarRating';
import Loader from '../Loader';

class LearningExperience extends Component {
    static propTypes = {
        initialValues: PropTypes.object,
        nextPage: PropTypes.func,
        previousPage: PropTypes.func,
        change: PropTypes.func,
        formatMessage: PropTypes.func,
        isExistingList: PropTypes.bool,
        onSubmit: PropTypes.func,
        getListingData: PropTypes.func,
        UpdateStarListing: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.setStrengthType = this.setStrengthType.bind(this);
        this.state = {
            isDisabled: false,
            type: '',
        };
        this.onBlur = this.onBlur.bind(this);
    }

    componentDidMount() {
        const { formErrors, listingFields } = this.props;
        if (formErrors != undefined) {
            if (formErrors.hasOwnProperty('syncErrors')) {
                this.setState({ isDisabled: true });
            } else {
                this.setState({ isDisabled: false });
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        const { formErrors, listingFields, isExistingList } = nextProps;
        if (formErrors != undefined) {
            if (formErrors.hasOwnProperty('syncErrors')) {
                this.setState({ isDisabled: true });
            } else {
                this.setState({ isDisabled: false });
            }
        }
    }

    renderStarRating = ({ input, meta: { touched, error }, children, className, value, currentValue }) => (
        <div className={s.starSize}>
            {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
            <CustomStarRating
              name={input.name}
              change={input.onChange}
              editing
              value={currentValue}
              className={s.learningStarRating}
            />

        </div>
        );
    renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
        const { formatMessage } = this.props.intl;

        return (
            <div>
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                <FormControl
                  {...input}
                  className={className}
                  placeholder={label}
                  componentClass={"textarea"}
                />

            </div>
        );
    }

    setStrengthType = type => this.setState({ type });

    showStrengths = () => {
        const { type } = this.state;
        switch(type) {
        case 'Verbal':
            return (<div style={{ padding: '30px 0' }}>
                <VerticalImage imgSrc={VerbalImgSelected} caption={'Verbal'} closeType onClose={() => this.setStrengthType('')} />
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
            </div>);
        case 'Logic':
            return (<div style={{ padding: '30px 0' }}>
                <VerticalImage imgSrc={LogicImgSelected} caption={'Logic'} closeType onClose={() => this.setStrengthType('')} />
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
            </div>);
        case 'Visual':
            return (<div style={{ padding: '30px 0' }}>
                <VerticalImage imgSrc={VisualImgSelected} caption={'Visual'} closeType onClose={() => this.setStrengthType('')} />
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
            </div>);
        case 'Musical':
            return (<div style={{ padding: '30px 0' }}>
                <VerticalImage imgSrc={MusicalImgSelected} caption={'Musical Strength'} closeType onClose={() => this.setStrengthType('')} />
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
            </div>);
        case 'People':
            return (<div style={{ padding: '30px 0' }}>
                <VerticalImage imgSrc={PeopleImgSelected} caption={'People Strength'} closeType onClose={() => this.setStrengthType('')} />
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
            </div>);
        case 'Naturalistic':
            return (<div style={{ padding: '30px 0' }}>
                <VerticalImage imgSrc={NaturalisticImgSelected} caption={'Naturalistic Strength'} closeType onClose={() => this.setStrengthType('')} />
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
            </div>);
        case 'Body':
            return (<div style={{ padding: '30px 0' }}>
                <VerticalImage imgSrc={BodyImgSelected} caption={'Body Strength'} closeType onClose={() => this.setStrengthType('')} />
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
            </div>);
        case 'Inner':
            return (<div style={{ padding: '30px 0' }}>
                <VerticalImage imgSrc={InnerImgSelected} caption={'Inner Strength'} closeType onClose={() => this.setStrengthType('')} />
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
            </div>);
        default:
            return (<img alt="default" src={defaultPic} />);
        }
    }

    onBlur(e) {
        const name = e.target.name;
        const value = e.target.value;
        const { listId, UpdateStarListing } = this.props;
        this.setState({ type: '' });
        UpdateStarListing(listId, name, value);
    }

    render() {
        const { error, handleSubmit, submitting, dispatch, nextPage, previousPage } = this.props;
        const { isExistingList, loading, onSubmit, getListingData, UpdateStarListing } = this.props;
        const { isDisabled, type } = this.state;
        const { verbalStrength, logicStrength, visualStrength } = this.props;
        const { musicalStrength, bodyStrength, peopleStrength, innerStrength,
            nauralisticStrength } = this.props;
        const { formatMessage } = this.props.intl;
        const { listId } = this.props;

        return (
            <Grid>
                <Row>
                    <Col xs={12} sm={6} md={6} lg={6} className={s.landingContent}>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <h3 className={cx(s.landingContentTitle, s.landingTitleMargin)}>
                                <span><FormattedMessage {...messages.learningExperience} /> <span><FormattedMessage {...messages.learningExperience1} /></span> <FormattedMessage {...messages.learningExperience2} /></span>
                            </h3>
                            <form onSubmit={handleSubmit}>
                                <div className={s.landingMainContent}>
                                    {/* <p className={cx(s.landingStep2)}><FormattedMessage {...messages.learningDescription} /></p> */}
                                    <div className={cx(s.space6)}>

                                        {verbalStrength >= 1 && <div >
                                            <FormGroup className={cx(s.formGroup, s.listContent, s.listText)}>
                                                <span className={s.checkBoxSection}>
                                                    <CustomStarRating name={"verbalStrength"} value={verbalStrength} />
                                                </span>
                                                <span className={cx(s.checkBoxSection, s.checkBoxLabel, s.learningLabel)}>
                                                    <FormattedMessage {...messages.verbalStrength} />
                                                </span>
                                                <Field
                                                  name="verbalDescription"
                                                  component={this.renderFormControlTextArea}
                                                  label={formatMessage(messages.bodyDescription)}
                                                  className={cx(s.textareaInput, s.formControlMuted, s.textareaHeight)} onBlur={this.onBlur} onFocus={() => this.setStrengthType('Verbal')}
                                                />
                                            </FormGroup>
                                        </div>
                                        }
                                        {logicStrength >= 1 && <div>
                                            <FormGroup className={cx(s.formGroup, s.listContent, s.listText)}>
                                                <span className={s.checkBoxSection}>
                                                    <CustomStarRating name={"logicStrength"} value={logicStrength} currentValue={logicStrength} /></span>
                                                <span className={cx(s.checkBoxSection, s.checkBoxLabel, s.learningLabel)}>
                                                    <FormattedMessage {...messages.logicStrength} /></span>
                                                <Field
                                                  name="logicDescription"
                                                  component={this.renderFormControlTextArea}
                                                  label={formatMessage(messages.bodyDescriptionStep1)}
                                                  className={cx(s.textareaInput, s.formControlMuted, s.textareaHeight)} onBlur={this.onBlur} onFocus={() => this.setStrengthType('Logic')}
                                                />
                                            </FormGroup>
                                        </div>
                                        }
                                        {visualStrength >= 1 && <div>
                                            <FormGroup className={cx(s.formGroup, s.listContent, s.listText)}>
                                                <span className={s.checkBoxSection}>
                                                    <CustomStarRating name={"visualStrength"} value={visualStrength} currentValue={visualStrength} /></span>
                                                <span className={cx(s.checkBoxSection, s.checkBoxLabel, s.learningLabel)}>
                                                    <FormattedMessage {...messages.visualStrength} /></span>
                                                <Field
                                                  name="visualDescription"
                                                  component={this.renderFormControlTextArea}
                                                  label={formatMessage(messages.bodyDescriptionStep2)}
                                                  className={cx(s.textareaInput, s.formControlMuted, s.textareaHeight)} onBlur={this.onBlur} onFocus={() => this.setStrengthType('Visual')}
                                                />
                                            </FormGroup>
                                        </div>
                                        }
                                        {musicalStrength >= 1 && <div>
                                            <FormGroup className={cx(s.formGroup, s.listContent, s.listText)}>
                                                <span className={s.checkBoxSection}>
                                                    <CustomStarRating name={"musicalStrength"} value={musicalStrength} currentValue={musicalStrength} /></span>
                                                <span className={cx(s.checkBoxSection, s.checkBoxLabel, s.learningLabel)}>
                                                    <FormattedMessage {...messages.musicalStrength} /></span>
                                                <Field
                                                  name="musicalDescription"
                                                  component={this.renderFormControlTextArea}
                                                  label={formatMessage(messages.bodyDescriptionStep3)}
                                                  className={cx(s.textareaInput, s.formControlMuted, s.textareaHeight)} onBlur={this.onBlur} onFocus={() => this.setStrengthType('Musical')}
                                                />
                                            </FormGroup>
                                        </div>
                                        }
                                        {bodyStrength >= 1 && <div>
                                            <FormGroup className={cx(s.formGroup, s.listContent, s.listText)}>
                                                <span className={s.checkBoxSection}>
                                                    <CustomStarRating name={"bodyStrength"} value={bodyStrength} currentValue={bodyStrength} /></span>
                                                <span className={cx(s.checkBoxSection, s.checkBoxLabel, s.learningLabel)}>
                                                    <FormattedMessage {...messages.bodyStrength} /></span>
                                                <Field
                                                  name="bodyDescription"
                                                  component={this.renderFormControlTextArea}
                                                  label={formatMessage(messages.bodyDescriptionStep4)}
                                                  className={cx(s.textareaInput, s.formControlMuted, s.textareaHeight)} onBlur={this.onBlur} onFocus={e => this.setStrengthType('Body')}
                                                />
                                            </FormGroup>
                                        </div>
                                        }
                                        {peopleStrength >= 1 && <div>
                                            <FormGroup className={cx(s.formGroup, s.listContent, s.listText)}>
                                                <span className={s.checkBoxSection}>
                                                    <CustomStarRating name={"peopleStrength"} value={peopleStrength} currentValue={peopleStrength} /></span>
                                                <span className={cx(s.checkBoxSection, s.checkBoxLabel, s.learningLabel)}>
                                                    <FormattedMessage {...messages.peopleStrength} /></span>
                                                <Field
                                                  name="peopleDescription"
                                                  component={this.renderFormControlTextArea}
                                                  label={formatMessage(messages.bodyDescriptionStep5)}
                                                  className={cx(s.textareaInput, s.formControlMuted, s.textareaHeight)} onBlur={this.onBlur} onFocus={() => this.setStrengthType('People')}
                                                />
                                            </FormGroup>
                                        </div>}
                                        {innerStrength >= 1 && <div>
                                            <FormGroup className={cx(s.formGroup, s.listContent, s.listText)}>
                                                <span className={s.checkBoxSection}>
                                                    <CustomStarRating name={"innerStrength"} value={innerStrength} currentValue={innerStrength} /></span>
                                                <span className={cx(s.checkBoxSection, s.checkBoxLabel, s.learningLabel)}>
                                                    <FormattedMessage {...messages.innerStrength} /></span>
                                                <Field
                                                  name="innerDescription"
                                                  component={this.renderFormControlTextArea}
                                                  label={formatMessage(messages.bodyDescriptionStep6)}
                                                  className={cx(s.textareaInput, s.formControlMuted, s.textareaHeight)} onBlur={this.onBlur} onFocus={() => this.setStrengthType('Inner')}
                                                />
                                            </FormGroup>
                                        </div>
                                        }
                                        {nauralisticStrength >= 1 && <div>
                                            <FormGroup className={cx(s.formGroup, s.listContent, s.listText)}>
                                                <span className={s.checkBoxSection}>
                                                    <CustomStarRating name={"nauralisticStrength"} value={nauralisticStrength} currentValue={nauralisticStrength} /></span>
                                                <span className={cx(s.checkBoxSection, s.checkBoxLabel, s.learningLabel)}>
                                                    <FormattedMessage {...messages.nauralisticStrength} /></span>
                                                <Field
                                                  name="nauralisticDescription"
                                                  component={this.renderFormControlTextArea}
                                                  label={formatMessage(messages.bodyDescriptionStep7)}
                                                  className={cx(s.textareaInput, s.formControlMuted, s.textareaHeight)} onBlur={this.onBlur} onFocus={() => this.setStrengthType('Naturalistic')}
                                                />
                                            </FormGroup>
                                        </div>}
                                    </div>

                                </div>
                                <hr className={s.horizontalLineThrough} />

                                <FormGroup className={s.formGroup}>
                                    <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                                        <Button className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft)} onClick={() => previousPage("learning")}>
                                            <FormattedMessage {...messages.back} />
                                        </Button>
                                        {/* <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)} onClick={() => nextPage("learning-aims")}>
                                            <FormattedMessage {...messages.next} />
                                                                    </Button> */}
                                        {
                                            isExistingList && <Button
                                                //  type={"button"}
                                                //  label={"Next"}
                                              buttonType={"submit"}
                                              className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)}
                                                //  onClick={() => history.push("learning-aims")}
                                              disabled={isDisabled}
                                              onClick={handleSubmit(updateStep1)}
                                            //  handleClick={() => getListingData()}
                                            >
                                                <FormattedMessage {...messages.next} />
                                            </Button>
                                        }

                                        {
                                            !isExistingList && <Loader
                                              type={"button"}
                                              label={"Save & Continue"}
                                              buttonType={"submit"}
                                              show={loading}
                                              disabled={error || submitting}
                                              className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)}
                                            />
                                        }
                                    </Col>
                                </FormGroup>
                            </form>
                        </Col>
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={6} className={cx(s.landingContent, 'hidden-xs')} style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <div style={{ paddingTop: 100 }}>{this.showStrengths()}</div>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

LearningExperience = reduxForm({
    form: 'ListPlaceStep1', // a unique name for this form
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    touchOnBlur: true
    // onSubmit: updateStep1
})(LearningExperience);

const selector = formValueSelector('ListPlaceStep1');

const mapState = state => ({
    listingFields: state.listingFields.data,
    isExistingList: state.location.isExistingList,
    loading: state.loader.location,
    verbalStrength: selector(state, 'verbalStrength'),
    logicStrength: selector(state, 'logicStrength'),
    visualStrength: selector(state, 'visualStrength'),
    musicalStrength: selector(state, 'musicalStrength'),
    bodyStrength: selector(state, 'bodyStrength'),
    peopleStrength: selector(state, 'peopleStrength'),
    innerStrength: selector(state, 'innerStrength'),
    nauralisticStrength: selector(state, 'nauralisticStrength'),
    listId: selector(state, 'id'),

});

const mapDispatch = {
    change,
    getListingData,
    UpdateStarListing
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(LearningExperience)));
