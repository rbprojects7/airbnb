import React from 'react';
import { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';


// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

import s from './Faq.css';
import * as FontAwesome from 'react-icons/lib/fa';
import {
    Button,
    Grid,
    Row,
    Col,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Carousel,
} from 'react-bootstrap';
import Link from '../../Link';

// History
import history from '../../../core/history';


// Locale
import messages from '../../../locale/messages';

class SlideComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    handleClick() {
        history.push('/contact');
    }
    render() {
        const { formatMessage } = this.props.intl;

        return (
            <Grid fluid>
                <Row className={cx(s.landingContainer, s.desktopView)}>
                    <Col xs={12} sm={12} md={12} lg={12} className={cx(s.space6,s.noPadding)}>
                        <Col xs={12} sm={12} md={10} lg={10} className={s.noPadding}>
                            <h1 className={s.bannerTitle}><FormattedMessage {...messages.faqTitle} /></h1>
                        </Col>
                    </Col>
                    <div className={cx(s.spaceTop4,s.faqBorder)}>
                        <div className={s.qaSpace}>
                            <h3 className={s.faqTitle}><FormattedMessage {...messages.faqQuestionOne} /></h3>
                            <p className={s.faqDescription}><FormattedMessage {...messages.faqAnsOne} /></p>
                        </div>
                    </div>
                    <div className={s.faqBorder}>
                        <div className={s.qaSpace}>
                            <h3 className={s.faqTitle}><FormattedMessage {...messages.faqQuestionTwo} /></h3>
                            <p className={s.faqDescription}><FormattedMessage {...messages.faqAnsTwo} /></p>
                        </div>
                    </div>
                    <div>
                      <div className={s.qaSpace}>
                        <h3 className={s.faqTitle}><FormattedMessage {...messages.faqQuestionFour} /></h3>
                        <p className={s.faqDescription}><FormattedMessage {...messages.faqAnsFour} /></p>
                      </div>
                    </div>
                    <div>
                        <div className={s.qaSpace}>
                            <h3 className={s.faqTitle}><FormattedMessage {...messages.faqQuestionThree} /></h3>
                            <p className={s.faqDescription}><FormattedMessage {...messages.faqAnsThree} /></p>
                        </div>
                    </div>
                    <div>
                      <div className={s.qaSpace}>
                        <h3 className={s.faqTitle}><FormattedMessage {...messages.faqQuestionFive} /></h3>
                        <p className={s.faqDescription}><FormattedMessage {...messages.faqAnsFive} /></p>
                      </div>
                    </div>
                </Row>
            </Grid>
        );
    }
};



export default injectIntl(withStyles(s)(SlideComponent));
