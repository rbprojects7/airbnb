import { gql } from 'react-apollo';
import { SEND_MESSAGE_START, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_ERROR } from '../../constants';
import { updateReservation } from '../Reservation/updateReservation';
import { sendEmail } from '../../core/email/sendEmail';
const ThreadItemsQuery = gql`
  query getThread($threadType: String, $threadId: Int){
  getThread(threadType: $threadType, threadId: $threadId) {
    id
    listId
    guest
    host
    listData {
      title
      city
      state
      country
      listingData {
        basePrice
        cleaningPrice
        currency
        monthlyDiscount
        weeklyDiscount
      }
    }
    threadItemForType {
      id
      threadId
      reservationId
      content
      sentBy
      type
      startDate
      endDate
      personCapacity
      createdAt
      cancelData {
        id
        reservationId
        cancellationPolicy
        guestServiceFee
        hostServiceFee
        refundToGuest
        payoutToHost
        total 
        currency
      }
      reservation {
        id
        checkIn
        checkOut
        basePrice
        cleaningPrice
        total
        guests
        currency
        hostServiceFee
        guestServiceFee
        discount
        discountType
      chosenBlockData{
          id
          reservationId
          blockId
          date
          startTime
          endTime,
          blockUniqueId
        }
      }
      childParentData{
        childName{
          id
          preferredName
        }
      }
    }
    threadItems {
      id
      threadId
      reservationId
      content
      sentBy
      type
      startDate
      endDate
      createdAt
      cancellationDetails{
        sessionId
        learnerId
        createdAt
        sessionTime{
          startTime
          endTime
          date
        }
        learnerData{
          preferredName
        }
      }
    }
    threadItemsCount
    guestProfile {
      profileId
      displayName
      firstName
      picture
      location
      reviewsCount
      userVerification {
        id
        isEmailConfirmed
        isFacebookConnected
        isGoogleConnected
        isIdVerification
      }
    }
    guestUserData {
      email
    }
    hostProfile {
      profileId
      displayName
      firstName
      picture
      location
      reviewsCount
      userVerification {
        id
        isEmailConfirmed
        isFacebookConnected
        isGoogleConnected
        isIdVerification
      }
    }
    hostUserData {
      email
    }
    status
  }
}
`;

export function sendMessageAction(
  threadId,
  threadType,
  content,
  type,
  startDate,
  endDate,
  personCapacity,
  reservationId,
  receiverName,
  senderName,
  receiverType,
  receiverEmail,
  startTime,
  coverPhoto,
  listPhotos,
  chosenBlockData
) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: SEND_MESSAGE_START,
    });

    try {
      let mutation = gql`
        mutation sendMessage(
          $threadId: Int!
          $content: String
          $type: String
          $startDate: String
          $endDate: String
          $personCapacity: Int
          $reservationId: Int
          ) {
          sendMessage(
            threadId: $threadId
            content: $content
            type: $type
            startDate: $startDate
            endDate: $endDate
            personCapacity: $personCapacity
            reservationId: $reservationId
           ) {
            id
            sentBy
            content
            type
            reservationId
            startDate
            endDate
            personCapacity
            createdAt
          }
        }
      `;

      // Send Message
      const { data } = await client.mutate({
        mutation,
        variables: {
          threadId,
          content,
          type,
          startDate,
          endDate,
          personCapacity,
          reservationId
        },
        refetchQueries: [
          {
            query: ThreadItemsQuery,
            variables: {
              threadId,
              threadType,
            },
          },
        ],
      });

      if (data && data.sendMessage) {
        if (reservationId != null && reservationId != undefined) {
          dispatch(updateReservation(reservationId, type, threadType, coverPhoto, listPhotos, chosenBlockData));
        }
        dispatch({
          type: SEND_MESSAGE_SUCCESS,
        });
        if (type === 'message') {
          let emailContent = {
            receiverName,
            senderName,
            receiverType,
            type: receiverType,
            message: content,
            threadId,
          };
          sendEmail(receiverEmail, 'message', emailContent);
        }
      }
    } catch (error) {
      dispatch({
        type: SEND_MESSAGE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }

    return true;
  };
}