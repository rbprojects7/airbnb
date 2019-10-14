import React from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import blockListStyle from './blockList.scss';
import { Button } from 'react-bootstrap';
// Redux
import {connect} from 'react-redux';
import { toastr } from 'react-redux-toastr';
// external libraries
import moment from 'moment';
import {BOOKING_PROCESS_INITIALIZE} from "../../../constants";
import { bookingProcess } from "../../../actions/booking/bookingProcess";

class BlockListItem extends React.Component {
    static propTypes = {
        isHost: PropTypes.bool.isRequired,
    };

    static defaultProps = {

    };
    constructor(props) {
        super(props);
        this.state = {};
    }

    submitChoice = () => {
        const { isAuthenticated, isBookingAllowed} = this.props;
        this.props.bookingProcess(
        this.props.listId,
        null,
        null,
        null,
        null,
        this.props.block
      );
        //}
    };

    render() {
        const { block, isHost} = this.props;
        const sessionTimes = block.sessionTime;        
        let disabled;
        if (isHost){
            disabled = true;
        } else {
            disabled = false;
        }
        return (
            <div className={blockListStyle.blockListItem}>
                {
          sessionTimes.map((day, index) => <span className={blockListStyle.dayWrapper} key={day.date}>
              <div className={blockListStyle.dateWrapper}>{moment(day.date, 'Do MMMM YYYY').format('ddd D MMMM YYYY')}</div>
              <div className={blockListStyle.hoursWrapper}>
                  <div>{day.startTime}</div>
                  <div>-</div>
                  <div>{day.endTime}</div>
              </div>
          </span>)
        }
                <Button className={blockListStyle.button} onClick={this.submitChoice} disabled={disabled}>Choose</Button>
            </div>
        );
    }
}

const mapState = state => ({
    isLoading: state.viewListing.isLoading,
});

const mapDispatch = {
    bookingProcess
};

export default withStyles(blockListStyle)(connect(mapState, mapDispatch)(BlockListItem));
