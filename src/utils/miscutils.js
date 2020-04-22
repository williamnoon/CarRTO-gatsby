import moment from "moment"
const tax = 0.08
const Vehicle_License_Fee = 4.91
const title = 25
const registration = 50
const { API } = process.env

function removeDuplicates(originalArray, prop) {
  var newArray = []
  var lookupObject = {}

  for (var i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i]
  }

  for (i in lookupObject) {
    newArray.push(lookupObject[i])
  }
  return newArray
}
function calculateTimeDifferenceInDays(pickupDate, returnDate) {
  let a = moment(pickupDate)
  let b = moment(returnDate)
  let countDays = Math.ceil(b.diff(a, "hours") / 24)
  if (countDays === 0) return 1
  else return countDays

  // console.log(a.diff(b, "minutes")) // 44700
  // console.log(a.diff(b, "days")) // 31
  // console.log(a.diff(b, "weeks")) // 4
}
function calculateTimeDifferenceInHours(pickupDate, returnDate) {
  let currentDate = moment()
  // console.log(currentDate, "-----currentDate------")
  let endDate = moment(returnDate)
  // console.log(endDate, "-----endDate------")
  let duration = moment.duration(endDate.diff(currentDate));
  // console.log(duration.asHours(), "---duration--------")
  return duration.asHours();
}

function validateTextWhitespace(str) {
  if (/\s/.test(str)) {
    // It has any kind of whitespace
  }
}
function removeWhitespaceBtwText(str) {
  return str.replace(/ +/g, "")
}
function convertIntoLowercase(str) {
  return str.toString().toLowerCase()
}

//totalRateCharge=(Rental_Rate  * Rental_Days)
function Rental_Total(totalRateCharge) {
  // console.log(totalRateCharge, Vehicle_License_Fee, totalRateCharge * tax, totalRateCharge * tax + Vehicle_License_Fee, "Vehicle_License_Fee0000")
  let totalRent = parseFloat(
    totalRateCharge + totalRateCharge * tax + Vehicle_License_Fee
  ).toFixed(2)
  // console.log(totalRent, "totalRent")
  return totalRent
}
function calculateTaxFeeDetail(totalRateCharge) {
  return parseFloat(totalRateCharge * tax + Vehicle_License_Fee).toFixed(2)
}
function calculateSaleTax(totalRateCharge) {
  return parseFloat(totalRateCharge * tax).toFixed(2)
}
function calculatedTaxTitleRegistration(carValue) {
  // console.log(typeof carValue, "------carValue------")
  return parseFloat(Number(carValue) * tax + title + registration).toFixed(2)
}
function calculatedTradeOwnTotal(carValue) {
  // console.log(typeof carValue, "------carValue------")
  if (carValue % 1 != 0) {
    return parseFloat(
      Number(carValue) + Number(carValue) * tax + title + registration
    ).toFixed(2)
  } else {
    return parseFloat(
      Number(carValue) + Number(carValue) * tax + title + registration
    ).toFixed(0)
  }
}
function convertPriceStrValIntoNum(val) {
  if (typeof val === "string") {
    return Number(val.substr(1))
  }
  return val
}
function roundUpToTheNearestHour(date) {
  let m = moment(date)
  let roundUp =
    m.minute() || m.second() || m.millisecond()
      ? m.add(1, "hour").startOf("hour")
      : m.startOf("hour")
  console.log(roundUp.toString()) // outputs Tue Feb 17 2017 13:00:00 GMT+0000
}
function formatTimeInAMPM(date) {
  return moment(date)
    .add(1, "hours")
    .format("hh:mm a")
    .toString()
    .toUpperCase()
}
function round(date, duration, method) {
  return moment(Math[method](+date / +duration) * +duration)
}
function roundedDate(dt) {
  let currentD = new Date(dt);
  let startHappyHourD = new Date();
  startHappyHourD.setHours(8, 0, 0); // 08.00 am
  let endHappyHourD = new Date();
  endHappyHourD.setHours(20, 0, 0); // 08.00 pm
  console.log(dt.getHours(), "roundedDate")

  if (currentD >= startHappyHourD && currentD < endHappyHourD) {
    console.log("yes!");
    let date = moment(dt)
    let roundedDate = round(date, moment.duration(30, "minutes"), "ceil")
    return moment(roundedDate).format()
  } else {
    let initialdate = moment(dt).add(1, 'days').format("MM/DD/YYYY");
    console.log("initialdate", initialdate);
    let start_time = '08:00:00';
    let datetimeA = moment(initialdate + " " + start_time).format();
    console.log("no, sorry! between 08.00 am and 08.00 pm", datetimeA);
    return datetimeA
  }
}
function addSizeKeywordVehicle(size) {
  // console.log(size, "---------size--------")
  if (
    convertIntoLowercase(size) === "full" ||
    convertIntoLowercase(size) === "mid"
  ) {
    return "Size"
  }
  return ""
}
function convertToCurrencyDecimalFormat(value) {
  return parseFloat(value).toFixed(2)
}
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
export const handleFetchUserDetails = async () => {
  const userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"))
  try {
    const response = await fetch(`${API}/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userLoggedIn}`,
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    if (response.ok) {
      const json = await response.json()
      return json
    }
  } catch (error) {
    return error
  }
}
export const miscutils = {
  removeDuplicates,
  calculateTimeDifferenceInDays,
  calculateTimeDifferenceInHours,
  validateTextWhitespace,
  removeWhitespaceBtwText,
  convertIntoLowercase,
  Rental_Total,
  calculateTaxFeeDetail,
  Vehicle_License_Fee,
  calculateSaleTax,
  tax,
  title,
  registration,
  calculatedTaxTitleRegistration,
  convertPriceStrValIntoNum,
  calculatedTradeOwnTotal,
  formatTimeInAMPM,
  roundedDate,
  addSizeKeywordVehicle,
  convertToCurrencyDecimalFormat,
  capitalizeFirstLetter
}
