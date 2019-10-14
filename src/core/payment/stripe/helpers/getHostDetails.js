import { Payout } from '../../../../data/models';

export async function getHostDetails(userId){
    const hostDetails = await Payout.findOne({
        where :{
            userId,
            default: 1
        }
    });

    if(hostDetails){
        return hostDetails.payEmail;
    } else {
        return null;
    }
}