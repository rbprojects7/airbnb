// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Block } from './Block';
import moment from 'moment';
//import { validate } from './validate';
// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';
// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
// Helpers
import DayPicker, { DateUtils } from 'react-day-picker';
// Redux
import { connect } from 'react-redux';
// Styles
import CalendarStyles from '!isomorphic-style-loader!css-loader!react-day-picker/lib/style.css';
import TimePickerStyles from '!isomorphic-style-loader!css-loader!./TimePicker.scss';
import DayPickerStyles from '!isomorphic-style-loader!css-loader!./DayPicker.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Button, Col, FormGroup, Grid, Row } from 'react-bootstrap';
import s from '../ListPlaceStep1.css';
import AvailabilityAndPriceStyle from './AvailabilityAndPrice.scss';
import cx from "classnames";
import * as FontAwesome from 'react-icons/lib/fa';
// internal
import updateStep3 from '../updateStep3';
import messages from "../../../locale/messages";
import { toastr } from "react-redux-toastr";
import validateStep3 from '../validateStep3';

import Loader from '../../Loader';

//action
import { removeBlock } from '../../../actions/removeBlock';
import { single } from 'rxjs/operator/single';

class AvailabilityAndPrice extends Component {

    static propTypes = {
        previousPage: PropTypes.func,
        nextPage: PropTypes.func,
        formProps: PropTypes.object,
        blocks: PropTypes.array
    };

    static defaultProps = {
        updateTimeLoading: false,
        updateTimeBlock: 0
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedDays: [],
            blocks: props.blocks.blocks,
            blocksVisibility: [],
            timeChanged: false,
            justAddedBlock: [],
            // isDisabled: true,

        };

