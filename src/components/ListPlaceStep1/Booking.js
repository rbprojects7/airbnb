// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';

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
  Form,
  Row,
  FormGroup,
  Col,
  ControlLabel,
  FormControl } from 'react-bootstrap';
import s from './ListPlaceStep1.css';

// Component
import ListPlaceTips from '../ListPlaceTips';

import updateStep3 from './updateStep3';
import validateStep3 from './validateStep3';


class Booking extends Component {

  static propTypes = {
    previousPage: PropTypes.func,
    nextPage: PropTypes.func,
    minNightData: PropTypes.number,
    maxNightData: PropTypes.number,
  };

  static defaultProps = {
    minNightData: 0,
    maxNightData: 0
  }

  render() {
    const { error, handleSubmit, submitting, dispatch, nextPage, previousPage, formErrors, minNightData, maxNightData } = this.props;
    let isDisabled = false;
    if (formErrors != undefined && formErrors.hasOwnProperty('syncErrors')) {
      isDisabled = true;
    }
   // if (minNightData > 0 && minNightData > maxNightData) {
   //   isDisabled = true;
  //  }
    return (
      <Grid fluid>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={7} md={7} lg={7} className={s.landingContent}>
            <h3 className={cx(s.landingContentTitle, s.landingTitleMargin)}><FormattedMessage {...messages.instantBookingTitle} /></h3>
              <form onSubmit={handleSubmit}>
                <div className={cx(s.space4, s.spaceTop4)}>
                 <span className={s.bookingLandingStep}>
                  <FormattedMessage {...messages.instantBookingInfo} />
            	  </span>
                </div>

              	<div className={s.spaceTop3}>
                  <h3 className={s.landingContentTitle}><FormattedMessage {...messages.whoCanBook} /></h3>
              		<span className={s.landingStep}>
                    <FormattedMessage {...messages.whoCanBookInfo} />
                  </span>
              	</div>

                <div className={s.spaceTop3}>
                   <label className={s.displayTable}>
                      <span className={s.displayTableCell}>
                          <Field name="bookingType" component="input" type="radio" value="instant" className={s.BookingradioInput} />
                      </span>
                      <span className={s.displayTableCell}>
                    <span className={s.bookText}><FormattedMessage {...messages.whoCanBookInfo1} /></span>
                    <span className={s.subText}><FormattedMessage {...messages.whoCanBookInfo2} /></span>
                      </span>
                  </label>
                </div>
                <div className={cx(s.space6,s.spaceTop3)}>
                    <label className={s.displayTable}>
                      <span className={s.displayTableCell}>
                        <Field name="bookingType" component="input" type="radio" value="request" className={s.BookingradioInput} />
                      </span>
                      <span className={s.displayTableCell}>
                        <span className={s.bookText}><FormattedMessage {...messages.whoCanBookInfo3} /></span>
                      </span>
                    </label>
                </div>

                <hr className={s.horizontalLineThrough} />

                <FormGroup className={s.formGroup}>
                  <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                  <Button className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft)} onClick={() => previousPage("booking-window")}>
                      <FormattedMessage {...messages.back} />
                    </Button>
                  <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)} type="submit" disabled={isDisabled}>
                      <FormattedMessage {...messages.next} />
                    </Button>
                  </Col>
                </FormGroup>
              </form>

          </Col>
          {/* <ListPlaceTips /> */}
        </Row>
      </Grid>
    );
  }
}
const selector = formValueSelector('ListPlaceStep3'); // <-- same as form name

Booking = reduxForm({
  form: 'ListPlaceStep3', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: updateStep3,
  validate: validateStep3

})(Booking);

const mapState = (state) => ({
  listingFields: state.listingFields.data,
  formErrors: state.form.ListPlaceStep3,
  minNightData: selector(state, 'minNight'),
  maxNightData: selector(state, 'maxNight')
});

const mapDispatch = {
};

export default injectIntl(withStyles(s) (connect(mapState, mapDispatch)(Booking)));
