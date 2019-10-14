import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Feedback.css';
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  Grid
} from 'react-bootstrap';
import * as FontAwesome from 'react-icons/lib/fa';

class Feedback extends React.Component {
  render() {
    return (
      <div className={s.root}>
        {/* <div className={s.container}>
          <div className={s.feedbackContainer}>
          <Grid fluid>
          <Row className={s.feedbackRow}>
            <Col xs={12} sm={4} md={4} lg={4}  className={s.feedbackBox}>
                <div className={s.feedbackIcon}>
                  <FontAwesome.FaPhone />
                </div>

                <div className={s.feedbackContent}>
                  <label className={s.landingLabel}>24/7 customer support</label>
                  <label className={s.landingCaption}>If you need help while traveling or hosting, contact us at our toll free number: 000 000 0000 000</label>
                </div>
            </Col>

             <Col xs={12} sm={4} md={4} lg={4} className={s.feedbackBox}>
                <div className={s.feedbackIcon}>
                  <FontAwesome.FaShield />
                </div>
                <div className={s.feedbackContent}>
                  <label className={s.landingLabel}>6,00,00,000 host guarantee</label>
                  <label className={s.landingCaption}>Hosts are protected against property damages for up to 6,00,00,000. <a className={s.modalCaptionLink}> Learn more</a></label>
                </div>
            </Col>

            <Col xs={12} sm={4} md={4} lg={4} className={s.feedbackBox}>
                <div className={s.feedbackIcon}>
                  <FontAwesome.FaCheckSquareO/>
                </div>
                <div className={s.feedbackContent}>
                  <label className={s.landingLabel}>  Verified ID</label>
                  <label className={s.landingCaption}>We aim to build a trusted community by giving you more info when youre deciding who to host or stay with.</label>
                </div>
            </Col>
          </Row>
          </Grid>
          </div>
        </div> */}
      </div>
    );
  }
}

export default withStyles(s)(Feedback);
