import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

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
import s from './Reservation.css';
import logoUrl from './logo-small.jpg';

// Components
import ReservationItem from './ReservationItem';
import NoItem from './NoItem';
import CustomPagination from '../CustomPagination';

// Locale
import messages from '../../locale/messages';

class Reservation extends React.Component {

    static propTypes = {
        userType: PropTypes.string.isRequired,
        formatMessage: PropTypes.func,
        data: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            listId: PropTypes.number.isRequired,
            hostId: PropTypes.string.isRequired,
            guestId: PropTypes.string.isRequired,
            checkIn: PropTypes.string.isRequired,
            checkOut: PropTypes.string.isRequired,
            startTime: PropTypes.number.isRequired,
            endTime: PropTypes.number.isRequired,
            guests: PropTypes.number.isRequired,
            guestServiceFee: PropTypes.number.isRequired,
            hostServiceFee: PropTypes.number.isRequired,
            total: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired,
            reservationState: PropTypes.string.isRequired,
            messageData: PropTypes.shape({
                id: PropTypes.number.isRequired
            }),
            listData: PropTypes.shape({
                id: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired,
                street: PropTypes.string.isRequired,
                city: PropTypes.string.isRequired,
                state: PropTypes.string.isRequired,
                country: PropTypes.string.isRequired,
                zipcode: PropTypes.string.isRequired,
                coverPhoto: PropTypes.number,
                listPhotos: PropTypes.shape({
                    id: PropTypes.number,
                    name: PropTypes.string,
                })
            }),
            hostData: PropTypes.shape({
                profileId: PropTypes.number.isRequired,
                displayName: PropTypes.string.isRequired,
                picture: PropTypes.string,
                phoneNumber: PropTypes.string,
                userData: PropTypes.shape({
                    email: PropTypes.string
                })
            }),
            guestData: PropTypes.shape({
                profileId: PropTypes.number.isRequired,
                displayName: PropTypes.string.isRequired,
                dateOfBirth: PropTypes.string.isRequired,
                picture: PropTypes.string,
                phoneNumber: PropTypes.string,
                userData: PropTypes.shape({
                    email: PropTypes.string
                })
            }),
            childParentData: PropTypes.shape({
                id: PropTypes.number.isRequired,
                userId: PropTypes.number.isRequired,
                reservationId: PropTypes.number.isRequired,
                childId: PropTypes.number.isRequired,
                childName: PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    firstName: PropTypes.string,
                    lastName: PropTypes.string,
                    preferredName: PropTypes.string,
                    birthday: PropTypes.string
                })
            }),
            chosenBlockData: PropTypes.shape({
                startTime: PropTypes.string.isRequired,
                endTime: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
                reservationId: PropTypes.number.isRequired,
                blockUniqueId: PropTypes.number.isRequired
            }),
            blockData: PropTypes.shape({
                blockState: PropTypes.string.isRequired,
                blockUniqueId: PropTypes.number.isRequired
            }),
            isParentReviewed: PropTypes.shape({
                reservationId: PropTypes.number,
                blockId: PropTypes.number,
                isReviewed: PropTypes.String,
            }),
            learnerReviewsCount: PropTypes.shape({
                reservationId: PropTypes.number,
                isReview: PropTypes.String,
            }),
            parentReviewsCount: PropTypes.number.isRequired
        }))
    };

    static defaultProps = {
        data: []
    };

    render() {
        const { data, userType, type } = this.props;
        
        if (data.length === 0) {
            return <NoItem userType={userType} />;
        }
        let title;
        if (userType === 'host') {
            title = "Your Reservation";
        } else {
            title = "Your Trips";
        }

        return (
            <Row>
                <Col xs={12} sm={12} md={12} lg={12} className={cx('table-responsive', s.noBorder)}>
                    <table className={cx('table', s.noBorder, s.tableBottom)}>
                        <thead>
                            <tr className={s.rowBorder}>
                                <th className={cx(s.sectionTitleLight, s.sectionTitleSpace, s.noBorder)}>
                                    <FormattedMessage {...messages.status} />
                                </th>
                                <th className={cx(s.sectionTitleLight, s.sectionTitleSpace, s.noBorder)}>
                                    Dates
                                </th>
                                <th className={cx(s.sectionTitleLight, s.sectionTitleSpace, s.noBorder)}>
                                    Learner
                                </th>
                                {userType == 'host' &&
                                    <th className={cx(s.sectionTitleLight, s.sectionTitleSpace, s.noBorder)}>
                                        Parent
                                </th>
                                }
                                {userType == 'guest' &&
                                    <th className={cx(s.sectionTitleLight, s.sectionTitleSpace, s.noBorder)}>
                                        Mentor
                                </th>
                                }
                                <th className={cx(s.sectionTitleLight, s.sectionTitleSpace, s.noBorder)}>
                                    <FormattedMessage {...messages.details} />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data && data.map((item, index) => {
                                    if (item.guestData && item.hostData && item.listData && item.listData != null && item.messageData) {
                                        return (<ReservationItem
                                            key={index}
                                            userType={userType}
                                            threadId={item.messageData.id}
                                            profileId={userType === 'host' ? item.guestData.profileId : item.hostData.profileId}
                                            displayName={userType === 'host' ? item.guestData.displayName : item.hostData.displayName}
                                            dateOfBirth={userType === 'host' ? item.guestData.dateOfBirth : item.hostData.dateOfBirth}
                                            picture={userType === 'host' ? item.guestData.picture : item.hostData.picture}
                                            reservationId={item.id}
                                            reservationState={item.reservationState}
                                            checkIn={item.checkIn}
                                            checkOut={item.checkOut}
                                            guests={item.guests}
                                            guestServiceFee={item.guestServiceFee}
                                            hostServiceFee={item.hostServiceFee}
                                            total={item.total}
                                            currency={item.currency}
                                            listId={item.listId}
                                            title={item.listData.title}
                                            street={item.listData.street}
                                            city={item.listData.city}
                                            state={item.listData.state}
                                            country={item.listData.country}
                                            zipcode={item.listData.zipcode}
                                            phoneNumber={userType === 'host' ? item.guestData.phoneNumber : item.hostData.phoneNumber}
                                            email={userType === 'host' ? item.guestData.userData.email : item.hostData.userData.email}
                                            childParentData={item.childParentData}
                                            chosenBlockData={item.chosenBlockData}
                                            blockData={item.blockData}
                                            type={type}
                                            parentReviewsCount={item.parentReviewsCount}
                                            isParentReviewed={item.isParentReviewed}
                                            learnerReviewsCount={item.learnerReviewsCount}
                                            allReviewsCount={item.allReviewsCount}
                                            isParentEnable={item.isParentEnable}
                                            coverPhoto={item.listData.coverPhoto}
                                            listPhotos={item.listData.listPhotos}
                                            startTime={item.startTime}
                                            endTime={item.endTime}
                                        />);
                                    }
                                    return (<ReservationItem
                                        noList
                                        key={index}
                                        userType={userType}
                                        threadId={null}
                                        profileId={null}
                                        displayName={null}
                                        dateOfBirth={null}
                                        picture={null}
                                        reservationId={item.id}
                                        reservationState={item.reservationState}
                                        checkIn={item.checkIn}
                                        checkOut={item.checkOut}
                                        guests={item.guests}
                                        guestServiceFee={item.guestServiceFee}
                                        hostServiceFee={item.hostServiceFee}
                                        total={item.total}
                                        currency={item.currency}
                                        listId={item.listId}
                                        title={null}
                                        street={null}
                                        city={null}
                                        state={null}
                                        country={null}
                                        zipcode={null}
                                        phoneNumber={null}
                                        email={null}
                                        childParentData={item.childParentData}
                                        chosenBlockData={item.chosenBlockData}
                                        type={type}
                                        blockData={item.blockData}
                                        parentReviewsCount={item.parentReviewsCount}
                                        learnerReviewsCount={item.learnerReviewsCount}
                                        allReviewsCount={item.allReviewsCount}
                                        isParentEnable={item.isParentEnable}
                                        // coverPhoto={null}
                                        // listPhotos={item.listData.listPhotos}
                                        startTime={item.startTime}
                                        endTime={item.endTime}
                                    />);


                                })
                            }

                        </tbody>
                    </table>
                </Col>
            </Row>
        );
    }
}

export default injectIntl(withStyles(s)(Reservation));
