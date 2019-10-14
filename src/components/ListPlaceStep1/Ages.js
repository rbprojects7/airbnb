// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux Form
import { Field, reduxForm, formValueSelector, change } from 'redux-form';

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
import CustomCheckbox from '../CustomCheckbox';

import CustomAge from './CustomAge';
import ListPlaceTips from '../ListPlaceTips';

class Ages extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    nextPage: PropTypes.func,
    previousPage: PropTypes.func,
    change: PropTypes.func,
    maximumAge: PropTypes.number,
    minimumAge: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      spaces: [],
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
        spaces: listingFields.spaces,
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
        spaces: listingFields.spaces,
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
  renderRange = ({ input, label, meta: { touched, error }, className, min, max }) => {
    const { formatMessage } = this.props.intl;
    const {  change } = this.props;
    return (
      <div>
        <CustomAge
          {...input}
          min={min}
          max={max}
        />
      </div>
    )
  }


  render() {
    const { error, handleSubmit, submitting, dispatch, nextPage, previousPage } = this.props;
    const { spaces, isDisabled } = this.state;
    const { maximumAge, minimumAge } = this.props;
    let minAgeRange = minimumAge ? minimumAge : 0;
    let maxAgeRange = maximumAge ? maximumAge : 18;
    return (
        <Grid>
        <Row>
          <Col xs={12} sm={6} md={6} lg={6} className={s.landingContent}>
            <Col xs={12}  sm={12}  md={12}  lg={12}>
              <h3 className={cx(s.landingContentTitle, s.landingTitleMargin)}><FormattedMessage {...messages.ageRange} /> </h3>
              <form onSubmit={handleSubmit}>
                <div className={s.landingMainContent}>
                <p className={cx(s.landingStep2)}><FormattedMessage {...messages.ageRange1} /></p>
                <p className={cx(s.landingStep2, s.space3)}><FormattedMessage {...messages.ageRange2} /></p>
                <Col lg={12} md={12} sm={12} xs={12} className={s.space6}>
                    <Field
                      name="age"
                      component={this.renderRange}
                      min={minAgeRange}
                      max={maxAgeRange}                      
                    />
                    <Row>
                      <Col lg={6} md={6} sm={6} xs={6} className={s.minandMaxColor}>
                        <span> Min {minAgeRange} years old
                        </span>
                      </Col>
                      <Col lg={6} md={6} sm={6} xs={6} className={cx('text-right', s.minandMaxColor)}>
                        <span> Max {maxAgeRange} years old
                        </span>
                      </Col>
                  </Row>
              </Col>
              <h3 className={cx(s.spaceTop3,s.landingContentTitle)}>
              <FormattedMessage {...messages.ageRange3} />
              </h3>
              <FormGroup className={s.formGroup}>
                    <Field name="spaces" component={this.checkboxGroup} options={spaces} />
                  </FormGroup>

            </div>
                <hr className={s.horizontalLineThrough} />

                <FormGroup className={s.formGroup}>
                  <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                    <Button className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft)} onClick={() => previousPage("make-description")}>
                      <FormattedMessage {...messages.back} />
                    </Button>
                    <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)} onClick={() => nextPage("learning")}>
                      <FormattedMessage {...messages.next} />
                    </Button>
                  </Col>
                </FormGroup>
              </form>
            </Col>
          </Col>
          <ListPlaceTips page = {'age'}/>
        </Row>
      </Grid>
    )
  }
}

Ages = reduxForm({
  form: 'ListPlaceStep1', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: update
})(Ages);

const selector = formValueSelector('ListPlaceStep1');

const mapState = (state) => ({
  listingFields: state.listingFields.data,
  minimumAge : selector(state, 'minimumAge'),
  maximumAge : selector(state, 'maximumAge'),
});

const mapDispatch = {
 change,

};

export default injectIntl(withStyles(s) (connect(mapState, mapDispatch)(Ages)));
