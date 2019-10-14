// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import { FormattedMessage, injectIntl } from 'react-intl';
import { url } from '../../config';
// Redux Form
import { Field, reduxForm } from 'redux-form';
import { FormSection, formValueSelector } from 'redux-form';

// Bootstrap
import {
  Button,
  Grid,
  Row,
  Col
} from 'react-bootstrap';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './CookiesDisclaimer.css';

// Locale
import messages from '../../locale/messages';

import moment from 'moment';

class CookiesDisclaimer extends Component {

    static propTypes = {
        formatMessage: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            isCookiesSet: false,
            isPageLoad: false,
        };
        this.disclamierForm = this.disclamierForm.bind(this);
    }

    componentWillMount() {
        const cookiesValue = cookie.load('cookiesDisclaimer');
        this.setState({
            isCookiesSet: !!(cookiesValue)
        });
    }


    componentDidMount() {
        const cookiesValue = cookie.load('cookiesDisclaimer');
        this.setState({
            isCookiesSet: !!(cookiesValue),
            isPageLoad: true
        });
    }

    disclamierForm() {
        const maxAge = 3650 * 24 * 365;//one year
        cookie.save('cookiesDisclaimer', 'TutorHere', {
            path: '/',
            maxAge
        });
        this.setState({ isCookiesSet: true });
    }

    render() {
        const { formatMessage } = this.props.intl;
        const { isCookiesSet, isPageLoad } = this.state;
        const cookieURL = `${url}/cookies`;
        if (isCookiesSet) {
            return <span />;
        }
        return (
            <div>
                {
            isPageLoad && <div
              className={cx(s.root, s.container, s.fixedPosition)}
            >
                <div className={cx(s.cookiesBackground)}>

                    <Row>
                        <Col md={1} lg={1} className="hidden-xs hidden-sm" />
                        <Col md={8} lg={8} xs={12} sm={12}>
                            <div className={cx(s.root, s.cookieContentMargin)}>
                                <span className={cx(s.labelText)}>
                                    {formatMessage(messages.cookiesDisclaimer)}&nbsp;
                                    {formatMessage(messages.byContinuing)}&nbsp;
                                    <a
                                      target={'_blank'}
                                      href={cookieURL}
                                      className={cx(s.labelText)}
                                      style={{ textDecoration: 'underline' }}
                                    >
                                        {formatMessage(messages.cookiePolicy)}
                                    </a>
                                </span>
                            </div>
                        </Col>
                        <Col md={2} lg={1} xs={12} sm={12}>
                            <Button
                              type="button"
                              className={`${cx(s.button, s.btnlarge, s.buttonResponsive)} center-block`}
                              onClick={this.disclamierForm}
                            >
                                <span className={s.cookieText}>GOT IT</span>
                            </Button>
                        </Col>
                    </Row>

                </div>
            </div>
          }
            </div>
        );

    }
}

export default injectIntl(withStyles(s)(CookiesDisclaimer));
