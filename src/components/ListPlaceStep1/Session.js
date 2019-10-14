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
// Component
import Link from '../Link';
import * as FontAwesome from 'react-icons/lib/fa';

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
  FormControl
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';

import activity15 from './page15.svg';
import activity16 from './page16.svg';

import updateStep3 from './updateStep3';

// Component
import ListPlaceTips from '../ListPlaceTips';

class Session extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    nextPage: PropTypes.func,
    previousPage: PropTypes.func,

  };


  render() {
    const { error, handleSubmit, submitting, dispatch, nextPage, previousPage, } = this.props;
    const { userData } = this.props;
    return (
      <Grid>
        <Row >
          <Col xs={12} sm={6} md={6} lg={6} className={s.landingContent}>
            <Col xs={12} sm={12} md={12} lg={12}>
              <h3 className={cx(s.landingContentTitle, s.landingTitleMargin)}><FormattedMessage {...messages.howManyRecentSession} /></h3>
              {/* <Link className={cx(s.sideNavitem, s.linkcolor)}>
                <FormattedMessage {...messages.learnMore} />
              </Link> */}
              <a href={'/sessionsandblocks'} target={'_blank'} className={cx(s.sideNavitem, s.linkcolor)}>
                <FormattedMessage {...messages.learnMore} />
              </a>
              <form onSubmit={handleSubmit}>
                <div className={cx(s.landingMainContent, s.spaceTop6)}>
                  {/* <ul className={cx(s.noPadding, s.noMargin, s.textHigh, s.textJustify, s.sessionListStyle)}>
                    <li className={cx(s.listContent, s.listDisplay)}>
                      <span className={cx(s.checkBoxSection, s.sessionCheckboxSection, s.numberCircleone, s.listDisplay)}>
                        1
                      </span> 
                      <span className={cx(s.checkBoxSection, s.checkBoxLabel)}>  
                        <span className={cx(s.landingContentSubTitle)}>
                          <FormattedMessage  {...messages.commitment} />
                        </span>
                        <br/>
                        <span className={s.landingSubContent}>
                          <FormattedMessage {...messages.sensePayment} />
                        </span>
                      </span>
                  </li> 
                    <li className={cx(s.listContent, s.listDisplay)}>
                      <span className={cx(s.checkBoxSection, s.sessionCheckboxSection, s.numberCircle, s.listDisplay)}>
                        2
                      </span> 
                      <span className={cx(s.checkBoxSection, s.checkBoxLabel)}>  
                        <span className={cx(s.landingContentSubTitle)}>
                         <FormattedMessage {...messages.offering} />
                        </span>
                        <br/>
                        <span className={s.landingSubContent}>
                         <FormattedMessage {...messages.offeringTime} />
                        </span>
                      </span>
                  </li> 
                    <li className={cx(s.listContent, s.listDisplay)}>
                      <span className={cx(s.checkBoxSection, s.sessionCheckboxSection, s.numberCircle, s.listDisplay)}>
                        3
                      </span> 
                      <span className={cx(s.checkBoxSection, s.checkBoxLabel)}>  
                        <span className={cx(s.landingContentSubTitle)}>
                           <FormattedMessage {...messages.offeringSingle} />
                        </span>
                        <br/>
                        <span className={s.landingSubContent}>
                          <FormattedMessage {...messages.offeringSingleTime} /> 
                        </span>
                      </span>
                  </li> 
                    
                  </ul> */}
                  {/* <ul className={cx(s.noPadding, s.noMargin, s.textHigh, s.textJustify, s.sessionListStyle, s.listMarginLeft)}>
                    <li className={cx(s.listContentNew, s.listDisplay)}>
                      <span className={cx(s.checkBoxSection, s.sessionCheckboxSection, s.listDisplay, s.circleStyle)}>
                        <FontAwesome.FaCircle />
                      </span>
                      <span className={cx(s.checkBoxSection, s.checkBoxLabel)}>
                        <span className={cx(s.textVerticalAlign, s.listSubContent)}>
                          <span className={cx(s.textVerticalAlign)}><FormattedMessage  {...messages.sessionMsgFirst} /></span>
                        </span>
                      </span>
                    </li>
                    <li className={cx(s.listContentNew, s.listDisplay)}>
                      <span className={cx(s.checkBoxSection, s.sessionCheckboxSection, s.listDisplay, s.circleStyle)}>
                        <FontAwesome.FaCircle />
                      </span>
                      <span className={cx(s.checkBoxSection, s.checkBoxLabel)}>
                        <span className={cx(s.textVerticalAlign, s.listSubContent)}>
                          <span className={cx(s.textVerticalAlign)}><FormattedMessage {...messages.sessionMsgSecond} /></span>
                        </span>
                      </span>
                    </li>
                  </ul> */}
                  <h3 className={cx(s.sessionSubContent)}><FormattedMessage {...messages.howManyRecentSessionContent} /></h3>
                </div>

                <hr className={s.horizontalLineThrough} />

                <FormGroup className={s.formGroup}>
                  <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                    <Button className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft)} onClick={() => previousPage("home")}>
                      <FormattedMessage {...messages.back} />
                    </Button>
                    {/* <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)} onClick={() => nextPage("pricing")}>
                      <FormattedMessage {...messages.next} />
                    </Button> */}
                    <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)} onClick={() => nextPage("availability-and-price")}>
                      <FormattedMessage {...messages.next} />
                    </Button>
                  </Col>
                </FormGroup>
              </form>
            </Col>
          </Col>
          <Col lg={6} md={6} sm={6} className={s.noPadding}>
            <Col xs={12} sm={12} md={12} lg={12} className={cx('hidden-xs', s.noPadding)}>
              <h3 className={s.sessionImageTitle}> <FormattedMessage {...messages.sessionImageContent} /></h3>
            </Col>
          </Col>
          <Col lg={6} md={6} sm={6} className={cx('hidden-xs', s.noPadding)}>  
            <div className={cx(s.imageContentSession)}
              style={{ backgroundImage: `url(${activity15})` }}>
            </div>
          </Col>
          {/* <Col xs={12} className={cx('visible-xs')}>
            <div className={cx(s.imageContentSession)}
              style={{ backgroundImage: `url(${activity16})` }}>
            </div>
          </Col> */}
        </Row>
      </Grid>
    )
  }
}

Session = reduxForm({
  form: 'ListPlaceStep3', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: updateStep3
})(Session);

const mapState = (state) => ({

});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Session)));
