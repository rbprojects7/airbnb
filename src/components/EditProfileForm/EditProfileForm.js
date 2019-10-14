// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
// Redux Form
import { Field, reduxForm, change } from 'redux-form';

import submit from './submit';
import validate from './validate';

// Locale
import messages from '../../locale/messages';

// Redux
import { connect } from 'react-redux';
import { loadAccount } from '../../actions/account';

// Helper
import PopulateData from '../../helpers/populateData';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './EditProfileForm.css';
import {
    Button,
    Form,
    Grid,
    Row, FormGroup,
    Col,
    ControlLabel,
    FormControl,
    FieldGroup,
    Panel
} from 'react-bootstrap';

//action
import { newsLetterAction } from '../../actions/newsLetterAction';

class EditProfileForm extends Component {

    static propTypes = {
        loadAccount: PropTypes.func,
        formatMessage: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            dateOfBirthData: {}
        };
        this.dateSelectChanged = this.dateSelectChanged.bind(this);
        this.checkboxAction = this.checkboxAction.bind(this);
    }

    componentWillMount() {
        const now = new Date();
        const currentYear = now.getFullYear();
        const years = PopulateData.generateData(1920, currentYear, "desc");
        const days = PopulateData.generateData(1, 31);
        const months = PopulateData.generateData(0, 11);
        this.setState({
            dateOfBirthData: {
                years,
                months,
                days
            }
        });
        const { change, initialValues } = this.props;
        let isNewsLetterAccepted;
        isNewsLetterAccepted = true ? initialValues.isNewsLetterAccepted === '1' : false;
        change('isNewsLetterAccepted', isNewsLetterAccepted);

    }


    async checkboxAction(e) {
        const { newsLetterAction } = this.props;
        const value = e.target.checked;
        let isNewsLetter;
        if(value) {
            isNewsLetter = 1;
        } else {
            isNewsLetter = 2;
        }
        // console.log('e--', e, e.target.value, isNewsLetter);
        await newsLetterAction(isNewsLetter, 'editProfile');
    }


    renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className, placeholder }) => {
        const { formatMessage } = this.props.intl;

        return (
            <div>
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                <FormControl
                  {...input}
                  className={className}
                  componentClass="textarea"
                  placeholder={placeholder}
                >
                    {children}
                </FormControl>
            </div>
        );
    }

    renderFormControl = ({ input, label, type, meta: { touched, error }, className, isDisabled }) => {
        const { formatMessage } = this.props.intl;
        return (
            <div>
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                <FormControl {...input} placeholder={label} type={type} className={className} disabled={isDisabled} />
            </div>
        );
    }

    renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className }) => {
        const { formatMessage } = this.props.intl;
        return (
            <div>
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                <select id={className} {...input} className={className} >
                    {children}
                </select>
            </div>
        );
    }

    dateSelectChanged = (event) => {

        const { change } = this.props;
        let date,
            month,
            year;
        if (event.target.name === 'day') {
            date = event.target.value;
        } else if (event.target.name === 'month') {
            month = event.target.value;
        } else if (event.target.name === 'year') {
            year = event.target.value;
        }
        change('EditProfileForm', 'year', year);
        change('EditProfileForm', 'month', month);
        change('EditProfileForm', 'day', date);
    };


    renderCheckbox = ({ input, type, label, meta: { touched, error } }) => {
        const { formatMessage } = this.props.intl;

        return (
            <span>
                <input
                  {...input}
                  type={type}
                  placeholder={label}
                />
                {touched && error && <span className={s.errorMessageOne}>{formatMessage(error)}</span>}

            </span>
        );
    }

    render() {

        const { error, handleSubmit, submitting } = this.props;
        const { dispatch, loadAccount, base } = this.props;
        const { availableCurrencies, initialValues } = this.props;
        const { formatMessage } = this.props.intl;
        const { dateOfBirthData } = this.state;
        const title = <h3>{formatMessage(messages.editProfileHeading)}</h3>;

        return (
            <div>
                {error && <span className={s.errorMessage}>
                    {formatMessage(error)}
                </span>}
                <Panel className={s.panelHeader} header={title}>
                    <Form onSubmit={handleSubmit(submit)}>
                        <Row className={s.formGroup}>
                            <Col
                              componentClass={ControlLabel}
                              xs={12} sm={3} md={3} lg={3}
                              className={s.textAlign}
                            >
                                <label className={s.labelText} >
                                    {formatMessage(messages.firstName)}
                                </label>
                            </Col>
                            <Col
                              componentClass={ControlLabel}
                              xs={12} sm={9} md={9} lg={9}
                            >
                                <Field
                                  name="firstName"
                                  type="text"
                                  component={this.renderFormControl}
                                  label={formatMessage(messages.firstName)}
                                  className={s.formControlInput}
                                />
                            </Col>
                        </Row>
                        <Row className={s.formGroup}>
                            <Col
                              componentClass={ControlLabel}
                              xs={12} sm={3} md={3} lg={3}
                              className={s.textAlign}
                            >
                                <label className={s.labelText} >
                                    {formatMessage(messages.lastName)}
                                </label>
                            </Col>
                            <Col
                              componentClass={ControlLabel}
                              xs={12} sm={9} md={9} lg={9}
                            >
                                <Field
                                  name="lastName"
                                  type="text"
                                  component={this.renderFormControl}
                                  label={formatMessage(messages.lastName)}
                                  className={s.formControlInput}
                                />
                                <p className={cx(s.labelText, s.hideForSm)}>
                                    {formatMessage(messages.lastNameInfo)}
                                </p>
                            </Col>
                        </Row>
                        <Row className={cx(s.formGroup, s.hideForSm)}>
                            <Col
                              componentClass={ControlLabel}
                              xs={12} sm={3} md={3} lg={3}
                              className={s.textAlign}
                            >
                                <label className={s.labelText} >
                                    {formatMessage(messages.iAm)}
                                </label>
                            </Col>
                            <Col
                              componentClass={ControlLabel}
                              xs={12} sm={9} md={9} lg={9}
                            >
                                <div className={s.select}>
                                    <Field
                                      name="gender"
                                      className={s.formControlSelect}
                                      component={this.renderFormControlSelect}
                                    >
                                        <option value="">
                                            {formatMessage(messages.gender)}
                                        </option>
                                        <option value="Male">
                                            {formatMessage(messages.genderMale)}
                                        </option>
                                        <option value="Female">
                                            {formatMessage(messages.genderFemale)}
                                        </option>
                                        <option value="Other">
                                            {formatMessage(messages.genderOther)}
                                        </option>
                                    </Field>
                                </div>
                                <p className={s.labelText}>
                                    {formatMessage(messages.genderInfo)}
                                </p>
                            </Col>
                        </Row>

                        <Row className={s.formGroup}>
                            <Col
                              componentClass={ControlLabel}
                              xs={12} sm={3} md={3} lg={3}
                              className={s.textAlign}
                            >
                                <label className={s.labelText} >
                                    {formatMessage(messages.dateOfBirth)}
                                </label>
                            </Col>

                            <Col
                              xs={12} sm={9} md={9} lg={9}
                            >
                                <div className={s.select}>
                                    <Field
                                      name="day"
                                      id="day"
                                      className={s.formControlSelect}
                                      component={this.renderFormControlSelect}
                                      onChange={this.dateSelectChanged}
                                    >

                                        <option value="">{formatMessage(messages.day)}</option>
                                        {
                                            dateOfBirthData.days.map((item, key) => (
                                                <option key={key} value={item}>{item}</option>
                                            ))
                                        }
                                    </Field>
                                </div>

                                <div className={s.select}>
                                    <Field
                                      name="month"
                                      id="month"
                                      className={s.formControlSelect}
                                      component={this.renderFormControlSelect}
                                      onChange={this.dateSelectChanged}
                                    >
                                        <option value="">{formatMessage(messages.month)}</option>
                                        {
                                            dateOfBirthData.months.map((item, key) => (
                                                <option key={key} value={item}>{item + 1}</option>
                                            ))
                                        }
                                    </Field>
                                </div>

                                <div className={cx(s.select, s.smSpace)}>
                                    <Field
                                      name="year"
                                      id="year"
                                      className={s.formControlSelect}
                                      component={this.renderFormControlSelect}
                                      onChange={this.dateSelectChanged}
                                    >
                                        <option value="">{formatMessage(messages.year)}</option>
                                        {
                                            dateOfBirthData.years.map((item, key) => (
                                                <option key={key} value={item}>{item}</option>
                                            ))
                                        }
                                    </Field>
                                </div>

                            </Col>

                        </Row>

                        <Row className={cx(s.rowMarginBottom, s.agecheckBox)}>
                            <Col xs={12} sm={9} md={9} lg={9} lgOffset={3} mdOffset={3} smOffset={3} className={s.paddingNone}>
                                <span className={cx(s.modelRadio, s.radioSection)}>
                                    <Field name="iamOverEighteen" component="input" type="checkbox" value="" component={this.renderCheckbox} />
                                </span>
                                <span className={cx(s.captionTextAlignment, s.captionTextPadding, s.marginTop)}>
                                    <p className={cx(s.noMargin, s.newsLetterText)}><FormattedMessage {...messages.iamOver18} /></p>
                                </span>
                            </Col>
                        </Row>
                        {/* <Row className={s.rowMarginBottom}>
                                <Col xs={12} sm={9} md={9} lg={9} lgOffset={3} mdOffset={3} smOffset={3}>
                                    <span className={cx(s.modelRadio, s.radioSection)}><Field
                                      name="isNewsLetterAccepted" component="input" type="radio" value="2" component={this.renderCheckbox} onChange={this.checkboxAction}
                                    /></span>
                                    <span className={cx(s.captionTextAlignment, s.captionTextPadding)}>
                                        <p className={cx(s.noMargin, s.newsLetterText)}><FormattedMessage {...messages.rejectNewsLetterText} /></p>
                                    </span>
                                </Col>
                            </Row> */}

                        <Row className={s.formGroup}>
                            <Col
                              componentClass={ControlLabel}
                              xs={12} sm={3} md={3} lg={3}
                              className={s.textAlign}
                            >
                                <label className={s.labelText} >
                                    {formatMessage(messages.email)}
                                </label>
                            </Col>
                            <Col
                              componentClass={ControlLabel}
                              xs={12} sm={9} md={9} lg={9}
                            >
                                <Field
                                  name="email"
                                  type="text"
                                  component={this.renderFormControl}
                                  label={formatMessage(messages.email)}
                                  className={s.formControlInput}
                                />
                                <p className={cx(s.labelText, s.hideForSm)}>
                                    {formatMessage(messages.emailInfo)}
                                    <a
                                      href="/privacy" target="_blank"
                                      className={cx(s.modalCaptionLink, s.modalCaptionLinkLarge)}
                                    >
                                        {formatMessage(messages.learnMore)}
                                    </a>
                                </p>
                            </Col>
                        </Row>

                        <Row className={s.formGroup}>
                            <Col
                              componentClass={ControlLabel}
                              xs={12} sm={3} md={3} lg={3}
                              className={s.textAlign}
                            >
                                <label className={s.labelText} >
                                    {formatMessage(messages.phoneNumber)}
                                </label>
                            </Col>
                            <Col
                              componentClass={ControlLabel}
                              xs={12} sm={9} md={9} lg={9}
                            >
                                <Field
                                  name="phoneNumber"
                                  type="text"
                                  component={this.renderFormControl}
                                  label={formatMessage(messages.phoneNumber)}
                                  className={s.formControlInput}
                                />
                                <p className={cx(s.labelText, s.hideForSm)}>
                                    {formatMessage(messages.phoneNumberInfo)}
                                </p>
                            </Col>
                        </Row>
                        {/* <Row className={s.formGroup}>
                            <Col
                              componentClass={ControlLabel}
                              xs={12} sm={3} md={3} lg={3}
                              className={s.textAlign}
                            >
                                <label className={s.labelText} >
                                    {formatMessage(messages.liveLocation)}
                                </label>
                            </Col>
                            <Col
                              componentClass={ControlLabel}
                              xs={12} sm={9} md={9} lg={9}
                            >
                                <Field
                                  name="location"
                                  type="text"
                                  component={this.renderFormControl}
                                  label={formatMessage(messages.liveLocation)}
                                  className={s.formControlInput}
                                  placeholder="e.g. Paris, France /Brooklyn, NY, IL"
                                />
                            </Col>
                        </Row> */}

                        {/* <Row className={s.formGroup}>
                            <Col
                              componentClass={ControlLabel}
                              xs={12} sm={3} md={3} lg={3}
                              className={s.textAlign}
                            >
                                <label className={s.labelText} >
                                    {formatMessage(messages.editProfileHomeTown)}
                                </label>
                            </Col>
                            <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                                <Field
                                  name="homeTown"
                                  type="text"
                                  component={this.renderFormControl}
                                  label={formatMessage(messages.editProfileHomeTown)}
                                  className={s.formControlInput}
                                />
                                <p className={s.labelText}>
                                    {formatMessage(messages.editProfileHomeTownPlace)}
                                </p>
                            </Col>
                        </Row> */}

                        <Row className={s.formGroup}>
                            <Col
                              componentClass={ControlLabel}
                              xs={12} sm={3} md={3} lg={3}
                              className={s.textAlign}
                            >
                                <label className={s.labelText} >
                                    {formatMessage(messages.zipcode)}
                                </label>
                            </Col>
                            <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                                <Field
                                  name="postCode"
                                  type="text"
                                  component={this.renderFormControl}
                                  label={formatMessage(messages.zipcode)}
                                  className={s.formControlInput}
                                />
                            </Col>
                        </Row>

                        <Row className={s.formGroup}>
                            <Col
                              componentClass={ControlLabel}
                              xs={12} sm={3} md={3} lg={3}
                              className={s.textAlign}
                            >
                                <label className={s.labelText} >
                                    {formatMessage(messages.info)}
                                </label>
                            </Col>
                            <Col
                              componentClass={ControlLabel}
                              xs={12} sm={9} md={9} lg={9}
                            >
                                <Field
                                  name="info"
                                  component={this.renderFormControlTextArea}
                                  className={s.formControlInput}
                                  placeholder="e.g. I have two teenage children. I love walking my dog and cycling in my spare time."
                                />
                                <p className={cx(s.labelText, s.hideForSm)}>These details will be shown on your public profile and sent to mentors if you book an experience for yourself. It will also show on any listings you make.</p>
                            </Col>
                        </Row>

                        <div>
                            <Row className={s.rowMarginBottom}>
                                <Col xs={12} sm={9} md={9} lg={9} lgOffset={3} mdOffset={3} smOffset={3}>
                                    <span className={cx(s.modelRadio, s.radioSection)}><Field name="isNewsLetterAccepted" component="input" type="checkbox" value="" component={this.renderCheckbox} onChange={this.checkboxAction} />
                                        {/* <Field
                                      name="isNewsLetterAccepted" component="input" type="radio" value="1" component={this.renderCheckbox} onChange={this.checkboxAction}
                                    /> */}
                                    </span>
                                    <span className={cx(s.captionTextAlignment, s.captionTextPadding, s.newsletterContentMob)}>
                                        <p className={cx(s.noMargin, s.newsLetterText)}><FormattedMessage {...messages.acceptNewsLetterText} /></p>
                                    </span>
                                </Col>
                            </Row>
                            {/* <Row className={s.rowMarginBottom}>
                                <Col xs={12} sm={9} md={9} lg={9} lgOffset={3} mdOffset={3} smOffset={3}>
                                    <span className={cx(s.modelRadio, s.radioSection)}><Field
                                      name="isNewsLetterAccepted" component="input" type="radio" value="2" component={this.renderCheckbox} onChange={this.checkboxAction}
                                    /></span>
                                    <span className={cx(s.captionTextAlignment, s.captionTextPadding)}>
                                        <p className={cx(s.noMargin, s.newsLetterText)}><FormattedMessage {...messages.rejectNewsLetterText} /></p>
                                    </span>
                                </Col>
                            </Row> */}
                        </div>

                        <Row className={s.formGroup}>
                            <Col
                              xs={12} sm={12} md={12} lg={12}
                              className={s.spaceTop3}
                            >
                                <Button
                                  bsSize="small"
                                  className={cx(s.button, s.btnPrimary, s.btnlarge)}
                                  type="submit"
                                  disabled={submitting}
                                >
                                    {formatMessage(messages.save)}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Panel>
            </div>
        );
    }
}

EditProfileForm = reduxForm({
    form: 'EditProfileForm', // a unique name for this form
    validate
})(EditProfileForm);


const mapState = state => ({
    initialValues: state.account.data,
    availableCurrencies: state.currency.availableCurrencies,
    base: state.currency.base,
});

const mapDispatch = {
    change,
    newsLetterAction
};

export default injectIntl(
    withStyles(s)(connect(mapState, mapDispatch)(EditProfileForm))
);
