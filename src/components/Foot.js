/**
 * Created by david_fang on 2016/6/7.
 */
import React from 'react';
import {Router, Route, Link, IndexLink} from 'react-router'
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
class Foot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.location.pathname
    };
  }

  

  render() {
    let style = {
      tabs: {
        width: '100%',
        backgroundColor: '#00bcd4',
        whiteSpace: 'nowrap'
      },
      active: {
        //left: '0%',
        width: '25%',
        bottom: '0px',
        //display: 'block',
        height: '2px',
        marginTop: '-2px',
        position: 'relative',
        transition: 'left 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        backgroundColor: 'rgb(255, 64, 129)'
      }
    }
    return (
      <div style={style.tabs} value={this.state.value} >
        <IndexLink to="/" style={{width:"25%"}} activeStyle={style.active} >
          <Tab value="/" style={{width:"25%"}} label="行情"
               icon={<FontIcon className="material-icons">monetization_on</FontIcon>}/>

        </IndexLink>
        <Link to="/ucenter" style={{width:"25%"}} activeStyle={style.active}><Tab value="/ucenter" style={{width:"25%"}} label="账户"
                                                       icon={<FontIcon className="material-icons">account_box</FontIcon>}/>

        </Link>
        <Link to="/news" style={{width:"25%"}} activeStyle={style.active}><Tab value="/news" style={{width:"25%"}} label="数据"
                                                    icon={<FontIcon className="material-icons">explore</FontIcon>}/>

        </Link>
        <Link to="/help" style={{width:"25%"}} activeStyle={style.active}><Tab value="/help" style={{width:"25%"}} label="帮助"
                                                    icon={<FontIcon className="material-icons">help</FontIcon>}/>

        </Link>
      </div>
    )
  }
}
export default Foot;
