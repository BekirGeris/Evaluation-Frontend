import React, { useEffect, useState } from 'react'
import { Button, Confirm, Dropdown, FormField, FormGroup, FormTextArea, Grid, GridColumn, GridRow, Header, Icon, Input, Menu, Message, Select, TextArea } from 'semantic-ui-react';
import EvaluationModelsService from "../services/EvaluationModelsService";
import Cookies from 'js-cookie';
import EvaluatedService from '../services/EvaluatedService';
import EvaNumberInput from '../utillities/customFormControls/EvaNumberInput';
import { Field, Form, Formik, yupToFormErrors } from 'formik';
import * as Yup from 'yup';
import EvaTextInput from '../utillities/customFormControls/EvaTextInput';
import { toast } from 'react-toastify';

export default function EvaluatedAdd() {

  const options = [
    { key: 1, text: '1', value: 1 },
    { key: 2, text: '2', value: 2 },
    { key: 3, text: '3', value: 3 },
    { key: 4, text: '4', value: 4 },
    { key: 5, text: '5', value: 5 }
  ]

  const [evaluationModel, setEvaluationModel] = useState()
  const [parameterModel, setParameterModel] = useState()
  const [evaluatedPoint, setEvaluatedPoint] = useState(undefined)
  const [evaluation, setEevaluation] = useState()
  const [open, setOpenn] = useState({open: false})

  let evaluationModelsService = new EvaluationModelsService();
  let evaluatedService = new EvaluatedService();
  
  useEffect(() => {
      evaluationModelsService.getEvaluationModelByEvaluationModelId(Cookies.get("evaluationModelId")).then((result) => {
        if(result.data.success) {
            setEvaluationModel(result.data)
            getParamater(result)
            fillEvaluatedRequest()
        }
      })
  }, [])

  function fillEvaluatedRequest() {
    evaluatedService.getEvaluatedDtoRequest(Cookies.get("evaluationModelId")).then((result) => {
      if(result.data.success) {
          setEevaluation(result.data.data)
      }
      result.data.data.topicDtos.map((topic, tItem) => {
      console.log("topic.topicId : " + topic.topicId + " tItem : " + tItem);
      topic.questionDtos.map((question, qItem) => {
        console.log("question.topicId : " + question.topicId + " qItem : " + qItem);
      })})
    })
  }

  function getParamater(result) {
    evaluationModelsService.getParameterModelByParameterModelId(result.data.data.parameterModelId).then((pModel) => {
      if(pModel.data.success) {
        setParameterModel(pModel.data)
      }
    })
  }

  function setQuentionScore(event, tItem, qItem) {
    evaluation.topicDtos[tItem].questionDtos[qItem].answer = event.target.innerText;
  }

  function calculate() { 
    evaluatedService.evaluationCalculate(evaluation).then((result) => {
      if(result.data.success) {
        setEvaluatedPoint(result.data.data.evaluatedPoint)
        toast.success(result.data.message)
        setOpenn({open: true})
      } else {
        toast.error(result.data.message)
      }
    })
  }

  function onCancel() {
    setOpenn({open: false})
  }

  function onConfirm() {
    setOpenn({open: false})

    evaluatedService.addEvaluatedDto(evaluation).then((result) => {
      if(result.data.success) {
        toast.success(result.data.message)
      } else {
        toast.error(result.data.message)
      }
    })
  }

  const initialValues = {
    evaluatedFirstName: "",
    evaluatedLastName: "",
    evaluatedNumber: ""
};

const validationSchema = Yup.object({
  evaluatedFirstName: Yup.string()
  .required("Gerekli"),
  evaluatedLastName: Yup.string()
  .required("Gerekli"),
  evaluatedNumber: Yup.number()
  .required("Gerekli"),
  bbb3: Yup.string()
});

const onSubmit = values => {
  evaluation.evaluatedFirstName = values.evaluatedFirstName;
  evaluation.evaluatedLastName = values.evaluatedLastName;
  evaluation.evaluatedNumber = values.evaluatedNumber;
  evaluation.evaluationId = Cookies.get("evaluationModelId");
  evaluation.userId = Cookies.get("UserId");

  let flag = true;
  evaluation.topicDtos.map((topic) => {
    topic.questionDtos.map((question) => {
        if(question.answer === 0) {
          flag = false;
        }
    })
  })

  if(flag) {
    calculate();
  } else {
    toast.error("Tüm soruları cevaplayınız.");
  }
};

  return (
    <div>
          <Confirm
            content={"Hesaplanan Puan: " + evaluatedPoint}
            header={evaluatedPoint === undefined ? 'Hesaplanıyor...' : 'Hesaplama Tamamlandı'}
            open={open.open}
            confirmButton="Save" 
            onCancel={onCancel}
            onConfirm={onConfirm}
          ></Confirm>

      {evaluationModel === undefined || parameterModel === undefined ?
        <h1>Error 404 not found</h1>
        : 
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className="ui form">
        
        <FormGroup widths="equal">
            <div>
          <Grid style={{width: "1300px", marginBottom: "2%"}}>
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
              <GridColumn width={6}>
                  <EvaTextInput name="evaluatedFirstName" placeholder="Evaluated first name" label="Evaluated First Name"/>
              </GridColumn>

              <GridColumn width={6}>
                  <EvaTextInput name="evaluatedLastName" placeholder="Evaluated last name" label="Evaluated Last Name"/>
              </GridColumn>

              <GridColumn width={4}>
                  <EvaTextInput name="evaluatedNumber" placeholder="Evaluated number" label="Evaluated Number"/>
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
                                <Icon color='grey' name='share alternate square' size='huge' style={{margin:"10%"}}/>
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
                                                    {/* <EvaTextInput type="number" name="bbb3" placeholder="Score" label="Question Score"/> */}
                                                      <Menu style={{marginTop: "15%"}} compact>
                                                        <Dropdown 
                                                        options={options}
                                                        placeholder='Score'
                                                        onChange={event => (setQuentionScore(event, item, qItem))}
                                                        simple
                                                        item />
                                                      </Menu>
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
        </Formik>
      }
    </div>

  )
}
