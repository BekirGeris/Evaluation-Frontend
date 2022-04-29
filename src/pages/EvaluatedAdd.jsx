import React, { useEffect, useState } from 'react'
import { Button, Confirm, Form, FormGroup, FormTextArea, Grid, GridColumn, GridRow, Header, Icon, Message, TextArea } from 'semantic-ui-react';
import EvaluationModelsService from "../services/EvaluationModelsService";
import Cookies from 'js-cookie';
import EvaluatedService from '../services/EvaluatedService';

export default function EvaluatedAdd() {

  const evaluated = {
    evaluatedFirstName: "",
    evaluatedLastName: "",
    evaluatedNumber: "",
    evaluatedPoint: 0,
    evaluationId: 0,
    userId: 0,
    topicDtos: []
};

const topic = {
    topicName: "",
    weight: 0,
    questionModelDtos: []
};

const question = {
  answer: 0,
  question: "",
  weight: 0
};

  const [evaluationModel, setEvaluationModel] = useState()
  const [parameterModel, setParameterModel] = useState()
  const [evaluation, setEevaluation] = useState(evaluated)
  const [open, setOpenn] = useState({open: false})

  useEffect(() => {
    let  evaluationModelsService = new EvaluationModelsService();
    
      evaluationModelsService.getEvaluationModelByEvaluationModelId(Cookies.get("evaluationModelId")).then((result) => {
        if(result.data.success) {
            setEvaluationModel(result.data)
            evaluationModelsService.getParameterModelByParameterModelId(result.data.data.parameterModelId).then((pModel) => {
              if(pModel.data.success) {
                setParameterModel(pModel.data)
              }
            })
        }
      })

  }, [])

  function calculate() {
    setOpenn({open: true})
  }

  function onCancel() {
    setOpenn({open: false})
  }

  function onConfirm() {
    setOpenn({open: false})
    let evaluatedService = new EvaluatedService();

    evaluatedService.addEvaluatedDto().then((result) => {
      if(result.data.success) {
        alert(result.data.success)
      }
    })
  }

  return (
    <div>

          <Confirm
            header='Hesaplanıyor...'
            open={open.open}
            confirmButton="Save" 
            onCancel={onCancel}
            onConfirm={onConfirm}
          />

      {evaluationModel === undefined || parameterModel === undefined ?
        <h1>Error 404 not found</h1>
        : 
        <Form className="ui form">
        
        <FormGroup widths="equal">
            <div>
          <Grid style={{width: "1300px"}}>
            <Grid.Row>
              <Grid.Column width={8}>
                  <Message info>
                      <Message.Header>Evaluation Model Name</Message.Header>
                        <p>
                            {evaluationModel.data.evaluationModelName}
                        </p>
                  </Message>
                </Grid.Column>
                <Grid.Column width={8}>
                  <Message info>
                      <Message.Header>Parameter Model</Message.Header>
                        <p>
                            {parameterModel.data.parameterModelName}
                        </p>
                  </Message>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                <Message info>
                      <Message.Header>Description</Message.Header>
                        <p>
                            {evaluationModel.data.decs}
                        </p>
                  </Message>
              </Grid.Column>
            </Grid.Row>

            <GridRow>
              <GridColumn width={5}>
              </GridColumn>

              <GridColumn width={6}>
                  <Form.Input
                  label='Evaluated Name'
                  placeholder='Evaluated name'
                  />
              </GridColumn>

              <GridColumn width={5}>
              </GridColumn>
            </GridRow>
          </Grid>

          <div>
              {
                  evaluationModel.data.topicModelDtos.map((topic, item) => (
                      <Form className='topicList'>
                        <h2>Topic {item + 1}</h2>
                          <Grid style={{width: "950px", marginBottom:"1%", marginLeft:"1%"}}>
                            <Grid.Row>
                              <Grid.Column width={2}>
                                  <Message>
                                      <Message.Header>Weight</Message.Header>
                                        <p>
                                          {topic.weight}
                                        </p>
                                  </Message>
                                </Grid.Column>
                                <Grid.Column width={12}>
                                  <Message>
                                      <Message.Header>Topic Name</Message.Header>
                                        <p>
                                          {topic.topicName}
                                        </p>
                                  </Message>
                              </Grid.Column>
                              <Grid.Column width={2}>
                                  <Icon color='grey' style={{marginTop:"10%"}} name='share alternate square' size='huge' />
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>
                          <div>
                              {
                                  evaluationModel.data.topicModelDtos[item].questionModelDtos.map((question, qItem) => (
                                      <Form className='questionList'>
                                        <h2>Question {qItem + 1}</h2>
                                          <Grid style={{width: "1100px", marginBottom:"1%"}}>
                                            <Grid.Row>
                                              <Grid.Column width={2}>
                                                <Message>
                                                  <Message.Header>Weight</Message.Header>
                                                      <p>
                                                        {question.weight}
                                                      </p>
                                                  </Message>
                                                </Grid.Column>
                                                <Grid.Column width={12}>
                                                  <Message>
                                                      <Message.Header>Question</Message.Header>
                                                        <p>
                                                          {question.question}
                                                        </p>
                                                  </Message>
                                              </Grid.Column>
                                              <Grid.Column width={2}>
                                                  <Form.Input
                                                  style={{width: "120px"}}
                                                  id='form-input-control-first-name'
                                                  type="number"
                                                  min={1}
                                                  max={5}
                                                  label='Question Score'
                                                  placeholder='Score'
                                                  />
                                                </Grid.Column>
                                            </Grid.Row>
                                          </Grid>
                                      </Form>
                                  ))
                              }
                          </div>

                      </Form>
                  ))
              }
          </div>
            </div>
          </FormGroup>
          
          <div>
            <Button type="submit" onClick={calculate} basic color='green'>
              Calculate
            </Button>
          </div>
          
        </Form>
      }
    </div>

  )
}
