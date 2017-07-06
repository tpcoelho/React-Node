import React, { PropTypes } from 'react';

import Auth from '../modules/Auth';
import Login from '../components/Login.js';


class LoginPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

  }

  /**
   * Render the component.
   */
  render() {
    return (<Login />);
  }

}

export default LoginPage;