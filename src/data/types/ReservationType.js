import {
    GraphQLObjectType as ObjectType,
    GraphQLID as ID,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLBoolean as BooleanType,
    GraphQLFloat as FloatType,
    GraphQLList as List,

} from 'graphql';

// Models
import {
    Listing, UserProfile, Threads, Payout, TransactionHistory, Transaction,
    CancellationDetails, User, SessionTime, Block, Child, ParentChild, ReservationLearningAim, Reviews,
    MentorReviews } from '../models';

// Type
import ThreadsType from './ThreadsType';
import ShowListingType from './ShowListingType';
import ProfileType from './ProfileType';
import PayoutType from './PayoutType';
import TransactionHistoryType from './TransactionHistoryType';
import TransactionType from './TransactionType';
import CancellationDetailsType from './CancellationDetailsType';
import UserType from './UserType';
import { SessionTimeType } from './SessionTimeType';
//import { BlockLisitingType } from './BlockType';
import { BlockType } from './BlockType';
import ChildType from './ChildType';
import moment from 'moment';
import ParentChildType from './ParentChildType';
import LearningAimType from './learningAimType';
import ReservationLearningAimType from './ReservationLearningAimType';
import ReviewsType from './ReviewsType';
import MentorReviewsType from './MentorReviewsType';


