import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import Button from "@material-ui/core/Button"
import TabDialogTradeOwn from "./tabDialogTradeOwn"
import ArrowDownIcon from "./../svgIcons/arrowDown"
import FeaturePriceDetailPopup from "./featurePriceDetailPopup"
import CurrencyFormat from "react-currency-format"
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: "4px",
    border: "1px solid #ccc",
    background: "#fff",
  },
  cardPriceRoot: {
    textAlign: "center",
    marginBottom: "10px",
    alignItems: "center",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
  },
  image: {},
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
  },
  hrVertical: {
    width: "2px",
    height: "4rem",
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
  totalCost: {
    marginBottom: 0,
    fontSize: "2rem !important",
  },
}))
const defaultCarImg =
  "https://app.navotarapp.com/api/VehicleTypeImages/default.png"
const secureImage = "http://app.navotarapp.com/Images/VehicleImages/889/"

export default function CarCardTradeOwn({
  color,
  vehicle = {},
  tabActive,
  isSelectVehicle = false,
  tradeFormValues = {},
}) {
  const [isConfirmVehicleDialog, setIsConfirmVehicleDialog] = useState(false)
  const [isFeaturePriceDtlPopup, setIsFeaturePriceDtlPopup] = React.useState(
    false
  )
  const handleClickOnSelectBtn = vehicle => {
    if (tabActive === "trade") {
      setIsConfirmVehicleDialog(true)
    } else if (tabActive === "own") {
      setIsConfirmVehicleDialog(true)
    }
  }

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <TabDialogTradeOwn
        open={isConfirmVehicleDialog}
        handleToggle={() => {
          setIsConfirmVehicleDialog(!isConfirmVehicleDialog)
        }}
        tabActive={tabActive}
        handleResolved={() => {}}
        selectVehicle={vehicle}
        values={tradeFormValues}
        tradeFormValues={tradeFormValues}
        color={color}
      />
      <FeaturePriceDetailPopup
        open={isFeaturePriceDtlPopup}
        handleToggle={() => {
          setIsFeaturePriceDtlPopup(!isFeaturePriceDtlPopup)
        }}
        tabActive={tabActive}
        selectVehicle={vehicle}
        color={color}
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
                  {`${vehicle.Year} ${vehicle.Make} ${vehicle.Model}`}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {`Miles: ${vehicle.Miles}`}
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
                  <ArrowDownIcon fill={color} height={16} width={16} />
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
                  {"Buy Now Price"}
                </Typography>
                <Divider variant="middle" className={classes.hrHorizontal} />
                <Grid container item xs className={classes.cardPriceRoot}>
                  <Grid item xs>
                    <Typography
                      gutterBottom
                      variant="h4"
                      className={classes.totalCost}
                    >
                      {
                        <CurrencyFormat
                          value={vehicle.Value}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                          // decimalScale={2}
                          // fixedDecimalScale={true}
                        />
                      }
                    </Typography>
                    {tabActive === "trade" && (
                      <Typography variant="h6">
                        <b>Less trade</b>
                      </Typography>
                    )}
                  </Grid>
                  <Divider
                    orientation="vertical"
                    variant="middle"
                    className={classes.hrVertical}
                  />
                  <Grid item xs>
                    <Typography gutterBottom variant="body2" className="middle">
                      <b>full amount due upon delivery no financing</b>
                    </Typography>
                  </Grid>
                </Grid>
                <Typography
                  gutterBottom
                  className={classes.payLaterHeading + " text-small"}
                  variant="h6"
                >
                  +taxes, title and registration
                </Typography>
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
