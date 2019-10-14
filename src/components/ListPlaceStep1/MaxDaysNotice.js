// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';


// Helpers
import validateStep3 from './validateStep3';

// Redux
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  Grid,
  Button,
  Form,
  Row,
  FormGroup,
  Col,
  ControlLabel,
  FormControl
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';

// Component
import ListPlaceTips from '../ListPlaceTips';
import SyncCalendar from './SyncCalendar';
import updateStep3 from './updateStep3';

// Internal Components
import CustomCheckbox from '../CustomCheckbox';

class MaxDaysNotice extends Component {

  static propTypes = {
    formatMessage: PropTypes.func,
    initialValues: PropTypes.object,
    previousPage: PropTypes.func,
    nextPage: PropTypes.func,
    listId: PropTypes.number.isRequired,
    listingSteps: PropTypes.shape({
      step3: PropTypes.string.isRequired,
      listing: PropTypes.shape({
        isPublished: PropTypes.bool.isRequired
      })
    }),
  };

  static defaultProps = {
    listingSteps: {
      step3: "inactive",
      listing: {
        isPublished: false
      }
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      maxDaysNotice: [],
      cancellationDetails: [],
      isDisabled: false,
    }
  }

  componentWillMount() {
    const { listingFields, cancellationPolicies, cancellationPolicyLength, formErrors, cancellationDescription} = this.props;

    if (listingFields != undefined) {
      this.setState({
        maxDaysNotice: listingFields.maxDaysNotice,
      });
    }
    if (cancellationPolicies != undefined) {
      this.setState({
        cancellationDetails: cancellationPolicies.cancellationPolicies,
      });
    }

    if (((cancellationPolicyLength && cancellationPolicyLength.length == 0) && (!cancellationDescription || cancellationDescription == "")) || (formErrors != undefined && formErrors.hasOwnProperty('syncErrors'))) {
      this.setState({ isDisabled: true })
    } else {
      this.setState({ isDisabled: false })
    }
  }

