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
    this.fetchTeams(this.props.match.params.competition);
  }

  componentWillReceiveProps(newProps) {
    this.fetchTeams(newProps.match.params.competition)
  }


  fetchTeams(competition) {
    this.setState({loading: true});
    dataStore.teams(competition)
      .then(response => {
        console.log(response);
        this.setState({
          data: response.data.teams,
          loading: false
        });
      })
  }

  tableData() {
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Crest</Table.HeaderCell>
            <Table.HeaderCell>Short Name</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.state.data
            .map(row => {
              return (
                <Table.Row key={row.name}>
                  <Table.Cell textAlign="center"><img src={row.crestUrl} width={30}/></Table.Cell>
                  <Table.Cell>{row.shortName}</Table.Cell>
                  <Table.Cell>{row.name}</Table.Cell>
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