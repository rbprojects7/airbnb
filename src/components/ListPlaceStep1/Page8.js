// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

//Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';

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
  FormControl } from 'react-bootstrap';
import s from './ListPlaceStep1.css';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

// Helpers
import validateStep2 from './validateStep2';

// Internal Components
import CustomCheckbox from '../CustomCheckbox';
import ListPlaceTips from '../ListPlaceTips';

import updateStep2 from './updateStep2';

class Page8 extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    previousPage: PropTypes.func,
    nextPage: PropTypes.func,
    formErrors: PropTypes.object,
  };

 

  constructor(props) {
    super(props);
    this.state = {
      essentialsAmenities: [],
      isDisabled: false
    }
  }

  componentDidMount(){
    const { formErrors, listingFields } = this.props;
    if(formErrors != undefined){
      if(formErrors.hasOwnProperty('syncErrors')) {
        this.setState({ isDisabled: true });
      } else {
        this.setState({ isDisabled: false });
      }
    }
    if(listingFields != undefined){
      this.setState({
        essentialsAmenities: listingFields.essentialsAmenities,
      });
    }
  }

  componentWillReceiveProps(nextProps){
    const { formErrors, listingFields } = nextProps;
    if(formErrors != undefined){
      if(formErrors.hasOwnProperty('syncErrors')) {
        this.setState({ isDisabled: true });
      } else {
        this.setState({ isDisabled: false });
      }
    }
    if(listingFields != undefined){
      this.setState({
        essentialsAmenities: listingFields.essentialsAmenities,
      });
    }
  }

  checkboxGroup = ({ label, name, options, input }) => (
      <ul className={s.listContainer}>
          { options.map((option, index) =>{ 
              if(option.isEnable === "1") {
                return (
                  <li className={s.listContent} key={index}>
                      <span className={s.checkBoxSection}>
                      <CustomCheckbox
                        name={`${input.name}[${index}]`}
                        value={option.id}
                        checked={input.value.indexOf(option.id) !== -1}
                        onChange={event => {
                          const newValue = [...input.value];
                          if(event === true) {
                            newValue.push(option.id);
                          } else {
                            newValue.splice(newValue.indexOf(option.id), 1);
                          }
                          return input.onChange(newValue);
                        }}
                        />
                        </span> 
                        <span className={cx(s.checkBoxSection, s.checkBoxLabel)}>  
                          <label className={cx(s.checkboxLabel, s.noPadding)}>{option.itemName}</label>
                        </span>
                  </li>
                )}
              }
            )
          }
      </ul>
    );

  render() {
    const { handleSubmit, submitting, pristine, previousPage, nextPage, onSubmit } = this.props;
    const { essentialsAmenities, isDisabled } = this.state;
    const { formErrors } = this.props;

    return (
      <Grid fluid>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={6} md={6} lg={6} className={s.landingContent}>
            <div>
              <h3 className={cx(s.landingContentTitle, s.landingTitleMargin)}>
                <FormattedMessage {...messages.whatamenities} />
              </h3>
              <form onSubmit={handleSubmit}>
                <div className={s.landingMainContent}>
                  <FormGroup className={s.formGroup}>
                    <Field name="amenities" component={this.checkboxGroup} options={essentialsAmenities} />
                  </FormGroup>
                  <div>
                    <div>
                      <a href="/safeguarding" target="_blank">
                        <p className={s.saftyColor}>
                          <FormattedMessage {...messages.safetyMeasureLink1} />
                        </p>
                      </a>
                    </div>
                  </div>
                  <div>
                    <div>
                      <a href="/riskassessments" target="_blank">
                        <p className={cx(s.saftyLink, s.saftyColor)}>
                          <FormattedMessage {...messages.safetyMeasureLink2} />
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
                <hr className={s.horizontalLineThrough} />

                <FormGroup className={s.formGroup}>
                  <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                    <Button className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft)} onClick={() => previousPage("cover-photo")}>
                      <FormattedMessage {...messages.back} />
                    </Button>
                    <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)} disabled={isDisabled} onClick={() => nextPage("amenities")} >
                      <FormattedMessage {...messages.next} />
                    </Button>
                  </Col>
                </FormGroup>
              </form>
            </div>
          </Col>
          <Col lg={5} md={5} mdOffset={1} lg={5} lgOffset={1} xs={12} xsHidden>
            <div>
                <div className={cx(s.backgroundImage, s.imageContent)}>
                </div>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

Page8 = reduxForm({
  form: 'ListPlaceStep2', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validateStep2,
  onSubmit: updateStep2
})(Page8);

const mapState = (state) => ({
  userData: state.account.data,
  formErrors: state.form.ListPlaceStep2,
  listingFields: state.listingFields.data,
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Page8)));
