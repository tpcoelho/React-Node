import React, { PropTypes } from 'react';
import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

const propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  score: PropTypes.string,
  numberComment: PropTypes.string,
  time: PropTypes.string,
  autor: PropTypes.string,
  url: PropTypes.string
};


class ListStory extends React.Component {

  render() {
    const { id, title, score, numberComment, time, autor, url } = this.props;
    return (
    	<div>
    	 <ListItem
          primaryText={title}
          secondaryText= {<p>{score} point | {numberComment} comments | create at {time} by {autor}</p>}
          // rightIcon={<CommunicationChatBubble />}
          nestedItems={this.props.nastedComment}
          onTouchTap={this.props.clickHandler}
          onNestedListToggle={this.props.filterComment}
        />
        <Divider inset={true} />
      </div>
    );
  }
}

ListStory.PropTypes = propTypes;

export default ListStory;