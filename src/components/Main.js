/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React from 'react';
import {deepOrange500} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';

import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});

class Main extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleActive = this.handleActive.bind(this);
  }

  /**
   * 跳转tab
   * @param tab
   */
  handleActive(tab) {
    this.context.router.push(tab.props['data-route']);
  }

  render() {
    const style = {
      man:{marginBottom:'72px'},
      tabs: {
        position: 'fixed',
        width:'96%',
        bottom: 0
      }
    }
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            title="梅 花 盘"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          <div style={style.man} >
            {this.props.children}
          </div>
          <Tabs style={style.tabs}>
            <Tab
              icon={<FontIcon className="material-icons">monetization_on</FontIcon>}
              label="行情"
              data-route="/"
              onActive={this.handleActive}
            />
            <Tab
              icon={<FontIcon className="material-icons">account_box</FontIcon>}
              label="账户"
              data-route="/ucenter"
              onActive={this.handleActive}
            />
            <Tab
              icon={<FontIcon className="material-icons">explore</FontIcon>}
              label="数据"
              data-route="/news"
              onActive={this.handleActive}
            />
            <Tab
              icon={<FontIcon className="material-icons">help</FontIcon>}
              label="帮助"
              data-route="/help"
              onActive={this.handleActive}
            />
          </Tabs>
        </div>
      </MuiThemeProvider>
    );
  }
}
Main.contextTypes = {
  router: React.PropTypes.object.isRequired
}
export default Main;
