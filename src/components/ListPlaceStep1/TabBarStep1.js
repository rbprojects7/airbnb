// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import { ProgressBar } from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TabBarStep1.css';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

class TabBarStep1 extends Component {

  static propTypes = {
    nextPage: PropTypes.func,
    formatMessage: PropTypes.func,
  };

  render() {
    const { nextPage } = this.props;

    return (
      <div className={cx(s.progressContainer, 'hidden-xs')}>
      
       

         <a className={s.linkReset} onClick={() => nextPage("make-description")} href="javascript:void(0);">
          <div className={cx(s.textTrunck, s.progressStep, s.progressSection , s.progressStyle)} title="Title description" >
            <FormattedMessage {...messages.titleDescription} />
          </div>
        </a>
        <a className={s.linkReset} onClick={() => nextPage("ages")} href="javascript:void(0);">
          <div className={cx(s.textTrunck, s.progressStep, s.progressSection , s.progressStyle)} title="Age" >
            <FormattedMessage {...messages.ages} />
          </div>
        </a>
        <a className={s.linkReset} onClick={() => nextPage("learning")} href="javascript:void(0);">
          <div className={cx(s.textTrunck, s.progressStep, s.progressSection , s.progressStyle)} title="Learning" >
            <FormattedMessage {...messages.strengths} />
          </div>
        </a>
        <a className={s.linkReset} onClick={() => nextPage("learning-experience")} href="javascript:void(0);">
          <div className={cx(s.textTrunck, s.progressStep, s.progressSection , s.progressStyle)} title="Learning Experience" >
            <FormattedMessage {...messages.learningExperienceTab} />
          </div>
        </a>

        <a className={s.linkReset} onClick={() => nextPage("learning-aims")} href="javascript:void(0);">
          <div className={cx(s.textTrunck, s.progressStep, s.progressSection , s.progressStyle)} title="Learning Aims" >
            <FormattedMessage {...messages.learningAimsTab} />
          </div>
        </a>

        <a className={s.linkReset} onClick={() => nextPage("group-size")} href="javascript:void(0);">
          <div className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)} title="Group Size" >
            <FormattedMessage {...messages.tabGroupSize} />
          </div>
        </a>

        <a className={s.linkReset} onClick={() => nextPage("personal-qualities")} href="javascript:void(0);">
          <div className={cx(s.textTrunck, s.progressStep, s.progressSection, s.progressStyle)} title="Personal Qualities" >
            <FormattedMessage {...messages.tabPersonalQualities} />
          </div>
        </a>

      
        {/* <a className={s.linkReset} onClick={() => nextPage("room")} href="javascript:void(0);">
          <div className={cx(s.textTrunck, s.progressStep, s.progressSection , s.progressStyle)} title="Place type" >
            <FormattedMessage {...messages.tabPlaceType} />
          </div>
        </a> */}

        {/* <a className={s.linkReset} onClick={() => nextPage("bedrooms")} href="javascript:void(0);">
          <div className={cx(s.textTrunck, s.progressStep, s.progressSection , s.progressStyle)} title="Bedrooms" >
            <FormattedMessage {...messages.bedrooms} />
          </div>
        </a> */}

       

       
      

        <div>
          <ProgressBar className={s.leanProgress}  />
        </div>
  
      </div>
    );
  }

}

export default withStyles(s)(TabBarStep1);

