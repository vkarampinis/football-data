import React from 'react';
import {Dimmer, Loader as SLoader, Segment} from 'semantic-ui-react'

const Loader = () => {
  return (
    <Segment style={{padding: '5em 0em'}}>
      <Dimmer active inverted>
        <SLoader inverted>Fetching Data...</SLoader>
      </Dimmer>
    </Segment>
  )
};

export default Loader;