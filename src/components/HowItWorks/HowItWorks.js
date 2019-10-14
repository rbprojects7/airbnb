import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HowItWorks.css';
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
  Grid,
  Button
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Images
import Image from './1.jpeg';

// Locale
import messages from '../../locale/messages';

// History
import history from '../../core/history';

class HowItWorks extends React.Component {

  handleClick() {
    history.push('/become-a-mentor?mode=new');
  }

  render() {
    const { formatMessage } = this.props.intl;

    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.bannerHeader}>
            <div className={s.imageBanner} />
              <h3 className={s.containerTitle}>{formatMessage(messages.howItWork)}</h3>
            <div className={s.feedbackContainer}>

          <Row className={cx(s.space6,s.feedbackRow)}>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Col xs={12} sm={4} md={4} lg={4}  className={s.feedbackBox}>
                <div className={s.feedbackIcon}>
                 1
                </div>
                <div className={s.feedbackContent}>
                    <label className={s.landingLabel}>{formatMessage(messages.searchAndExplore)}</label>
                </div>
            </Col>
             <Col xs={12} sm={4} md={4} lg={4} className={s.feedbackBox}>
                <div className={s.feedbackIcon}>
                 2
                </div>
                <div className={s.feedbackContent}>
                  <label className={s.landingLabel}>{formatMessage(messages.contactToHost)}</label>
                </div>
            </Col>

            <Col xs={12} sm={4} md={4} lg={4} className={s.feedbackBox}>
                <div className={s.feedbackIcon}>
                 3
                </div>
                <div className={s.feedbackContent}>
                  <label className={s.landingLabel}>{formatMessage(messages.letsEnjoyCampingAndActivity)}</label>
                </div>
            </Col>
                <Col xs={12} sm={12} md={12} lg={12} className={s.btnAlign}>
                  <Button className={s.button} onClick={this.handleClick}>
                    <FormattedMessage {...messages.okayImReady} />
                  </Button>
                </Col>
              </Col>
          </Row>

              </div>
        </div>
      </div>
      </div>
    );
  }
}

export default injectIntl(withStyles(s)(HowItWorks));
