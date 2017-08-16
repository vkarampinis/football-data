import React from 'react'
import {Divider, Header} from 'semantic-ui-react'

const SeasonMenu = () => (
  <div>
    <Divider/>
    <Header as='h5' color='grey' textAlign='center'>
      This page was created with ❤ and some frozen 🍺.<br/>
      Fill free to <a href="https://github.com/vkarampinis/football-stats" target="_blank">fork</a>, hack and learn! <br/>
      All data provided by open API from <a href="http://football-data.org" target="_blank">football-data.org</a>
    </Header>
  </div>
);

export default SeasonMenu;