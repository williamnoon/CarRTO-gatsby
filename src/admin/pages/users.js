import React from "react"
import LayoutNavbar from "../components/layoutNavbar"
import AdminTable from "./../components/table"
import { miscutils } from "../../utils/miscutils"
import "./index.scss"

const { API } = process.env
export default class Users extends React.Component {
  state = { headCells: [], tableRows: [], loading: false, error: null }
  componentDidMount() {
    this.setState({ loading: true })
    this.fetchUsers("user/GetUsers").then(data => {
      let tempHeadCell = []
      for (const key in data[0]) {
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
      setTimeout(() => {
        this.setState({
          headCells: tempHeadCell,
          tableRows: data,
          loading: false,
        })
      }, 1000)
    })
  }
  fetchUsers = async path => {
    try {
      const response = await fetch(`${API}/${path}`)
      if (response.ok) {
        const json = await response.json()
        return json
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
