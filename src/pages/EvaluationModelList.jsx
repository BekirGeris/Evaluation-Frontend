import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Card, CardGroup, Header, Icon, Image, Menu, Table } from 'semantic-ui-react';
import EvaluationModelsService from '../services/EvaluationModelsService';
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';

export default function EvaluationModelList() {

    const history = useHistory()
    const [evaluationModels, setEvaluationModels] = useState([])
    const [cookies, setCookie] = useCookies(['user']);

    useEffect(() => {
      let evaluationModelsService  = new EvaluationModelsService();
        evaluationModelsService.getEvaluationModelsByUserId(Cookies.get("UserId")).then(result => {
          setEvaluationModels(result.data.data);
        });
    }, [])

    function goEvaluate(evaluationModelId) {
      setCookie('evaluationModelId', evaluationModelId, { path: '/' });
      history.push("/HomePage/EvaluatedAdd")
    }

    function goEvaluated(evaluationModelId) {
      setCookie('evaluationModelId', evaluationModelId, { path: '/' });
      history.push("/HomePage/EvaluatedList")
    }

  
  return (
  <div>
  <Card.Group>
          {
              evaluationModels.map(evaluationModel => (
                  <div className='card' key={evaluationModel.evaluationModelId}>
                          <Card>
                            <Card.Content>
                              <Image
                                floated='right'
                                size='mini'
                                src= {getSrc(evaluationModel.evaluationModelId)}
                              />
                              <Card.Header>
                                  <Header as="h1">
                                  {evaluationModel.evaluationModelName}
                                  </Header>
                                </Card.Header>
                              <Card.Description>
                                <p>
                                {evaluationModel.decs}
                                </p>
                                <p></p>
                              </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                              <div className='ui two buttons'>
                                <Button inverted onClick={() => { goEvaluate(evaluationModel.evaluationModelId) }} color='green'>
                                  Evaluate
                                </Button>
                                <Button inverted onClick={() => { goEvaluated(evaluationModel.evaluationModelId) }} color='blue'>
                                  Evaluated
                                </Button>
                              </div>
                            </Card.Content>
                          </Card>
                  </div>
              ))
          }
            <Card onClick={() => { history.push("/HomePage/EvaluationModelAdd") }}>
              <Card.Content textAlign='center'>
                  <Image
                      size='small'
                      src="https://cdn.pixabay.com/photo/2017/03/19/03/51/material-icon-2155448_1280.png"
                    />
              </Card.Content>
              <Card.Content>
                <div className='ui two buttons'>
                  <Button type="submit"  inverted color='green'>
                     Create Evaluation Model
                  </Button>
                </div>
              </Card.Content>
            </Card>
</Card.Group>
  </div>
)
}

const getSrc = function(id) {
  const number = id % 6 + 1;
  if(number === 1){
    return "https://cdn1.iconfinder.com/data/icons/ui-5/502/file-512.png";
  }else if(number === 2){
    return "https://www.kindpng.com/picc/m/160-1608792_circle-document-icon-png-transparent-png.png";
  }else if(number === 3){
    return "https://www.clipartmax.com/png/small/108-1081403_assessment-conclusion-icon-png.png";
  }else if(number === 4){
    return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk-YYDyl4barIJhxcgbiFY8qjRcIq42ICqPw&usqp=CAU";
  }else if(number === 5){
    return "https://www.clipartmax.com/png/small/339-3398172_contract-free-business-icons-customer-clip-art-customer-document-flat-icon-png.png";
  }else if(number === 6){
    return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtffvnXC44QNuFThHGziwH6KvQRxRHH92TpWI5NNGKosZ5IguBXd4oVHX0i0hi7O0ZZHg&usqp=CAU";
  }
};