// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Redux Form
import { Field, reduxForm } from 'redux-form';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

import validateStep2 from './validateStep2';
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
  FormControl } from 'react-bootstrap';
import s from './ListPlaceStep1.css';

// Internal Components
import CustomCheckbox from '../CustomCheckbox';
import ListPlaceTips from '../ListPlaceTips';

import updateStep2 from './updateStep2';

class Page7 extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    previousPage: PropTypes.func,
    nextPage: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      safetyAmenities: [],
    }
  }

  componentWillMount(){
    const { listingFields } = this.props;
    if(listingFields != undefined){
      this.setState({
        safetyAmenities: listingFields.safetyAmenities,
      });
    }
  }

  componentWillReceiveProps(nextProps){
    const { listingFields } = nextProps;
    if(listingFields != undefined){
      this.setState({
        safetyAmenities: listingFields.safetyAmenities,
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
                      <label className={cx(s.checkboxLabel, s.noPadding)}>{option.itemName}</label>
                    </span>
                  </li>
                )
              }
            })
          }
      </ul>
    );

  render() {
    const { handleSubmit, submitting, pristine, previousPage, nextPage } = this.props;
    const {  safetyAmenities,  isDisabled  } = this.state;

    return (
      <Grid fluid>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={6} md={6} lg={6} className={s.landingContent}>
            <div>
              <h3 className={cx(s.landingContentTitle, s.landingTitleMargin)}>
                <FormattedMessage {...messages.whatSpace} />
              </h3>
              <form onSubmit={handleSubmit}>
                <div className={s.landingMainContent}>
                  <FormGroup className={s.formGroup}>
                    <Field name="safetyAmenities" component={this.checkboxGroup} options={safetyAmenities} />
                  </FormGroup>

                 
                </div>

                <hr className={s.horizontalLineThrough} />

                <FormGroup className={s.formGroup}>
                  <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                    <Button className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft)} onClick={() => previousPage("spaces")}>
                      <FormattedMessage {...messages.back} />
                    </Button>
                    <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)} type="submit" disabled={isDisabled} >
                      <FormattedMessage {...messages.next} />
                    </Button>
                  </Col>
                </FormGroup>

              </form>
            </div>
          </Col>
          <Col md={5} mdOffset={1} lg={5} lgOffset={1} sm={6} xs={12} className={'hidden-xs'}>
            <div>
              <div className={cx(s.backgroundImageAmenities, s.imageContentAmenities)}>
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

Page7 = reduxForm({
  form: 'ListPlaceStep2', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validateStep2,
  onSubmit: updateStep2
})(Page7);

const mapState = (state) => ({
  listingFields: state.listingFields.data
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Page7)));
