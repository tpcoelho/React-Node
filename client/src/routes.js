import Base from './components/Base.js';
import HomePage from './containers/HomePage.js';
import LoginPage from './containers/LoginPage.js';
import Auth from './modules/Auth';

const routes = {
  component: Base,
  childRoutes: [

    {
      path: '/',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, HomePage);
        } else if(location.location.query.name){
          Auth.authenticateUser(location.location.query.token)
          callback(null, HomePage);
        }else{
          callback(null, LoginPage);
        }
      }
    },

    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.deauthenticateUser();
        // change the current URL to /
        replace('/');
      }
    }
  ]
};

export default routes;