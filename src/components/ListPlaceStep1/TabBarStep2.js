// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import { ProgressBar } from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TabBarStep2.css';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

class TabBarStep2 extends Component {

  static propTypes = {
    nextPage: PropTypes.func,
    formatMessage: PropTypes.func,
  };

  render() {
    const { nextPage, photosCount } = this.props;
    let partionClass = s.EditprogressStyle;
    if (photosCount && photosCount > 0) {
      partionClass = s.progressStyle;
    }

    return (
      <div className={cx(s.progressContainer, 'hidden-xs')}>
      <a className={s.linkReset} onClick={() => nextPage("map")} href="javascript:void(0);">
          <div className={cx(s.textTrunck, s.progressStep, s.progressSection , partionClass)} title="Location" >
            <FormattedMessage {...messages.location} />
          </div>
        </a>
        
        <a className={s.linkReset} onClick={() => nextPage("photos")} href="javascript:void(0);">
          <div className={cx(s.textTrunck, s.progressStep, s.progressSection, partionClass)} title="Photos" >
            <FormattedMessage {...messages.photos} />
          </div>
        </a>

        {
          photosCount != undefined && photosCount > 0 && <a className={s.linkReset} onClick={() => nextPage("cover-photo")} href="javascript:void(0);">
            <div className={cx(s.textTrunck, s.progressStep, s.progressSection, partionClass)} title="Set Cover Photo" >
              <FormattedMessage {...messages.setCover} />
            </div>
          </a>
        }

          <a className={s.linkReset} onClick={() => nextPage("spaces")} href="javascript:void(0);">
          <div className={cx(s.textTrunck, s.progressStep, s.progressSection , partionClass)} title="Safeguards" >
            <FormattedMessage {...messages.safeguards} />
          </div>
        </a>

        <a className={s.linkReset} onClick={() => nextPage("amenities")} href="javascript:void(0);">
          <div className={cx(s.textTrunck, s.progressStep, s.progressSection , partionClass)} title="Provisions" >
            <FormattedMessage {...messages.provisions} />
          </div>
        </a>

        
        
        <div>
          <ProgressBar className={s.leanProgress} />
        </div>
      </div>
    );
  }

}

export default withStyles(s)(TabBarStep2);

