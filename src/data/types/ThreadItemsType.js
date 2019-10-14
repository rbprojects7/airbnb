import {
    GraphQLObjectType as ObjectType,
    GraphQLID as ID,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLBoolean as BooleanType,
    GraphQLList as List
} from 'graphql';

// Models
import {CancellationDetails, Reservation, ParentChild} from '../models'

// Types
import CancellationDetailsType from './CancellationDetailsType';
import ReservationTypeForThread from './ReservationTypeForThread';
import ParentChildType from './ParentChildType';


const ThreadItemsType = new ObjectType({
    name: 'ThreadItems',
    fields: {
        id: {
            type: IntType
        },
        threadId: {
            type: IntType
        },
        reservationId: {
            type: IntType
        },
        sentBy: {
            type: StringType
        },
        content: {
            type: StringType
        },
        type: {
            type: StringType
        },
        startDate: {
            type: StringType
        },
        endDate: {
            type: StringType
        },
        personCapacity: {
            type: IntType
        },
        isRead: {
            type: BooleanType
        },
        createdAt: {
            type: StringType
        },
        status: {
            type: StringType
        },
        cancelData: {
            type: CancellationDetailsType,
            resolve (threadItems) {
                return CancellationDetails.findOne({ where: { reservationId: threadItems.reservationId } });
            }
        },
        reservation: {
            type: ReservationTypeForThread,
            resolve(threadItems) {
                return Reservation.findOne({ where: { id: threadItems.reservationId } });
            }
        },
        childParentData: {
            type: new List(ParentChildType),
            async resolve(threadItems) {
                let convertedChildResponse = [];
                const listingChildData = await ParentChild.findAll({
                    where: {
                         reservationId: threadItems.reservationId,
                         isParent: false
                        
                    }
                });
                if(listingChildData && listingChildData.length > 0){
                    Promise.all(listingChildData.map((item) => {
                        convertedChildResponse.push({
                            "id": item.id,
                            "userId":item.userId,
                            "reservationId": item.reservationId,
                            "childId": item.childId,  
                            "childName": item.childName,
                            "firstName": item.firstName,
                            "lastName": item.lastName,
                            "preferredName": item.preferredName,
                            "birthday": item.birthday,
                            "preferences": item.preferences  
                        });
                    }));
                    return convertedChildResponse;
                }
                else {
                    return await [];
                }
            }
        },
        cancellationGroupId: {
            type: IntType
        },
        cancellationDetails: {
            type: new List(CancellationDetailsType),
           async resolve(threadItems) {
                return await CancellationDetails.findAll({
                    where: {
                        groupId: threadItems.cancellationGroupId,
                        reservationId: threadItems.reservationId
                    }
                });
            }
        },
    }
});

export default ThreadItemsType;