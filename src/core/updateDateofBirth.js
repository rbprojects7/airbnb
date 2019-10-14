import { Child } from '../data/models';

const updateDateofBirth = app => {
    app.post('/update-dateofbirth', async function (req, res) {
	console.log('Updated Dateofbirth');
       let date, month, year, birthday;
		// Get the birthday from child table
	    const getBirthDays = await Child.findAll({
            attributes: ['id', 'birthday'],
	    	where: {
                birthday: { 
                    $ne: null 
                } 
            }
        });
        if (getBirthDays != null && getBirthDays.length > 0) {
            await Promise.all(getBirthDays.map(async (item) => {
                let birthdayDate = item.birthday;
                let splitDateString = birthdayDate.split('-');
                year = Number(splitDateString[0]);
                month = Number(splitDateString[1])+1;
                date = Number(splitDateString[2]);
                birthday = year + '-' + month + '-' + date; 
                //update birthday month 
                await Child.update({
                    birthday: birthday
                }, {
                    where: {
                        id: item.id
                    }
                });              
            })); 
            
        }
        res.send({ status: 'SuccessFully updated!' });
    });
};

export default updateDateofBirth;