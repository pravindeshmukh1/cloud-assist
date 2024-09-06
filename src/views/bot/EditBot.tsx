import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import constants from "../../constants";
import { Assistant, Bot } from "../../interface";
import { useState } from "react";
import { Button } from "@mui/material";

const EditList = () => {
  const [status1, setStatus1] = useState<boolean>(false)
  const bot: Bot = {
    assistantId: "",
    createdDt: "",
    description: "",
    documentId: "",
    expireDt: "",
    id: 0,
    instruction: "",
    model: "",
    name: "",
    noOfDocs: "",
    size: "",
    threadId: "",
    userId: ""
  }

  const [files, setFiles] = useState<FileList | null>(null);
  const [status, setStatus] = useState<
    'initial' | 'uploading' | 'success' | 'fail'
  >('initial');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setStatus('initial');
      setFiles(e.target.files);
    }
  };
  function completeSetup(assistant:string): void {
    let data={
            "asstId": assistant,
            "path": "",
            "botName": "car"
    }
   axios.post(`${constants.uploadLocalFiles}`,data).then(res=>{
   
    console.log(res);
    if(res.status==200){
       
        alert(true)
        setStatus1(true)
    }
   }).catch(err=>{console.log(err)
    
   }
   )
}
  const handleUpload = async (assistantId:string) => {
    if (files) {
      setStatus('uploading');

      const formData = new FormData();
      [...files].forEach((file) => {
        formData.append('files', file);
      });
      formData.append("body", assistantId)

      try {
        const result = await fetch(`${constants.uploadLink}/${localStorage.getItem('userId')}`, {
          method: 'POST',
          body: formData,
        });

        const data = await result.json();

        console.log(data);
        setStatus('success');
      } catch (error) {
        console.error(error);
        setStatus('fail');
      }
    }
  };
  return (
    <div>
      {/* {bot?.id} */}
      {/* <h1>{props.assistant}</h1> */}
      {/* <Button onClick={()=>props.updateVal}>update</Button> */}
      <Formik
        initialValues={{ name: bot != null ? bot.name : " ", description: " ", model: "gpt-4o", promptName: " ", instructions: " " }}
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
          setSubmitting(false);
          // setTimeout(() => {
          //     alert(JSON.stringify(values, null, 2));
          //     setSubmitting(false);
          // }, 400);
          let data = {
            "name": values.name,
            "description": values.description,
            "model": values.model,
            "instructions": values.instructions,
            "userid": localStorage.getItem("userId"),
            "tools": [
              {
                "type": "file_search"
              }
            ]
          }
          axios.post<Assistant>(`${constants.link}/${localStorage.getItem("userId")}`, { ...data }).then(res => {
            let threadData = {
              "assistantId": res.data.id,
              "userId": localStorage.getItem("userId")
            }
            axios.post(`${constants.createThread}`, threadData).then(res=>{
              handleUpload(String(threadData.assistantId)).then(res=>{
                completeSetup(String(threadData.assistantId));

              });
              
            })
            console.log(res)
          }
          ).catch(err => console.log(err)
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
                <option value="gpt-4-turbo">GPT-4 Turbo and GPT-4</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
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
              {/* upload files */}
              <>
                <h1>Upload files section</h1>
                <div className="input-group">
                  <input id="file" type="file" multiple onChange={handleFileChange} />
                </div>

                {files && [...files].map((file, index) => (
                  <section key={file.name}>
                    File number {index + 1} details:
                    <ul>
                      <li>Name: {file.name}</li>
                      <li>Type: {file.type}</li>
                      <li>Size: {file.size} bytes</li>
                    </ul>
                  </section>
                ))}

                

                {/* <Result status={status} /> */}
              </>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>

            </div>
          </Form>
        )}
      </Formik>


    </div>
  )

}
const Result = ({ status }: { status: string }) => {
  if (status === 'success') {
    return <p>✅ File uploaded successfully!</p>;
  } else if (status === 'fail') {
    return <p>❌ File upload failed!</p>;
  } else if (status === 'uploading') {
    return <p>⏳ Uploading selected file...</p>;
  } else {
    return null;
  }
};

export default EditList
