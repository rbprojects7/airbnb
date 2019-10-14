import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux
import { connect } from 'react-redux';

// Redux Form
import { Field, reduxForm, change } from 'redux-form';

import {
    Button,
    Form,
    Grid,
    Row, FormGroup,
    Col,
    ControlLabel,
    FormControl,
    FieldGroup,
    Panel,
    Label,
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Payout.css';
import logourl from './paypal.png';

// Helpers
import validateStripe from './validateStripe';
import submit from './submit';
import PopulateData from '../../../helpers/populateData';

// Locale
import messages from '../../../locale/messages';

// Components
import Loader from '../../Loader';

class Stripe extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        previousPage: PropTypes.func.isRequired,
        siteName: PropTypes.string.isRequired,
        formatMessage: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            dateOfBirthData: {}
        }
    }

    componentWillMount() {
        const { change } = this.props;
        let now = new Date();
        let currentYear = now.getFullYear();
        let years = PopulateData.generateData(1920, currentYear, "desc");
        let days = PopulateData.generateData(1, 31);
        let months = PopulateData.generateData(0, 11);
        this.setState({
            dateOfBirthData: {
                years: years,
                months: months,
                days: days
            }
        });
        change('methodId', 2);
        change('paymentType', 2);
        change('currency', 'GBP');
    }

    renderField = ({ input, label, type, meta: { touched, error, dirty }, placeHolder }) => {
        const { formatMessage } = this.props.intl;
        return (
            <div className={s.space1}>
                <label className={s.labelText}>{label}</label>
                <FormGroup className={s.formGroup}>
                    {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                    <FormControl
                        {...input}
                        componentClass="input"
                        className={cx(s.formControlInput)}
                        placeholder={placeHolder}
                    />
                </FormGroup>
            </div>
        );
    }

    renderFormControlSelect = ({ input, label, meta: { touched, error }, children }) => {
        const { formatMessage } = this.props.intl;
        return (
            <div>
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                <FormControl componentClass="select" {...input} >
                    {children}
                </FormControl>
            </div>
        )
    }

    render() {
        const { handleSubmit, pristine, previousPage, submitting, error } = this.props;
        const { base, availableCurrencies, siteName, payoutLoading } = this.props;
        const { formatMessage } = this.props.intl;
        const { dateOfBirthData } = this.state;

        return (
            <form onSubmit={handleSubmit(submit)}>
                <Panel className={s.panelHeader}
                    header={formatMessage(messages.addBankDetails)}
                    footer={
                        <div className={s.displayInline}>
                            <Button
                                className={cx(s.button, s.btnlarge, s.btnPrimaryBorder, s.btnRight)}
                                onClick={previousPage}
                            >
                                <FormattedMessage {...messages.back} />
                            </Button>
                            <div className={s.displayInline}>
                                <Loader
                                    type={'button'}
                                    buttonType={'submit'}
                                    className={cx(s.button, s.btnPrimary, s.btnlarge, s.displayInline)}
                                    disabled={pristine || submitting || error}
                                    show={payoutLoading}
                                    label={formatMessage(messages.finish)}
                                />
                            </div>
                        </div>
                    }>
                    <div className={s.panelBody}>
                        <Field
                            name="firstName"
                            component={this.renderField}
                            label={formatMessage(messages.payoutFirstName)}
                            placeHolder={"First name"}
                        />

                        <Field
                            name="lastName"
                            component={this.renderField}
                            label={formatMessage(messages.payoutLastName)}
                            placeHolder={"Last name"}
                        />

                        <div>
                            <Row>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <p>{formatMessage(messages.dateOfBirthPayout)}</p>
                                </Col>
                                <Col xs={5} sm={5} md={5} lg={5}>
                                    <FormGroup>
                                        <Field name="month" component={this.renderFormControlSelect}>
                                            <option value="">{formatMessage(messages.month)}</option>
                                            {
                                                dateOfBirthData.months.map((item, key) => {
                                                    return (
                                                        <option key={key} value={item}>{item + 1}</option>
                                                    )
                                                })
                                            }
                                        </Field>
                                    </FormGroup>
                                </Col>

                                <Col xs={3} sm={3} md={3} lg={3} className={s.noPadding}>
                                    <FormGroup controlId="formControlsSelect">
                                        <Field name="day" component={this.renderFormControlSelect}>
                                            <option value="">{formatMessage(messages.day)}</option>
                                            {
                                                dateOfBirthData.days.map((item, key) => {
                                                    return (
                                                        <option key={key} value={item}>{item}</option>
                                                    )
                                                })
                                            }
                                        </Field>
                                    </FormGroup>
                                </Col>

                                <Col xs={4} sm={4} md={4} lg={4}>
                                    <FormGroup controlId="formControlsSelect">
                                        <Field name="year" component={this.renderFormControlSelect}>
                                            <option value="">{formatMessage(messages.year)}</option>
                                            {
                                                dateOfBirthData.years.map((item, key) => {
                                                    return (
                                                        <option key={key} value={item}>{item}</option>
                                                    )
                                                })
                                            }
                                        </Field>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>

                        <Field
                            name="sortCode"
                            component={this.renderField}
                            label={formatMessage(messages.payoutSortCode)}
                            placeHolder={"eg: 108800"}
                        />

                        <Field
                            name="accountNumber"
                            component={this.renderField}
                            label={formatMessage(messages.accountNumber)}
                            placeHolder={"eg: 00012345"}
                        />

                        <Field
                            name="confirmAccountNumber"
                            component={this.renderField}
                            label={formatMessage(messages.confirmAccountNumber)}
                            placeHolder={"eg: 00012345"}
                        />
                    </div>
                </Panel>
            </form>
        );
    }
}

Stripe = reduxForm({
    form: 'PayoutForm', // a unique name for this form
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate: validateStripe
})(Stripe);

const mapState = (state) => ({
    siteName: state.siteSettings.data.siteName,
    availableCurrencies: state.currency.availableCurrencies,
    base: state.currency.base,
    payoutLoading: state.reservation.payoutLoading
});

const mapDispatch = {
    change
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Stripe)));