import React, { Component } from 'react'
import PropTypes from 'prop-types';
import history from '../../../core/history';
//helpers
import { calculateAge } from '../../../helpers/calculateAge';
// Redux Form
import { Field, reduxForm, FieldArray } from 'redux-form';
import { graphql, gql, compose } from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
  Button,
  Form,
  Row, FormGroup,
  Col,
  FormControl,
  OverlayTrigger,
  Tooltip,
  Grid,
  InputGroup,
  Radio
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Rating.css';
import * as FontAwesome from 'react-icons/lib/fa';
// Component
import ExperienceDetails from './ExperienceDetails';
// Helpers
//import validateChild from './validateChild';

// Graphql
//import WriteChildReviewMutation from './WriteChildReviewMutation.graphql';


// Locale
import messages from '../../../locale/messages';

class RatingChildForm extends React.Component {

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      blockUniqueId: null,
      getChildData: [],
      getProfileData: [],
      getBlockListMeta: []
  };
    this.renderField = this.renderField.bind(this);
    this.renderMultipleChild = this.renderMultipleChild.bind(this);
  }

  componentDidMount() {
    console.log('Child did mount.');
    const { getChildData, getProfileData, getBlockListMeta } = this.props;
        if(getChildData) {
            this.setState({
              getChildData: getChildData,
              getProfileData: getProfileData,
              getBlockListMeta: getBlockListMeta
            });
        }
  }

  nextPage(nextId) {
    const { blockUniqueId, formBaseURI } = this.props;
    let pathName = formBaseURI + blockUniqueId;
    if (nextId) {
      //pathName = `${formBaseURI + blockUniqueId}/${nextId}`;
      pathName = `${formBaseURI}/${blockUniqueId}/${nextId}`;
    }
    history.push(pathName);
    this.setState({ page: nextId });
  }

  previousPage(prevId) {
    const { blockUniqueId, formBaseURI } = this.props;
   // console.log("page==", blockUniqueId);
    let pathName = formBaseURI + blockUniqueId;
    if (prevId) {
      //pathName = `${formBaseURI + blockUniqueId}/${prevId}`;
      pathName = `${formBaseURI}/${blockUniqueId}/${prevId}`;
    }
    history.push(pathName);
    this.setState({ page: prevId });
  }


  // renderMultipleChild = ({ fields }) => {
  //   const { learningData } = this.props.initialValues;
  //   console.log("enter", learningData);
  //   let childFirstName, childId;
  //   return (
  //     <div>
  //       {fields.map((learningData, index) => {
         
  //         // childId = getChildData[0].childId;
  //         childFirstName = learningData[0].value;
  //         console.log("childFirstName", learningData);
  //         return (
  //           <div key={index}>
  //              <Field
  //         name={`${learningData}.firstName`}
  //         type="text"
  //         component={this.renderField}
  //         label="First Name"
  //       />
  //             <Field
  //             name={`${learningData}${index}.['value']`}
  //             value={`${learningData}${index}.value`}
  //             type="label"
  //             component={this.renderField}
  //             label="Last Name"/>
  //             {/* <FieldArray name={`${item}.learningData`} component={this.renderLearningData} /><br/> */}
  //           </div>
  //         )
  //       })
  //       }
  //     </div>
  //   );
  // };


  renderMultipleChild = (
    { fields, meta: { touched, error, submitFailed } }) => {
      return (
        <div>
            {fields.map((learningData, index) => (
                <div key={index}>
                        <Field
                          name={`${learningData}${index}['value']`}
                          value={`${learningData}${index}['value']`}
                          type="label"
                          component={this.renderField}
                          label="Learning Aim"
                        />
                </div>
        ))}
            
        </div>
      );
  };


    renderField = ({ input, label, type, meta: { touched, error } }) => (
      <div>
          {/* <textarea {...input} placeholder={label} className="form-control" /> */}
          {touched && error && <span>{error}</span>}
      </div>
  );

  submitForm(values, dispatch) {
    //console.log("val==", values);
  }

  render() {
    const { blockUniqueId, prevId, nextId, getChildData, getProfileData, getBlockListMeta, initialValues, sessionTimes } = this.props;
    const { error, handleSubmit, submitting, dispatch } = this.props;
    const { formatMessage } = this.props.intl;
    
    let firstName, lastName, age;
    if (getChildData && getChildData.getChildData) {
        firstName = getChildData.getChildData[0].firstName;
        age = calculateAge(getChildData.getChildData[0].birthday);
        lastName = getChildData.getChildData[0].lastName;
    }

    const tooltip = (
      <Tooltip id="tooltip">
        <div>
          <span>It's not fair to review the actual experiance of the child.</span> <br />
          <span>As a parent you should only make comments about your relationship with the mentor.</span>
        </div>
      </Tooltip>
    );
    return (

      <Row className={s.landingContainer}>
        <Col xs={12} sm={7} md={7} lg={7} className={s.landingContent}>
          <h3 className={s.landingContentTitle}><FormattedMessage {...messages.ratingChildReviewHeadText} /></h3>
          <OverlayTrigger placement="bottom" overlay={tooltip}>
            <p className={cx(s.fontAwesomeAlignment)}><FontAwesome.FaQuestionCircleO className={s.fontAwesomeWidth} /></p>
          </OverlayTrigger>
          <strong className={s.landingStep}><span className={s.reviewPageTitle1}><FormattedMessage {...messages.ratingChildReviewHeadText1} /></span></strong>
          <Form onSubmit={handleSubmit(this.submitForm)}>
            <div className={s.space3}>
              {
                getChildData && getChildData.getChildData && <span>{firstName} {''}
                {lastName} {''}{', '}
                Age {age}
                </span>
              }
              <FieldArray
                name="learningData"
                component={this.renderMultipleChild} />

            </div>
            <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
              <hr className={s.horizontalLineThrough} />
            </Col>
            {
              prevId && <Button className={cx(s.button, s.btnPrimary)} onClick={() => this.previousPage(prevId)}>
                Previous
                </Button>
            }
            {

              nextId && <Button className={cx(s.button, s.btnPrimary)} onClick={() => this.nextPage(nextId)}>
                Next
                </Button>
            }





            {/* <FormGroup className={s.formGroup}>
              <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                <Button className={cx(s.btn, s.button, s.btnPrimary, s.btnlarge)}
                  type="submit"
                  disabled={submitting}
                >
                  <FormattedMessage {...messages.submit} />
                </Button>
              </Col>
            </FormGroup> */}
          </Form>
        </Col>
        <Col xs={12} sm={7} md={7} lg={7} className={s.landingContent}>
        <ExperienceDetails sessionTimes={sessionTimes} getBlockListMeta= {getBlockListMeta}/>
        </Col>
      </Row>

    );
  }
}

RatingChildForm = reduxForm({
  form: 'RatingChildForm', // a unique name for this form
  // validateChild
})(RatingChildForm);

export default compose(
  injectIntl,
  withStyles(s)
)(RatingChildForm);
