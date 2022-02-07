import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';
import SplashPage from './components/SplashPage';
import BottomBar from './components/SplashPage/BottomBar';
import { restoreUser } from './store/session';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  // Temp:
  const session = useSelector(({ session }) => session);
  const user = session.user;

  useEffect(() => {
    dispatch(restoreUser())
      .then(() => setIsLoaded(true));
  }, [dispatch])


  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {/* <UploadPhotos /> */}
      {/* {user?.imageUrl && (
        <img
          style={{ width: "150px" }}
          src={user.imageUrl}
          alt="profile"
        />
      )} */}
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            {!user && <SplashPage />}
            {user && <Dashboard />}
          </Route>
          <Route>

          </Route>
        </Switch>
      )}
      <BottomBar />
    </>
  )
}

export default App;
