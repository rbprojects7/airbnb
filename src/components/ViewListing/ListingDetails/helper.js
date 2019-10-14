export const totalList = ['Basic DBS', 'Enhanced DBS', 'Risk Assessment', 'Public Liability Insurance', 'Smoke detector', 'First aid training', 'First aid kit', 'Safeguarding training'];

export const findMatch = (arraySmall, arrayLarge) => {
    const ary = [];
    for(let i = 0; i < arrayLarge.length; i += 1) {
        for(let z = 0; z < arraySmall.length; z += 1) {
            if (arrayLarge[i] === arraySmall[z])ary.push(i);
        }
    }
    return ary;
};

export function formattingTime(time) {
    let amPM,
        updatedTime;
    if(!isNaN(time)) {
        if(time < 11 || time > 23) {
            amPM = "AM";
        } else {
            amPM = "PM";
        }
        if(time < 12){
            return time + amPM;
        }
        if(time > 24){
            updatedTime = Number(time) - 24;
        } else {
            updatedTime = Number(time) - 12;
        }
        return updatedTime + amPM;

    }
}


export function checkIn(checkInStart, checkInEnd) {
    let checkIn;
    if(checkInStart === "Flexible") {
        checkIn = "Flexible";
    } else if(checkInEnd === "Flexible"){
        checkIn = `From ${formattingTime(checkInStart)}`;
    } else if(checkInStart != null && checkInEnd != null) {
        checkIn = `${formattingTime(checkInStart)} - ${formattingTime(checkInEnd)}`;
    }

    return checkIn;
}

export function checkValue(value, defaultValue) {
    return value !== null ? value : defaultValue;
}
