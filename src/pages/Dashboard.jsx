import { Route } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import EvaluatedAdd from './EvaluatedAdd';
import EvaluationAdd from './EvaluatedAdd';
import EvaluatedList from './EvaluatedList';
import EvaluationModelAdd from './EvaluationModelAdd';
import EvaluationModelList from './EvaluationModelList';
import ParamaterAdd from './ParamaterAdd';

export default function Dashboard() {

  return (
    <div className='dashboard'>
        <Grid>
        <Grid.Row> 
            <Grid.Column>
                <Route path="/HomePage/EvaluationModelList" component={EvaluationModelList} />
                <Route path="/HomePage/EvaluationModelAdd" component={EvaluationModelAdd} />
                <Route path="/HomePage/EvaluationAdd" component={EvaluationAdd} />
                <Route path="/HomePage/EvaluatedAdd" component={EvaluatedAdd} />
                <Route path="/HomePage/EvaluatedList" component={EvaluatedList} />
                <Route path="/HomePage/ParamaterAdd" component={ParamaterAdd} />
            </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}
