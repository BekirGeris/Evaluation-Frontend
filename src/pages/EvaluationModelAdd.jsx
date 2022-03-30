import { Field, Formik, yupToFormErrors } from 'formik'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Form, FormField, FormGroup, Icon, Image, Input, List, Select, TextArea, Transition } from 'semantic-ui-react'
import EvaluationModelsService from "../services/EvaluationModelsService";

export default function EvaluationModelAdd() {

    const history = useHistory()

    const genderOptions = [
        { key: '0', text: 'Lisans', value: 'Lisans' },
        { key: '1', text: 'Yüksek Lisans', value: 'Yüksek Lisans' },
        { key: '2', text: 'Doktora', value: 'Doktora' },
      ]

    const evaluationModelInitital = {
        decs: "",
        evaluationModelName: "",
        parameterModelId: -1,
        userId: 0,
        topicModelDaos: [
        ]
    };

    const topicModel = {
        topicName: "",
        weight: 0,
        questionModelDtos: []
    };

    const questionModel = {
            question: "",
            weight: 0
    };

    const initialList = [];

    const [evaluationModels, setEvaluationModels] = useState(evaluationModelInitital)
    const [refresh, setRefresh] = useState(0)

       function setEvaluationName(event) {
        evaluationModels.evaluationModelName = event.target.value
        setEvaluationModels(evaluationModels);
        setRefresh(refresh + 1)
      }

      function setParameterId(event) {
        genderOptions.forEach((gender) => {
            if(gender.text === event.target.innerText){
                evaluationModels.parameterModelId = gender.key
            }
        })
        setEvaluationModels(evaluationModels);
        setRefresh(refresh + 1)
      }

      function setDecs(event) {
        evaluationModels.decs = event.target.value
        setEvaluationModels(evaluationModels);
        setRefresh(refresh + 1)
      }

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

      function setTopicName(event, item) {
        evaluationModels.topicModelDaos[item].topicName = event.target.value;
        setEvaluationModels(evaluationModels);
        setRefresh(refresh + 1)
        event.preventDefault();
      }

      function setTopicWeight(event, item) {
        evaluationModels.topicModelDaos[item].weight = event.target.value;
        setEvaluationModels(evaluationModels);
        setRefresh(refresh + 1)
        event.preventDefault();
      }

      function setQuestion(event, item, qItem) {
        evaluationModels.topicModelDaos[item].questionModelDtos[qItem].question = event.target.value;
        setEvaluationModels(evaluationModels);
        setRefresh(refresh + 1)
        event.preventDefault();
      }

      function setQuestionWeight(event, item, qItem) {
        evaluationModels.topicModelDaos[item].questionModelDtos[qItem].weight = event.target.value;
        setEvaluationModels(evaluationModels);
        setRefresh(refresh + 1)
        event.preventDefault();
      }



      function textEmptyControl(){
          let flag = true;
          if(evaluationModels.evaluationModelName === "" || evaluationModels.parameterModelId === -1 || evaluationModels.decs === ""){
              alert("Tüm Bilgileri Giriniz.")
              flag = false;
              return;
          }

          if(evaluationModels.topicModelDaos.length === 0){
            alert("En Az bir konu eklemeniz gerekmektedir.")
            flag = false;
            return;
          }

          evaluationModels.topicModelDaos.forEach((topic) => {
              if(topic.weight === 0 || topic.topicName === "") {
                alert("Lütfen konu bilgilerini giriniz.")
                flag = false;
                return;
              }
            if(topic.questionModelDtos.length === 0){
                alert("Her konunun altında en az bir soru bulunmalıdır.")
                flag = false;
                return;
            }

            topic.questionModelDtos.forEach((question) => {
                if(question.weight === 0 || question.question === ""){
                    alert("Lütfen soru bilgilerini giriniz.")
                    flag = false;
                    return;
                }
            })
          })

          if(flag){
             saveeEvaluationModelDto();
          }

          function saveeEvaluationModelDto() {
            const evaluationModelsService = new EvaluationModelsService();
            evaluationModelsService.addEvaluationModel(evaluationModels).then((result) => {
                if(result.data.success){
                    history.push("/HomePage/EvaluationModelList");
                  }else{
                    alert(result.data.message);
                  }
              });
          }
      }

  return (
    <div>
    <h1>New Evaluation Model</h1>
    <Form className="ui form">
            <FormGroup widths="equal">
            <Form.Input
            text={event => setEvaluationName(event)}
            id='form-input-control-first-name'
            control={Input}
            label='Evaluation Model Name'
            placeholder='Evaluation model name'
            onChange={setEvaluationName}
            />
            <Form.Select
                    id= 'form-select-control-gender'
                    options={genderOptions}
                    label={{ children: 'Parameter Model', htmlFor: 'form-select-control-gender' }}
                    placeholder='Parameter Model'
                    search
                    searchInput={{ id: 'form-select-control-gender' }}
                    onChange={setParameterId}
                />
                <Form.TextArea
                style={{width: "670px"}}
                id='form-textarea-control-opinion'
                control={TextArea}
                label='Description'
                placeholder='Description'
                onChange={setDecs}
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
                        <Form.Input
                            style={{width: "120px"}}
                            id='form-input-control-first-name'
                            control={Input}
                            type="number"
                            min={0}
                            max={100}
                            label='Topic Weight'
                            placeholder='Weight'
                            onChange={event => {setTopicWeight(event, item)}}
                            />
                            <Form.Field
                            style={{width: "450px"}}
                            id='form-input-control-first-name'
                            control={Input}
                            label='Topic Name'
                            placeholder='Topic name'
                            onChange={event => {setTopicName(event, item)}}
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
                                evaluationModels.topicModelDaos[item].questionModelDtos.map((question, qItem) => (
                                    <Form className='questionList'>
                                        <h2>Question  {qItem + 1}</h2>
                                        <FormGroup>
                                        <Form.Field
                                            style={{width: "120px"}}
                                            id='form-input-control-first-name'
                                            control={Input}
                                            type="number"
                                            min={0}
                                            max={100}
                                            label='Question Weight'
                                            placeholder='Weight'
                                            onChange={event => {setQuestionWeight(event, item, qItem)}}
                                            />
                                            <Form.Field
                                            style={{width: "770px"}}
                                            id='form-input-control-first-name'
                                            control={Input}
                                            label='Question'
                                            placeholder='Question'
                                            onChange={event => {setQuestion(event, item, qItem)}}
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
                <Button type="submit" onClick={textEmptyControl} basic color='green'>
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
