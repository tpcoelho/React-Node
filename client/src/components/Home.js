import React, { PropTypes } from 'react';

import { Card, CardTitle, CardText } from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';

// const listClass = 'list-item card ${view}';
// const style = { zIndex: 100 - this.props.index};

const style = {
  margin: 12,
};
const Home = ({
	renderListStories,
	selectedSerie,
	selectSeries}) => (
  <div>
		<Card className="container">
	    <CardTitle
	      title="Hacker News Example"
	      subtitle="You should get access to this page only after authentication."
	    />
	  </Card>
	 	<div className="listDiv">
	      <List>
	       	{renderListStories}
	      </List>
	  </div>
	  <div className="text-center">
		  <RaisedButton label="1" primary={true} style={style} disabled={selectedSerie === '1'} onTouchTap={selectSeries}/>
		  <RaisedButton label="2" primary={true} style={style} disabled={selectedSerie === '2'} onTouchTap={selectSeries}/>
		  <RaisedButton label="3" primary={true} style={style} disabled={selectedSerie === '3'} onTouchTap={selectSeries}/>
		  <RaisedButton label="4" primary={true} style={style} disabled={selectedSerie === '4'} onTouchTap={selectSeries}/>
		  <RaisedButton label="5" primary={true} style={style} disabled={selectedSerie === '5'} onTouchTap={selectSeries}/>
	  </div>
  </div>

);

Home.propTypes = {
	renderListStories: PropTypes.array.isRequired,
	selectedSerie: PropTypes.string,
	selectSeries: PropTypes.func
};
export default Home;