import React from "react"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogTitle from "@material-ui/core/DialogTitle"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"
import InputLabel from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import { Color, Size, Seats, Bags, Status } from "./constants"
import "./../../assets/scss/main.scss"
const { API } = process.env

function SelectField({
  className,
  value,
  onChange,
  items,
  id,
  name,
  placeholder,
  ...other
}) {
  return (
    <FormControl className={"selectFieldRoot"}>
      <InputLabel htmlFor="age-native-simple">{placeholder}</InputLabel>
      <Select
        disableUnderline
        native
        autoWidth
        value={value}
        onChange={onChange}
        className={className}
        id={id}
        name={name}
        {...other}
      >
        {items &&
          items.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </Select>
    </FormControl>
  )
}
SelectField.propTypes = {
  className: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}))
const defaultValues = {
  formValues: {
    VIN: "",
    Year: "",
    Make: "",
    Model: "",
    Color: "",
    Miles: "",
    Rental: false,
    Size: "",
    Premium: false,
    Features:
      "Cruise Control, AM/FM Stereo Radio, Automatic, Air Conditioning, Power Lock Doors, Tilt Steering Wheel, Power Mirrors",
    Images: "",
    Seats: "",
    Bags: "",
    "Acquisition Cost": "",
    "Value Inspection": "",
    Transport: "",
    "Diagostic Inspection": "",
    "Body Work": "",
    Detailing: "",
    Upholstery: "",
    Tires: "",
    Parts: "",
    Labor: "",
    "GPS & Install": "",
    "Total Cost": "",
    Value: "",
    Margin: "",
    "Value Type": "",
    Status: "",
  },
}
export default function AddVehicleForm({ open, handleToggle }) {
  const [formValues, setFormValues] = React.useState(defaultValues.formValues)
  const classes = useStyles()

  const hanldeChangeFormValues = event => {
    if (event.target.name === "Rental" || event.target.name === "Premium") {
      setFormValues({
        ...formValues,
        [event.target.name]: event.target.checked,
      })
    } else {
      setFormValues({ ...formValues, [event.target.name]: event.target.value })
    }
  }

  const handleSubmitForm = async e => {
    e.preventDefault()
    try {
      const response = await fetch(`${API}/Vehicle/Create`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      })
      const json = await response.json()
      const { status, message, data } = json
      if (message === "Success" && (status === 202 || status === 201)) {
        setFormValues(defaultValues.formValues)
        handleToggle()
      } else {
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className={classes.root}>
      <Dialog
        open={open}
        onClose={handleToggle}
        aria-labelledby="form-dialog-title"
        className="addVehicleDialog"
      >
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmitForm}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <DialogTitle id="form-dialog-title" className="addVehicletitle">
                Create Vehicle
              </DialogTitle>
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="VIN"
                className="inputField"
                id="VIN"
                placeholder="VIN"
                type="text"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={formValues.VIN}
                onChange={hanldeChangeFormValues}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className="inputField"
                id="Year"
                name="Year"
                placeholder="Year"
                type="text"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={formValues.Year}
                onChange={hanldeChangeFormValues}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="Make"
                className="inputField"
                id="Make"
                placeholder="Make"
                type="text"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={formValues.Make}
                onChange={hanldeChangeFormValues}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="Model"
                className="inputField"
                id="Model"
                placeholder="Model"
                type="text"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={formValues.Model}
                onChange={hanldeChangeFormValues}
              />
            </Grid>{" "}
            <Grid item xs={6}>
              <SelectField
                name="Color"
                className="selectField"
                label="Color"
                id="Color"
                placeholder="Color"
                value={formValues.Color}
                onChange={hanldeChangeFormValues}
                items={Color}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="Miles"
                className="inputField"
                id="Miles"
                placeholder="Miles"
                type="text"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={formValues.Miles}
                onChange={hanldeChangeFormValues}
              />
            </Grid>
            <Grid item xs={6}>
              <SelectField
                name="Size"
                className="selectField"
                id="Size"
                placeholder="Size"
                label="Size"
                value={formValues.Size}
                onChange={hanldeChangeFormValues}
                items={Size}
              />
            </Grid>
            <Grid item xs={6}>
              <SelectField
                name="Seats"
                className="selectField"
                id="Seats"
                placeholder="Seats"
                label="Seats"
                value={formValues.Seats}
                onChange={hanldeChangeFormValues}
                items={Seats}
              />
            </Grid>
            <Grid item xs={6}>
              <SelectField
                name="Bags"
                label="Bags"
                className="selectField"
                id="Bags"
                placeholder="Bags"
                value={formValues.Bags}
                onChange={hanldeChangeFormValues}
                items={Bags}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="Acquisition Cost"
                className="inputField"
                id="Acquisition Cost"
                placeholder="Acquisition Cost"
                type="text"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={formValues["Acquisition Cost"]}
                onChange={hanldeChangeFormValues}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="Value Inspection"
                className="inputField"
                id="Value Inspection"
                placeholder="Value Inspection"
                type="text"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={formValues["Value Inspection"]}
                onChange={hanldeChangeFormValues}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="Transport"
                className="inputField"
                id="Transport"
                placeholder="Transport"
                type="text"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={formValues.Transport}
                onChange={hanldeChangeFormValues}
              />
            </Grid>{" "}
            <Grid item xs={6}>
              <TextField
                name="Diagostic Inspection"
                className="inputField"
                id="Diagostic Inspection"
                placeholder="Diagostic Inspection"
                type="text"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={formValues["Diagostic Inspection"]}
                onChange={hanldeChangeFormValues}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="Body Work"
                className="inputField"
                id="Body Work"
                placeholder="Body Work"
                type="text"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={formValues["Body Work"]}
                onChange={hanldeChangeFormValues}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="Detailing"
                className="inputField"
                id="Detailing"
                placeholder="Detailing"
                type="text"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={formValues.Detailing}
                onChange={hanldeChangeFormValues}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="Upholstery"
                className="inputField"
                id="Upholstery"
                placeholder="Upholstery"
                type="text"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={formValues.Upholstery}
                onChange={hanldeChangeFormValues}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="Tires"
                className="inputField"
                id="Tires"
                placeholder="Tires"
                type="text"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={formValues.Tires}
                onChange={hanldeChangeFormValues}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="Parts"
                className="inputField"
                id="Parts"
                placeholder="Parts"
                type="text"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={formValues.Parts}
                onChange={hanldeChangeFormValues}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="Labor"
                className="inputField"
                id="Labor"
                placeholder="Labor"
                type="text"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={formValues.Labor}
                onChange={hanldeChangeFormValues}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name={"GPS & Install"}
                className="inputField"
                id={"GPS & Install"}
                placeholder={"GPS & Install"}
                type="text"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={formValues["GPS & Install"]}
                onChange={hanldeChangeFormValues}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="Total Cost"
                className="inputField"
                id="Total Cost"
                placeholder="Total Cost"
                type="text"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={formValues["Total Cost"]}
                onChange={hanldeChangeFormValues}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="Value"
                className="inputField"
                id="Value"
                placeholder="Value"
                type="text"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={formValues.Value}
                onChange={hanldeChangeFormValues}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="Margin"
                className="inputField"
                id="Margin"
                placeholder="Margin"
                type="text"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={formValues.Margin}
                onChange={hanldeChangeFormValues}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="Value Type"
                className="inputField"
                id="Value Type"
                placeholder="Value Type"
                type="text"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={formValues["Value Type"]}
                onChange={hanldeChangeFormValues}
              />
            </Grid>
            <Grid item xs={6}>
              <SelectField
                name="Status"
                label="Status"
                className="selectField"
                id="Status"
                placeholder="Status"
                value={formValues.Status}
                onChange={hanldeChangeFormValues}
                items={Status}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                className="addVehicleSwitch"
                control={
                  <Switch
                    checked={formValues.Rental}
                    onChange={hanldeChangeFormValues}
                    name="Rental"
                    color="primary"
                  />
                }
                label="Rental"
                labelPlacement="start"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                className="addVehicleSwitch"
                control={
                  <Switch
                    checked={formValues.Premium}
                    onChange={hanldeChangeFormValues}
                    name="Premium"
                    color="primary"
                  />
                }
                label="Premium"
                labelPlacement="start"
              />
            </Grid>
          </Grid>
          <DialogActions className="addVehicleFooter">
            <Button
              onClick={() => {
                setFormValues(defaultValues.formValues)
                handleToggle()
              }}
              color="primary"
            >
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}
