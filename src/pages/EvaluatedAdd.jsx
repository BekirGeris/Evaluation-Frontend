import React, { useEffect, useState } from 'react'
import { Button, Form, FormGroup, FormTextArea, Grid, GridColumn, Header, Message, TextArea } from 'semantic-ui-react';
import EvaluationModelsService from "../services/EvaluationModelsService";
import Cookies from 'js-cookie';

export default function EvaluatedAdd() {


  const [evaluationModel, setEvaluationModel] = useState()
  const [parameterModel, setParameterModel] = useState()

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

  return (
    <div>
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
          </Grid>

          <div>
              {
                  evaluationModel.data.topicModelDtos.map((topic, item) => (
                      <Form className='topicList'>
                        <h2>Topic {item + 1}</h2>
                          <Grid style={{width: "950px", marginBottom:"1%"}}>
                            <Grid.Row>
                              <Grid.Column width={2}>
                                  <Message>
                                      <Message.Header>Weight</Message.Header>
                                        <p>
                                          {topic.weight}
                                        </p>
                                  </Message>
                                </Grid.Column>
                                <Grid.Column width={14}>
                                  <Message>
                                      <Message.Header>Topic Name</Message.Header>
                                        <p>
                                          {topic.topicName}
                                        </p>
                                  </Message>
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
            <Button type="submit" basic color='green'>
              Calculate
            </Button>
          </div>
          
        </Form>
      }
    </div>

  )
}
