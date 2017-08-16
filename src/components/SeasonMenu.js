import React from 'react'
import {Menu} from 'semantic-ui-react'
import {Route, Link} from 'react-router-dom'

const SeasonMenu = () => (
  <Menu pointing>
    <Menu.Item>Season Year:</Menu.Item>
    <Route path="/competitions/2017" children={({match}) => (
      <Link to="/competitions/2017">
        <Menu.Item name="2017/2018" active={!!match}>2017-2018</Menu.Item>
      </Link>
    )}/>
    <Route path="/competitions/2016" children={({match}) => (
      <Link to="/competitions/2016">
        <Menu.Item name="2016/2017" active={!!match}>2016-2017</Menu.Item>
      </Link>
    )}/>
    <Route path="/competitions/2015" children={({match}) => (
      <Link to="/competitions/2015">
        <Menu.Item name="2015/2016" active={!!match}>2015-2016</Menu.Item>
      </Link>
    )}/>
  </Menu>
);

export default SeasonMenu;