import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ImageNewsFeed.css';
import {
    Row,
    Col,
    Grid,
    Button
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Locale
import messages from '../../locale/messages';

// History
import history from '../../core/history';

class ImageNewsFeed extends React.Component {
    render() {
        return(
            <Grid fluid>
                <Row>
                    <Col lg={12} md={12} sm={12} xs={12} className={s.container}>
                        <div className={s.mainSection}>
                            <div>
                                <Col lg={9} md={9} sm={8} xs={12}>
                                    <div>
                                        <h3 className={s.titleText}>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown.
                                    </h3>
                                    </div>
                                    <div className={s.subText}>
                                        <p>
                                            printer took a galley of type and scrambled it to make a type specimen book.
                                        </p>
                                    </div>
                                </Col>
                            </div>
                            <div>
                                <Col lg={3} md={3} sm={4} xs={12} className={cx(s.ButtonSection, s.textAlignCenter)}>
                                    <div>
                                        <a href="#">
                                            <Button className={s.btn}>
                                                CREATE AN ACCOUNT
                                            </Button>
                                        </a>
                                    </div>
                                </Col>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row className={cx(s.RowMarginBottom)}>
                    <Col lg={12} md={12} sm={12} xs={12} className={s.container}>
                        <div className={s.mainSection}>
                            <div>
                                <Col lg={3} md={3} sm={4} xs={12} className={cx(s.ButtonSection, s.textAlignCenter, 'hidden-xs')}>
                                    <div>
                                        <a href="#">
                                            <Button className={s.btn}>
                                                CREATE AN ACCOUNT
                                            </Button>
                                        </a>
                                    </div>
                                </Col>
                            </div>
                            <div>
                                <Col lg={9} md={9} sm={8} xs={12} className={s.secondSectionTextAlignment}>
                                    <div>
                                        <h3 className={s.titleText}>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown.
                                    </h3>
                                    </div>
                                    <div className={s.subText}>
                                        <p>
                                            printer took a galley of type and scrambled it to make a type specimen book.
                                        </p>
                                    </div>
                                </Col>
                            </div>
                            <div>
                                <Col lg={3} md={3} sm={4} xs={12} className={cx(s.ButtonSection, s.textAlignCenter, 'hidden-sm', 'hidden-lg', 'hidden.md', s.ButtonSectionHidden)}>
                                    <a href="#">
                                        <Button className={s.btn}>
                                            CREATE AN ACCOUNT
                                        </Button>
                                    </a>
                                </Col>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row className={cx(s.RowMarginBottom)}>
                    <Col lg={12} md={12} sm={12} xs={12} className={s.container}>
                        <div className={s.mainSection}>
                            <div>
                                <Col lg={9} md={9} sm={8} xs={12}>
                                    <div>
                                        <h3 className={s.titleText}>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown.
                                    </h3>
                                    </div>
                                    <div className={s.subText}>
                                        <p>
                                            printer took a galley of type and scrambled it to make a type specimen book.
                                        </p>
                                    </div>
                                </Col>
                            </div>
                            <div>
                                <Col lg={3} md={3} sm={4} xs={12} className={cx(s.ButtonSection, s.textAlignCenter)}>
                                    <div className={s.textAlign}>
                                        <a href="#">
                                            <Button className={s.btn}>
                                                CREATE AN ACCOUNT
                                            </Button>
                                        </a>
                                    </div>
                                </Col>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Grid>
        );
    }
}


export default (withStyles(s)(ImageNewsFeed));
