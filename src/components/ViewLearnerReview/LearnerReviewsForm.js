import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { gql, graphql, compose } from 'react-apollo';
// Redirection
import history from '../../core/history';
import {
  Button,
  Form,
  Grid,
  Row, FormGroup,
  Col,
  ControlLabel,
  FormControl,
  FieldGroup,
  Panel,
  Label,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import * as FontAwesome from 'react-icons/lib/fa';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LearnerReviews.css';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Field, reduxForm, formValueSelector, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { calculateAge } from '../../helpers/calculateAge';
// Helper
import { convert } from '../../helpers/currencyConvertion';

// Locale
import messages from '../../locale/messages';

import Loader from '../../components/Loader';

class LearnerReviewsForm extends Component {

  static propTypes = {

  };
  static defaultProps = {

  };

  constructor(props) {
    super(props);
    this.state = {
      formSubmitting: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderTooltip = this.renderTooltip.bind(this);
  }




  async handleSubmit(values, dispatch) {
    
    //const { loading } = this.props;
    const { prevId, nextId, handleNavigate, disabled, initialValues } = this.props;
    const { parentId, childId, isParentEnable, reservationId, account } = this.props;
    
    let unSelectedFields,isReviewsCompleted = false;
    this.setState({
      formSubmitting: true
    });

    if (values && values.learningAims) {
      unSelectedFields = values.learningAims.find(o => !o.rating || o.rating === "" || o.rating === undefined || o.rating === null);
      if (unSelectedFields) {
        toastr.error('Error!', 'You missed something. Please check again.');
        this.setState({
          formSubmitting: false
        });
        
      } else {
        
        if (!disabled) { 

          if (nextId) {
            handleNavigate(nextId);
          } else {
            isReviewsCompleted = true; 
            if(account.userId === values.learningAims[0].hostId){
              history.push('/reservation/previous');
            } else{
              history.push('/experiences/previous');
            }
          
          }

        } else { // Already updated reviews
          if (nextId) {
            handleNavigate(nextId);

          } else {
            if(account.userId === values.learningAims[0].hostId){
              history.push('/reservation/previous');
            } else{
              history.push('/experiences/previous');
            }
          
            
          }
        }
      }
    } else {
      this.setState({
        formSubmitting: false
      });
    }
  }

  renderTooltip(text) {
    return (
      <Tooltip id="mentor-reviews-tooltip" className="in">
        <div>
          {text}
        </div>
      </Tooltip>
    )
  }

  renderLearningAims = ({ fields, meta: { error, submitFailed } }) => {
    
    const { formatMessage } = this.props.intl;
    let { disabled } = this.props;
    let data;
    return (
      <div>
        {
          fields && fields.length > 0 && fields.map((item, index) => {
            data = fields.get(index);

            return (
              <Row key={index} className={cx(s.space2)}>
                <Col lg={7} md={7} sm={7} xs={12} className={cx(s.learningAimCaption)}>
                  {data.value}
                </Col>
                <Col lg={5} md={5} sm={5} xs={12}>
                  <ul className={cx('list-inline', s.radioBtnContainer)}>
                    <li>
                      <OverlayTrigger placement="top" overlay={this.renderTooltip('Understand')}>
                        <label className={s.labelText}>
                          <Field name={`${item}.rating`} component="input" type="radio" value="1" disabled={disabled} />
                        </label>
                      </OverlayTrigger>
                    </li>
                    <li>
                      <OverlayTrigger placement="top" overlay={this.renderTooltip('Apply')}>
                        <label className={s.labelText}>
                          <Field name={`${item}.rating`} component="input" type="radio" value="2" disabled={disabled} />
                        </label>
                      </OverlayTrigger>
                    </li>
                    <li>
                      <OverlayTrigger placement="top" overlay={this.renderTooltip('Extend')}>
                        <label className={s.labelText}>
                          <Field name={`${item}.rating`} component="input" type="radio" value="3" disabled={disabled} />
                        </label>
                      </OverlayTrigger>
                    </li>
                  </ul>
                </Col>
              </Row>
            )
          })
        }
      </div>
    )
  }

  render() {
    const { handleSubmit, submitting, error, pristine, initialValues } = this.props;
    const { prevId, nextId, learnerName, learnerDOB, isParentEnable, handleNavigate, disabled } = this.props;
    const { formatMessage } = this.props.intl;
    const { formSubmitting } = this.state;
    
    return (
      <Col md={7} mdPull={5}>
        <Row className={s.space4}>
          <Col xs={12} sm={12} md={12} lg={12}>
            <h2 className={cx(s.titleText)}>Well done for completing your block!</h2>
            <h2 className={cx(s.titleText, s.space4)}>Take a moment to reflect on each child’s learning progress.</h2>
          </Col>
        </Row>
        <Row className={s.space4}>
          <Col xs={12} sm={12} md={12} lg={12} className={cx('text-center', s.textColor, s.guestNameText)}>
            {learnerName}
            { learnerDOB && <span>{', '}<FormattedMessage {...messages.Age} />{' ' + calculateAge(moment(learnerDOB,'YYYY-MM-DD').format('YYYY-MM-DD'))}</span>}
          </Col>
        </Row>
        <Row className={s.space4}>
          <Col xs={12} sm={12} md={12} lg={12}>
            <form onSubmit={handleSubmit(this.handleSubmit)}>
              <Row className={s.space4}>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <FormGroup className={s.formGroup}>
                    <FieldArray
                      name="learningAims"
                      component={this.renderLearningAims}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className={s.space4}>
                <Col xs={6} sm={6} md={6} lg={6}>
                  {
                    prevId !== undefined && prevId !== null && <Button
                      className={cx(s.button, s.btnPrimary, s.btnlarge)}
                      onClick={() => handleNavigate(prevId)}>
                      Previous
                    </Button>
                  }
                </Col>
                <Col xs={6} sm={6} md={6} lg={6}>
                  <Loader
                    type={"button"}
                    buttonType={"submit"}
                    className={cx(s.button, s.btnPrimary, s.btnlarge, 'pull-right')}
                    disabled={submitting || error || formSubmitting}
                    show={formSubmitting}
                    label={(nextId) ? 'Next' : 'Exit'}
                  />
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Col>
    );
  }
}

LearnerReviewsForm = reduxForm({
  form: 'LearnerReviewsForm', // a unique name for this form
})(LearnerReviewsForm);


const selector = formValueSelector('LearnerReviewsForm'); // <-- same as form name

const mapState = (state) => ({
  account: state.account.data
});

const mapDispatch = {

};


export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
)(LearnerReviewsForm);