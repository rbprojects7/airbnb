// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import { ProgressBar } from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TabBarStep3.css';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

class TabBarStep3 extends Component {

  static propTypes = {
    nextPage: PropTypes.func,
    formatMessage: PropTypes.func,
  };

  render() {
    const { nextPage } = this.props;

    return (
       <div className={cx(s.progressContainer, 'hidden-xs')}>

        <a className={s.linkReset} onClick={() => nextPage("session")} href="javascript:void(0);">
          <div className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)} title="Session" >
            <FormattedMessage {...messages.tabSession} />
          </div>
        </a>



          {/* <a className={s.linkReset} onClick={() => nextPage("calendar")} href="javascript:void(0);">
            <div className={cx(s.textTrunck, s.progressStep, s.progressSection , s.progressStyle)} title="Calendar" >
              <FormattedMessage {...messages.tabCalendar} />
            </div>
          </a> */}

           <a className={s.linkReset} onClick={() => nextPage("availability-and-price")} href="javascript:void(0);">
            <div className={cx(s.textTrunck, s.progressStep, s.progressSection , s.progressStyle)} title="Availability" >
              <FormattedMessage {...messages.availabilityAndPrice} />
            </div>
          </a>

          <a className={s.linkReset} onClick={() => nextPage("pricing")} href="javascript:void(0);">
            <div className={cx(s.textTrunck, s.progressStep, s.progressSection , s.progressStyle)} title="Pricing" >
              <FormattedMessage {...messages.tabPricing} />
            </div>
          </a>

          <a className={s.linkReset} onClick={() => nextPage("booking-window")} href="javascript:void(0);">
            <div className={cx(s.textTrunck, s.progressStep, s.progressSection , s.progressStyle)} title="Booking window" >
              <FormattedMessage {...messages.bookingWindow} />
            </div>
          </a>

          {/* <a className={s.linkReset} onClick={() => nextPage("advance-notice")} href="javascript:void(0);">
            <div className={cx(s.textTrunck, s.progressStep, s.progressSection , s.progressStyle)} title="Advance Notice" >
             <FormattedMessage {...messages.advanceNotice} />
            </div>
          </a>
           */}

        {/* <a className={s.linkReset} onClick={() => nextPage("booking-scenarios")} href="javascript:void(0);">
          <div className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)} title="Summary" >
            <FormattedMessage {...messages.tabBooking} />
          </div>
        </a> */}

         {/* <a className={s.linkReset} onClick={() => nextPage("local-laws")} href="javascript:void(0);">
            <div className={cx(s.textTrunck, s.progressStep, s.progressSection , s.progressStyle)} title="Local Laws" >
              <FormattedMessage {...messages.tabLocalLaws} />
            </div>
          </a> */}

        <div>
          <ProgressBar className={s.leanProgress}  />
        </div>
      </div>
    );
  }

}

export default withStyles(s)(TabBarStep3);
