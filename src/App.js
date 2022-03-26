import './App.css';
import Login from './pages/Login';
import { Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { Grid } from 'semantic-ui-react';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <Grid>
        <Grid.Row> 
            <Grid.Column>
                <Route exact path="/" component={Login} />
                <Route path="/HomePage" component={HomePage} />
            </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default App;