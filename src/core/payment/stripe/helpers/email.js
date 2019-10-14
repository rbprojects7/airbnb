import {
  Reservation,
  UserProfile,
  User,
  Listing,
  ListingData,
  ThreadItems,
  ParentChild,
  Child,
  SessionTime
} from '../../../../data/models';
import { sendEmail } from '../../../email/sendEmail';

export async function emailBroadcast(id) {
  // Get Reservation Data
  const reservation = await Reservation.findOne({
    where: { id }
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
    // Get List Data
    const list = await Listing.findOne({
      where: {
        id: reservation.listId
      },
      include: [
        {
          model: ListingData,
          as: 'listingData'
        }
      ]
    });
    // Get Thread Data
    const threadData = await ThreadItems.findOne({
      where: { reservationId: id }
    });

    //Get ParentChild Data
    let convertedChildResponse = [];
    const ParentChildData = await ParentChild.findAll({
      where: {
        reservationId: id
        //isParent: false
      }
    });
    if (ParentChildData && ParentChildData.length > 0) {
      ParentChildData.map((item) => {
        convertedChildResponse.push({
          "childId": item.childId
        })
      });
    }
    let childObj = {};
    let childObjData = [];
    convertedChildResponse.map((child, key) => {
      childObj = child.childId;
      childObjData.push(childObj);
    });
    const ChildData = await Child.findAll({
      where: {
        childId:
        {
          $in: [
            childObjData
          ]

        }

      }
    });
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

    let reservationId = reservation.id;
    let confirmationCode = reservation.confirmationCode;
    let isParentEnable = reservation.isParentEnable;
    let bookingMessage = reservation.message;
    let hostEmail = host.email;
    let hostName = host.profile.firstName;
    let guestEmail = guest.email;
    let guestName = guest.profile.firstName;
    let guestLastName = guest.profile.lastName;
    let guestLocation = guest.profile.location;
    let guestProfilePic = guest.profile.picture;
    let guestJoinedDate = guest.profile.createdAt;
    let guestDateOfBirth = guest.profile.dateOfBirth;
    let guestInfo = guest.profile.info;
    let checkIn = reservation.checkIn;
    let checkOut = reservation.checkOut;
    let guests = reservation.guests;
    let listTitle = list.title;
    let listCity = list.city;
    let allowedCheckInTime = list.listingData.checkInStart;
    let allowedCheckOutTime = list.listingData.checkOutStart;
    let basePrice = reservation.basePrice;
    let total = reservation.total;
    let hostServiceFee = reservation.hostServiceFee;
    let currency = reservation.currency;
    let isTour = reservation.isTour;
    let threadId;
    //let insurance = reservation.insurance;
    //let tax = reservation.tax;
    let guestServiceFee = reservation.guestServiceFee;
    let hostTotal = 0;
    if (threadData) {
      threadId = threadData.threadId;
    }
    let childFullData = [];
    if (ChildData) {
      for (var i = 0; i < ChildData.length; i++) {
        let childDataObject = {};
        childDataObject['childId'] = ChildData[i].childId;
        childDataObject['firstName'] = ChildData[i].firstName;
        childDataObject['lastName'] = ChildData[i].lastName;
        childDataObject['birthday'] = ChildData[i].birthday;
        childDataObject['preferences'] = ChildData[i].preferences;
        childDataObject['preferredName'] = ChildData[i].preferredName;
        childFullData.push(childDataObject);
      }
    }
   
    

    // For Booking Request
    if (reservation.reservationState === 'pending') {
      //hostTotal = total - (insurance + tax + guestServiceFee);
      hostTotal = total - guestServiceFee;

      // Send email to host
      let contentForHost = {
        reservationId,
        confirmationCode,
        isParentEnable,
        bookingMessage,
        hostName,
        guestName,
        guestDateOfBirth,
        guestInfo,
        checkIn,
        checkOut,
        listTitle,
        basePrice,
        total: hostTotal,
        hostServiceFee,
        currency,
        childFullData,
        convertedResponse
      };
      if (!isTour) {
        //console.log("contentForHost======", contentForHost);
        await sendEmail(hostEmail, 'bookingRequest', contentForHost);
      } else {
        await sendEmail(hostEmail, 'bookingTourRequest', contentForHost);
      }
      // Send email to guest
      let contentForguest = {
        reservationId,
        confirmationCode,
        hostName,
        guestName,
        guestDateOfBirth,
        checkIn,
        listTitle,
        threadId
      };
      if (!isTour) {
        await sendEmail(guestEmail, 'bookingRequestGuest', contentForguest);
      } else {
        await sendEmail(guestEmail, 'bookingTourRequestGuest', contentForguest);
      }
    }

    if (reservation.reservationState === 'approved') {
      // Send email to host
      let contentForHost = {
        reservationId,
        threadId,
        confirmationCode,
        guestName,
        guestLastName,
        guestLocation,
        guestProfilePic,
        guestJoinedDate,
        checkIn,
        checkOut,
        guests,
        allowedCheckInTime,
        allowedCheckOutTime
      };
      await sendEmail(hostEmail, 'bookingConfirmedToHost', contentForHost);

      // Send email to guest
      let contentForguest = {
        reservationId,
        hostName,
        guestName,
        listTitle,
        listCity,
        threadId
      };
      await sendEmail(guestEmail, 'bookingConfirmedToGuest', contentForguest);
    }


    return {
      status: 'email is sent'
    };
  } else {
    return {
      status: 'failed to send email'
    }
  }
}