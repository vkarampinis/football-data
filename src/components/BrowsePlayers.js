import React, {Component} from 'react'
import {Table} from 'semantic-ui-react'
import Loader from './Loader';
import dataStore from '../dataStore';

class BrowseTeams extends Component {
  constructor(props) {
    super(props);
    this.state = {data: [], loading: true};
  }

  componentDidMount() {
    this.fetchPlayers(this.props.match.params.team_id);
  }

  componentWillReceiveProps(newProps) {
    this.fetchPlayers(newProps.match.params.team_id)
  }


  fetchPlayers(id) {
    this.setState({loading: true});
    dataStore.players(id)
      .then(response => {
        this.setState({
          data: response.data.players,
          loading: false
        });
      })
  }

  tableData() {
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center">Number</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Position</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Nationality</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Birth</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Contract Until</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.state.data
            .map(row => {
              return (
                <Table.Row key={row.name}>
                  <Table.Cell textAlign="center">{row.jerseyNumber}</Table.Cell>
                  <Table.Cell>{row.name}</Table.Cell>
                  <Table.Cell textAlign="center">{row.position}</Table.Cell>
                  <Table.Cell textAlign="center">{row.nationality}</Table.Cell>
                  <Table.Cell textAlign="center">{row.dateOfBirth}</Table.Cell>
                  <Table.Cell textAlign="center">{row.contractUntil}</Table.Cell>
                </Table.Row>
              )
            })}
        </Table.Body>
      </Table>)
  }

  render() {
    return (
      <div>
        { this.state.loading ? <Loader/> : this.tableData() }
      </div>
    )
  }
}

export default BrowseTeams;