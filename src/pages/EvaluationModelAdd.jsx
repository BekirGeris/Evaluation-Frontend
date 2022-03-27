import { Field, Formik, yupToFormErrors } from 'formik'
import React, { useState } from 'react'
import { Button, Form, FormField, FormGroup, Icon, Image, Input, List, Select, TextArea, Transition } from 'semantic-ui-react'

export default function EvaluationModelAdd() {

    const genderOptions = [
        { key: 'm', text: 'Lisans', value: 'Lisans' },
        { key: 'f', text: 'Yüksek Lisans', value: 'Yüksek Lisans' },
        { key: 'o', text: 'Doktora', value: 'Doktora' },
      ]

    const evaluationModelInitital = {
        decs: "",
        evaluationModelName: "",
        parameterModelId: 0,
        userId: 0,
        topicModelDaos: [
        ]
    };

    const topicModel = {
        evaluationModelId: 0,
        topicName: "cvasvca",
        weight: 0,
        questionModelDtos: []
    };

    const questionModel = {
            question: "",
            topicId: 0,
            weight: 0
    };

    const initialList = [];

    const [evaluationModels, setEvaluationModels] = useState(evaluationModelInitital)
    const [refresh, setRefresh] = useState(0)

      function handleTopicAdd(event) {
        evaluationModels.topicModelDaos = evaluationModels.topicModelDaos.concat(
            topicModel
        )
        setEvaluationModels(evaluationModels);
        setRefresh(refresh + 1)
      }

      function handleTopicRemove(event) {
        if(evaluationModels.topicModelDaos.length >= 1){
            evaluationModels.topicModelDaos.pop();
            setEvaluationModels(evaluationModels);
        }
        setRefresh(refresh + 1)
      }

      const handleQuestionAdd = function(event, item) {
        evaluationModels.topicModelDaos[item].questionModelDtos = evaluationModels.topicModelDaos[item].questionModelDtos.concat(
            questionModel
        )
        setEvaluationModels(evaluationModels)
        setRefresh(refresh + 1)
        event.preventDefault();
      }

      function handleQuestionRemove(event, item) {
        if(evaluationModels.topicModelDaos[item].questionModelDtos.length >= 1){
            evaluationModels.topicModelDaos[item].questionModelDtos.pop();
            setEvaluationModels(evaluationModels);
        }
        setRefresh(refresh + 1)
        event.preventDefault();
      }

  return (
    <div>
    <h1>New Evaluation Model</h1>
    <Form className="ui form">
            <FormGroup widths="equal">
            <Form.Field
            id='form-input-control-first-name'
            control={Input}
            label='Evaluation Model Name'
            placeholder='Evaluation model name'
            />
            <Form.Field
                    name=""
                    control={Select}
                    options={genderOptions}
                    label={{ children: 'Parameter Model', htmlFor: 'form-select-control-gender' }}
                    placeholder='Parameter Model'
                    search
                    searchInput={{ id: 'form-select-control-gender' }}
                />
                <Form.Field
                style={{width: "670px"}}
                id='form-textarea-control-opinion'
                control={TextArea}
                label='Opinion'
                placeholder='Opinion'
                />
        </FormGroup>

        <Button.Group>
        <Button icon='minus' onClick={event => handleTopicRemove(event)}>
            Remove Topic
        </Button>
        <Button style={{marginLeft:"5px"}} icon='minus' onClick={event => handleTopicAdd(event)}>
            Add Topic
        </Button>
        </Button.Group>

        <div>
            {
                refresh.label
            }
            {
                evaluationModels.topicModelDaos.map((topic, item) => (
                    <Form className='topicList'>
                        <h2>Topic {item + 1}</h2>
                        <FormGroup>
                        <Form.Field
                            style={{width: "120px"}}
                            id='form-input-control-first-name'
                            control={Input}
                            label='Topic Weight'
                            placeholder='Topic Weight'
                            />
                            <Form.Field
                            style={{width: "450px"}}
                            id='form-input-control-first-name'
                            control={Input}
                            label='Topic Name'
                            placeholder='Topic name'
                            />
                            <div style={{marginTop:"26px", alignItems:"center"}}>
                            <Button.Group>
                                <Button style={{marginLeft:"15px"}} icon='minus' onClick={event => handleQuestionRemove(event, item)}>
                                    Remove Question
                                </Button>
                                <Button style={{marginLeft:"5px", marginRight:"20px"}} icon='minus'  onClick={event => handleQuestionAdd(event, item)}>
                                    Add Question
                                </Button>
                            </Button.Group>
                            </div>
                        </FormGroup>

                        <div>
                            {
                                evaluationModels.topicModelDaos[item].questionModelDtos.map((question, item) => (
                                    <Form className='questionList'>
                                        <h2>Question  {item + 1}</h2>
                                        <FormGroup>
                                        <Form.Field
                                            style={{width: "120px"}}
                                            id='form-input-control-first-name'
                                            control={Input}
                                            label='Question Weight'
                                            placeholder='Question Weight'
                                            />
                                            <Form.Field
                                            style={{width: "770px"}}
                                            id='form-input-control-first-name'
                                            control={Input}
                                            label='Question Name'
                                            placeholder='Question name'
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

        <div className='ui two buttons'>
                <Button type="submit" onClick={() => {  }} basic color='green'>
                    Save
                </Button>
        </div>
    </Form>
</div>
    // <Formik>
    //     <Form className="ui form"> 
    //             <Form.Group widths="equal">
    //             <EvaTextInput/>
    //             <Form.Field
    //                 control={Select}
    //                 options={genderOptions}
    //                 label={{ children: 'Gender', htmlFor: 'form-select-control-gender' }}
    //                 placeholder='Gender'
    //                 search
    //                 searchInput={{ id: 'form-select-control-gender' }}
    //             />
    //             </Form.Group>
    //             <Form.Field
    //             id='form-textarea-control-opinion'
    //             control={TextArea}
    //             label='Opinion'
    //             placeholder='Opinion'
    //             />
    //             <div className='ui two buttons'>
    //                 <Button type="submit" onClick={() => {  }} basic color='green'>
    //                     Evaluate
    //                 </Button>
    //                 <Button type="submit" onClick={() => {  }} basic color='blue'>
    //                     Evaluated
    //                 </Button>
    //             </div>
    //     </Form>
    // </Formik>
  )
}
