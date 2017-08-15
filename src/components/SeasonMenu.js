import React from 'react'
import {Menu} from 'semantic-ui-react'
import {Route, Link} from 'react-router-dom'

const SeasonMenu = () => (
  <Menu pointing>
    <Menu.Item>Season Year:</Menu.Item>
    <Route path="/competitions/2017" children={({match}) => (
      <Link to="/competitions/2017">
        <Menu.Item name="2017" active={!!match}/>
      </Link>
    )}/>
    <Route path="/competitions/2016" children={({match}) => (
      <Link to="/competitions/2016">
        <Menu.Item name="2016" active={!!match}/>
      </Link>
    )}/>
    <Route path="/competitions/2015" children={({match}) => (
      <Link to="/competitions/2015">
        <Menu.Item name="2015" active={!!match}/>
      </Link>
    )}/>
  </Menu>
);

export default SeasonMenu;