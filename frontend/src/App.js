import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
// import LoginFormPage from "./components/LoginFormModal";
import Navigation from './components/Navigation';
import UploadPhotos from './components/UploadPhotos';
import { restoreUser } from './store/session';




function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser())
      .then(() => setIsLoaded(true));
  }, [dispatch])


  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <UploadPhotos />
      {isLoaded && (
        <Switch>
       
        </Switch>
      )}
    </>
  )
}

export default App;
