/**
 * Created by david_fang on 2016/6/7.
 */
import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
class Foot extends React.Component{
  render(){
    return (
      <Tabs>
        <Tab icon={<FontIcon className="muidocs-icon-action-home" />} />
        <Tab icon={<ActionFlightTakeoff />} />
        <Tab icon={<FontIcon className="material-icons">favorite</FontIcon>} />
      </Tabs>
    )
  }
}
export default Foot;
