import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

export default function TimePicker({
  defaultDateTime = "",
  bookingDateTime,
  placeholder,
  identifier,
}) {
  const classes = useStyles()

  return (
    <Select
      disableUnderline
      native
      fullWidth
      value={defaultDateTime}
      placeholder={placeholder}
      className={"timePickerRoot"}
      onChange={event => {
        bookingDateTime(event.target.value, identifier)
      }}
      inputProps={{
        name: "age",
        id: "outlined-age-native-simple",
      }}
      style={{ background: "#fff" }}
    >
      <option value="08:00 AM">08:00 AM</option>
      <option value="08:30 AM">08:30 AM</option>
      <option value="09:00 AM">09:00 AM</option>
      <option value="09:30 AM">09:30 AM</option>
      <option value="10:00 AM">10:00 AM</option>
      <option value="10:30 AM">10:30 AM</option>
      <option value="11:00 AM">11:00 AM</option>
      <option value="11:30 AM">11:30 AM</option>
      <option value="12:00 PM">12:00 PM</option>
      <option value="12:30 PM">12:30 PM</option>
      <option value="01:00 PM">01:00 PM</option>
      <option value="01:30 PM">01:30 PM</option>
      <option value="02:00 PM">02:00 PM</option>
      <option value="02:30 PM">02:30 PM</option>
      <option value="03:00 PM">03:00 PM</option>
      <option value="03:30 PM">03:30 PM</option>
      <option value="04:00 PM">04:00 PM</option>
      <option value="04:30 PM">04:30 PM</option>
      <option value="05:00 PM">05:00 PM</option>
      <option value="05:30 PM">05:30 PM</option>
      <option value="06:00 PM">06:00 PM</option>
      <option value="06:30 PM">06:30 PM</option>
      <option value="07:00 PM">07:00 PM</option>
      <option value="07:30 PM">07:30 PM</option>
      <option value="08:00 PM">08:00 PM</option>
    </Select>
  )
}
