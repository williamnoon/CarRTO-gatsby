import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
// import { navigate } from "gatsby"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import Button from "@material-ui/core/Button"
import TabReservationDialog from "./tabReservationDialog"
import Briefcasefilled from "./../assets/icons/briefcasefilled.svg"
import Userfilled from "./../assets/icons/userfilled.svg"
import ArrowDownIcon from "./../svgIcons/arrowDown"
import FeaturePriceDetailPopup from "./featurePriceDetailPopup"
import { miscutils } from "../utils/miscutils"
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: "4px",
    border: "1px solid #ccc",
    background: "#fff",
  },
  cardPriceRoot: { textAlign: "center", marginBottom: "10px" },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
  },
  image: {
    // width: 128,
    // height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
  },
  hrVertical: {
    width: "2px",
    height: "24px",
    background: "#b4371e",
    color: "#fff",
    margin: 0,
    padding: 0,
  },
  hrHorizontal: {
    background: "#b4371e",
    marginBottom: "0.35em",
    height: "2px",
    color: "#fff",
  },
  cardDetailMiddleSec: { alignItems: "flex-start" },
  middleSecInner: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  priceAndDetail: { cursor: "pointer" },
  payLaterHeading: { textAlign: "center", fontWeight: 700 },
  carCardSelectBtn: {
    color: "#fff",
    height: "40px",
    borderRadius: "0px",
  },
}))
const defaultCarImg =
  "https://app.navotarapp.com/api/VehicleTypeImages/default.png"
const secureImage = "http://app.navotarapp.com/Images/VehicleImages/889/"

