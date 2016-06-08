/**
 * Created by david_fang on 2016/6/7.
 */
import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
class Foot extends React.Component{
  render(){
    return (
      <Tabs>
        <Tab label="行情" icon={<FontIcon className="material-icons">monetization_on</FontIcon>} />
        <Tab label="账户" icon={<FontIcon className="material-icons">account_box</FontIcon>} />
        <Tab label="数据" icon={<FontIcon className="material-icons">explore</FontIcon>} />
        <Tab label="帮助" icon={<FontIcon className="material-icons">help</FontIcon>} />
      </Tabs>
    )
  }
}
export default Foot;
