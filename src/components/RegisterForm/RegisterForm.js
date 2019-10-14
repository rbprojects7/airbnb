import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';
import { FormattedMessage, injectIntl } from 'react-intl';

// Locale
import messages from '../../locale/messages';

// Redux
import { connect } from 'react-redux';

// Helper
import PopulateData from '../../helpers/populateData';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './RegisterForm.css';
import {
  Button,
  Form,
  Row,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  Checkbox,
  Dropdown
} from 'react-bootstrap';

class RegisterForm extends Component {

  static propTypes = {
    formatMessage: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      dateOfBirthData: {}
    }
  }

  componentWillMount() {
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
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        <FormControl {...input} placeholder={label} type={type} className={className} />
      </div>
    )
  }

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl componentClass="select" {...input} >
          {children}
        </FormControl>
      </div>
    )
  }

  renderCheckbox = ({ input, type, label, meta: { touched, error } }) => {
    const { formatMessage } = this.props.intl;

    return (
      <span>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        <input
          {...input}
          type={type}
          placeholder={label}
        />
      </span>
    )
  }

  render() {
    const { error, handleSubmit, submitting, dispatch } = this.props;
    const { formatMessage } = this.props.intl;
    const { dateOfBirthData } = this.state;

    return (
      <form onSubmit={handleSubmit(submit)}>
        {error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        <FormGroup className={s.formGroup}>
          <Field name="firstName"
            type="text"
            component={this.renderFormControl}
            label={formatMessage(messages.firstName)}
            className={s.formControlInput}
          />
        </FormGroup>
        <FormGroup className={s.formGroup}>
          <Field name="lastName"
            type="text"
            component={this.renderFormControl}
            label={formatMessage(messages.lastName)}
            className={s.formControlInput}
          />
        </FormGroup>
        <FormGroup className={s.formGroup}>
          <Field name="email"
            type="text"
            component={this.renderFormControl}
            label={formatMessage(messages.email)}
            className={s.formControlInput}
          />
        </FormGroup>
        <FormGroup className={s.formGroup}>
          <Field name="password"
            type="password"
            component={this.renderFormControl}
            label={formatMessage(messages.password)}
            className={s.formControlInput}
          />
        </FormGroup>

        {/* <div>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <ControlLabel>{formatMessage(messages.birthDay)}</ControlLabel>
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
        </div> */}
        <div>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} className={s.space2}>
              <span className={s.newsLetter}><Field name="isNewsLetterAccepted" component="input" type="checkbox" value="1" component={this.renderCheckbox} /></span>
              <span className={cx(s.captionTextAlignment, s.captionTextPadding)}>
                <FormattedMessage {...messages.acceptNewsLetterText} />
              </span>
            </Col>
          </Row>
        </div>
        <FormGroup className={s.formGroup}>
          <Button
            className={cx(s.button, s.btnPrimary)}
            bsSize="large"
            block type="submit"
            disabled={submitting}
          >
            {formatMessage(messages.signUp)}
          </Button>
        </FormGroup>

      </form>
    )
  }

}

RegisterForm = reduxForm({
  form: 'RegisterForm', // a unique name for this form
  validate
})(RegisterForm);

export default injectIntl(withStyles(s)(RegisterForm));
