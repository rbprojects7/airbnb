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

// Internal Component
import IncrementButton from '../IncrementButton';

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

import update from './update';

class Page3 extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    previousPage: PropTypes.func,
    beds: PropTypes.number,
    nextPage: PropTypes.func,
    existingList: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      bedType: [],
      beds: {
        itemName: null,
        otherItemName: null,
        startValue: 0,
        endValue: 0
      },
      bedrooms: [],
      personCapacity: {
        itemName: null,
        otherItemName: null,
        startValue: 0,
        endValue: 0
      }
    }
  }

  componentWillMount(){
    const { listingFields } = this.props;
    if(listingFields != undefined){
      this.setState({
        bedType: listingFields.bedType,
        beds: listingFields.beds[0],
        bedrooms: listingFields.bedrooms,
        personCapacity: listingFields.personCapacity[0]
      });
    }
  }

  componentWillReceiveProps(nextProps){
    const { listingFields } = nextProps;
    if(listingFields != undefined){
      this.setState({
        bedType: listingFields.bedType,
        beds: listingFields.beds[0],
        bedrooms: listingFields.bedrooms,
        personCapacity: listingFields.personCapacity[0]
      });
    }
  }

  renderIncrementButton = (field) => (
    <IncrementButton
      {...field}
       />
  );

  renderSelectField = ({ input, label, meta: { touched, error }, children}) => {
    const {formatMessage} = this.props.intl;

    return (
      <div>
        <select
          {...input}
           >
           {children}
           </select>
        {touched && error && <span>{formatMessage(error)}</span>}
      </div>
    )
  }

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className }) => {
    const {formatMessage} = this.props.intl;
    return (
      <div>
        <FormControl componentClass="select" {...input} className={className} >
          {children}
        </FormControl>
      </div>
    )}

  render() {
    const { handleSubmit, submitting, pristine, previousPage, nextPage } = this.props;
    const { bedrooms, bedType, beds, personCapacity } = this.state;
    const { existingList } = this.props;
    let path = existingList ? "map" : "location";
    return (
      <Grid fluid>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={7} md={7} lg={7} className={s.landingContent}>
            <div>
              <h3 className={s.landingContentTitle}><FormattedMessage {...messages.howManyGuests} /></h3>
              <form onSubmit={handleSubmit}>
                <div className={s.landingMainContent}>

                  <FormGroup className={s.formGroup}>
                    <Field
                        name="personCapacity"
                        type="text"
                        component={this.renderIncrementButton}
                        labelSingluar={personCapacity.itemName}
                        labelPlural={personCapacity.otherItemName}
                        maxValue={personCapacity.endValue}
                        minValue={personCapacity.startValue}
                        incrementBy={1}
                      />
                  </FormGroup>
                </div>

                <hr className={s.horizontalLineThrough} />

                <FormGroup className={s.formGroup}>
                  <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                    <Button className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft)} onClick={() => previousPage("group-size")}>
                      <FormattedMessage {...messages.back} />
                    </Button>
                    <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)} onClick={() => nextPage(path)}>
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
    )
  }
}

/**


<div>
  <label> <FormattedMessage {...messages.howManyBeds} /> </label>
</div>



<div>
  <label> <FormattedMessage {...messages.howManyGuestsStay} /> </label>
</div>

**/


Page3 = reduxForm({
  form: 'ListPlaceStep1', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: update
})(Page3);

// Decorate with connect to read form values
const selector = formValueSelector('ListPlaceStep1'); // <-- same as form name

const mapState = (state) => ({
  existingList: state.location.isExistingList,
  listingFields: state.listingFields.data
});

const mapDispatch = {
};

export default injectIntl(withStyles(s) (connect(mapState, mapDispatch)(Page3)));
