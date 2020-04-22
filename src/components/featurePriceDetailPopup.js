import React, { useState } from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import Slide from "@material-ui/core/Slide"
import ArrowUpIcon from "./../svgIcons/arrowUp"
import "../assets/scss/main.scss"
import PopOverDetails from "./popOverDetails"
import { miscutils } from "../utils/miscutils"
import CurrencyFormat from "react-currency-format"
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})

export default function FeaturePriceDetailPopup({
  open,
  handleToggle,
  tabActive,
  selectVehicle,
  color,
  countDays,
}) {
  const [isTaxFeeDetailShow, setIsTaxFeeDetailShow] = useState(false)

  let feature =
    Object.keys(selectVehicle).length &&
    (tabActive === "rent"
      ? selectVehicle.Features.split(",").slice(0, 6)
      : selectVehicle.Features.split(","))
  return (
    <div className="featurePriceDetailPopupRoot">
      <PopOverDetails
        open={isTaxFeeDetailShow}
        handleToggle={() => {
          setIsTaxFeeDetailShow(false)
        }}
        color={color}
        selectVehicle={selectVehicle}
        tabActive={tabActive}
      />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleToggle}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <span onClick={handleToggle} style={{ cursor: "pointer" }}>
            <ArrowUpIcon width={22} height={22} fill={color} color={color} />
          </span>
          <span style={{ color: color, marginLeft: 8 }}>
            FEATURES {"&"} PRICE DETAILS
          </span>
        </DialogTitle>
        <DialogContent>
          <div className="vehicleFeature-body">
            <div>
              <h5 style={{ fontWeight: "bold" }}>Vehicle Features</h5>
              <ul>
                {selectVehicle &&
                  feature.map((feature, index) => (
                    <li key={feature + index}>{feature}</li>
                  ))}
              </ul>
            </div>
            <div
              className="vehicleFeatureRow-item"
              style={{ paddingBottom: 10 }}
            >
              <h5 style={{ fontWeight: "bold" }}>Price Details</h5>
              {tabActive === "rent" ? (
                <div className="vehicleFeatureRow">
                  <div>{`${countDays} DAY(S)`}</div>
                  <div className="amount-style">
                    $
                    {miscutils.convertToCurrencyDecimalFormat(
                      countDays * selectVehicle.rate
                    )}
                  </div>
                </div>
              ) : (
                <div className="vehicleFeatureRow">
                  <div>Price</div>
                  <div className="amount-style">
                    {
                      <CurrencyFormat
                        value={selectVehicle.Value}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                        decimalScale={2}
                        fixedDecimalScale={true}
                      />
                    }
                  </div>
                </div>
              )}
              {tabActive === "rent" && (
                <div className="vehicleFeatureRow">
                  <div>UNLIMITED MILEAGE</div>
                  <div className="amount-style">Included</div>
                </div>
              )}

              {tabActive === "rent" ? (
                <div className="vehicleFeatureRow">
                  <div
                    style={{ color: color }}
                    onClick={() => {
                      setIsTaxFeeDetailShow(true)
                    }}
                  >
                    TAX {"&"} FEE DETAILS
                  </div>
                  <div className="amount-style">
                    ${""}
                    {miscutils.calculateTaxFeeDetail(
                      selectVehicle.totalRateCharge
                    )}
                    *
                  </div>
                </div>
              ) : (
                <div className="vehicleFeatureRow">
                  <div
                    style={{ color: color }}
                    onClick={() => {
                      setIsTaxFeeDetailShow(true)
                    }}
                  >
                    +TAX, TITLE AND REGISTRATION
                  </div>

                  <div className="amount-style">
                    ${""}
                    {miscutils.calculatedTaxTitleRegistration(
                      selectVehicle.Value
                    )}
                  </div>
                </div>
              )}

              <hr />
              <div className="vehicleFeatureRow" style={{}}>
                <div>ESTIMATED TOTAL</div>
                <div className="amount-style" style={{ letterSpacing: 1 }}>
                  {tabActive === "rent" ? (
                    `$${miscutils.Rental_Total(selectVehicle.totalRateCharge)}*`
                  ) : (
                    <CurrencyFormat
                      value={miscutils.calculatedTradeOwnTotal(
                        selectVehicle.Value
                      )}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                      decimalScale={2}
                      fixedDecimalScale={true}
                    />
                  )}
                </div>
              </div>
            </div>
            <div>
              <p style={{ opacity: 0.7, color: "#000" }}>
                * Rates, taxes, and fees do not reflect rates, taxes and fees
                applicable to non-included optional coverages or extras added
                later.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
