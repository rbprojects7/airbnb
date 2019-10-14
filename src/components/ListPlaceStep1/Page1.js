// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux Form
import { Field, reduxForm } from 'redux-form';

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

import update from './update';

// Component
import ListPlaceTips from '../ListPlaceTips';

class Page1 extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    nextPage: PropTypes.func,
    userData : PropTypes.shape({
      firstName : PropTypes.string.isRequired
    }).isRequired
  };

  static defaultProps = {
    userData: {
      firstName: ''
    }
  };

  constructor (props) {
    super(props);
    this.state = {
      roomType: [],
      personCapacity: []
    }
  }

  componentWillMount () {
    const { listingFields } = this.props;
    if(listingFields != undefined) {
      this.setState({
        roomType: listingFields.roomType,
        personCapacity: listingFields.personCapacity
      });
    }
  }

  componentWillReceiveProps (nextProps) {
    const { listingFields } = nextProps;
    if(listingFields != undefined) {
      this.setState({
        roomType: listingFields.roomType,
        personCapacity: listingFields.personCapacity
      });
    }
  }

  renderSelectField = ({ input, label, meta: { touched, error }, children }) => {
    const { formatMessage } = this.props.intl;

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
    const { error, handleSubmit, submitting, dispatch, nextPage } = this.props;
    const { userData } = this.props;
    const { roomType, personCapacity } = this.state;
    return (
      <Grid>
        <Row>
          <Col xs={12} sm={6} md={6} lg={6} className={s.landingContentMargin}>
            <Col xs={12}  sm={12}  md={12}  lg={12} className={s.noPadding}>
              <h2 className={s.landingTitle}><FormattedMessage {...messages.hi} />, {userData.firstName}! <FormattedMessage {...messages.whatKindOfPlace} /></h2>
              {/* <strong className={s.landingStep}><span>STEP 1</span></strong> */}
              <form onSubmit={handleSubmit}>
                <p className={cx(s.textHigh,s.space3)}> 
                <FormattedMessage {...messages.school} />
                </p>

                <p className={cx(s.textHigh,s.space3)}> <FormattedMessage {...messages.school1} /></p>

                <FormGroup className={s.formGroup}>
                  <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)}  onClick={() => nextPage('quality-standard')}>
                    <FormattedMessage {...messages.next} />
                  </Button>
                </FormGroup>
              </form>
            </Col>
          </Col>
          <ListPlaceTips page={'page1'} />
        </Row>
      </Grid>
    )
  }
}

Page1 = reduxForm({
  form: 'ListPlaceStep1', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: update
})(Page1);

const mapState = (state) => ({
  userData: state.account.data,
  listingFields: state.listingFields.data
});

const mapDispatch = {
};

export default injectIntl(withStyles(s) (connect(mapState, mapDispatch)(Page1)));
