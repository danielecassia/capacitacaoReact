import './App.css';

import Cadastro from './componentes/cadastro/Cadastro';
import Login from './componentes/Login/Login';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App(props) {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/">
              <Cadastro/>
            </Route>
          </Switch>
        </Router>
    </div>
)
}