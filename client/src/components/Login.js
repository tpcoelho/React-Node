import React, { PropTypes } from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

const styles = {
  button: {
    margin: 12,
  }
};

const Login = () => (
  <Card className="container">
    <CardTitle title="Hacker News Example" subtitle="Use your github account to log in." />
      <div>
       <RaisedButton
          href="/auth/github"
          label="Sign in with Github"
          style={styles.button}
          icon={<FontIcon className="muidocs-icon-custom-github" />}
        />
      </div>
  </Card> 
);

export default Login;