const ReservationType = new ObjectType({
    name: 'Reservation',
    fields: {
        id: {
            type: IntType
        },
        listId: {
            type: IntType
        },
        listData: {
            type: ShowListingType,
            resolve(reservation) {
                return Listing.findOne({
                    where: { id: reservation.listId }
                })
            }
        },
        hostId: {
            type: StringType
        },
        hostPayout: {
            type: PayoutType,
            resolve(reservation) {
                if (reservation.payoutId != null && reservation.payoutId > 0) {
                    return Payout.findOne({
                        where: {
                            userId: reservation.hostId,
                            id: reservation.payoutId
                        }
                    })
                } else {
                    return Payout.findOne({
                        where: {
                            userId: reservation.hostId,
                            default: true
                        }
                    })
                }
            }
        },
        hostTransaction: {
            type: TransactionHistoryType,
            resolve(reservation) {
                return TransactionHistory.findOne({
                    where: {
                        reservationId: reservation.id,
                    }
                })
            }
        },
        hostData: {
            type: ProfileType,
            resolve(reservation) {
                return UserProfile.findOne({
                    where: { userId: reservation.hostId }
                });
            }
        },
        guestId: {
            type: StringType
        },
        guestData: {
            type: ProfileType,
            resolve(reservation) {
                return UserProfile.findOne({
                    where: { userId: reservation.guestId }
                })
            }
        },
        transaction: {
            type: TransactionType,
            resolve(reservation) {
                return Transaction.findOne({
                    where: { reservationId: reservation.id, paymentType: 'booking' }
                })
            }
        },
        refundStatus: {
            type: TransactionType,
            resolve(reservation) {
                return Transaction.findOne({
                    where: { reservationId: reservation.id, paymentType: 'cancellation' }
                })
            }
        },
        guestUser: {
            type: UserType,
            resolve(reservation) {
                return User.findOne({
                    where: { Id: reservation.guestId }
                })
            }
        },
        hostUser: {
            type: UserType,
            resolve(reservation) {
                return User.findOne({
                    where: { Id: reservation.hostId }
                })
            }
        },
        checkIn: {
            type: StringType
        },
        checkOut: {
            type: StringType
        },
        guests: {
            type: IntType
        },
        message: {
            type: StringType
        },
        basePrice: {
            type: FloatType
        },
        cleaningPrice: {
            type: FloatType
        },
        currency: {
            type: StringType
        },
        discount: {
            type: FloatType
        },
        discountType: {
            type: StringType
        },
        guestServiceFee: {
            type: FloatType,
        },
        hostServiceFee: {
            type: FloatType,
        },
        total: {
            type: FloatType,
        },
        confirmationCode: {
            type: IntType
        },
        reservationState: {
            type: StringType
        },
        paymentState: {
            type: StringType
        },
        payoutId: {
            type: IntType
        },
        messageData: {
            type: ThreadsType,
            resolve(reservation) {
                return Threads.findOne({
                    where: {
                        listId: reservation.listId,
                        $or: [
                            {
                                host: reservation.guestId
                            },
                            {
                                guest: reservation.guestId
                            }
                        ]
                    }
                });
            }
        },
        cancellationDetails: {
            type: new List(CancellationDetailsType),
            resolve(reservation) {
                return CancellationDetails.findAll({
                    where: {
                        reservationId: reservation.id
                    }
                });
            }
        },
        createdAt: {
            type: StringType
        },
        updatedAt: {
            type: StringType
        },
        count: {
            type: IntType
        },
        status: {
            type: StringType
        },
        paymentMethodId: {
            type: IntType
        },
        isParentEnable:
        {
            type: BooleanType,
        },
        startTime: {
            type: StringType
        },
        endTime: {
            type: StringType
        },
        blockId: {
            type: StringType
        },
        blockUniqueId: {
            type: IntType
        },
        chosenBlockData: {
            type: new List(SessionTimeType),
            async resolve(reservation) {
                let convertedResponse = [];
                const listingchosenBlockData = await SessionTime.findAll({
                    where: {
                        reservationId: reservation.id
                        // blockId: reservation.blockId        

                    },
                });

                if (listingchosenBlockData && listingchosenBlockData.length > 0) {
                    Promise.all(listingchosenBlockData.map((item) => {
                        convertedResponse.push({
                            "id": item.id,
                            "reservationId": item.reservationId,
                            // "blockId": item.blockId,
                            "date": item.date,
                            "startTime": item.startTime,
                            "endTime": item.endTime,
                            "blockUniqueId": item.blockUniqueId

                        });
                    }));

                    return convertedResponse;

                } else {
                    return await [];
                }
            }
        },
        isParentEnable: { type: BooleanType },
        isParent: { type: BooleanType },
        child: { type: StringType },
        childParentData: {
            type: new List(ParentChildType),
            async resolve(reservation) {
                let convertedChildResponse = [];
                const listingChildData = await ParentChild.findAll({
                    where: {
                        reservationId: reservation.id,
                        isParent: false

                    },
                });

                if (listingChildData && listingChildData.length > 0) {
                    Promise.all(listingChildData.map((item) => {
                        convertedChildResponse.push({
                            "id": item.id,
                            "userId": item.userId,
                            "reservationId": item.reservationId,
                            "childId": item.childId,
                            "childName": item.childName,
                            "firstName": item.firstName,
                            "lastName": item.lastName,
                            "preferredName": item.preferredName,
                            "birthday": item.birthday
                            //"isParent":item.isParent        
                        });
                    }));
                    return convertedChildResponse;
                }
                else {
                    return await [];
                }
            }
        },
        learningAim: {
            type: new List(LearningAimType),
            async resolve(reservation) {
                return await LearningAim.findAll({
                    where: {
                        listId: reservation.listId,
                    }
                })
            }
        },

        cancellationData: {
            type: StringType,
        },
        blockData: {
            type: new List(BlockType),
            async resolve(reservation) {
                return await Block.findAll({
                    where: {
                        blockUniqueId: reservation.blockUniqueId,
                    }
                })
            }
        },
        parentReviewsCount: {
            type: IntType,
            async resolve(reservation) {
              return await Reviews.count({
                where: {
                    reservationId: reservation.id
                }
              })
            }
          },
      
        isParentReviewed: {
            type: new List(MentorReviewsType),
            async resolve(reservation) {
                return await MentorReviews.findAll({
                    where: {
                        reservationId: reservation.id,
                        blockId: reservation.blockId,
                        isReviewed: true

                    }
                })
            }
        },
        learnerReviewsCount: {
            type: new List(ParentChildType),
                      async resolve(reservation) {
                          return await ParentChild.findAll({
                              where: {
                                  reservationId: reservation.id,
                                  isReview: true
          
                              }
                          })
                }       
          },
          allReviewsCount: {
            type: IntType,
                      async resolve(reservation) {
                          return await ParentChild.count({
                              where: {
                                  reservationId: reservation.id,          
                              }
                          })
                }       
          },
          totalSessionHours: { type: FloatType },
          isSent: { type: BooleanType },
    }
});

export default ReservationType;