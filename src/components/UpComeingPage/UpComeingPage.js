import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';


import { Button, Row, Col, Panel, Grid, 
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UpComeingPage.css';

import history from '../../core/history';

// Locale
import messages from '../../locale/messages';

class UpComeingPage extends React.Component {
    render(){
        return(
            <Grid fluid>
                <Row>
                    <Col sm={12} lg={12} md={12} xs={12}>
                        <div>
                            <h1 className={s.headTitle}>Coming Soon</h1>
                        </div>
                    </Col>
                </Row>
            </Grid>
        );
    }

}

export default withStyles(s)(UpComeingPage);