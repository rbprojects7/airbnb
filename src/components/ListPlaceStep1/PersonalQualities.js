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
import CustomCheckbox from '../CustomCheckbox';

import CustomAge from './CustomAge';
import ListPlaceTips from '../ListPlaceTips';

class PersonalQualities extends Component {

    static propTypes = {
        previousPage: PropTypes.func,
        nextPage: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
        const { formatMessage } = this.props.intl;

        return (
            <div>
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                <FormControl
                    {...input}
                    className={className}
                    placeholder={label}
                    componentClass={"textarea"}
                />

            </div>
        )
    }

    render() {
        const { error, handleSubmit, submitting, dispatch, nextPage, previousPage } = this.props;
        const { formatMessage } = this.props.intl;
        const { existingList, isDisabled } = this.props;
        // let path = existingList ? "map" : "location";

        return (
            <Grid>
                <Row>
                    <Col xs={12} sm={6} md={6} lg={6} className={s.landingContent}>
                        <Col xs={12}  sm={12}  md={12}  lg={12}>
                            <h3 className={cx(s.landingContentTitle, s.landingTitleMargin)}><FormattedMessage {...messages.offerActivities} /> </h3>
                            <form onSubmit={handleSubmit}>
                                <div className={s.landingMainContent}>
                                    <p className={cx(s.landingStep2)}><FormattedMessage {...messages.believeInYourAbility} /></p>
                                    <div className={cx(s.spaceTop3, s.space3)}>
                                        <FormGroup className={s.formGroup}>
                                            <Field
                                                name="personalDescribe"
                                                component={this.renderFormControlTextArea}
                                                className={cx(s.textareaInput, s.formControlMuted)}
                                                label={formatMessage(messages.addCredentials)}
                                            />
                                        </FormGroup>
                                    </div>

                                </div>
                                <hr className={s.horizontalLineThrough} />

                                <FormGroup className={s.formGroup}>
                                    <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                                        <Button className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft)} onClick={() => previousPage("group-size")}>
                                            <FormattedMessage {...messages.back} />
                                        </Button>
                                        <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)} type="submit" disabled={isDisabled}>
                                            <FormattedMessage {...messages.next} />
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </form>
                        </Col>
                    </Col>
                    <ListPlaceTips page={'person'} />
                </Row>
            </Grid>
        )
    }
}

PersonalQualities = reduxForm({
    form: 'ListPlaceStep1', // a unique name for this form
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    onSubmit: update
})(PersonalQualities);

const selector = formValueSelector('ListPlaceStep1');

const mapState = (state) => ({
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(PersonalQualities)));
