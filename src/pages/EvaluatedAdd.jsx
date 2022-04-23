import React, { useEffect, useState } from 'react'
import { Button, Form, FormGroup, FormTextArea, Header, TextArea } from 'semantic-ui-react';
import EvaluationModelsService from "../services/EvaluationModelsService";
import Cookies from 'js-cookie';

export default function EvaluatedAdd() {


  const [evaluationModel, setEvaluationModel] = useState()

  useEffect(() => {
    let  evaluationModelsService = new EvaluationModelsService();
      evaluationModelsService.getEvaluationModelByEvaluationModelId(Cookies.get("evaluationModelId")).then((result) => {
        if(result.data.success) {
            setEvaluationModel(result.data)
        }
      })
  }, [])

  return (
    <div>
      <h1>New Evaluated</h1>
      <Form className="ui form">
        <FormGroup widths="equal">
          {evaluationModel === undefined ?
          <h1>New Evaluated</h1>
          : 
          <div>
            <FormGroup widths="equal">
            <Form.Input
            id='form-input-control-first-name'
            label='Evaluation Model Name'
            placeholder='Evaluation model name'
            />
            <Form.Select
                    id= 'form-select-control-gender'
                    label={{ children: 'Parameter Model', htmlFor: 'form-select-control-gender' }}
                    placeholder='Parameter Model'
                    search
                    searchInput={{ id: 'form-select-control-gender' }}
                />
                <Form.TextArea
                style={{width: "670px"}}
                id='form-textarea-control-opinion'
                label='Description'
                />
        </FormGroup>

        <Button.Group>
        <Button icon='minus'>
            Remove Topic
        </Button>
        <Button style={{marginLeft:"5px"}} icon='minus'>
            Add Topic
        </Button>
        </Button.Group>

        <div>
            {
                evaluationModel.data.topicModelDtos.map((topic, item) => (
                    <Form className='topicList'>
                        <h2>Topic {item + 1}</h2>
                        <FormGroup>
                        <Form.Input
                            style={{width: "120px"}}
                            id='form-input-control-first-name'
                            type="number"
                            label='Topic Weight'
                            placeholder={topic.weight}
                            />
                            <Form.Input
                            style={{width: "450px"}}
                            id='form-input-control-first-name'
                            label='Topic Name'
                            placeholder={topic.topicName}
                            />
                        </FormGroup>

                        <div>
                            {
                                evaluationModel.data.topicModelDtos[item].questionModelDtos.map((question, qItem) => (
                                    <Form className='questionList'>
                                        <h2>Question  {qItem + 1}</h2>
                                        <FormGroup>
                                        <Form.Input
                                            style={{width: "120px"}}
                                            id='form-input-control-first-name'
                                            type="number"
                                            min={0}
                                            max={100}
                                            label='Question Weight'
                                            placeholder='Weight'
                                            />
                                            <Form.Input
                                            style={{width: "770px"}}
                                            id='form-input-control-first-name'
                                            label='Question'
                                            placeholder='Question'
                                            />
                                            <Form.Input
                                            style={{width: "120px"}}
                                            id='form-input-control-first-name'
                                            type="number"
                                            min={1}
                                            max={5}
                                            label='Question Weight'
                                            placeholder='Weight'
                                            />
                                        </FormGroup>
                                    </Form>
                                ))
                            }
                        </div>

                    </Form>
                ))
            }
        </div>
          </div>
          }
        </FormGroup>
        
        <div className='ui two buttons'>
                <Button type="submit" basic color='green'>
                    Save
                </Button>
        </div>
        
      </Form>
    </div>

  )
}
