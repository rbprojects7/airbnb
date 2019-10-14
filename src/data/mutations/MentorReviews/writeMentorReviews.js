// GrpahQL
import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLFloat as FloatType,
    GraphQLBoolean as BooleanType,
} from 'graphql';

import MentorReviewsType from '../../types/MentorReviewsType';
import ParentChildType from '../../types/ParentChildType';
import { sendEmail } from '../../../core/email/sendEmail';
import ThreadItemsType from '../../types/ThreadItemsType';

// Sequelize models
import { MentorReviews, ParentChild, User, Reservation, UserProfile, ThreadItems, Threads, ListPhotos, Listing, SessionTime } from '../../models';

const writeMentorReviews = {

    type: MentorReviewsType,

    args: {
        parentId: { type: StringType },
        childId: { type: IntType },
        isParentEnable: { type: BooleanType },
        learningAims: { type: new List(StringType) },
        reservationId: { type: IntType },
        isReviewed: { type: BooleanType },
    },

    async resolve({ request, response }, {
        parentId,
        childId,
        isParentEnable,
        learningAims,
        reservationId,
        isReviewed,
    }) {
        // Check if user already logged in
        if (request.user && !request.user.admin) {
            const userId = request.user.id;

            let learningAimsDataValue, createMentorReview, reviewContent = [];
            let learnerName, learnerDOB;
            let parentEnable = false;
            const parentReviewsCount = await ParentChild.count({ where: { reservationId: reservationId } });
            learningAimsDataValue = JSON.parse(learningAims);
            if (learningAimsDataValue != null && learningAimsDataValue != undefined) {
                await Promise.all(learningAimsDataValue.map(async (item, key) => {
                    if (item) {
                        createMentorReview = await MentorReviews.create({
                            blockId: item.blockId,
                            blockUniqueId: item.blockUniqueId,
                            listId: item.listId,
                            reservationId: reservationId,
                            mentorId: item.hostId,
                            parentId: parentId,
                            childId: childId,
                            reservationlearningId: item.id,
                            learningAimReviewRating: item.rating,
                            learningAimsReviewContent: item.value,
                            isParentEnable: isParentEnable,
                            isReviewed: isReviewed,
                        })

                        let currentId = isParentEnable ? 1 : null;
                        if (parentReviewsCount > 0) {
                            if (currentId == 1) {
                                const updateReviewStatus = await ParentChild.update({
                                    isReview: true,
                                }, {
                                        where: { reservationId: reservationId, childId: null }
                                    });
                            }
                            else {
                                const updateReviewStatus = await ParentChild.update({
                                    isReview: true,
                                }, {
                                        where: { reservationId: reservationId, childId: childId }
                                    });
                            }
                        }
                    }
                })
                );
            }

            const parentLearnersCount = await ParentChild.findAll({
                where: {
                    reservationId: reservationId,
                    isReview: true
                },
            });

            const reservation = await Reservation.findOne({
                where: { id: reservationId }
            });

            if (reservation) {
                // Get Host Data
                const host = await User.findOne({
                    where: {
                        id: reservation.hostId,
                    },
                    include: [
                        {
                            model: UserProfile,
                            as: 'profile'
                        }
                    ]
                });
                // Get Guest Data
                const guest = await User.findOne({
                    where: {
                        id: reservation.guestId,
                    },
                    include: [
                        {
                            model: UserProfile,
                            as: 'profile'
                        }
                    ]
                });
                const block = await Reservation.findOne({
                    where: {
                        blockUniqueId: reservation.blockUniqueId,
                    }
                });
                const getPhotos = await ListPhotos.findAll({
                    where: { listId: reservation.listId },
                });
                const getListing = await Listing.findAll({
                    where: { id: reservation.listId },
                });
                const reservationList = await Reservation.findOne({
                    where: {
                        listId: reservation.listId,
                    }
                });

                let reservationId = reservation.id;
                let guestEmail = guest.email;
                let guestName = guest.profile.firstName;
                let guestLastName = guest.profile.lastName;
                let guestProfilePic = guest.profile.picture;
                let blockUniqueId = block.blockUniqueId;
                let guestId = reservation.guestId;
                let listId = reservationList.listId;
                let hostName = host.profile.firstName;
                let hostLastName = host.profile.lastName;
                let coverPhoto = getListing[0].coverPhoto;
                let title = getListing[0].title;
                let street = getListing[0].street;
                let city = getListing[0].city; 
                let state = getListing[0].state; 
                let country = getListing[0].country;
                let zipcode = getListing[0].zipcode;
                let activePhoto = getListing[0].street;
                if (getPhotos != undefined && getPhotos.length > 0) {
                    activePhoto = getPhotos[0].name;
                    if (coverPhoto != undefined && coverPhoto != null) {
                        getPhotos.map((item) => {
                            if (item.id === coverPhoto) {
                                activePhoto = item.name;
                            }
                        })
                    } 
                }
                let convertedResponse = [];
                const listingchosenBlockData = await SessionTime.findAll({
                  where: {
                    reservationId: reservation.id
                  },
                });
            
                if (listingchosenBlockData && listingchosenBlockData.length > 0) {
                  listingchosenBlockData.map((item) => {
                    convertedResponse.push({
                      "id": item.id,
                      "reservationId": item.reservationId,
                      "date": item.date,
                      "startTime": item.startTime,
                      "endTime": item.endTime,
                    })
                  });
                }
                
                // Send email to host
                let content = {
                    reservationId,
                    guestName,
                    guestLastName,
                    guestProfilePic,
                    blockUniqueId,
                    hostName,
                    hostLastName,
                    activePhoto,
                    convertedResponse,
                    title,
                    street,
                    city,
                    zipcode,
                    state,
                    country
                };
                const thread = await Threads.findOrCreate({
                    where: {
                        listId: listId,
                        host: userId,
                        guest: guestId,
                    },
                    defaults: {
                        //properties you want on create
                        listId: listId,
                        host: userId,
                        guest: guestId
                    }
                });

                if (parentReviewsCount === parentLearnersCount.length) {
                    await sendEmail(guestEmail, 'reflection', content);
                    const threadItems = ThreadItems.create({
                        threadId: thread[0].dataValues.id,
                        reservationId,
                        sentBy: userId,
                        content: "Reflection received",
                        type: 'reflection',
                    });
                    const updateThreads = await Threads.update({
                        isRead: false
                    },
                        {
                            where: {
                                id: thread[0].dataValues.id
                            }
                        }
                    );
                }
            }

            if (createMentorReview) {
                return {
                    status: 'success',
                }
            } else {
                return {
                    status: 'failed'
                }
            }
        } else {
            return {
                status: "notLoggedIn",
            };
        }
    },
};

export default writeMentorReviews;

/**
mutation writeMentorReviews(
    $blockId: String,
    $blockUniqueId: Int!,
    $listId: Int,
    $reservationId: Int,
    $mentorId: String,
    $parentId: String,
    $childId: Int,
    $reservationlearningId: Int,
    $learningAimReviewRating: Int,
    $learningAimsReviewContent: String,
    $isParentEnable: Boolean,
){
    writeMentorReviews(
        blockId: $blockId,
        blockUniqueId: $blockUniqueId,
        listId: $listId,
        reservationId: $reservationId,
        mentorId: $mentorId,
        parentId: $parentId,
        childId:  $childId,
        reservationlearningId: $reservationlearningId,
        learningAimReviewRating: $learningAimReviewRating,
        learningAimsReviewContent: $learningAimsReviewContent,
        isParentEnable: $isParentEnable
    ) {
        status
    }
}
**/