  componentDidMount() {
    const { listingFields, cancellationPolicies, cancellationPolicyLength, formErrors, cancellationDescription} = this.props;

    if (listingFields != undefined) {
      this.setState({
        maxDaysNotice: listingFields.maxDaysNotice,
      });
    }
    if (cancellationPolicies != undefined) {
      this.setState({
        cancellationDetails: cancellationPolicies.cancellationPolicies,
      });
    }

    if (((cancellationPolicyLength && cancellationPolicyLength.length == 0) && (!cancellationDescription || cancellationDescription == "")) || (formErrors != undefined && formErrors.hasOwnProperty('syncErrors'))) {
      this.setState({ isDisabled: true })
    } else {
      this.setState({ isDisabled: false })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { listingFields, cancellationPolicies, cancellationPolicyLength, formErrors, cancellationDescription} = nextProps;

    if (listingFields != undefined) {
      this.setState({
        maxDaysNotice: listingFields.maxDaysNotice,
      });
    }
    if (cancellationPolicies != undefined) {
      this.setState({
        cancellationDetails: cancellationPolicies.cancellationPolicies,
      });
    }

    if (((cancellationPolicyLength && cancellationPolicyLength.length == 0) && (!cancellationDescription || cancellationDescription == "")) || (formErrors != undefined && formErrors.hasOwnProperty('syncErrors'))) {
      this.setState({ isDisabled: true })
    } else {
      this.setState({ isDisabled: false })
    }
    
  }

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        {touched && error && <span>{formatMessage(error)}</span>}
        <FormControl componentClass="select" {...input} className={className} >
          {children}
        </FormControl>
      </div>
    )
  }

  checkboxGroup = ({ label, name, options, input }) => (
    <ul className={s.listContainer}>
      {options && options.length > 0 && options.map((option, index) => {
        if (option.isEnable === true) {
          return (
            <li className={s.listContent} key={index}>
              <span className={s.checkBoxSection}>
                <CustomCheckbox
                  name={`${input.name}[${index}]`}
                  value={option.id}
                  checked={input.value.indexOf(option.id) !== -1}
                  onChange={event => {
                    const newValue = [...input.value];
                    if (event === true) {
                      newValue.push(option.id);
                    } else {
                      newValue.splice(newValue.indexOf(option.id), 1);
                    }
                    return input.onChange(newValue);
                  }}
                />
              </span>
              <span className={cx(s.checkBoxSection, s.checkBoxLabel)}>
                <label className={cx(s.checkboxLabel, s.noPadding)}>{option.policyContent}</label>
              </span>
            </li>
          )
        }
      })
      }
    </ul>
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
    )
  }

  render() {
    const { handleSubmit, submitting, pristine, valid, formErrors, previousPage, nextPage, existingList, listId } = this.props;
    const { maxDaysNotice } = this.state;
    const { listingSteps } = this.props;
    const { formatMessage } = this.props.intl;
    const { cancellationDetails, isDisabled} = this.state;
    // let isDisabled = false;
    // if (formErrors != undefined && formErrors.hasOwnProperty('syncErrors')) {
    //   isDisabled = true;
    // }
    return (
      <Grid fluid>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={12} md={12} lg={12} className={s.landingContent}>
            <div>
              <h3 className={cx(s.landingContentTitle, s.landingTitleMargin)}><FormattedMessage {...messages.maxDaysTitle} /></h3>
              <form onSubmit={handleSubmit}>
                <div className={s.landingMainContent}>

                  <FormGroup className={cx(s.formGroup, s.spaceTop4)}>

                    <h4><FormattedMessage {...messages.cancellationPolicySubHead1} /></h4>

                    <div>
                    <Field name="experienceType" component="input" type="radio" value="1" className={s.cursorPointer} /> <FormattedMessage {...messages.experienceType1} />
                    </div>
                    <div className ={s.spaceTop3}>
                    <Field name="experienceType" component="input" type="radio" value="2" className={s.cursorPointer} /> <FormattedMessage {...messages.experienceType2} />
                    </div>

                  </FormGroup>

                  <div className={cx(s.landingMainContent, s.spaceTop4)}>
                    <h4>
                      <span><FormattedMessage {...messages.cancellationPolicySubHead2} />
                        <span className={cx(s.starIcon,s.errorMessage)}>{'*'}</span>
                    </span>
                    
                    </h4>
                    <FormGroup className={s.formGroup}>
                      <Field name="cancellationPolicy" component={this.checkboxGroup} options={cancellationDetails} />
                    </FormGroup>
                    <Field
                      name="cancellationDescription"
                      component={this.renderFormControlTextArea}
                      label={formatMessage(messages.cancellationDescription)}
                      className={cx(s.textareaInput, s.formControlMuted, s.textareaHeight)} onBlur={this.onBlur}
                    />
                  </div>

                </div>
                <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                  <span className={cx(s.errorMessage, s.spaceTop4)}>{' * '}<FormattedMessage {...messages.requiredField} /></span>

                  <hr className={s.horizontalLineThrough} />
                </Col>

                <FormGroup className={s.formGroup}>
                  <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                    <Button className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft)} onClick={() => previousPage("availability-and-price")}>
                      {/*<Button className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft)} onClick={() => previousPage("pricing")}>*/}
                      <FormattedMessage {...messages.back} />
                    </Button>
                    <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)} type="submit" disabled={isDisabled}>
                      <FormattedMessage {...messages.next} />
                    </Button>
                  </Col>
                </FormGroup>
              </form>
            </div>
          </Col>
          {/* <ListPlaceTips /> */}
        </Row>
      </Grid>
    );
  }
}

MaxDaysNotice = reduxForm({
  form: 'ListPlaceStep3', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validateStep3,
  onSubmit: updateStep3
})(MaxDaysNotice);

// Decorate with connect to read form values
const selector = formValueSelector('ListPlaceStep3'); // <-- same as form name

const mapState = (state) => ({
  listingFields: state.listingFields.data,
  listingSteps: state.location.listingSteps,
  formErrors: state.form.ListPlaceStep3,
  cancellationPolicies: state.cancellationPolicies,
  cancellationPolicyLength: selector(state, 'cancellationPolicy'),
  cancellationDescription: selector(state, 'cancellationDescription'),
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(MaxDaysNotice)));
