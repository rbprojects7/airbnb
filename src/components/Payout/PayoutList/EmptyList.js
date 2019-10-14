import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';

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
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EmptyList.css';

// Redirection
import Link from '../../Link';

// Locale
import messages from '../../../locale/messages';

class EmptyList extends Component {
  static propTypes = {
    siteName: PropTypes.string.isRequired,
    formatMessage: PropTypes.func,
  };

  handleClick() {
    history.push('/user/addpayout');
  }

  render() {
    const { siteName } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <Panel className={cx(s.panelHeader)} header={formatMessage(messages.payoutAccount)} >
        <div className={cx(s.spaceTop3)}>
          <span className={s.textTitle}><FormattedMessage {...messages.addPayoutMethod} /></span>
        </div>
        <div className={cx(s.spaceTop5, s.textLeadMargin)}>
          <span className={s.textLead}>
            <FormattedMessage {...messages.paymentReleaseInfo1} />{' '}
            <a target={'_blank'} href={'/terms'}>
              <FormattedMessage {...messages.TutorHereTermsOfService} />{' '}
            </a>
            <FormattedMessage {...messages.paymentReleaseInfo2} />{' '}
            <a target={'_blank'} href={'/privacy'}>
              <FormattedMessage {...messages.privacyPolicy} />{'.'}
            </a>
          </span>
        </div>
        <div className={cx(s.spaceTop5, s.textLeadMargin)}>
          <span className={s.textLead}>
            <FormattedMessage {...messages.paymentReleaseInfo3} />{' '}
            <a href={'https://stripe.com/us/connect-account/legal'} target={'_blank'}>
              <FormattedMessage {...messages.stripeConnectedAccountAgreement} />{', '}
            </a>
            <FormattedMessage {...messages.paymentReleaseInfo4} />{' '}
            <a href={'https://stripe.com/us/legal'} target={'_blank'}>
              <FormattedMessage {...messages.stripeTermsOfService} />{' '}
            </a>
            <FormattedMessage {...messages.paymentReleaseInfo5} />
          </span>
        </div>
        <div className={cx(s.spaceTop4, s.space2, s.textCenter)}>
          <Link to={"/user/addpayout"} className={cx(s.button, s.btnPrimary)}><FormattedMessage {...messages.registerYourAccount} /></Link>
          <span>
            <p className={cx(s.textLead, s.spaceTop4)}>
              <FormattedMessage {...messages.paymentReleaseInfo6} />{' '}
              <a target={'_blank'} href={'/privacy'}>
              <FormattedMessage {...messages.paymentReleaseInfo7} />
              </a>
              {' and the '}
              <a target={'_blank'} href={'https://stripe.com/us/connect-account/legal'}>
                <FormattedMessage {...messages.stripeConnectedAccountAgreement} />{'.'}
              </a>
            </p>
          </span>
        </div>
      </Panel>
    );
  }
}

const mapState = (state) => ({
  siteName: state.siteSettings.data.siteName,
});
const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(EmptyList)));