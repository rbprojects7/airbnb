import { Reservation, UserProfile, User } from '../../data/models';
import {sendEmail} from '../email/sendEmail';

export async function emailBroadcastStudent(id) {
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

        const block = await Reservation.findOne({
            where: { 
                blockUniqueId: reservation.blockUniqueId, 
            }
        });

        const reservationId = reservation.id;
        const hostEmail = host.email;
        const guestName = guest.profile.firstName;
        const guestLastName = guest.profile.lastName;
        const guestProfilePic = guest.profile.picture;
        const blockUniqueId = block.blockUniqueId;

        // Send email to host
        const contentForHost = {
            reservationId,
            guestName,
            guestLastName,
            guestProfilePic,
            blockUniqueId,
        };
        await sendEmail(hostEmail, 'completedHost', contentForHost);
        return {
            status: 'email is sent'
        };
    }
    return {
        status: 'failed to send email'
    };
}
