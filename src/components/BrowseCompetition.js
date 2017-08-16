import React, {Component} from 'react';
import {Table} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import Loader from './Loader';
import dataStore from '../dataStore';

class BrowseCompetition extends Component {
  constructor(props) {
    super(props);
    this.state = {data: [], loading: true};
  }

  componentDidMount() {
    this.fetchCompetitions(this.props.match.params.season);
  }

  componentWillReceiveProps(newProps) {
    this.fetchCompetitions(newProps.match.params.season)
  }


  fetchCompetitions(season) {
    this.setState({loading: true});
    dataStore.competitions(season)
      .then(response => {
        this.setState({
          data: response.data,
          loading: false
        });
      })
  }

  sortData(a, b) {
    return a.league < b.league ? -1 : 1;
  }

  tableData() {
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>League</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Teams</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Games</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Last Updated</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.state.data
            .sort(this.sortData)
            .map(row => {
              return (
                <Table.Row key={row.id}>
                  <Table.Cell>{row.caption}</Table.Cell>
                  <Table.Cell textAlign="center">
                    <Link to={`/teams/${row.id}`}>{row.numberOfTeams}</Link>
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <Link to={`/competitions/${row.id}/fixtures`}>{row.numberOfGames}</Link>
                  </Table.Cell>
                  <Table.Cell textAlign="center">{row.lastUpdated}</Table.Cell>
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

export default BrowseCompetition;