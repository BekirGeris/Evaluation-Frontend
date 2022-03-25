import React, { useEffect, useState } from 'react'
import { Button, Card, CardGroup, Icon, Image, Menu, Table } from 'semantic-ui-react';
import EvaluationModelsService from '../services/EvaluationModelsService';

export default function Dashboard() {

    const [evaluationModels, setEvaluationModels] = useState([])

    useEffect(()=>{
        let evaluationModelsService  = new EvaluationModelsService();
        evaluationModelsService.getEvaluationModelsByUserId(0).then(result => {
          setEvaluationModels(result.data.data);
        });
    });

  return (
    <div className='dashboard'>
    <Card.Group>
            {
                evaluationModels.map(evaluationModel => (
                    <div className='card' key={evaluationModel.evaluationModelId}>
                            <Card>
                              <Card.Content>
                                <Image
                                  floated='right'
                                  size='mini'
                                  src='/images/avatar/large/steve.jpg'
                                />
                                <Card.Header>{evaluationModel.evaluationModelName}</Card.Header>
                                <Card.Meta>Friends of Elliot</Card.Meta>
                                <Card.Description>
                                  Steve wants to add you to the group <strong>best friends</strong>
                                </Card.Description>
                              </Card.Content>
                              <Card.Content extra>
                                <div className='ui two buttons'>
                                  <Button basic color='green'>
                                    Approve
                                  </Button>
                                  <Button basic color='red'>
                                    Decline
                                  </Button>
                                </div>
                              </Card.Content>
                            </Card>
                    </div>
                ))
            }
  </Card.Group>
    </div>
  )
}