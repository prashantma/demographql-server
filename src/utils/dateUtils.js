const dateToNumber = (date) => (date ? date.valueOf() : 0);

const numberToDate = (dateNumber) => (dateNumber ? new Date(dateNumber) : null);

module.exports = { dateToNumber, numberToDate };
