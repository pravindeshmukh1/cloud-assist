// Render Prop
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage, } from 'formik';
import constants from '../../constants';
import { Bot } from '../../interface';
interface BasicProps {
    bot: Bot;
  }
const Basic = ({bot}:BasicProps) => {
    console.log(bot)
    return(
    <div>
    {bot?.id}
        {/* <h1>{props.assistant}</h1> */}
        {/* <Button onClick={()=>props.updateVal}>update</Button> */}
        <Formik
            initialValues={{ name: bot!=null?bot.name:" ",description:" ",model:"gpt-4o",promptName:" ",instructions:" "}}
            //   validate={values => {
            //     const errors = {};
            //     if (!values.email) {
            //       errors.email = 'Required';
            //     } else if (
            //       !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            //     ) {
            //       errors.email = 'Invalid email address';
            //     }
            //     return errors;
            //   }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
                let data={
                    "name":values.name,
                    "description":values.description,
                  "model": values.model,
                  "instructions": values.instructions,
                  "tools": [
                    {
                      "type": "file_search"
                    }
                  ]
                }
                axios.post(constants.link,{...data}).then(res=>{
                        
                    console.log(res)
                }
                ).catch(err=>console.log(err)
                )
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div>
                        <div>Name</div>
                        <Field type="text" name="name" />
                    </div>
                    <div>
                        <div>Description</div>
                        <Field type="text" name="description" />
                    </div>
                    <div>
                        <div>Model</div>
                        <Field as="select" name="model" >
                            <option value="" ></option>
                            <option value="gpt-4o">GPT-4o</option>
                            <option value="GPT-4 Turbo and GPT-4">GPT-4 Turbo and GPT-4</option>
                            <option value="GPT-3.5 Turbo">GPT-3.5 Turbo</option>
                        </Field>
                    </div>
                    <div>
                        <div>Prompt Name</div>
                        <Field type="text" name="promptName" />
                    </div>
                    <div>
                        <div>Prompt Instructions</div>
                        <Field type="textarea" name="instructions" />
                        <ErrorMessage name="password" component="div" />
                    </div>
                    <div>
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>

                    </div>
                </Form>
            )}
        </Formik>
    </div>
)};

export default Basic;