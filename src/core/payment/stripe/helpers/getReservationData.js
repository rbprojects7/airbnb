import { Reservation } from '../../../../data/models';

export async function getReservationData(id) {
    const response = await Reservation.findOne({
        where: {
            id
        }
    });
    if(response) {
        return response;
    } else {
        return null;
    }
}