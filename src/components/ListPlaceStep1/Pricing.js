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
import * as FontAwesome from 'react-icons/lib/fa';

// Helpers
import validateStep3 from './validateStep3';

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
  FormControl,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';
import pricing from './price.svg'

// Component
import ListPlaceTips from '../ListPlaceTips';

import updateStep3 from './updateStep3';

class Pricing extends Component {

  static propTypes = {
    previousPage: PropTypes.func,
    nextPage: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
    };
  }

  componentWillMount() {
    const { valid, listingFields } = this.props;

    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
    /*if(listingFields != undefined) {
      this.setState({ guestRequirements: listingFields.guestRequirements });
    }*/
  }

  componentWillReceiveProps(nextProps) {
    const { valid, listingFields } = nextProps;

    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
    /*if(listingFields != undefined) {
      this.setState({ guestRequirements: listingFields.guestRequirements });
    }*/
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

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl componentClass="select" {...input} className={className} >
          {children}
        </FormControl>
      </div>
    )
  }

  renderFormControlCurrency = ({ input, label, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        <InputGroup>
          <InputGroup.Addon className={s.addonStyle}>
            £
          </InputGroup.Addon>
          <FormControl {...input} placeholder={label} type={type} className={className} />
        </InputGroup>
      </div>
    )
  }


  render() {
    const { error, handleSubmit, submitting, dispatch, nextPage, previousPage } = this.props;
    const { isDisabled } = this.state;
    const { formatMessage } = this.props.intl;
    const { base, availableCurrencies } = this.props;
    return (
      <Grid fluid>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={6} md={6} lg={6} className={s.landingContent}>
            <div>
              <h3 className={cx(s.landingContentTitle, s.landingTitleMargin)}>
                <FormattedMessage {...messages.pricing} />
              </h3>
              <p className={cx(s.landingStep3, s.space4)}><span><FormattedMessage {...messages.pricingDescriptionTop} /></span></p>
              <ul className={cx(s.noPadding, s.noMargin, s.textHigh, s.textJustify, s.sessionListStyle, s.listMarginLeft)}>
                <li className={cx(s.listDisplay)}>
                  <span className={cx(s.checkBoxSection, s.sessionCheckboxSection, s.listDisplay, s.circleStyle)}>
                    <FontAwesome.FaCircle />
                  </span>
                  <span className={cx(s.checkBoxSection, s.checkBoxLabel)}>
                    <span className={cx(s.landingContentSubTitle)}>
                      <p className={cx(s.landingStep3)}><span><FormattedMessage {...messages.pricingDescriptionStep1} /></span></p>
                    </span>
                  </span>
                </li>
                <li className={cx(s.listDisplay)}>
                  <span className={cx(s.checkBoxSection, s.sessionCheckboxSection, s.listDisplay, s.circleStyle)}>
                    <FontAwesome.FaCircle />
                  </span>
                  <span className={cx(s.checkBoxSection, s.checkBoxLabel)}>
                    <span className={cx(s.landingContentSubTitle)}>
                      <p className={cx(s.landingStep3)}><span><FormattedMessage {...messages.pricingDescriptionStep2} /></span></p>
                    </span>
                  </span>
                </li>
                <li className={cx(s.listDisplay)}>
                  <span className={cx(s.checkBoxSection, s.sessionCheckboxSection, s.listDisplay, s.circleStyle)}>
                    <FontAwesome.FaCircle />
                  </span>
                  <span className={cx(s.checkBoxSection, s.checkBoxLabel)}>
                    <span className={cx(s.landingContentSubTitle)}>
                      <p className={cx(s.landingStep3)}><span><FormattedMessage {...messages.pricingDescriptionStep3} /></span></p>
                    </span>
                  </span>
                </li>
              </ul>
              <p className={cx(s.landingStep3, s.space4, s.spaceTop4)}><span><FormattedMessage {...messages.pricingDescriptionBottom} /></span></p>
              <form onSubmit={handleSubmit}>
                <div className={s.landingMainContent}>
                  <FormGroup className={cx(s.formGroup, s.space4)}>
                    <ControlLabel className={s.landingStep3}>
                      {/* <FormattedMessage {...messages.basePrice} /> */}
                    </ControlLabel>
                    <Field
                      name="basePrice"
                      type="text"
                      component={this.renderFormControlCurrency}
                      label={formatMessage(messages.basePriceLabel)}
                      className={cx(s.formControlInput, s.jumboSelect, s.formControlInputMaxWidthNew)}
                    />
                  </FormGroup>
                </div>

                <hr className={s.horizontalLineThrough} />

                <FormGroup className={s.formGroup}>
                  <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                    {/* <Button className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft)} onClick={() => previousPage("session")}>
                      <FormattedMessage {...messages.back} />
                    </Button>
                    <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)} disabled={isDisabled} onClick={() => nextPage("availability-and-price")}>
                      <FormattedMessage {...messages.next} />
                    </Button> */}
                     <Button className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft)} onClick={() => previousPage("availability-and-price")}>
                      <FormattedMessage {...messages.back} />
                    </Button>
                    <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)} disabled={isDisabled} onClick={() => nextPage("booking-window")}>
                      <FormattedMessage {...messages.next} />
                    </Button>
                  </Col>
                </FormGroup>
              </form>
            </div>
          </Col>
          {/* <ListPlaceTips page={'session'} /> */}
          <Col lg={6} sm={6} md={6} className={'hidden-xs'}>
            <Col xs={12} sm={12} md={12} lg={12}>
              <h3 className={cx(s.sessionImageTitle, s.pricingTitleContent)}> <FormattedMessage {...messages.priceImageContent} /></h3>
            </Col>
          </Col>
          <Col lg={6} sm={6} md={6} className={cx('hidden-xs', s.noPadding)}>
            <div className={cx(s.imageContentPrice)}
              style={{ backgroundImage: `url(${pricing})` }}>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

Pricing = reduxForm({
  form: 'ListPlaceStep3', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validateStep3,
  onSubmit: updateStep3
})(Pricing);

const mapState = (state) => ({
  listingFields: state.listingFields.data,
  availableCurrencies: state.currency.availableCurrencies,
  base: state.currency.base,
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Pricing)));
