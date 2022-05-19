import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie';
import * as Yup from 'yup';
import EvaluationModelsService from '../services/EvaluationModelsService';
import EvaTextInput from '../utillities/customFormControls/EvaTextInput';
import { Button, Grid, GridColumn, GridRow, Icon } from 'semantic-ui-react';
import { Formik, Form} from "formik";
import EvaNumberInput from '../utillities/customFormControls/EvaNumberInput';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import UserService from '../services/UserService';

export default function ParamaterAdd() {

  const history = useHistory()
  const [session, setSession] = useState()

  useEffect(()=>{
    let userService = new UserService();
        userService.getUserBySessionUUID(Cookies.get("sessionId")).then((result) => {
          if(result.data.success){
            setSession(result.data.data)
          }
        });
  }, []);

  const initialValues = {
    parameterModelName: "",
    poor1: "",
    poor2: "",
    poor3: "",
    poor4: "",
    unsatisfactory1: "",
    unsatisfactory2: "",
    unsatisfactory3: "",
    unsatisfactory4: "",
    average1: "",
    average2: "",
    average3: "",
    average4: "",
    good1: "",
    good2: "",
    good3: "",
    good4: "",
    excellent1: "",
    excellent2: "",
    excellent3: "",
    excellent4: ""
};

const validationSchema = Yup.object({
        parameterModelName: Yup.string()
        .required("Gerekli"),
        poor1: Yup.number()
        .min(0)
        .max(100)
        .required("Gerekli"),
        poor2: Yup.number()
        .min(0)
        .max(100)
        .required("Gerekli"),
        poor3: Yup.number()
        .min(0)
        .max(100)
        .required("Gerekli"),
        poor4: Yup.number()
        .min(0)
        .max(100)
        .required("Gerekli"),
        unsatisfactory1: Yup.number()
        .min(0)
        .max(100)
        .required("Gerekli"),
        unsatisfactory2: Yup.number()
        .min(0)
        .max(100)
        .required("Gerekli"),
        unsatisfactory3: Yup.number()
        .min(0)
        .max(100)
        .required("Gerekli"),
        unsatisfactory4: Yup.number()
        .min(0)
        .max(100)
        .required("Gerekli"),
        average1: Yup.number()
        .min(0)
        .max(100)
        .required("Gerekli"),
        average2: Yup.number()
        .min(0)
        .max(100)
        .required("Gerekli"),
        average3: Yup.number()
        .min(0)
        .max(100)
        .required("Gerekli"),
        average4: Yup.number()
        .min(0)
        .max(100)
        .required("Gerekli"),
        good1: Yup.number()
        .min(0)
        .max(100)
        .required("Gerekli"),
        good2: Yup.number()
        .min(0)
        .max(100)
        .required("Gerekli"),
        good3: Yup.number()
        .min(0)
        .max(100)
        .required("Gerekli"),
        good4: Yup.number()
        .min(0)
        .max(100)
        .required("Gerekli"),
        excellent1: Yup.number()
        .min(0)
        .max(100)
        .required("Gerekli"),
        excellent2: Yup.number()
        .min(0)
        .max(100)
        .required("Gerekli"),
        excellent3: Yup.number()
        .min(0)
        .max(100)
        .required("Gerekli"),
        excellent4: Yup.number()
        .min(0)
        .max(100)
        .required("Gerekli"),
});

const onSubmit = values => {
  let  evaluationModelsService = new EvaluationModelsService();

    let data = {
        parameterModelName: values.parameterModelName,
        userId: session.userId,
        poor1: values.poor1,
        poor2: values.poor2,
        poor3: values.poor3,
        poor4: values.poor4,
        unsatisfactory1: values.unsatisfactory1,
        unsatisfactory2: values.unsatisfactory2,
        unsatisfactory3: values.unsatisfactory3,
        unsatisfactory4: values.unsatisfactory4,
        average1: values.average1,
        average2: values.average2,
        average3: values.average3,
        average4: values.average4,
        good1: values.good1,
        good2: values.good2,
        good3: values.good3,
        good4: values.good4, 
        excellent1: values.excellent1,
        excellent2: values.excellent2,
        excellent3: values.excellent3,
        excellent4: values.excellent4
    }
   
    evaluationModelsService.addParameterModel(data).then((result) => {
      toast.success(result.data.message)
      if(result.data.success) {
        history.push("/HomePage/EvaluationModelList");
      }
    })
};

  return (
    <div>
      <h1>New Paramater Model</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className="ui form">
          <Grid style={{width: "1000px", marginLeft: "3%"}}>
            <GridRow>
              <GridColumn width={5}>
              </GridColumn>

              <GridColumn width={5}>
                <EvaTextInput name="parameterModelName" placeholder="Paramater model name" label="Paramater Model Name" />
              </GridColumn>

              <GridColumn width={5}>
              </GridColumn>
            </GridRow>

            <GridRow style={{marginBottom: "3%"}}>
            <GridColumn width={3}>
                    <EvaNumberInput name="poor1" placeholder="Poor 1" label="Poor 1" />
                    <EvaNumberInput name="poor2" placeholder="Poor 2" label="Poor 2" />
                    <EvaNumberInput name="poor3" placeholder="Poor 3" label="Poor 3" />
                    <EvaNumberInput name="poor4" placeholder="Poor 4" label="Poor 4" />
              </GridColumn>
                  
              <GridColumn width={3}>
                    <EvaNumberInput name="unsatisfactory1" placeholder="Unsatisfactory 1" label="Unsatisfactory 1" />
                    <EvaNumberInput name="unsatisfactory2" placeholder="Unsatisfactory 2" label="Unsatisfactory 2" />
                    <EvaNumberInput name="unsatisfactory3" placeholder="Unsatisfactory 3" label="Unsatisfactory 3" />
                    <EvaNumberInput name="unsatisfactory4" placeholder="Unsatisfactory 4" label="Unsatisfactory 4" />
              </GridColumn>

              <GridColumn width={3}>
                    <EvaNumberInput name="average1" placeholder="Average 1" label="Average 1" />
                    <EvaNumberInput name="average2" placeholder="Average 2" label="Average 2" />
                    <EvaNumberInput name="average3" placeholder="Average 3" label="Average 3" />
                    <EvaNumberInput name="average4" placeholder="Average 4" label="Average 4" />
              </GridColumn>

              <GridColumn width={3}>
                    <EvaNumberInput name="good1" placeholder="Good 1" label="Good 1" />
                    <EvaNumberInput name="good2" placeholder="Good 2" label="Good 2" />
                    <EvaNumberInput name="good3" placeholder="Good 3" label="Good 3" />
                    <EvaNumberInput name="good4" placeholder="Good 4" label="Good 4" />
              </GridColumn>

              <GridColumn width={3}>
                    <EvaNumberInput name="excellent1" placeholder="Excellent 1" label="Excellent 1" />
                    <EvaNumberInput name="excellent2" placeholder="Excellent 2" label="Excellent 2" />
                    <EvaNumberInput name="excellent3" placeholder="Excellent 3" label="Excellent 3" />
                    <EvaNumberInput name="excellent4" placeholder="Excellent 4" label="Excellent 4" />
              </GridColumn>
            </GridRow>
          </Grid>

          <Button animated="fade" color="teal" type="submit">
              <Button.Content visible>Save</Button.Content>
              <Button.Content hidden>
                  <Icon name="save" />
              </Button.Content>
          </Button>
          
        </Form>
      </Formik>
    </div>
  )
}