export default function CarCardRent({
  color,
  vehicle = {},
  isSelectVehicle = false,
  tabActive,
  rideDetails,
  countDays,
  handleSearchVehicle,
}) {
  const classes = useStyles()

  const [isTabReservationDialog, setIsTabReservationDialog] = useState(false)
  const [isFeaturePriceDtlPopup, setIsFeaturePriceDtlPopup] = React.useState(
    false
  )
  const handleClickOnSelectBtn = vehicle => {
    // console.log(tabActive, "tabActive", vehicle)
    const userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"))
    if (tabActive === "rent") {
      setIsTabReservationDialog(true)
      // if (!userLoggedIn) {
      //   setIsLoginPopupOpen(true)
      // } else {
      //   handleResolved()
      // }
      // navigate("/reservation/#reservation", {
      //   state: {
      //     selectVehicle: vehicle,
      //     scrollToId: "reservation/#reservation",
      //     tabActive,
      //   },
      // })
    }
  }

  return (
    <div className={classes.root}>
      <TabReservationDialog
        open={isTabReservationDialog}
        handleToggle={() => {
          setIsTabReservationDialog(!isTabReservationDialog)
        }}
        tabActive={tabActive}
        handleResolved={() => {
          handleSearchVehicle()
        }}
        selectVehicle={vehicle}
        color={color}
        rideDetails={rideDetails}
        countDays={countDays}
      />
      <FeaturePriceDetailPopup
        open={isFeaturePriceDtlPopup}
        handleToggle={() => {
          setIsFeaturePriceDtlPopup(!isFeaturePriceDtlPopup)
        }}
        tabActive={tabActive}
        selectVehicle={vehicle}
        rideDetails={rideDetails}
        color={color}
        countDays={countDays}
      />
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item lg={4} md={4} sm={12}>
            <img
              className={classes.img}
              alt="complex"
              src={(() => {
                try {
                  return require(`./../assets/images/${vehicle.VIN}.png`)
                } catch (e) {
                  return defaultCarImg
                }
              })()}
            />
          </Grid>
          <Grid
            item
            lg={8}
            md={8}
            sm={12}
            container
            className="align-items-center"
          >
            <Grid
              item
              lg={6}
              sm={6}
              container
              direction="column"
              className={classes.cardDetailMiddleSec}
            >
              <Grid
                item
                md={12}
                className={classes.middleSecInner + " w-100 text-center"}
              >
                <Typography gutterBottom variant="h4" className="carCard">
                  {/* {vehicle.vehicleType} */}
                  {vehicle.Size}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {vehicle.Make + " " + vehicle.Model + " " + "or Similar"}
                </Typography>

                <Typography
                  variant="body2"
                  gutterBottom
                  className="carCarryDetail"
                  style={{
                    fontSize: "0.875rem !important",
                    fontWeight: "lighter !important",
                  }}
                >
                  <span>Automatic</span>
                  <span className="people-parent">
                    <img
                      src={Userfilled}
                      alt="people"
                      height={15}
                      width={15}
                      style={{}}
                      className="people"
                    />
                    <span>{vehicle.Seats}</span>
                  </span>
                  <span className="briefcase-parent">
                    <img
                      src={Briefcasefilled}
                      alt="briefcase"
                      height={15}
                      width={15}
                      style={{}}
                      className="briefcase"
                    />
                    <span>{vehicle.Bags}</span>
                  </span>
                </Typography>
                <Typography
                  variant="body2"
                  color="inherit"
                  className={classes.priceAndDetail}
                  style={{
                    color: color,
                  }}
                  gutterBottom
                  onClick={() => {
                    setIsFeaturePriceDtlPopup(true)
                  }}
                >
                  <ArrowDownIcon
                    // color={"red"}
                    fill={color}
                    height={16}
                    width={16}
                  />
                  <span className="featurePriceDetail">
                    FEATURES {"&"} PRICE DETAILS
                  </span>
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              lg={6}
              sm={6}
              container
              direction="column"
              className="mt-md-0 mt-3"
            >
              <Grid item md={12}>
                <Typography
                  gutterBottom
                  className={classes.payLaterHeading}
                  variant="h6"
                >
                  {vehicle.category !== "ForSale"
                    ? "Pay Later"
                    : "Buy Now Price"}
                </Typography>
                <Divider variant="middle" className={classes.hrHorizontal} />
                <Grid
                  container
                  item
                  xs
                  className={classes.cardPriceRoot + " paylaterGrid"}
                >
                  <Grid item xs>
                    <Typography gutterBottom variant="h4">
                      {`$${miscutils.convertToCurrencyDecimalFormat(
                        vehicle.rate
                      )}`}
                    </Typography>
                    {tabActive === "trade" && (
                      <Typography variant="h6">
                        {" "}
                        <b>Less trade</b>
                      </Typography>
                    )}
                    {vehicle.category !== "ForSale" && (
                      <Typography variant="subtitle1">
                        <b>per day</b>
                      </Typography>
                    )}
                  </Grid>
                  <Divider
                    orientation="vertical"
                    variant="middle"
                    className={classes.hrVertical}
                  />
                  <Grid item xs>
                    {vehicle.category !== "ForSale" ? (
                      <Typography gutterBottom variant="h4">
                        {`$${miscutils.Rental_Total(vehicle.totalRateCharge)}`}
                      </Typography>
                    ) : (
                      <Typography gutterBottom variant="body2 middle">
                        <b>full amount due upon delivery no financing</b>
                      </Typography>
                    )}

                    {vehicle.category !== "ForSale" && (
                      <Typography variant="subtitle1">
                        <b>total</b>
                      </Typography>
                    )}
                  </Grid>
                </Grid>
                {vehicle.category === "ForSale" && (
                  <Typography
                    gutterBottom
                    className={classes.payLaterHeading}
                    variant="h6"
                  >
                    +taxes, title and registration
                  </Typography>
                )}
                {!isSelectVehicle && (
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={() => {
                      handleClickOnSelectBtn(vehicle)
                    }}
                    className={classes.carCardSelectBtn}
                    style={{ background: color }}
                    fullWidth
                  >
                    SELECT
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}
