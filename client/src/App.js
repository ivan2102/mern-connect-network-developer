import React, { useEffect } from 'react'; 
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import  Navbar  from './components/Layout/Navbar';
import  Landing  from './components/Layout/Landing';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Alert from './components/Layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profileForms/CreateProfile';
import EditProfile from './components/profileForms/EditProfile';
import AddExperience from './components/profileForms/AddExperience';
import AddEducation from './components/profileForms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authAction';
import setAuthToken from './utils/setAuthToken';


if(localStorage.token) {

  setAuthToken(localStorage.token);
}

const App = () => {

   useEffect(() => {

    store.dispatch(loadUser());
      
   }, [])

  return (
    <Provider store={ store }>
    <Router>
    <React.Fragment>
      <Navbar />

      <Route exact path='/' component={ Landing } />

      <section className="container">

        <Alert />

        <Switch>

      <Route exact path='/login' component={ Login } />
      <Route exact path='/register' component={ Register } />
      <Route exact path='/profiles' component={ Profiles } />
      <Route exact path='/profile/:id' component={ Profile } />
      


      <PrivateRoute exact path='/dashboard' component={ Dashboard } />
      <PrivateRoute exact path='/create-profile' component={ CreateProfile } />
      <PrivateRoute exact path='/edit-profile' component={ EditProfile } />
      <PrivateRoute exact path='/add-experience' component={ AddExperience } />
      <PrivateRoute exact path='/add-education' component={ AddEducation } />
      <PrivateRoute exact path='/posts' component={ Posts } />
      <PrivateRoute exact path='/post/:id' component={ Post } />

      </Switch>

      </section> 
      
    </React.Fragment>
    </Router>
    </Provider>
  );
}

export default App;
