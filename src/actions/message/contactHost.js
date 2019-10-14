import {gql} from 'react-apollo';

import {
  CONTACT_HOST_START,
  CONTACT_HOST_SUCCESS,
  CONTACT_HOST_ERROR, 
} from '../../constants';

import { sendEmail } from '../../core/email/sendEmail';

export function contactHost(
  listId, 
  host, 
  content, 
  //startDate, 
  //endDate, 
  //personCapacity,
  hostEmail,
  firstName,
  listTitle
) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: CONTACT_HOST_START,
    });

    try {

      let account = getState().account.data;

      let mutation = gql `
          mutation CreateThreadItems(
            $listId: Int!, 
            $host: String!,
            $content: String!,
            $type: String,
            $startDate: String,
            $endDate: String,
            $personCapacity: Int
          ){
              CreateThreadItems(
                listId: $listId,
                host: $host,
                content: $content,
                type: $type,
                startDate: $startDate,
                endDate: $endDate,
                personCapacity: $personCapacity
              ) {
                  id
                  threadId
                  sentBy
                  content
                  type
                  startDate
                  endDate
                  personCapacity
                  createdAt
              }
          }
      `;

      // Send Message
      const {data} = await client.mutate({
        mutation,
        variables: {
          listId,
          host,
          content,
          type: 'inquiry'
          //startDate, 
          //endDate, 
          //personCapacity
        }
      });

      if(data && data.CreateThreadItems) {
        dispatch({
          type: CONTACT_HOST_SUCCESS,
        });
        let emailContent = {
          receiverName: firstName,
          senderName: account.firstName,
          type: 'host',
          message: content,
          threadId: data.CreateThreadItems.threadId,
          listTitle,
          //checkIn: startDate,
          //checkOut: endDate,
          //personCapacity
        };
       await sendEmail(hostEmail, 'inquiry', emailContent);
      }

    } catch (error) {
        dispatch({
          type: CONTACT_HOST_ERROR,
          payload: {
            error
          }
        });
      return false;
    }

    return true;
  };
}