        this.timeChange = this.timeChange.bind(this);
        this.viewBlock = this.viewBlock.bind(this);
        this.viewFirstBlock = this.viewFirstBlock.bind(this);
        this.removeBlock = this.removeBlock.bind(this);
    }
    buildDaysObject = days =>
        days.map(day => ({
            date: moment(day).format('Do MMMM YYYY'),
            startTime: moment('10:00', 'HH:mm'),
            endTime: moment('12:00', 'HH:mm'),
        }));


    addBlock = (e) => {
        if (this.state.selectedDays.length > 0) {
            this.state.selectedDays.sort((a, b) => moment(a).diff(moment(b), 'days'));
            this.props.array.push('blocks', this.buildDaysObject(this.state.selectedDays));
            //this.state.blocksVisibility.push(true);
            //this.state.justAddedBlock[this.props.formProps.values.blocks.length] = [true, true];
            this.setState({
                selectedDays: []
            });
            const values = (this.props.formProps.values) || {};
            if (values && values.blocks == undefined && values.blocks == '') {
                this.viewFirstBlock(0);
            } else {
                if (this.props.formProps.values.blocks == undefined || this.props.formProps.values.blocks == '') {
                    this.viewBlock(0);
                }
                else {
                    let blockLen = this.props.formProps.values.blocks.length;
                    if (blockLen == 0) {
                        this.viewFirstBlock(blockLen);
                    } else {
                        this.viewBlock(blockLen);
                    }
                }

            }
        }
    };

    viewFirstBlock = (index) => {
        const blocksVisibility = this.state.blocksVisibility;
        blocksVisibility[index] == blocksVisibility[index];
        this.setState({
            blocksVisibility
        });
    };

    viewBlock = (index) => {
        const blocksVisibility = this.state.blocksVisibility;
        blocksVisibility[index] = !blocksVisibility[index];
        this.setState({
            blocksVisibility
        });
    };


   async removeBlock(index, block) {
        const { getBlockByReservation, removeBlock } = this.props;
        let singleBlock;

        if (block.blockId) {
            if (getBlockByReservation && getBlockByReservation.length > 0) {
                singleBlock = getBlockByReservation.find(function (element) {
                    return element.id === block.blockId;
                });
                // console.log('qweqwe', singleBlock, singleBlock.reservationItemCount)
                if (singleBlock && singleBlock.reservationItemCount > 0) {
                    toastr.error("You cannot delete a block that has bookings. Please go to Your Listings and use the cancellation process.");
                } else {
                    this.props.array.remove('blocks', index);
                    this.state.blocksVisibility.pop();
                    await removeBlock(singleBlock.id);
                }
            }
        } else {
            this.props.array.remove('blocks', index);
            this.state.blocksVisibility.pop();
        }
    };


    handleDayClick = (day, { selected }) => {
        const { selectedDays } = this.state;
        if (selected) {
            const selectedIndex = selectedDays.findIndex(selectedDay =>
                DateUtils.isSameDay(selectedDay, day)
            );
            selectedDays.splice(selectedIndex, 1);
        } else {
            selectedDays.push(day);
        }
        this.setState({ selectedDays });
    };

    toggleBlock = (index) => {
        const blocksVisibility = this.state.blocksVisibility;
        //console.log("trrr", blocksVisibility);
        blocksVisibility[index] = !blocksVisibility[index];
        //console.log("rrr", blocksVisibility[index]);
        this.setState({
            blocksVisibility
        });
    };

    timeChange = (time, index) => {
        this.setState({ timeChanged: true });
        time === 'startTime' ? this.state.justAddedBlock[index][0] = false : this.state.justAddedBlock[index][1] = false;

    };

    // nextPageValidation = () => {
    //   const { values, initial } = this.props.formProps;

    //   if (initial.blocks !== values.blocks && initial.blocks.length <= values.blocks.length) {
    //     this.props.nextPage("booking-window");
    //   }
    //   else {
    //     toastr.error("Update Listing Failed", "Please add a block to continue or save and exit to come back later!");
    //   }
    //};

    render() {
        const { nextPage, previousPage, formProps } = this.props;
        const values = (this.props.formProps && this.props.formProps.values) || {};
        // let isDisabled = true;
        // if (values && values.blocks != undefined && values.blocks != '') {
        //     isDisabled = false;
        // }
        const { updateTimeLoading, updateTimeBlock } = this.props;
        const { getBlockByReservation } = this.props;
        // const positiveChecks = [messages.severalSession, messages.oneSession, messages.differentTime, messages.someTime];
        // const negativeChecks = [messages.differentPrices, messages.differentAids, messages.differentAge];

        return (
            <Grid fluid>
                <Row className={`${s.landingContainer} ${AvailabilityAndPriceStyle.landingContainer}`}>
                    <Col xs={12} sm={10} md={10} lg={10} className={`${s.landingContent} ${AvailabilityAndPriceStyle.headerSection}`}>
                        <div className={cx(AvailabilityAndPriceStyle.headerTitle, s.space3)}>
                            <FormattedMessage {...messages.YourBookableBlocks} />
                        </div>
                        {/* <div className={AvailabilityAndPriceStyle.checkSection}>
              <div className={AvailabilityAndPriceStyle.checkPart}>
                <div className={AvailabilityAndPriceStyle.checkText}>
                  {positiveChecks.map(check =>
                    <div className={AvailabilityAndPriceStyle.checkIcon}>
                      <FontAwesome.FaCheck size={30} color={'green'} />
                      <FormattedMessage {...check} />
                    </div>
                    )}
                </div>
              </div>
              <div className={AvailabilityAndPriceStyle.checkPart}>
                <div className={AvailabilityAndPriceStyle.checkText}>
                  {negativeChecks.map(check =>
                    <div className={AvailabilityAndPriceStyle.checkIcon}>
                      <span className={AvailabilityAndPriceStyle.iconTimes}>&times;</span>
                      <FormattedMessage {...check} />
                    </div>
                  )}
                </div>
              </div>
            </div> */}

                        <ul className={cx(s.noPadding, s.noMargin, s.textHigh, s.textJustify, s.sessionListStyle, s.listMarginLeft)}>
                            <li className={cx(s.listContentAvailability, s.listDisplay)}>
                                <span className={cx(s.checkBoxSection, s.sessionCheckboxSection, s.listDisplay, s.circleStyle)}>
                                    <FontAwesome.FaCircle />
                                </span>
                                <span className={cx(s.checkBoxSection, s.checkBoxLabel)}>
                                    <span className={cx(s.textVerticalAlign, s.listSubContent)}>
                                        <span className={cx(s.textVerticalAlign)}><FormattedMessage {...messages.BookableBlocksMsgFirst} /></span>
                                    </span>
                                </span>
                            </li>
                            <li className={cx(s.listContentAvailability, s.listDisplay)}>
                                <span className={cx(s.checkBoxSection, s.sessionCheckboxSection, s.listDisplay, s.circleStyle)}>
                                    <FontAwesome.FaCircle />
                                </span>
                                <span className={cx(s.checkBoxSection, s.checkBoxLabel)}>
                                    <span className={cx(s.textVerticalAlign, s.listSubContent)}>
                                        <span className={cx(s.textVerticalAlign)}><FormattedMessage {...messages.BookableBlocksMsgSecond} /></span>
                                    </span>
                                </span>
                            </li>
                            <li className={cx(s.listContentAvailability, s.listDisplay)}>
                                <span className={cx(s.checkBoxSection, s.sessionCheckboxSection, s.listDisplay, s.circleStyle)}>
                                    <FontAwesome.FaCircle />
                                </span>
                                <span className={cx(s.checkBoxSection, s.checkBoxLabel)}>
                                    <span className={cx(s.textVerticalAlign, s.listSubContent)}>
                                        <span className={cx(s.textVerticalAlign)}><FormattedMessage {...messages.BookableBlocksMsgThird} /></span>
                                    </span>
                                </span>
                            </li>
                            <li className={cx(s.listContentAvailability, s.listDisplay)}>
                                <span className={cx(s.checkBoxSection, s.sessionCheckboxSection, s.listDisplay, s.circleStyle)}>
                                    <FontAwesome.FaCircle />
                                </span>
                                <span className={cx(s.checkBoxSection, s.checkBoxLabel)}>
                                    <span className={cx(s.textVerticalAlign, s.listSubContent)}>
                                        <span className={cx(s.textVerticalAlign)}><FormattedMessage {...messages.BookableBlocksMsgFourth} /></span>
                                    </span>
                                </span>
                            </li>
                        </ul>
                    </Col>
                    <Col xs={12} sm={5} md={6} lg={6} className={`${s.landingContent} ${AvailabilityAndPriceStyle.landingContent}`}>
                        <Row>
                            <div className={AvailabilityAndPriceStyle.dayPicker}>
                                <DayPicker
                                    selectedDays={this.state.selectedDays}
                                    onDayClick={this.handleDayClick}
                                    disabledDays={[{ before: new Date() }]}
                                />
                            </div>
                            <div className={AvailabilityAndPriceStyle.fakeDayPicker}>{/*this dayPicker is not present in DOM, issue with re-rendering */}
                                <Field
                                    name="selectedFields"
                                    component={props =>
                                        <DayPicker
                                            selectedDays={this.state.selectedDays}
                                            onDayClick={this.handleDayClick}
                                            disabledDays={[{ before: new Date() }]}
                                        />
                                    }
                                />
                            </div>
                        </Row>
                        <Row className={AvailabilityAndPriceStyle.addBlockButtonWrapper}>
                            <Button type="button" onClick={this.addBlock}>
                                <FontAwesome.FaPlus
                                    className={AvailabilityAndPriceStyle.icon}
                                />
                                <FormattedMessage {...messages.adLessonsBLockButton} />
                            </Button>
                        </Row>
                    </Col>
                    <Col xs={12} sm={5} md={6} lg={6} className={`${s.landingContent} ${AvailabilityAndPriceStyle.landingContent}`}>
                        {
                            values.blocks && values.blocks.map((block, index) => (
                                <div key={index}>
                                    <div
                                        onClick={() => this.toggleBlock(index)}
                                        className={AvailabilityAndPriceStyle.blockWrapper}
                                    >
                                        <div className={AvailabilityAndPriceStyle.line} />
                                        {
                                            !this.state.blocksVisibility[index] &&
                                            <FontAwesome.FaCaretDown
                                                className={`${AvailabilityAndPriceStyle.icon} ${AvailabilityAndPriceStyle.toggleDown} ${AvailabilityAndPriceStyle.blockHeaderSections}`}
                                            />
                                        }
                                        {
                                            this.state.blocksVisibility[index] &&
                                            <FontAwesome.FaCaretUp
                                                className={`${AvailabilityAndPriceStyle.icon} ${AvailabilityAndPriceStyle.toggleUp} ${AvailabilityAndPriceStyle.blockHeaderSections}`}
                                            />
                                        }
                                        <label className={`${AvailabilityAndPriceStyle.blockLabel} ${AvailabilityAndPriceStyle.blockHeaderSections}`}>Block {index + 1}</label>
                                        <FontAwesome.FaTrash
                                            onClick={() => this.removeBlock(index, block[0])}
                                            className={`${AvailabilityAndPriceStyle.icon} ${AvailabilityAndPriceStyle.remove} ${AvailabilityAndPriceStyle.blockHeaderSections}`}
                                        />
                                    </div>
                                    {
                                        this.state.blocksVisibility[index] && !updateTimeLoading && index === updateTimeBlock && <div className={AvailabilityAndPriceStyle.block}>
                                            <Field
                                                name="blocks"
                                                component={props =>
                                                    <Block
                                                        blockNumber={index}
                                                        days={block}
                                                        timeChanged={time => this.timeChange(time, index)}
                                                        justAddedBlock={this.state.justAddedBlock[index]}
                                                        getBlockByReservation={getBlockByReservation}
                                                    />
                                                }
                                            />
                                        </div>
                                    }
                                    {
                                        this.state.blocksVisibility[index] && updateTimeLoading && index === updateTimeBlock && <div className={cx(AvailabilityAndPriceStyle.block)}>
                                            <Loader type="text" />
                                        </div>
                                    }
                                    {
                                        this.state.blocksVisibility[index] && index != updateTimeBlock && <div className={AvailabilityAndPriceStyle.block}>
                                            <Field
                                                name="blocks"
                                                component={props =>
                                                    <Block
                                                        blockNumber={index}
                                                        days={block}
                                                        timeChanged={time => this.timeChange(time, index)}
                                                        justAddedBlock={this.state.justAddedBlock[index]}
                                                        getBlockByReservation={getBlockByReservation}
                                                    />
                                                }
                                            />
                                        </div>
                                    }
                                </div>
                            ))
                        }
                    </Col>
                    <FormGroup className={`${s.formGroup} ${AvailabilityAndPriceStyle.formGroup}`}>
                        <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                            <hr className={s.horizontalLineThrough} />
                            {/* <Button
                                className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft)}
                                onClick={() => previousPage("pricing")}
                            >
                                <FormattedMessage {...messages.back} />
                            </Button> */}
                            {/* <Button
                                className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)}
                                //disabled={!this.props.valid}
                                disabled={isDisabled}
                                //onClick={() => this.nextPageValidation()}
                                onClick={() => nextPage("booking-window")}
                            >
                                <FormattedMessage {...messages.next} />
                            </Button> */}
                            <Button
                                className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft)}
                                onClick={() => previousPage("session")}
                            >
                                <FormattedMessage {...messages.back} />
                            </Button>
                            <Button
                                className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)}
                                // disabled={isDisabled}
                                onClick={() => nextPage("pricing")}
                            >
                                <FormattedMessage {...messages.next} />
                            </Button>
                        </Col>
                    </FormGroup>
                </Row>
            </Grid>
        );
    }
}

AvailabilityAndPrice = reduxForm({
    form: 'ListPlaceStep3', // a unique name for this form
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    //validateStep3,
    onSubmit: updateStep3
})(AvailabilityAndPrice);

const selector = formValueSelector("ListPlaceStep3");  // as same as form name

const mapState = state => ({
    listingFields: state.listingFields.data,
    formProps: state.form.ListPlaceStep3,
    blocks: state.blocks,
    updateTimeLoading: state.updateTime.loading,
    updateTimeBlock: state.updateTime.blockNumber,
    listId: selector(state, 'id'),
});

const mapDispatch = {
    removeBlock,
};

export default injectIntl(withStyles(s, AvailabilityAndPriceStyle, CalendarStyles, TimePickerStyles, DayPickerStyles)(connect(mapState, mapDispatch)(AvailabilityAndPrice)));
