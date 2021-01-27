import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoginComponent from './components/LoginComponent/LoginComponent';
import RegisterComponent from './components/RegisterComponent/RegisterComponent';
import UserPanelPage from './pages/user';
import AdminPanelPage from './pages/admin';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/"><LoginComponent /></Route>
          <Route path="/register"><RegisterComponent /></Route>
          <Route path="/user-panel"><UserPanelPage /></Route>
          <Route path="/admin-panel"><AdminPanelPage /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
