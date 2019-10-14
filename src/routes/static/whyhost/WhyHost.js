import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WhyHost.css';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';

// Components
import LandingPage from '../../../components/LandingPage';
import ShowTask from '../../../components/ShowTask';
import HowItWorks from '../../../components/HowItWorks';
import SocialIcon from '../../../components/SocialIcon';

import Faq from '../../../components/LandingPage/Faq';
import TopBanner from './TopBanner';


class EditProfile extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render () {
    const {title} = this.props;
    return (
        <div>
          <Row className={s.landingContainer}>
            <TopBanner />
            <LandingPage />
            <HowItWorks />
            <div className={`${s.desktopView}`}>
              <SocialIcon />
            </div>
            <hr className={`${s.divider} ${s.desktopView}`}/>
            <Faq />
          </Row>
        </div>
    );
  }

}

export default withStyles(s)(EditProfile);
