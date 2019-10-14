import React, { Component } from 'react'
import PropTypes from 'prop-types';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ShowTask.css';
// Translation
import { FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

import {
    Row,
    Col,
    Grid,
} from 'react-bootstrap';
import Image from './kid.jpeg';
class ShowTask extends React.Component {

    render() {

        return (
                <Grid fluid>
                    <Row className={s.marginSize}>
                        <Col md={6} lg={6} sm={12} xs={12} >
                            <div className={s.bgColor}>
                                <div className={cx(s.textContainer, s.textPadding)}>
                                    <h1 className={cx(s.textStyle2, s.space, s.spaceTop)}>
                                        <FormattedMessage {...messages.childImagination} />
                                    </h1>
                                    <p className={cx(s.textStyle, s.space)}>
                                        <FormattedMessage {...messages.childImaginationText} />
                                    </p>
                                    <p className={cx(s.textStyle)}>
                                        <FormattedMessage {...messages.childImaginationText2} />
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col md={6} lg={6} sm={12} xs={12} className={s.noPadding}>
                            <div style={{ backgroundImage: `url(${Image})` }} className={cx(s.bgImage, s.bgImage2)}></div>
                        </Col>

                    </Row>
                    <Row className={cx(s.marginSize, s.desktopView)}>
                        <Col md={6} lg={6} sm={12} xs={12}>
                            <div style={{ backgroundImage: `url(${Image})` }} className={s.bgImage}></div>
                        </Col>
                        <Col md={6} lg={6} sm={12} xs={12} className={s.noPadding} >
                            <div className={s.bgColor}>

                                <div className={cx(s.textContainer, s.textPadding)}>
                                    <h1 className={cx(s.textStyle2, s.space, s.spaceTop)}>
                                        <FormattedMessage {...messages.itTakes} />
                                    </h1>
                                    <p className={cx(s.textStyle, s.space)}>
                                        <FormattedMessage {...messages.itTakesText1} />
                                    </p>
                                    <p className={cx(s.textStyle)}>
                                        <FormattedMessage {...messages.itTakesText2} />
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className={cx(s.marginSize, s.mobileView)}>
                        <Col md={6} lg={6} sm={12} xs={12}>

                            <div className={s.bgColor}>
                                <div className={cx(s.textContainer, s.textPadding)}>
                                    <h1 className={cx(s.textStyle2, s.space, s.spaceTop)}>
                                        <FormattedMessage {...messages.itTakes} />
                                    </h1>
                                    <p className={cx(s.textStyle, s.space)}>
                                        <FormattedMessage {...messages.itTakesText1} />
                                    </p>
                                    <p className={cx(s.textStyle)}>
                                        <FormattedMessage {...messages.itTakesText2} />
                                    </p>

                                </div>
                            </div>
                        </Col>
                        <Col md={6} lg={6} sm={12} xs={12} className={s.noPadding} >
                            <div style={{ backgroundImage: `url(${Image})` }} className={cx(s.bgImage, s.bgImage2)}></div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} lg={6} sm={12} xs={12} >
                            <div className={s.bgColor}>
                                <div className={cx(s.textContainer, s.textPadding)}>
                                    <h1 className={cx(s.textStyle2, s.space, s.spaceTop)}>
                                        <FormattedMessage {...messages.teachYourOwn} />
                                    </h1>
                                    <p className={cx(s.textStyle, s.space)}>
                                        <FormattedMessage {...messages.teachYourOwn1} />
                                    </p>
                                    <p className={cx(s.textStyle)}>
                                        <FormattedMessage {...messages.teachYourOwn2} />
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col md={6} lg={6} sm={12} xs={12} className={s.noPadding}>
                            <div style={{ backgroundImage: `url(${Image})` }} className={cx(s.bgImage, s.bgImage2, s.bgImageBottom)}></div>
                        </Col>

                    </Row>
                </Grid>

        )
    }
}


export default withStyles(s)(ShowTask);