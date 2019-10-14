import { Reservation, UserProfile, User } from '../../data/models';
import {sendEmail} from '../email/sendEmail';

export async function emailBroadcastParent(id) {
    // Get Reservation Data
    const reservation = await Reservation.findOne({
        where: { id }
    });
    if(reservation) {
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

        const reservationId = reservation.id;
        const hostName = host.profile.firstName;
        const hostLastName = host.profile.lastName;
        const hostProfilePic = host.profile.picture;
        const guestEmail = guest.email;

        // Send email to guest
        const contentForGuest = {
            reservationId,
            hostName,
            hostLastName,
            hostProfilePic
        };
        await sendEmail(guestEmail, 'completedGuest', contentForGuest);

        return {
            status: 'email is sent'
        };
    }
    return {
        status: 'failed to send email'
    };

}
