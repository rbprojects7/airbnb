import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import cx from 'classnames';
import {
    FormGroup,
    FormControl,
    ControlLabel,
    Col
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Card.css';
import {
    normalizeCard,
    normalizeMonth,
    normalizeYear,
    normalizeCVV
} from './normalize';

// Helper
import PopulateData from '../../../helpers/populateData';

// Cards Logo Image
import creditCardLogo from './credit-card-logos.png';
import poweredByStripe from './powered_by_stripe.png';

// Locale
import messages from '../../../locale/messages';

class Card extends Component {

    static propTypes = {
        formatMessage: PropTypes.func,
        paymentType: PropTypes.number
    };

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.renderField = this.renderField.bind(this);
        this.renderFormControlSelect = this.renderFormControlSelect.bind(this);
    }

    componentWillMount() {
        const now = new Date();
        const currentYear = now.getFullYear();
        const years = PopulateData.generateData(currentYear, (currentYear + 50));
        const months = PopulateData.generateData(0, 11);
        this.setState({
            lookupData: {
                years,
                months
            }
        });
    }

    renderField({ input, label, type, placeholder, meta: { touched, error, dirty }, disabled }) {
        const { formatMessage } = this.props.intl;
        return (
            <FormGroup className={s.formGroup}>
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                <FormControl disabled={disabled} {...input} componentClass="input" placeholder={placeholder} className={cx(s.formControlInput)} />
            </FormGroup>
        );
    }

    renderFormControlSelect({ input, label, placeholder, meta: { touched, error }, children, className, disabled }) {
        const { formatMessage } = this.props.intl;
        return (
            <FormGroup className={s.formGroup}>
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                <select id={className} {...input} className={className} >
                    {children}
                </select>
            </FormGroup>
        );
    }

    render() {
        const { handleSubmit, submitting, error, pristine, paymentType } = this.props;
        const { lookupData } = this.state;
        const { formatMessage } = this.props.intl;
        const formDisable = (paymentType == 1);
        return (
            <div className={s.creditCardForm}>
                <div className={s.creditCardFormSection}>
                    <Field disabled={formDisable} name="name" component={this.renderField} placeholder={formatMessage(messages.fullName)} />
                </div>
                <div className={s.creditCardFormSection}>
                    <Col md={9} sm={9} xs={8} className={s.noPaddingLeft}>
                        <Field
                          className={s.noMargin}
                          disabled={formDisable}
                          name="cardNumber"
                          component={this.renderField}
                          placeholder={formatMessage(messages.cardNumber)}
                          normalize={normalizeCard}
                        />
                    </Col>
                    <Col md={3} sm={3} xs={4} className={s.noPadding}>
                        <Field
                          className={s.noMargin}
                          disabled={formDisable}
                          name="cvv"
                          component={this.renderField}
                          placeholder={formatMessage(messages.cvv)}
                          normalize={normalizeCVV}
                        />
                    </Col>
                </div>
                <div className={s.creditCardFormSection}>
                    <Col md={12} sm={9} xs={12} className={cx (s.noPaddingLeft, s.noPaddingRightMobile, s.noPaddingRightDesktop)}>
                        <Col md={4} sm={4} xs={4} className={s.noPadding}>
                            <ControlLabel className={cx(s.labelText, s.spaceTop1)}><FormattedMessage {...messages.cardExpires} /></ControlLabel>
                        </Col>
                        <Col md={4} sm={4} xs={4} className={cx (s.noPaddingRight, s.noPaddingSmallMobile)}>
                            <Field
                              disabled={formDisable} name="expiryDate" component={this.renderFormControlSelect} className={cx(s.formControlSelect, s.noMargin)}
                              normalize={normalizeMonth}
                            >
                                <option value="">{formatMessage(messages.expiryDate)}</option>
                                {
                                    lookupData.months.map((item, key) => (
                                        <option key={key} value={(item < 9) ? `0${item + 1}` : (item + 1)}>{(item < 9) ? `0${item + 1}` : (item + 1)}</option>
                                        ))
                                }
                            </Field>
                        </Col>
                        <Col md={4} sm={4} xs={4} className={s.noPaddingRight}>
                            <Field
                              disabled={formDisable} name="expiryYear" component={this.renderFormControlSelect} className={cx(s.formControlSelect, s.noMargin)}
                              normalize={normalizeYear}
                            >
                                <option value="">{formatMessage(messages.expiryYear)}</option>
                                {
                                    lookupData.years.map((item, key) => (
                                        <option key={key} value={item}>{item}</option>
                                        ))
                                }
                            </Field>
                        </Col>
                    </Col>
                </div>
                <div>
                    <Col lg={5} md={5} sm={5} xs={7} className={s.noPadding}>
                        <img src={creditCardLogo} className={cx('img-responsive')} />
                    </Col>
                    <Col lg={4} md={4} sm={4} xs={4} className={cx(s.noPadding, 'pull-right')}>
                        <img src={poweredByStripe} className={cx('img-responsive')} />
                    </Col>
                </div>
            </div>
        );
    }
}

const mapState = state => ({});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Card)));
