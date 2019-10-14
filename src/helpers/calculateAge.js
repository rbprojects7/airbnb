export function calculateAge(dateString) 
{
    var today = new Date();
    var birthDate = new Date(dateString);
    let isValid = false, splitDateString, isInvalidDate = false, findInvalidDate;
    if(dateString){
        splitDateString = dateString.split('-');
        findInvalidDate = splitDateString.find(o => Number(o) <= 0);
        if (findInvalidDate) {
            return null;
        }
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            age--;
        }    
        return age;
        
    }
    else {
        return null;
    }

    
}