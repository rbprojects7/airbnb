import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MentorBlockCancellation.css';

import moment from "moment";

// Component
import Loader from '../../components/Loader';
import NotFound from '../notFound/NotFound';
import BlockCancellation from '../../components/BlockCancellation';

// Graphql
import CancelBlockQuery from './MentorBlockCancellation.graphql';

class MentorBlockCancellation extends React.Component {
    static propTypes = {
        blockId: PropTypes.number.isRequired,
        cancellationBlockData: PropTypes.shape({
            loading: PropTypes.bool,
            getSingleBlock: PropTypes.object
        }).isRequired
    };

    static defaultProps = {
        cancellationBlockData: {
            loading: true,
            getSingleBlock: {
                sessionTime: [],
            }
        },
    };

    render() {
        const { cancellationBlockData: { loading, getSingleBlock }, blockId } = this.props;
        // console.log('sfsdfsdf', getSingleBlock)
        let cancellation = [], parentSessionDates, sessionDates, allReservationId = [];
        let initialValue;

        if (!loading && getSingleBlock) {
            getSingleBlock && getSingleBlock.reservationItemCount && getSingleBlock.reservationItemCount > 0 && getSingleBlock.reservationItem.map((data, index) => {
                data && data.childParentData && data.childParentData.length > 0 && data.childParentData.map((item, index) => {
                    let cancelData = {};
                    sessionDates = [];
                    // let getReservationId = {};
                    cancelData['learnerId'] = item.childName[0].id;
                    cancelData['firstName'] = item.childName[0].firstName;
                    cancelData['lastName'] = item.childName[0].lastName;
                    cancelData['reservationId'] = data.id;
                  let getReservationId = {
                        reservationId: data.id,
                        guestFirstName: data.guestData.firstName,
                        guestLastName: data.guestData.lastName,
                        guestMailId: data.guestData.userData.email,
                        title: getSingleBlock.listingItem.title,
                        hostFirstName: getSingleBlock.listingItem.user.profile.firstName,
                        hostLastName: getSingleBlock.listingItem.user.profile.lastName,
                        cancelledDate: moment(moment(new Date())).format('DD-MM-YYYY'),
                        threadId: data.messageData.id,
                        checkIn: data.checkIn,
                        checkOut: data.checkOut,
                        guests: data.guests,
                    }
                    
                    {
                        data && data.chosenBlockData && data.chosenBlockData.length > 0 && data.chosenBlockData.map((values, key) => {
                            let childDates = {};
                            let selectedDates;
                            childDates['sessionId'] = values.id;
                            childDates['date'] = values.date;
                            childDates['startTime'] = values.startTime;
                            childDates['endTime'] = values.endTime;
                            selectedDates = data.cancellationDetails && data.cancellationDetails.length > 0 && data.cancellationDetails.find(x => x.sessionId === childDates.sessionId && x.learnerId === cancelData.learnerId);

                            if (selectedDates) {
                                childDates['isSelected'] = true;
                                childDates['isDisabled'] = true;
                            } else {
                                childDates['isSelected'] = false;
                                childDates['isDisabled'] = false;
                            }
                            sessionDates.push(childDates);
                            cancelData['dates'] = sessionDates;
                        });
                    }

                    cancellation.push(cancelData);
                    allReservationId.push(getReservationId);
                });

                if (data && data.isParentEnable == true) {
                    let parentData = {};
                    parentSessionDates = [];
                    let getParentReservationId;

                    parentData['learnerId'] = data.guestId;
                    parentData['firstName'] = data.guestData.firstName;
                    parentData['lastName'] = data.guestData.lastName;
                    parentData['reservationId'] = data.id;

                    if (data && data.isParentEnable == true && data.childParentData && data.childParentData.length == 0) {
                        getParentReservationId = {
                            reservationId: data.id,
                            guestFirstName: data.guestData.firstName,
                            guestLastName: data.guestData.lastName,
                            guestMailId: data.guestData.userData.email,
                            title: getSingleBlock.listingItem.title,
                            hostFirstName: getSingleBlock.listingItem.user.profile.firstName,
                            hostLastName: getSingleBlock.listingItem.user.profile.lastName,
                            cancelledDate: moment(moment(new Date())).format('DD-MM-YYYY'),
                            threadId: data.messageData.id,
                            checkIn: data.checkIn,
                            checkOut: data.checkOut,
                            guests: data.guests,
                        }
                        
                    }
                    data && data.chosenBlockData && data.chosenBlockData.length > 0 && data.chosenBlockData.map((values, index) => {
                        let parentDates = {};
                        let selectedDates;
                        parentDates['sessionId'] = values.id;
                        parentDates['date'] = values.date;
                        parentDates['startTime'] = values.startTime;
                        parentDates['endTime'] = values.endTime;
                        
                        selectedDates = data.cancellationDetails && data.cancellationDetails.length > 0 && data.cancellationDetails.find(x => x.sessionId === parentDates.sessionId && x.learnerId === parentData.learnerId);

                        if (selectedDates) {
                            parentDates['isSelected'] = true;
                            parentDates['isDisabled'] = true;
                        } else {
                            parentDates['isSelected'] = false;
                            parentDates['isDisabled'] = false;
                        }
                        parentSessionDates.push(parentDates);
                        parentData['dates'] = parentSessionDates;
                    })

                    cancellation.push(parentData);
                    if (data && data.isParentEnable == true && data.childParentData && data.childParentData.length == 0) {
                        allReservationId.push(getParentReservationId);
                    }
                }
            })
        



         initialValue = {
            cancellation: cancellation,
            cancellation,
            total: getSingleBlock.price,
            // message,
            listTitle: getSingleBlock.listingItem.title,
            cancelledDate: moment(moment(new Date())).format('DD-MM-YYYY'),
            cancelledBy: 'host',
            currency: getSingleBlock.listingItem.listingData.currency,
            allReservationId: allReservationId,
        };

    }




        if (loading) {
            return (
                <div className={s.space4}>
                    <Loader type="text" />
                </div>
            );
        }

        if (getSingleBlock === null || getSingleBlock === undefined) {
            return <NotFound />;
        }

        return (
            <div className={s.root}>
                <div className={s.container}>
                    <BlockCancellation data={getSingleBlock} initialValues={initialValue} cancellation={cancellation} />
                </div>
            </div>
        );
    }
}

export default compose(
    withStyles(s),
    graphql(CancelBlockQuery,
        {
            name: 'cancellationBlockData',
            options: (props) => ({
                variables: {
                    blockId: props.blockId,
                },
                fetchPolicy: 'network-only',
            })
        }
    ),
)(MentorBlockCancellation);

// export default withStyles(s)(CancelBlock);