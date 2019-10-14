import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Transaction.css';
import { FormattedMessage } from 'react-intl';


// Component
import CurrencyConverter from '../../CurrencyConverter';
import Payouts from '../Payouts';
import Link from '../../Link';

// Locale
import messages from '../../../locale/messages';

class FutureTransactionItem extends Component {
    static propTypes = {
		className: PropTypes.string.isRequired,
		formatMessage: PropTypes.func,
        data: PropTypes.shape({
        	id: PropTypes.number.isRequired,
        	total: PropTypes.number.isRequired,
        	guestServiceFee: PropTypes.number.isRequired,
        	hostServiceFee: PropTypes.number.isRequired,
			currency: PropTypes.string.isRequired,
			checkIn: PropTypes.string.isRequired,
			checkOut: PropTypes.string.isRequired,
			confirmationCode: PropTypes.number.isRequired,
			payoutId: PropTypes.number,
			listData: PropTypes.shape({
				title: PropTypes.string.isRequired
			}).isRequired,
			guestData: PropTypes.shape({
				firstName: PropTypes.string.isRequired
			}).isRequired,    	
        })
    };

    render() {
    	const { className, data } = this.props;
    	let date = data.checkIn != null ? moment(data.checkIn).add(1, 'days').format('DD-MM-YYYY') : 'Pending';
    	let checkInDate = data.checkIn != null ? moment(data.checkIn).format('MMM DD, YYYY') : '';
    	let checkOutDate = data.checkOut != null ? moment(data.checkOut).format('MMM DD, YYYY') : '';
    	//let totalAmount = Number(data.total) - Number(data.guestServiceFee + data.hostServiceFee);
        return (
            <tr>
	          <td className={className}>{date}</td>
	          <td className={className}>Reservation</td>
	          <td className={className}>
	          	<ul className={s.listLayout}>
		          <li>
		          	{checkInDate} - {checkOutDate} <Link to={"/users/experiences/receipt/" + data.id}>{data.confirmationCode}</Link>
		          </li>
		          <li>
		          	{data.guestData ? data.guestData.firstName : ''}
		          </li>
		          <li>
		          	{data.listData ? data.listData.title : ''}
		          </li>
		        </ul>	
	          </td>
	          <td className={className}>
				<Payouts 
					reservationId={data.id}
					type={"change"}
					defaultLabel={"Default"}
					enableAddPayout
					defaultValue={data.payoutId}
					className={cx(s.formWidth,s.formControlSelect)}
				/>          
	          </td>
	          <td className={className} >
	          	<CurrencyConverter
					amount={data.total}
					from={data.currency}
					className={s.currencyColor}
				/>
	          </td>
	        </tr>
        );
    }
}

export default withStyles(s)(FutureTransactionItem);
