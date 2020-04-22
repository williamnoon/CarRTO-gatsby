import React from "react"
import LayoutNavbar from "../components/layoutNavbar"
import AdminTable from "./../components/table"
import { miscutils } from "../../utils/miscutils"
import moment from "moment"
import "./index.scss"

const { API } = process.env
export default class Reservations extends React.Component {
  state = { headCells: [], tableRows: [], loading: false, error: null }
  componentDidMount() {
    this.setState({ loading: true })
    this.fetchUsers("Reservation/GetReservation").then(data => {
      let tempHeadCell = []
      for (const key in data[0].vehicleDetails) {
        if (key !== "_id" && key !== "__v") {
          tempHeadCell = [
            ...tempHeadCell,
            {
              id: key,
              numeric: false,
              disablePadding: true,
              label: miscutils.capitalizeFirstLetter(key),
            },
          ]
        }
      }
      for (const key in data[0].clientDetails) {
        if (key !== "_id" && key !== "__v") {
          tempHeadCell = [
            ...tempHeadCell,
            {
              id: key,
              numeric: false,
              disablePadding: true,
              label: miscutils.capitalizeFirstLetter(key),
            },
          ]
        }
      }
      let transformHeadCell = this.handleTransformDateIntoTableRow(tempHeadCell)
      let tableRowList = []
      data.forEach(row => {
        tableRowList = [
          ...tableRowList,
          {
            ...row.clientDetails,
            ...row.vehicleDetails,
            startDate: moment(row.vehicleDetails.startDate).format(
              "MMM-D-YYYY, h:mm a"
            ),
            endDate: moment(row.vehicleDetails.endDate).format(
              "MMM-D-YYYY, h:mm a"
            ),
          },
        ]
      })
      setTimeout(() => {
        this.setState({
          headCells: transformHeadCell,
          tableRows: tableRowList,
          loading: false,
        })
      }, 1000)
    })
  }
  handleTransformDateIntoTableRow = list => {
    let newHeadCell = []
    list.forEach(item => {
      if (
        item.id === "name" ||
        item.id === "VIN" ||
        item.id === "Make" ||
        item.id === "Model" ||
        item.id === "Color" ||
        item.id === "Size" ||
        item.id === "Seats" ||
        item.id === "Bags" ||
        item.id === "startDate" ||
        item.id === "endDate" ||
        item.id === "rate" ||
        item.id === "totalRateCharge"
      ) {
        newHeadCell = [...newHeadCell, item]
      }
    })
    return newHeadCell
  }
  fetchUsers = async path => {
    try {
      const response = await fetch(`${API}/${path}`)
      if (response.ok) {
        const json = await response.json()
        const { data } = json
        return data
      } else {
        throw new Error("Something went wrong ...")
      }
    } catch (error) {
      setTimeout(() => {
        this.setState({ error, loading: false })
      }, 1000)
    }
  }

  render() {
    const { headCells, tableRows, loading, error } = this.state
    return (
      <LayoutNavbar>
        <AdminTable
          headCells={headCells}
          tableRows={tableRows}
          loading={loading}
          location={this.props.location}
        />
      </LayoutNavbar>
    )
  }
}
