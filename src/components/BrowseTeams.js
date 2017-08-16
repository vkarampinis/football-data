import React, {Component} from 'react'
import {Table} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
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
        this.setState({
          data: response.data.teams,
          loading: false
        });
      })
  }

  getPlayersLink(str) {
    const regex = /teams\/(\d+)\/players/g;

    let m;

    m = regex.exec(str);

    if (m[1]) {
      return `/teams/${m[1]}/players`;
    }
  }


  tableData() {
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Crest</Table.HeaderCell>
            <Table.HeaderCell>Short Name</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>View</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.state.data
            .map(row => {
              return (
                <Table.Row key={row.name}>
                  <Table.Cell textAlign="center"><img src={row.crestUrl} alt={row.name} width={30}/></Table.Cell>
                  <Table.Cell>{row.shortName}</Table.Cell>
                  <Table.Cell>{row.name}</Table.Cell>
                  <Table.Cell textAlign="center">
                    <Link to={this.getPlayersLink(row._links.players.href)}>Players</Link>
                  </Table.Cell>
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