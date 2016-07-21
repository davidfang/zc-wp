/**
 * Created by david_fang on 2016/6/24.
 */
import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
class Ucenter extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return <div>账户中心
        <List>
        <Subheader>Nested List Items</Subheader>
        <ListItem primaryText="投资收益" leftIcon={<ContentSend />} />
        <ListItem primaryText="退出账户" leftIcon={<ContentDrafts />} />
        <ListItem
          primaryText="投资"
          leftIcon={<ContentInbox />}
          initiallyOpen={false}
          primaryTogglesNestedList={true}
          nestedItems={[
          <ListItem
            key={1}
            primaryText="Starred"
            leftIcon={<ActionGrade />}
          />,
          <ListItem
            key={2}
            primaryText="Sent Mail"
            leftIcon={<ContentSend />}
            disabled={true}
            nestedItems={[
              <ListItem key={1} primaryText="Drafts" leftIcon={<ContentDrafts />} />,
            ]}
          />,
        ]}
        />
      </List>
    </div>
  }
}
export default Ucenter;
