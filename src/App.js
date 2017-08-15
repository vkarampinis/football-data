import React, {Component} from 'react';
import {Container, Grid, Header} from 'semantic-ui-react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import SeasonMenu from './components/SeasonMenu'
import BrowseCompetition from './components/BrowseCompetition'

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Container style={{padding: '5em 0em'}}>
            <Header as='h2' dividing>Football Stats</Header>
            <Grid columns={1} stackable>
              <Grid.Column>
                <SeasonMenu/>
              </Grid.Column>
            </Grid>
            <Grid columns={1} stackable>
              <Grid.Column>
                <Route exact path="/competitions/:season" component={BrowseCompetition}/>
              </Grid.Column>
            </Grid>
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
