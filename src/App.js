import './App.css';
import Login from './pages/Login';
import { Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { Grid } from 'semantic-ui-react';
import HomePage from './pages/HomePage';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ToastContainer 
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover/>

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