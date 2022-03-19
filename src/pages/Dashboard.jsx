import React, { useEffect, useState } from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import EvaluationModels from '../services/EvaluationModels';

export default function Dashboard() {

    const [evaluationModels, setEvaluationModels] = useState([])

    useEffect(()=>{
        let evaluationModels  = new EvaluationModels();
        evaluationModels.getEvaluationModels().then(result => setEvaluationModels(result.data.data))
    })

  return (
    <div className='dashboard'>
        <Card.Group>
        {
                        evaluationModels.map(evaluation => (
                                            <Card>
                                                <Card.Content>
                                                    <Image
                                                    floated='right'
                                                    size='mini'
                                                    src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                                                    />
                                                    <Card.Header>{evaluation.evaluationModelName}</Card.Header>
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
                        ))
                    }
  </Card.Group>
    </div>
  )
}
