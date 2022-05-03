import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Form, FormField, FormGroup, Icon, Image, Input, List, Select, TextArea, Transition } from 'semantic-ui-react'
import EvaluationModelsService from "../services/EvaluationModelsService";
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

export default function EvaluationModelAdd() {

    const history = useHistory()
    const [cookies, setCookie] = useCookies(['user']);

    const initParameterModels = {
      data: []
    }

    const [parameterModels, setParameterModels] = useState(initParameterModels)

    let  evaluationModelsService = new EvaluationModelsService();

    useEffect(() => {
      evaluationModelsService.getParameterModelByUserId(Cookies.get("UserId")).then(result => {
            result.data.data.forEach((parameterModel) => {
              parameterModels.data = parameterModels.data.concat(
                {
                    key: parameterModel.parameterModelId,
                    text: parameterModel.parameterModelName, 
                    value: parameterModel.parameterModelName
                }
              )
            })
            setParameterModels(parameterModels)
            setRefresh(refresh + 1)
        });
  }, [])

    const evaluationModelInitital = {
        decs: "",
        evaluationModelName: "",
        parameterModelId: -1,
        userId: 0,
        topicModelDtos: []
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

    const [evaluationModels, setEvaluationModels] = useState(evaluationModelInitital)
    const [refresh, setRefresh] = useState(0)

       function setEvaluationName(event) {
        evaluationModels.evaluationModelName = event.target.value
        setEvaluationModels(evaluationModels);
        setRefresh(refresh + 1)
      }

      function setParameterId(event) {
        parameterModels.data.forEach((parameterModel) => {
            if(parameterModel.text === event.target.innerText){
                evaluationModels.parameterModelId = parameterModel.key
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
        evaluationModels.topicModelDtos = evaluationModels.topicModelDtos.concat(
            topicModel
        )
        setEvaluationModels(evaluationModels);
        setRefresh(refresh + 1)
      }

      function handleTopicRemove(event) {
        if(evaluationModels.topicModelDtos.length >= 1){
            evaluationModels.topicModelDtos.pop();
            setEvaluationModels(evaluationModels);
        }
        setRefresh(refresh + 1)
      }

      const handleQuestionAdd = function(event, item) {
        evaluationModels.topicModelDtos[item].questionModelDtos = evaluationModels.topicModelDtos[item].questionModelDtos.concat(
            questionModel
        )
        setEvaluationModels(evaluationModels)
        setRefresh(refresh + 1)
        event.preventDefault();
      }

      function handleQuestionRemove(event, item) {
        if(evaluationModels.topicModelDtos[item].questionModelDtos.length >= 1){
            evaluationModels.topicModelDtos[item].questionModelDtos.pop();
            setEvaluationModels(evaluationModels);
        }
        setRefresh(refresh + 1)
        event.preventDefault();
      }

      function setTopicName(event, item) {
        evaluationModels.topicModelDtos[item].topicName = event.target.value;
        setEvaluationModels(evaluationModels);
        setRefresh(refresh + 1)
        event.preventDefault();
      }

      function setTopicWeight(event, item) {
        evaluationModels.topicModelDtos[item].weight = event.target.value;
        setEvaluationModels(evaluationModels);
        setRefresh(refresh + 1)
        event.preventDefault();
      }

      function setQuestion(event, item, qItem) {
        evaluationModels.topicModelDtos[item].questionModelDtos[qItem].question = event.target.value;
        setEvaluationModels(evaluationModels);
        setRefresh(refresh + 1)
        event.preventDefault();
      }

      function setQuestionWeight(event, item, qItem) {
        evaluationModels.topicModelDtos[item].questionModelDtos[qItem].weight = event.target.value;
        setEvaluationModels(evaluationModels);
        setRefresh(refresh + 1)
        event.preventDefault();
      }



      function textEmptyControl(){
          let flag = true;
          if(evaluationModels.evaluationModelName === "" || evaluationModels.parameterModelId === -1 || evaluationModels.decs === ""){
            toast.error("Tüm Bilgileri Giriniz.")
              flag = false;
              return;
          }

          if(evaluationModels.topicModelDtos.length === 0){
            toast.error("En Az bir konu eklemeniz gerekmektedir.")
            flag = false;
            return;
          }

          evaluationModels.topicModelDtos.forEach((topic) => {
              if(topic.weight === 0 || topic.topicName === "") {
                toast.error("Lütfen konu bilgilerini giriniz.")
                flag = false;
                return;
              }
            if(topic.questionModelDtos.length === 0){
                toast.error("Her konunun altında en az bir soru bulunmalıdır.")
                flag = false;
                return;
            }

            topic.questionModelDtos.forEach((question) => {
                if(question.weight === 0 || question.question === ""){
                    toast.error("Lütfen soru bilgilerini giriniz.")
                    flag = false;
                    return;
                }
            })
          })

          if(flag){
             saveeEvaluationModelDto();
          }

          function saveeEvaluationModelDto() {
            evaluationModels.userId = Cookies.get("UserId");
            evaluationModelsService.addEvaluationModel(evaluationModels).then((result) => {
                if(result.data.success){
                    history.push("/HomePage/EvaluationModelList");
                    toast.success(result.data.message)
                  }else{
                    toast.error(result.data.message)
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

                <div>
                  <Form.Select
                  id= 'form-select-control-gender'
                  options={parameterModels.data}
                  label={{ children: 'Parameter Model', htmlFor: 'form-select-control-gender' }}
                  placeholder='Parameter Model'
                  search
                  searchInput={{ id: 'form-select-control-gender' }}
                  onChange={setParameterId}
                  />

                  {parameterModels.data.length === 0 ? 
                    <Button onClick={() => {history.push("/HomePage/ParamaterAdd")}}>
                      Add Paramater
                    </Button>
                  :
                    <div></div>
                  }
                </div>

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
        <Button style={{marginBottom: "5%"}} icon='minus' onClick={event => handleTopicRemove(event)}>
            Remove Topic
        </Button>
        <Button style={{marginLeft:"5px", marginBottom: "5%"}} icon='minus' onClick={event => handleTopicAdd(event)}>
            Add Topic
        </Button>
        </Button.Group>

        <div>
            {
                refresh.label
            }
            {
                evaluationModels.topicModelDtos.map((topic, item) => (
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
                                evaluationModels.topicModelDtos[item].questionModelDtos.map((question, qItem) => (
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

        <Button animated="fade" color="teal" onClick={textEmptyControl}>
              <Button.Content visible>Save</Button.Content>
              <Button.Content hidden>
                  <Icon name="save" />
              </Button.Content>
          </Button>
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
