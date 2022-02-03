import LoginFormPage from "./components/LoginFormPage";

const { Switch, Route } = require("react-router-dom");


function App() {
  return (
    <Switch>
      <Route path='/login'>
        <LoginFormPage />
      </Route>
    </Switch>
  );
}

export default App;
