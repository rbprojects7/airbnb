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
import { connect } from 'react-redux';

// Translation
import { injectIntl } from 'react-intl';
import history from '../../../core/history';
// Locale
import messages from '../../../locale/messages';
import { FormattedMessage } from 'react-intl';


class ImageNewsFeed extends React.Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool,
    };

    render() {
        const { isAuthenticated } = this.props;
        let webGrid = 12,
            smGrid = 12;
        if (!isAuthenticated) {
            webGrid = 9;
            smGrid = 8;
        }

        return (
            <Grid fluid>
                <Row>
                    <Col lg={12} md={12} sm={12} xs={12} className={s.container}>
                        <div className={cx(s.mainSection, s.displayTable)}>
                            <Col className={cx(s.displayTableCell)} lg={webGrid} md={webGrid} sm={smGrid} xs={12}>
                                <div>
                                    <h3 className={s.titleText}>
                                        <FormattedMessage {...messages.homeImageNewsFirst} />
                                    </h3>
                                </div>
                                <div className={s.subText}>
                                    <p>
                                        <FormattedMessage {...messages.homeImageNewsFirstSubtext} />
                                    </p>
                                </div>
                            </Col>

                            {
                                !isAuthenticated && <Col lg={3} md={3} sm={4} xs={12} className={cx(s.displayTableCell, s.ButtonSection, s.textAlignCenter, s.webTextRight)}>
                                    <div>
                                        <Button className={s.btn} onClick={() => history.push('/register/')}>
                                            CREATE AN ACCOUNT
                                    </Button>
                                    </div>
                                </Col>
                            }

                        </div>
                    </Col>
                </Row>

                <Row className={cx(s.RowMarginBottom)}>
                    <Col className={cx(s.displayTableCell)} lg={12} md={12} sm={12} xs={12} className={s.middleContainer}>
                        <div className={cx(s.mainSection, s.displayTable)}>
                            <Col lg={4} md={4} sm={4} xs={12} className={cx(s.ButtonSection, s.textAlignCenter, s.displayTableCell, s.hiddenXs)}>
                                <div className={s.textAlign}>
                                    <Button className={s.btn} onClick={() => history.push('/s/')}>
                                        SEARCH EXPERIENCES
                                   </Button>
                                </div>
                            </Col>
                            <Col lg={8} md={8} sm={8} xs={12} className={cx(s.secondSectionTextAlignment, s.displayTableCell)}>
                                <div>
                                    <h3 className={cx(s.middleContainerText)}>
                                        <FormattedMessage {...messages.homeImageNewsSecond} />
                                    </h3>
                                </div>
                                <div className={cx(s.middleContainerSubText)}>
                                    <p>
                                        <FormattedMessage {...messages.homeImageNewsSecondSubtext} />
                                    </p>
                                </div>
                            </Col>
                            <Col xs={12} className={cx(s.ButtonSection, s.textAlignCenter, s.visibleXs, 'visible-xs')}>
                                <div className={s.textAlign}>
                                    <Button className={s.btn} onClick={() => history.push('/s/')}>
                                        SEARCH EXPERIENCES
                                   </Button>
                                </div>
                            </Col>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col lg={12} md={12} sm={12} xs={12} className={s.container}>
                        <div className={cx(s.mainSection, s.displayTable)}>
                            <Col lg={9} md={9} sm={8} xs={12} className={cx(s.displayTableCell)}>
                                <div>
                                    <h3 className={s.titleText}>
                                        <FormattedMessage {...messages.homeImageNewsThird} />
                                    </h3>
                                </div>
                                <div className={s.subText}>
                                    <p>
                                        <FormattedMessage {...messages.homeImageNewsThirdSubtext} />
                                    </p>
                                </div>
                            </Col>
                            <Col lg={3} md={3} sm={4} xs={12} className={cx(s.ButtonSection, s.textAlignCenter, s.displayTableCell, s.webTextRight)}>
                                <div className={s.textAlign}>
                                    <Button className={s.btn} onClick={() => history.push('/whymentor/')}>
                                        BECOME A MENTOR
                                   </Button>
                                </div>
                            </Col>
                        </div>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

const mapState = state => ({
    isAuthenticated: state.runtime.isAuthenticated,
});

const mapDispatch = {

};
export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ImageNewsFeed)));
//   export default (withStyles(s)(ImageNewsFeed));
