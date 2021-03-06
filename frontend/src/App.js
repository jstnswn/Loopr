import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Explore from './components/Explore';
import Navigation from './components/Navigation';
import SplashPage from './components/SplashPage';
import BottomBar from './components/SplashPage/BottomBar';
import { restoreUser, toggleTheme } from './store/session';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  // Temp:
  const history = useHistory();
  const session = useSelector(({ session }) => session);
  const user = session.user;


  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') dispatch(toggleTheme())
    dispatch(restoreUser())
      .then(() => setIsLoaded(true));
  }, [dispatch])


  useEffect(() => {
    if (user) {
      history.push('/dashboard/photostream');
    } else history.push('/')
  }, [user, history])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            {!user && <SplashPage />}
            {user && <Dashboard />}
          </Route>
          <Route path='/explore'>
            <Explore />
          </Route>
          <Route path='/dashboard'>
            {user && <Dashboard />}
          </Route>
          <Route>
            <h2>Page Not Found</h2>
          </Route>
        </Switch>
      )}
      <BottomBar />
    </>
  )
}

export default App;
