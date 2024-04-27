// Convert String to Date - Format: MM-DD-YYYY HH:mm
module.exports.convertDateTimeStrToDate = (dateTimeStr) => {
    const [dateValues, timeValues] = dateTimeStr.split(' ');
    const [month, day, year] = dateValues.split('-');
    const [hours, minutes] = timeValues.split(':');
    // console.log(new Date(+year, +month - 1, +day, +hours, +minutes));
    return new Date(+year, +month - 1, +day, +hours, +minutes);
}

// Compare two Dates
module.exports.compareDate = (date1, date2) => date1>date2;
