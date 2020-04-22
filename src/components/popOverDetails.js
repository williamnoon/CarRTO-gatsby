import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import MuiDialogTitle from "@material-ui/core/DialogTitle"
import MuiDialogContent from "@material-ui/core/DialogContent"
import MuiDialogActions from "@material-ui/core/DialogActions"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import Typography from "@material-ui/core/Typography"
import { miscutils } from "../utils/miscutils"

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
})

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions)

export default function PopOverDetails({
  open,
  handleToggle,
  color,
  selectVehicle,
  tabActive,
}) {
  return (
    <div>
      <Dialog
        onClose={handleToggle}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleToggle}>
          TAXES {"&"} FEES
        </DialogTitle>
        <div style={{ padding: 20 }}>
          <div className="body" style={{ paddingBottom: 10 }}>
            {tabActive === "rent" ? (
              <div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>VEHICLE LICENSE FEE</div>
                  <div className="amount-style">${miscutils.convertToCurrencyDecimalFormat(miscutils.Vehicle_License_Fee)}*</div>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>SALES TAX (8.0%)</div>
                  <div className="amount-style">
                    ${""}
                    {miscutils.calculateSaleTax(selectVehicle.totalRateCharge)}*
                  </div>
                </div>
              </div>
            ) : (
                <div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>TAX</div>
                    <div className="amount-style">
                      ${miscutils.calculateSaleTax(selectVehicle.Value)}*
                  </div>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>REGISTRATION</div>
                    <div className="amount-style">${miscutils.convertToCurrencyDecimalFormat(miscutils.registration)}*</div>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>TITLE</div>
                    <div className="amount-style">${miscutils.convertToCurrencyDecimalFormat(miscutils.title)}*</div>
                  </div>
                </div>
              )}
          </div>
          <div className="footer">
            <p style={{ opacity: 0.7, color: "#000" }}>
              * Rates, taxes, and fees do not reflect rates, taxes and fees
              applicable to non-included optional coverages or extras added
              later.
            </p>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
