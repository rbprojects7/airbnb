// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux Form
import { Field, reduxForm, formValueSelector, change } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

import IncrementButton from '../IncrementButton';


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

import ListPlaceTips from '../ListPlaceTips';

import validate from './validate';

class GroupSize extends Component {

    static propTypes = {
        maximumSize: PropTypes.number,
        minimumSize: PropTypes.number,
        isDisabled: PropTypes.bool,
    };

    static defaultProps = {
        minimumSizeData: 0,
        maximumSizeData: 0
    }

    constructor(props) {
        super(props);
    }

    renderIncrementButton = (field) => {
        return (
            <div>
                <IncrementButton
                    {...field}
                />
            </div>
        )
    };

    render() {
        const { error, handleSubmit, submitting, dispatch, nextPage, previousPage } = this.props;
        const { minimumSizeData, maximumSizeData } = this.props;
        let isDisabled = false;
        if (maximumSizeData < minimumSizeData) {
            isDisabled = true;
        }

        return (
            <Grid>
                <Row>
                    <Col xs={12} sm={6} md={6} lg={6} className={s.landingContent}>
                        <Col xs={12}  sm={12}  md={12}  lg={12}>
                            <h3 className={cx(s.landingContentTitle, s.landingTitleMargin)}><FormattedMessage {...messages.idealGroupSize} /> </h3>
                            <form onSubmit={handleSubmit}>
                                <div className={s.landingMainContent}>
                                    <p className={cx(s.space2, s.landingSubText)}><FormattedMessage {...messages.acceptSmallestGroupSize} /></p>
                                    <h4 className={cx(s.landingSubTitle, s.spaceTop6)}><FormattedMessage {...messages.maximumSize} /></h4>
                                    <FormGroup>
                                        <Field
                                            name="maximumSize"
                                            type="text"
                                            component={this.renderIncrementButton}
                                            minValue={1}
                                            maxValue={100}
                                            incrementBy={1}
                                        />
                                        {isDisabled && <div className={s.errorMessage}> <FormattedMessage {...messages.maximumSizeInvalid} /> </div>}
                                    </FormGroup>
                                    <p className={cx(s.space2, s.landingStep2)}><FormattedMessage {...messages.teachOneSession} /></p>
                                    <div className={cx(s.space6, s.spaceTop6)}>
                                        <h4 className={cx(s.landingSubTitle)}><FormattedMessage {...messages.minimumSize} /></h4>
                                        <FormGroup>
                                            <Field
                                                name="minimumSize"
                                                type="text"
                                                component={this.renderIncrementButton}
                                                minValue={1}
                                                maxValue={100}
                                                incrementBy={1}
                                            />                                    
                                        </FormGroup>
                                        <p className={cx(s.space2, s.landingStep2)}><FormattedMessage {...messages.bookingsConfirmed} /> </p>
                                    </div>
                                    {/* <p className={cx(s.space2, s.landingSubText)}> <FormattedMessage {...messages.confirmAsession} /></p>
                                    <p className={cx(s.space2, s.landingSubText)}><FormattedMessage {...messages.shareSessionDetails} /></p> */}

                                </div>
                                <hr className={s.horizontalLineThrough} />

                                <FormGroup className={s.formGroup}>
                                    <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                                        <Button className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft)} onClick={() => previousPage("learning-aims")}>
                                            <FormattedMessage {...messages.back} />
                                        </Button>
                                        <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)} onClick={() => nextPage("personal-qualities")}>
                                            <FormattedMessage {...messages.next} />
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </form>
                        </Col>
                    </Col>
                    <ListPlaceTips page={'group'} />
                </Row>
            </Grid>
        )
    }
}

GroupSize = reduxForm({
    form: 'ListPlaceStep1', // a unique name for this form
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    onSubmit: update,
    validate
})(GroupSize);

const selector = formValueSelector('ListPlaceStep1');

const mapState = (state) => ({
    minimumSizeData: selector(state, 'minimumSize'),
    maximumSizeData: selector(state, 'maximumSize'),
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(GroupSize)));
