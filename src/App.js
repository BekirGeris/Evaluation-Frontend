import './App.css';
import Login from './pages/Login';
import { Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { Grid } from 'semantic-ui-react';

function App() {
  return (
    <div className="App">
      <Grid>
        <Grid.Row> 
            <Grid.Column>
                <Route exact path="/" component={Login} />
                <Route exact path="/Dashboard" component={Dashboard} />
            </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default App;