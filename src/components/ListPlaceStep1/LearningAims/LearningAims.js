// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux Form
import { Field, FieldArray, reduxForm, formValueSelector, change } from 'redux-form';
// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
// Locale
import messages from '../../../locale/messages';
// Helpers
import validate from '../validate';
// Redux
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { Button, Col, FormGroup, Grid, InputGroup, Row } from 'react-bootstrap';
import s from '../ListPlaceStep1.css';
import update from '../update';
import LearningAimsStyles from './LearningAims.scss';
import * as FontAwesome from 'react-icons/lib/fa';
import history from '../../../core/history';
import updateAim from '../updateAim';

import defaultPic from './LearningImage.svg';

class LearningAims extends Component {

    static propTypes = {
        initialValues: PropTypes.object,
        previousPage: PropTypes.func,
        nextPage: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            isDisabled: true,
            learningAims: [{}, {}, {}, {}],
        };
    // this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        const { listingFields } = this.props;

    // if(listingFields) {
    //   this.setState({
    //     learningAims: listingFields.learningAims,
    //   });
    // }
    }

    componentDidMount(){
        const { learningAimValue, change } = this.props;        
        if(learningAimValue && learningAimValue.length === 0){
            change('learningAims',[{}])
        }
    }

    renderField = ({ input, label, type, meta: { touched, error } }) => (
        <div className={LearningAimsStyles.input}>
            <textarea {...input} placeholder={label} className="form-control" autoFocus />
            {touched && error && <span>{error}</span>}
        </div>
  );
  // async handleSubmit(){
  //      updateAim()
  // }

    renderFormControl = (
    { fields, meta: { touched, error, submitFailed } }) => (
        <div className={LearningAimsStyles.arrayWrapper}>
            {fields.map((learningAim, index) => (
                <div key={index} className={`${s.formGroup} ${LearningAimsStyles.inputWrapper}`}>
                    <InputGroup style={{ width: '100%' }}>
                        <Field
                //name={`${learningAim}[${index}]`}
                          name={`${learningAim}['value']`}
                //  name="value"
                          type="text"
                          component={this.renderField}
                          label="Learning Aim"
                          autoFocus
                        />
                        {/* <InputGroup.Addon
                className={LearningAimsStyles.inputAddon}
                onClick={() => fields.length > 4 && fields.remove(index)}>
                <FontAwesome.FaTrash
                  className={LearningAimsStyles.icon}
                />
              </InputGroup.Addon> */}
                        <InputGroup.Addon
                          className={LearningAimsStyles.inputAddon}
                          onClick={() => fields.remove(index)}
                        >
                            <FontAwesome.FaTrash
                              className={LearningAimsStyles.icon}
                            />
                        </InputGroup.Addon>
                    </InputGroup>
                </div>
        ))}
            <Button type="button" onClick={() => fields.length < 12 && fields.push({ value: "" })}>
                <FontAwesome.FaPlus
                  className={LearningAimsStyles.icon}
                />
                <FormattedMessage {...messages.learningAimsAddButton} />
            </Button>
            {(touched || submitFailed) && error && <span>{error}</span>}
        </div>
    );

    render() {
        const { handleSubmit, submitting, previousPage, nextPage, listingFields } = this.props;


        return (
            <Grid fluid>
                <Row className={s.landingContainer}>
                    <Col xs={12} sm={6} md={6} lg={6} className={s.landingContent}>
                        <div>
                            <h3 className={cx(s.landingContentTitle, s.landingTitleMargin)}><FormattedMessage {...messages.learningAimsTitle} /></h3>
                            {/* <h6 className={s.landingSubText}><FormattedMessage {...messages.learningAimsDescription} /></h6> */}

                            <h6 className={cx(s.landingSubText, s.landingSubTextMargin)}><FormattedMessage {...messages.learningAimsDescriptionPoint1} />
                            </h6>
                            <h6 className={cx(s.landingSubText, s.landingSubTextMargin)}><FormattedMessage {...messages.learningAimsDescriptionPoint2} />
                            </h6>
                            <a href="/learningaims" target="blank">
                                <p className={cx(s.landingSubText, s.learnMoreColor, s.landingSubTextMargin)}>Learn more</p>
                            </a>
                            <form onSubmit={handleSubmit(updateAim)}>
                                <div className={s.landingMainContent}>
                                    <FormGroup className={s.formGroup}>
                                        <FieldArray name="learningAims" component={this.renderFormControl} />
                                    </FormGroup>
                                </div>

                                <hr className={s.horizontalLineThrough} />

                                <FormGroup className={s.formGroup}>
                                    <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                                        <Button
                                          className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft)}
                                          onClick={() => previousPage("learning-experience")}
                                        >
                                            <FormattedMessage {...messages.back} />
                                        </Button>
                                        <Button
                                          className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)} disabled={!this.props.valid}
                                          type="submit"
                                        >
                                            <FormattedMessage {...messages.next} />
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </form>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={6} xsHidden>
                        <div>
                            <h6 className={cx(s.landingSubText)} style={{ marginTop: 60, marginBottom: 20, maxWidth: 380 }}>To help you, we have shown a few examples of what you could write.</h6>
                            <img alt="learningAims" src={defaultPic} />
                        </div>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

LearningAims = reduxForm({
    form: 'ListPlaceStep1', // a unique name for this form
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate,
  //  onSubmit: update
})(LearningAims);
const selector = formValueSelector('ListPlaceStep1');
const mapState = state => ({
    listingFields: state.listingFields.data,
    learningAimValue: selector(state,'learningAims')
});

const mapDispatch = {
    change
};

export default injectIntl(withStyles(s, LearningAimsStyles)(connect(mapState, mapDispatch)(LearningAims)));
