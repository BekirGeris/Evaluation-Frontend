import { Field, Formik, yupToFormErrors } from 'formik'
import React, { useState } from 'react'
import { Button, Form, FormField, FormGroup, Icon, Image, Input, List, Select, TextArea, Transition } from 'semantic-ui-react'

export default function EvaluationModelAdd() {

    const genderOptions = [
        { key: 'm', text: 'Lisans', value: 'Lisans' },
        { key: 'f', text: 'Yüksek Lisans', value: 'Yüksek Lisans' },
        { key: 'o', text: 'Doktora', value: 'Doktora' },
      ]

    const initialList = [];

    const [topicModels, setTopicModels] = useState(initialList)
    const [questionModels, setQuestionModels] = useState([])

      function handleTopicAdd() {
        let length = topicModels.length;
        let newList = topicModels.concat(
            {
                id: length,
                name: 'Robin',
            }
        );

        setTopicModels(newList);
      }

      function handleTopicRemove() {
        let length = topicModels.length - 1;
        let newList = topicModels.filter((item) => item.id !== length);
    
        setTopicModels(newList);
      }

      function handleQuestionAdd() {
        let length = questionModels.length;
        let newList = questionModels.concat(
            {
                id: length,
                name: 'Robin',
            }
        );

        setQuestionModels(newList);
      }

      function handleQuestionRemove() {
        let length = questionModels.length - 1;
        let newList = questionModels.filter((item) => item.id !== length);
    
        setQuestionModels(newList);
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
          <Button
            icon='minus'
            onClick={handleTopicRemove}
          />
          <Button
            icon='plus'
            onClick={handleTopicAdd}
          />
        </Button.Group>

        <div>
            {
                topicModels.map((topic) => (
                    <Form className='topicList'>
                        <h2>Topic {topic.id + 1}</h2>
                        <FormGroup>
                        <Form.Field
                            style={{width: "120px"}}
                            id='form-input-control-first-name'
                            control={Input}
                            label='Topic Weight'
                            placeholder='Topic Weight'
                            />
                            <Form.Field
                            style={{width: "670px"}}
                            id='form-input-control-first-name'
                            control={Input}
                            label='Topic Name'
                            placeholder='Topic name'
                            />
                            <div style={{backgroundColor:"#80af9d", marginTop:"3%"}}>
                            <Button.Group>
                                <Button
                                    icon='minus'
                                    onClick={handleQuestionRemove}
                                />
                                <Button
                                    icon='plus'
                                    onClick={handleQuestionAdd}
                                />
                            </Button.Group>
                            </div>
                        </FormGroup>

                        <div>
                            {
                                questionModels.map((question) => (
                                    <Form className='questionList'>
                                        <h2>Topic {question.id + 1}</h2>
                                        <FormGroup>
                                        <Form.Field
                                            style={{width: "120px"}}
                                            id='form-input-control-first-name'
                                            control={Input}
                                            label='Question Weight'
                                            placeholder='Question Weight'
                                            />
                                            <Form.Field
                                            style={{width: "670px"}}
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
