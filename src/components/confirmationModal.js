import React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Slide from "@material-ui/core/Slide"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function ConfirmationModal({
  open,
  handleToggle,
  handleVerifyResolved,
}) {
  const handleClose = () => {
    handleToggle(false)
  }
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Are you sure want to confirm?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            style={{ color: "#000" }}
          >
            If you want to edit your trade Information.
            <br />
            Click on Cancel
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: "#000" }}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleVerifyResolved()
              handleClose()
            }}
            style={{ color: "#000" }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
