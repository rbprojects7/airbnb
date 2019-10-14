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

// Internal Components
import CustomCheckbox from '../CustomCheckbox';
import ListPlaceTips from '../ListPlaceTips';
import Loader from '../Loader';

import updateStep2 from './updateStep2';

class PhotoCover extends Component {

  static propTypes = {
    previousPage: PropTypes.func,
    nextPage: PropTypes.func,
    listId: PropTypes.number.isRequired,
    listPhotos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })),
    coverPhoto: PropTypes.number
  };

  static defaultProps = {
    listPhotos: []
  };

  radioGroup = ({ label, name, options, input }) => (
      <ul className={s.listContainer}>
          { options.map((option, index) => (
            <li className={s.listContent} key={index}>
                <span className={s.checkBoxSection}>
                <input
                  type="radio"
                  name={input.name}
                  value={option.id}
                  onChange={() => input.onChange(option.id)}
                  />
                  </span> 
                  <span className={cx(s.checkBoxSection, s.checkBoxLabel)}>  
                     <span className={cx(s.checkboxLabel, s.noPadding)}>
                       <img 
                        src={'/images/upload/' + option.name} 
                        style={{height: 100, width: 100}}  
                        />
                     </span>
                  </span>
            </li>))
          }
      </ul>
    );


  render() {
    const { error, handleSubmit, submitting, dispatch, nextPage, previousPage } = this.props;
    const { listPhotos, listId, coverPhoto } = this.props;
    return (
      <Grid fluid>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={12} md={12} lg={12} className={s.landingContent}>
            <div>
              <h3 className={cx(s.landingContentTitle,s.landingTitleMargin)}><FormattedMessage {...messages.setCoverPhoto} /></h3>
              <form onSubmit={handleSubmit}>
                <div className={s.landingMainContent}>
                  <FormGroup className={s.formGroup}>
                    <div className={cx('row')}>
                      {
                        listPhotos && listPhotos.map((option, index) => (
                          <div className={cx('col-lg-6 col-md-6 col-sm-6 col-xs-12')} key={index}>
                            <div className={s.listPhotoCover}>
                              <div className={s.listPhotoMedia}>
                               <img className={s.imgResponsive}
                                src={'/images/upload/x_medium_' + option.name} 
                                />
                              </div>
                              <div className={s.coverPhotoSelection}>
                                <Field
                                  className={cx(s.coverPhotoCheckbox, s.radioSize)}
                                  type="radio"
                                  component="input"
                                  name="coverPhoto"
                                  value={option.id}
                                  checked={coverPhoto == option.id ? true : false}
                                />
                                <span> Cover</span>  
                              </div>
                            </div>
                          </div>))
                      }
                    </div>
                  </FormGroup>
                </div>

                <hr className={s.horizontalLineThrough} />

                <FormGroup className={s.formGroup}>
                  <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                    <Button className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft)} onClick={() => previousPage("photos")}>
                      <FormattedMessage {...messages.back} />
                    </Button>
                    <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)} onClick={() => nextPage("spaces")} >
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
    );
  }
}

PhotoCover = reduxForm({
  form: 'ListPlaceStep2', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: updateStep2
})(PhotoCover);

const selector = formValueSelector('ListPlaceStep2'); // <-- same as form name
const mapState = (state) => ({
  coverPhoto: selector(state, 'coverPhoto'),
  listPhotos: state.location.listPhotos
});
const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch) (PhotoCover)))
