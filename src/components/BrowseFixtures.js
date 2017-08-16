import React, {Component} from 'react'
import {Table} from 'semantic-ui-react'
import Loader from './Loader';
import dataStore from '../dataStore';

class BrowseFixtures extends Component {
  constructor(props) {
    super(props);
    this.state = {data: [], loading: true};
  }

  componentDidMount() {
    this.fetchFixtures(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    this.fetchFixtures(newProps.match.params.id)
  }


  fetchFixtures(id) {
    this.setState({loading: true});
    dataStore.fixtures(id)
      .then(response => {
        console.log(response);
        this.setState({
          data: response.data.fixtures,
          loading: false
        });
      })
  }

  renderHTScore(data) {
    if (typeof data.halfTime !== "undefined")
      return data.halfTime.goalsHomeTeam + ':' + data.halfTime.goalsAwayTeam;
  }

  renderFTScore(data) {
    if (data.goalsHomeTeam !== null)
      return data.goalsHomeTeam + ':' + data.goalsAwayTeam;
  }
  sortData(a, b) {
    if(a.matchday < b.matchday) return -1;
    if(a.matchday > b.matchday) return  1;
    if(a.date < b.date) return -1;
    if(a.date > b.date) return  1;
    return 0;
  }

  tableData() {
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center" rowSpan="2">Match Day</Table.HeaderCell>
            <Table.HeaderCell textAlign="center" rowSpan="2">Date</Table.HeaderCell>
            <Table.HeaderCell textAlign="center" rowSpan="2">Status</Table.HeaderCell>
            <Table.HeaderCell textAlign="center" rowSpan="2">Home Team</Table.HeaderCell>
            <Table.HeaderCell textAlign="center" rowSpan="2">Away Team</Table.HeaderCell>
            <Table.HeaderCell textAlign="center" colSpan="2">Score</Table.HeaderCell>
            <Table.HeaderCell textAlign="center" colSpan="3">Odds</Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell textAlign="center">HT</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">FT</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">1</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">X</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">2</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.state.data
            .sort(this.sortData)
            .map(row => {
              return (
                <Table.Row key={row.id}>
                  <Table.Cell textAlign="center">{row.matchday}</Table.Cell>
                  <Table.Cell textAlign="center">{row.date}</Table.Cell>
                  <Table.Cell textAlign="center">{row.status}</Table.Cell>
                  <Table.Cell textAlign="left">{row.homeTeamName}</Table.Cell>
                  <Table.Cell textAlign="left">{row.awayTeamName}</Table.Cell>
                  <Table.Cell textAlign="center">{this.renderHTScore(row.result)}</Table.Cell>
                  <Table.Cell textAlign="center">{this.renderFTScore(row.result)}</Table.Cell>
                  <Table.Cell textAlign="center">{row.odds && row.odds.homeWin.toFixed(2)}</Table.Cell>
                  <Table.Cell textAlign="center">{row.odds && row.odds.draw.toFixed(2)}</Table.Cell>
                  <Table.Cell textAlign="center">{row.odds && row.odds.awayWin.toFixed(2)}</Table.Cell>
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

export default BrowseFixtures;