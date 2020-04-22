import React from "react"
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import MomentUtils from "@date-io/moment"
import "../assets/scss/main.scss"

class DatePickerBar extends React.Component {
  state = {
    date: new Date(),
  }
  static defaultProps = {}
  render() {
    const { identifier, defaultDateTime, minDate } = this.props
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker
          autoOk
          animateYearScrolling
          disablePast
          InputProps={{
            disableUnderline: true,
          }}
          InputLabelProps={{
            shrink: true,
          }}
          classes={{ root: "datePickerInput" }}
          format="MM/DD/YYYY"
          views={["year", "month", "date"]}
          minDate={minDate}
          value={defaultDateTime && defaultDateTime}
          onChange={date => {
            this.setState(
              { date },
              this.props.bookingDateTime(date.format(), identifier)
            )
          }}
        />
      </MuiPickersUtilsProvider>
    )
  }
}
export default DatePickerBar
