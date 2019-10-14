import React, { Component } from 'react';
import Image from './Bottombanner.jpg';
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

import history from '../../../core/history';

class Test extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(type) {
        if (type == 'campspace') {
            history.push('/become-a-mentor?mode=new&type=1');
        } else {
            history.push('/become-a-mentor?mode=new&type=2');
        }
    }

    render() {
        return (            
        
            <div className={s.bannerHeader}>
                <div className={s.imageBanner} style={{ backgroundImage: `url(${Image})` }} />
                    <div className={s.bannerText}>
                        <h1 className={s.bannerTitle}><FormattedMessage {...messages.bottomBannerTitle} /></h1>
                        <div className={s.buttonWidth}>
                            <Col xs={12} sm={6} md={5} lg={5} className={cx(s.smSpace, s.noPadding)}>
                            <Button className={cx(s.button)}>
                                <FormattedMessage {...messages.bottomBannerBtnOne} />
                            </Button>
                            </Col>
                            <Col xs={12} sm={6} md={5} lg={5} className={cx(s.smPadding, s.smSpace, s.btnRight)}>
                            <Button className={cx(s.button)}>
                                <FormattedMessage {...messages.bottomBannerBtnTwo} />
                            </Button>
                            </Col>
                        </div>
                    </div>
            </div>
        );
    }
}

export default withStyles(s)(Test);