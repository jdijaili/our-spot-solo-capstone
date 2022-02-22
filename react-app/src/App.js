import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import HomeView from './components/HomeView/HomeView';
import Footer from './components/Footer/Footer';
import ParkView from './components/ParksView/ParksView';
import ParkDetailView from './components/ParkDetailView/ParkDetailView';
import ListDetailView from './components/ListDetailView/ListDetailView';
import ListBrowseView from './components/ListBrowseView/ListBrowseView';
import PageNotFound from './components/PageNotFound/PageNotFound';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>

        <Route path='/parks' exact={true}>
          <ParkView />
        </Route>

        <Route path='/parks/:parkId' exact={true}>
          <ParkDetailView />
        </Route>

        <ProtectedRoute path='/lists/user/:userId' exact={true}>
          <ListBrowseView />
        </ProtectedRoute>

        <ProtectedRoute path='/lists/:listId' exact={true}>
          <ListDetailView />
        </ProtectedRoute>

        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <HomeView />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
