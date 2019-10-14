import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import textImageStyles from './textImage.scss';
import s from '../LandingPage.css';
import { Col } from 'react-bootstrap';

class TextImage extends React.Component {

  render() {
    const { image, quote, authorDescr, author } = this.props;
    return (
      <Col md={5} lg={5} sm={12} xs={12} className={textImageStyles.imageContainer}>
        <div style={{ backgroundImage: `url(${image})` }} className={`${textImageStyles.image}`}>
          <div className={textImageStyles.textWrapper}>
            <div className={textImageStyles.quote}><FormattedMessage {...quote}/></div>
            <div className={textImageStyles.authorWrapper}>
              <div className={textImageStyles.author}><FormattedMessage {...author}/></div>
              <div className={textImageStyles.authorDescription}><FormattedMessage {...authorDescr}/></div>
            </div>
          </div>
        </div>
      </Col>
    )
  }
}


export default withStyles(textImageStyles)(TextImage);
