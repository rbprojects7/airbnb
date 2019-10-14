//general
import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import TimePicker from 'rc-time-picker';
import { injectIntl } from 'react-intl';
//Redux
import { connect } from 'react-redux';
//toastr
import { toastr } from 'react-redux-toastr';
//style
import TimePickerStyles from '!isomorphic-style-loader!css-loader!rc-time-picker/assets/index.css';
import AvailabilityAndPriceStyle from './AvailabilityAndPrice.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// internal
import validateStep3 from "../validateStep3";
import updateStep3 from "../updateStep3";

// Redux Actions
import { setLoaderStart, setLoaderComplete } from '../../../actions/loader/loader';

import { setUpdateTimeStart, setUpdateTimeComplete } from '../../../actions/Listing/updateTime';

class Day extends Component {
  time = null;

  constructor(props) {
    super(props);
    this.onTimeChange = this.onTimeChange.bind(this);
  }

  onTimeChange = (value, thisTime) => {

    const { setLoaderStart, setLoaderComplete } = this.props;
    const { setUpdateTimeStart, setUpdateTimeComplete } = this.props;
    this.time = thisTime;
    const { blockNumber, dayNumber } = this.props;
    const values = (this.props.formProps && this.props.formProps.values) || {};
    const { getBlockByReservation } = this.props;
    let timePick = 0;
    timePick = (thisTime === 'startTime' ? 0 : 1);
    setLoaderStart('updateTimes');
    let formBlockId = values.blocks[blockNumber][dayNumber].blockId;
    let singleBlock;

    if(formBlockId) {
      if (formBlockId && getBlockByReservation && getBlockByReservation.length > 0) {
        singleBlock = getBlockByReservation.find(function (element) {
          return element.id === values.blocks[blockNumber][dayNumber].blockId;
        });
      }
      if (singleBlock && singleBlock.reservationItemCount > 0) {
        toastr.error("You cannot edit a block that has bookings. Please go to Your Listings and use the cancellation process.");
      }
    } 
    if (!formBlockId || !singleBlock.reservationItemCount > 0) {
      setUpdateTimeStart(blockNumber);
      if (this.props.justAddedBlock && this.props.justAddedBlock[timePick]) {
        for (const day of values.blocks[blockNumber]) {
          day[thisTime] = value;
        }

      } else {
        if (dayNumber == 0) {
          for (const day of values.blocks[blockNumber]) {
            day[thisTime] = value;
          }
        } else {
          values.blocks[blockNumber][dayNumber][thisTime] = value;
        }
      }
      this.props.array.insert('blocks', blockNumber, values.blocks[blockNumber]);
      this.props.array.remove('blocks', blockNumber);

      setTimeout(() => {
        setUpdateTimeComplete(blockNumber);
      }, 50);
    }
  };

  render() {
    const { dayNumber, blockNumber, lessonsTime } = this.props;
    const format = 'HH:mm';
    const timePickerSettings = {
      showSecond: false,
      format: format,
      minuteStep: 15
    };

    return (
      <div className={AvailabilityAndPriceStyle.dayWrapper}>
        <span className={AvailabilityAndPriceStyle.dateLabel}>{lessonsTime.date}</span>
        <span className={AvailabilityAndPriceStyle.timePicker}>
          <Field
            name={`block[${blockNumber}]..date[${dayNumber}].startTime`}
            component={() =>
              <TimePicker
                defaultValue={lessonsTime.startTime}
                onChange={value => this.onTimeChange(value, 'startTime')}
                onClose={() => this.props.justAddedBlock && this.time && this.props.timeChanged(this.time)}
                {...timePickerSettings}
              />
            }
          />
        </span>
        <span className={AvailabilityAndPriceStyle.timeLabel}>-</span>
        <span className={AvailabilityAndPriceStyle.timePicker}>
          <Field
            name={`blocks[${blockNumber}][${dayNumber}].endTime`}
            className={AvailabilityAndPriceStyle.timePicker}
            component={() =>
              <TimePicker
                defaultValue={lessonsTime.endTime}
                onChange={value => this.onTimeChange(value, 'endTime')}
                onClose={() => this.props.justAddedBlock && this.time && this.props.timeChanged(this.time)}
                {...timePickerSettings}
              />
            }
          />
        </span>
      </div>
    )
  }
}

Day = reduxForm({
  form: 'ListPlaceStep3', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validateStep3,
  onSubmit: updateStep3
})(Day);

//const selector = formValueSelector('ListPlaceStep3');
const mapState = (state) => ({
  formProps: state.form.ListPlaceStep3
  //blocks: selector(state, 'blocks'),
});

const mapDispatch = {
  setLoaderStart,
  setLoaderComplete,
  setUpdateTimeStart,
  setUpdateTimeComplete
};


export default injectIntl(withStyles(TimePickerStyles, AvailabilityAndPriceStyle)(connect(mapState, mapDispatch)(Day)));
