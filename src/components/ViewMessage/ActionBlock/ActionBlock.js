import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import {
	Button, 
	Form, 
	Grid,
	Row, FormGroup,
	Col,
	ControlLabel,
	FormControl,
	FieldGroup,
	Panel,
	Label
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../ViewMessage.css';
import * as FontAwesome from 'react-icons/lib/fa';

// Component
import GuestActions from './GuestActions';
import HostActions from './HostActions';

class ActionBlock extends Component {
    static propTypes = {
    	threadType: PropTypes.string.isRequired,
      actionType: PropTypes.string.isRequired,
      threadId: PropTypes.number.isRequired,
      listId: PropTypes.number.isRequired,
      reservationId: PropTypes.number,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      personCapacity: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
      hostDisplayName: PropTypes.string.isRequired,
      guestDisplayName: PropTypes.string.isRequired
    };

    static defaultProps = {
      actionType: null
    }

    render() {
      const { threadType, actionType, threadId, listId, startDate, endDate, personCapacity, createdAt } = this.props;
      const { hostDisplayName, guestDisplayName, reservationId } = this.props;

      if(actionType != null){
        if(threadType === 'host') {
          return <HostActions 
            actionType={actionType} 
            threadId={threadId}
            reservationId={reservationId}
            threadType={threadType}
            startDate={startDate}
            endDate={endDate}
            personCapacity={personCapacity}
            createdAt={createdAt}
            guestDisplayName={guestDisplayName}
          />
        } else {
          return <GuestActions 
            actionType={actionType} 
            threadId={threadId}
            listId={listId}
            startDate={startDate}
            endDate={endDate}
            personCapacity={personCapacity}
            reservationId={reservationId}
            hostDisplayName={hostDisplayName}
            createdAt={createdAt}
          />
        }
      } else {
        return <div />
      }
    }
}

export default withStyles(s)(ActionBlock);

