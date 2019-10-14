import React, { Component } from 'react';
import Day from './Day'
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { connect } from "react-redux";
import { injectIntl } from 'react-intl';
import { reduxForm } from "redux-form";
import validateStep3 from "../validateStep3";
import updateStep3 from "../updateStep3";

export class Block extends Component {
  //state = {timeChanged: false};

  render() {
    const { days, blockNumber, getBlockByReservation } = this.props;

    return (
      <ul>
        {
          days && days.map((day, index) =>
            <li key={index}>
              <Day
                dayNumber={index}
                blockNumber={blockNumber}
                lessonsTime={day}
                timeChanged={this.props.timeChanged}
                justAddedBlock={this.props.justAddedBlock}
                getBlockByReservation={getBlockByReservation}
              />
            </li>
          )
        }
      </ul>
    )
  }
}

Block = reduxForm({
  form: 'ListPlaceStep3', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validateStep3,
  onSubmit: updateStep3
})(Block);


const mapState = (state) => ({
  formProps: state.form.ListPlaceStep3
});

const mapDispatch = {};


export default injectIntl(withStyles()(connect(mapState, mapDispatch)(Block)));
