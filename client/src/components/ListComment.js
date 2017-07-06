import React, { PropTypes } from 'react';
import {ListItem} from 'material-ui/List';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

const propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  time: PropTypes.string,
  autor: PropTypes.string
};


class ListComment extends React.Component {

  render() {
    const { id, text, time, autor } = this.props;
    return (
    	<div className="commentDiv">
    	 <ListItem
          primaryText={text}
          secondaryText= {<p> Create at {time} by {autor}</p>}
          leftIcon={<CommunicationChatBubble />}
        />
      </div>
    );
  }
}

ListComment.PropTypes = propTypes;

export default ListComment;