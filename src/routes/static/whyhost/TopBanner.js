import React, { Component } from 'react';
import Image from './images/1a_Mentor_TutorHere.jpg';
import SecImage from './images/1b_Mentor_TutorHere.jpg';
import ThirdImage from './images/1c__Mentor_TutorHere.jpg';
import ForthImage from './images/1d_Mentor_TutorHere.jpg';
import FifthImage from './images/1e_Mentor_TutorHere.jpg';
import SecondImage from './images/middleBanner.jpg';
import SecondImageMobile from './images/middleBannerMobile.jpg';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Banner.css';
import {
    Button,
    Grid,
    Row,
    Col,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
} from 'react-bootstrap';
import cx from 'classnames';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

// History
import history from '../../../core/history';

// ES6 Imports
import Scroll from 'react-scroll'; // Imports all Mixins


// Or Access Link,Element,etc as follows
const Link = Scroll.Link;
const Element = Scroll.Element;
const Events = Scroll.Events;
const scroll = Scroll.animateScroll;
const scrollSpy = Scroll.scrollSpy;

class Test extends Component {

    images = [Image, SecImage, ThirdImage, ForthImage, FifthImage];
    state = {currentImage: 0};


    componentDidMount() {
      this.scrollImages();
    }

    handleClick() {
        history.push('/become-a-mentor?mode=new');
    }
    render() {
        return (
            <div>
                <div className={s.TopBannerHeader}>
                    <div className={s.topImageBanner} style={{backgroundImage: `url(${this.images[this.state.currentImage]})`, transition: 'background 2s ease-in'}} />
                    {this.images.map((img)=><link rel="preload" href={img} as="image" />)}
                  <div className={s.gradient} >
                    <div className={s.topBannerText}>
                        <Col xs={12} sm={12} md={8} lg={8} className={s.contentWrapper}>
                            <h1 className={s.topBannerTitle}><FormattedMessage {...messages.topBannerTitle}/></h1>
                            <div className={s.topBannerButtonsWrapper}>
                              <Button className={cx(s.button)} onClick={this.handleClick}>
                                  <FormattedMessage {...messages.bottomBannerBtnOne} />
                              </Button>
                              <Link className={cx(s.button,s.buttonPosition, s.btnPrimaryBorder, s.learnMoreButton, s.linkButton, s.btnRight, "btn btn-default")} activeClass={s.active} to="test1" spy={true} smooth={true}>
                                  <FormattedMessage {...messages.bottomBannerBtnTwo} />
                              </Link>
                            </div>
                        </Col>
                    </div>
                  </div>
                </div>
                <Element name="test1" className={`element ${s.middleBannerElement} ${s.centerItems}`}>
                    <div className={s.middleBannerHeader}>
                      <div className={s.imageWrapper}>
                        <div className={`${s.topImageBanner} ${s.middleBannerImage} ${s.desktopView}`} style={{ backgroundImage: `url(${SecondImage})` }} />
                        <div className={`${s.topImageBanner} ${s.middleBannerImage} ${s.mobileView}`} style={{ backgroundImage: `url(${SecondImageMobile})` }} />
                      </div>
                        <div className={s.middleBannerTextContainer}>
                            <Col md={6} sm={12} lg={6} xs={12}  className={s.middleBannerText}>
                                <h1 className={s.bannerTitle}><FormattedMessage {...messages.middleBannerTitle} /></h1>
                                <h3 className={s.bannerDescription}><FormattedMessage {...messages.middleBannerSubTitle} /></h3>
                            </Col>
                        </div>
                    </div>
                </Element>
            </div>
        );
    }

    changeImages = () => {
        this.state.currentImage < this.images.length - 1 ?
          this.setState({currentImage: this.state.currentImage + 1})
        :
          this.setState({currentImage: 0});
    }

    scrollImages = () => {
        setInterval(this.changeImages, 3000);
  }
}

export default withStyles(s)(Test);
