import React, { Component } from 'react'
import PropTypes from 'prop-types';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LandingPage.css';
// Translation
import { FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

// Components
import TextBox from './TextBox/TextBox.js';
import TextImage from './TextImage/TextImage';

// Style
import {
  Row,
  Col,
  Grid,
} from 'react-bootstrap';

// Images
import block1 from './images/3_Mentor_TutorHere.jpg';
import block2 from './images/4_Mentor_TutorHere.jpg';
import block3 from './images/5_Mentor_TutorHere.jpg';


class ShowTask extends React.Component {

  render() {

    return (
      <Grid fluid className={s.centerItems}>
        <Row className={s.marginSize}>
          <Col md={7} lg={7} sm={12} xs={12} className={`${s.noPadding} ${s.textBoxContainer}`}>
            <TextBox title={messages.childImaginationTitle} mainText={messages.childImaginationDescription}/>
          </Col>
          <TextImage
            image={block1}
            author={messages.learningAboutHorsesAuthor}
            authorDescr={messages.learningAboutHorsesAuthorDescription}
            quote={messages.learningAboutHorsesQuote}
          />
        </Row>
        <Row className={`${s.marginSize} ${s.desktopView}`}>
          <TextImage
            image={block2}
            author={messages.samMadeMeLaughAuthor}
            authorDescr={messages.samMadeMeLaughAuthorDescription}
            quote={messages.samMadeMeLaughQuote}
          />
          <Col md={7} lg={7} sm={12} xs={12} className={`${s.textBoxContainer} ${s.alignToRight}`}>
            <TextBox title={messages.itTakesTitle} mainText={messages.itTakesDescription}/>
          </Col>
        </Row>
        <Row className={`${s.marginSize} ${s.mobileView}`}>
          <Col md={7} lg={7} sm={12} xs={12} className={`${s.textBoxContainer} ${s.alignToRight}`}>
            <TextBox title={messages.itTakesTitle} mainText={messages.itTakesDescription}/>
          </Col>
          <TextImage
            image={block2}
            author={messages.samMadeMeLaughAuthor}
            authorDescr={messages.samMadeMeLaughAuthorDescription}
            quote={messages.samMadeMeLaughQuote}
          />
        </Row>
        <Row className={cx(s.marginSize)}>
          <Col md={7} lg={7} sm={12} xs={12} className={`${s.noPadding} ${s.textBoxContainer}`}>
            <TextBox title={messages.teachInYourTitle} mainText={messages.teachInYourDescription}/>
          </Col>
          <TextImage
            image={block3}
            author={messages.allTeenagersShouldAuthor}
            authorDescr={messages.allTeenagersShouldAuthorDescription}
            quote={messages.allTeenagersShouldQuote}
          />
        </Row>
      </Grid>

    )
  }
}


export default withStyles(s)(ShowTask);
