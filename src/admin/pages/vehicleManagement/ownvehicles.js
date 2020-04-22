import React from "react"
import LayoutNavbar from "../../components/layoutNavbar"
import AdminTable from "./../../components/table"
import { miscutils } from "../../../utils/miscutils"
import "./../index.scss"
const { API } = process.env

export default class OwnVehicles extends React.Component {
  state = { headCells: [], tableRows: [], loading: false, error: null }
  componentDidMount() {
    this.setState({ loading: true })
    this.fetchUsers("Vehicle/GetAllVehicles").then(data => {
      let filterBuyVehicle = data.filter(item => {
        return item.Status === "Service" || item.Status === "Available"
      })
      let tempHeadCell = []
      for (const key in filterBuyVehicle[0]) {
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
      filterBuyVehicle.forEach(row => {
        tableRowList = [...tableRowList, { ...row }]
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
        item.id === "VIN" ||
        item.id === "Make" ||
        item.id === "Model" ||
        item.id === "Color" ||
        item.id === "Size" ||
        item.id === "Seats" ||
        item.id === "Bags" ||
        item.id === "Status" ||
        item.id === "Value" ||
        item.id === "Features" ||
        item.id === "Year"
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
    const { headCells, tableRows, loading } = this.state
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
