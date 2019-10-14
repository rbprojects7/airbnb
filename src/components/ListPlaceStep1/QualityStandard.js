// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux Form
import { Field, reduxForm } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';


// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  Grid,
  Button,
  Form,
  Row,
  FormGroup,
  Col,
  ControlLabel,
  FormControl
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';

import update from './update';

// Component
import ListPlaceTips from '../ListPlaceTips';

class QualityStandard extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    nextPage: PropTypes.func,
    previousPage: PropTypes.func,

  };


  render() {
    const { error, handleSubmit, submitting, dispatch, nextPage, previousPage, } = this.props;
    const { userData } = this.props;
    return (
      <Grid>
        <Row >
          <Col xs={12} sm={6} md={6} lg={6} className={s.landingContent}>
            <Col xs={12} sm={12}  md={12}  lg={12}>
              <h3 className={s.landingContentTitle}><FormattedMessage {...messages.whatKindOfPlaceListing} /></h3>
              <form onSubmit={handleSubmit}>
                <div className={cx(s.ulLeft, s.landingMainContent)}>
                  <ul className={cx(s.noPadding, s.noMargin, s.textHigh, s.textJustify)}>
                    <li className={s.space2}><FormattedMessage {...messages.standards1} /></li>
                    <li className={s.space2}><FormattedMessage {...messages.standards2} /></li>
                    <li className={s.space2}><FormattedMessage {...messages.standards3} /></li>
                    <li className={s.space2}><FormattedMessage {...messages.standards4} /></li>
                    <li className={s.space2}><FormattedMessage {...messages.standards5} /></li>
                    <li className={s.space2}><FormattedMessage {...messages.standards6} /></li>
                  </ul>
                </div>

                {/* <hr className={s.horizontalLineThrough} /> */}

                <FormGroup className={s.formGroup}>
                  <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)} onClick={() => nextPage("make-description")}>
                      <FormattedMessage {...messages.next} />
                    </Button>
                </FormGroup>
              </form>
            </Col>
          </Col>
          <ListPlaceTips page={'page2'} />
        </Row>
      </Grid>
    )
  }
}

QualityStandard = reduxForm({
  form: 'ListPlaceStep1', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: update
})(QualityStandard);

const mapState = (state) => ({

});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(QualityStandard)));
