// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';

// Redux
import { connect } from 'react-redux';
import { updateLocationStatus } from '../../actions/getLocation';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
import Loader from '../Loader';

// Locale
import messages from '../../locale/messages';



// Helpers
import validateStep2 from './validateStep2';

// Internal Component
import PlaceMap from '../PlaceMap';

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

import updateStep2 from './updateStep2';

class Page6 extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    previousPage: PropTypes.func,
    nextPage: PropTypes.func,
    locationMap: PropTypes.object,
    isMapTouched: PropTypes.bool,
    lat: PropTypes.number,
    lng: PropTypes.number,
  };

  renderPlaceMap = ({ input, label, meta: { touched, error }, lat, lng, isMapTouched, mapWarning, mapSuccess }) => {
    const {formatMessage} = this.props.intl;
    return (
      <div>
        {touched && error && <span>{formatMessage(error)}</span>}
        <PlaceMap
            {...input}
            lat={lat}
            lng={lng}
            isMapTouched={isMapTouched}
            mapWarning={mapWarning}
            mapSuccess={mapSuccess}
          />
     </div>
    )}

  render() {

    const { error, handleSubmit, submitting, pristine, previousPage, nextPage } = this.props;
    const { locationMap, isMapTouched, lat, lng } = this.props;
    const { formatMessage } = this.props.intl;
    let isDisabled = false;
    // if(isMapTouched === true || locationMap != undefined) {
    //   isDisabled = false;
    // }
    return (
      <Grid fluid>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={12} md={12} lg={12} className={s.landingContent}>
            <div>
              {/* <h3 className={s.landingContentTitle}>
                <FormattedMessage {...messages.mapWarning} />
              </h3> */}
              <form onSubmit={handleSubmit}>
                {error && <strong>{formatMessage(error)}</strong>}
                <div className={s.landingMainContent}>
                <FormGroup className={s.formGroup}>
                {
                  !lat && !lng &&  <Loader type={"text"} />
                }

                {
                  lat && lng &&
                     <Field
                      name="locationMap"
                      component={this.renderPlaceMap}
                      lat={lat}
                      lng={lng}
                      isMapTouched={isMapTouched}
                      mapWarning={formatMessage(messages.mapWarning)}
                      mapSuccess={formatMessage(messages.mapSuccess)}
                      />
                }
                  </FormGroup>
                </div>

                <hr className={s.horizontalLineThrough} />
                
                <FormGroup className={s.formGroup}>
                  <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                    <Button className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft)} onClick={() => previousPage("location")}>
                      <FormattedMessage {...messages.back} />
                    </Button>
                    <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)} disabled={isDisabled} onClick={() => nextPage("photos")}>
                      <FormattedMessage {...messages.next} />
                    </Button>
                  </Col>
                </FormGroup>

              </form>
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

Page6 = reduxForm({
  form: 'ListPlaceStep2', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validateStep2,
  onSubmit: updateStep2
})(Page6);


// Decorate with connect to read form values
const selector = formValueSelector('ListPlaceStep2'); // <-- same as form name
Page6 = connect(
  state => {
    // can select values individually
    const locationMap = selector(state, 'locationMap');
    const isMapTouched = selector(state, 'isMapTouched');
    const lat = selector(state, 'lat');
    const lng = selector(state, 'lng');
    return {
      locationMap,
      isMapTouched,
      lat,
      lng,
    }
  }
)(Page6);

export default injectIntl(withStyles(s)(Page6));
