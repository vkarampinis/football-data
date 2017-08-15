import React, {Component} from 'react'
import {Table, Dimmer, Loader, Segment} from 'semantic-ui-react'
import dataStore from '../dataStore';

class BrowseCompetition extends Component {
  constructor(props) {
    super(props);
    this.state = {data: [], loading: true};
    console.log(props)
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

  loader() {
    return (
      <Segment style={{padding: '5em 0em'}}>
        <Dimmer active inverted>
          <Loader inverted>Fetching Data...</Loader>
        </Dimmer>
      </Segment>
    )
  }

  tableData() {
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>League</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Number of Teams</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Number of Games</Table.HeaderCell>
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
                  <Table.Cell textAlign="center">{row.numberOfTeams}</Table.Cell>
                  <Table.Cell textAlign="center">{row.numberOfGames}</Table.Cell>
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
        { this.state.loading ? this.loader() : this.tableData() }
      </div>
    )
  }
}

export default BrowseCompetition;