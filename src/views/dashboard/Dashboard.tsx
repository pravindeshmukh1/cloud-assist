import classNames from 'classnames'

import CIcon from '@coreui/icons-react'
import { cilHome, cilSearch } from '@coreui/icons'
import { Field, Form, Formik } from 'formik'
import axios from 'axios'
import { ChangeEvent, useEffect, useState } from 'react'
import constants from '../../constants'
import { Bot, Message, MsgResponse } from '../../interface'
import Markdown from 'react-markdown'
import {
  Box,
  Card,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { GridDeleteIcon } from '@mui/x-data-grid'

const Dashboard = () => {
  const [bot, setBot] = useState<Bot[]>()

  const [text, setText] = useState('')

  const handleChange = (event) => {
    setText(event.target.value)
  }

  useEffect(() => {
    axios
      .get<Bot[]>(`${constants.getAssistantByUser}/${constants.userId}`)
      .then((res) => {
        setBot(res.data)
        setactiveBot(res.data[0])
      })
      .catch((err) => {
        setBot([
          {
            id: 202,
            name: ' name',
            description: ' my gym trainer',
            assistantId: 'asst_0Ppch9D4GqQA1s6EuE7qcXWl',
            threadId: 'thread_sXi9KW1hM3IvscdMyWVZb6lK',
            userId: '5b5b695d4d014e2db8ca',
            documentId: '',
            createdDt: '2024-08-28T12:39:09.6524',
            expireDt: 'null',
            instruction: 'null',
            model: 'null',
            size: 'null',
            noOfDocs: 'null',
          },
          {
            id: 152,
            name: 'tempBot',
            description: 'bot for R&D',
            assistantId: 'asst_4FBwgYPCJU4MyorZ2sqfOukC',
            threadId: 'thread_sXi9KW1hM3IvscdMyWVZb6lK',
            userId: '5b5b695d4d014e2db8ca',
            documentId: 'null',
            createdDt: '2024-08-28T12:22:42.029896',
            expireDt: 'null',
            instruction: 'Make sure Instructions',
            model: 'GPT4',
            size: '1451',
            noOfDocs: '2',
          },
          {
            id: 452,
            name: ' sales EX',
            description: ' will handle all queries related to package deliveries',
            assistantId: 'asst_AHauMTgr1q1pJLsSIdNtgDSc',
            threadId: 'thread_sXi9KW1hM3IvscdMyWVZb6lK',
            userId: '5b5b695d4d014e2db8ca',
            documentId: 'null',
            createdDt: '2024-09-01T16:54:45.977832',
            expireDt: 'null',
            instruction: ' you are a sales bot and response should be less than 300 words ',
            model: 'gpt-4o',
            size: 'null',
            noOfDocs: 'null',
          },
          {
            id: 502,
            name: 'Java ',
            description: ' my gym trainer',
            assistantId: 'asst_dWI6lnwMKcb5qBMAartPfCYB',
            threadId: 'null',
            userId: '5b5b695d4d014e2db8ca',
            documentId: 'null',
            createdDt: '2024-09-03T19:34:21.158518',
            expireDt: 'null',
            instruction: ' tarin me for my fat loss program',
            model: 'gpt-4o',
            size: 'null',
            noOfDocs: 'null',
          },
        ])

        console.error(err)
      })
  }, [])
  const [activeBot, setactiveBot] = useState<Bot | null>()

  const [messages, setMessages] = useState<Message[]>([
    {
      message: 'Hi there How can I help you',
      id: 0,
      msgBy: 'AI',
    },
    {
      message:
        'To provide the most recent and accurate number of cars in India, updated statistics from credible sources like the Ministry of Road Transport and Highways or the Society of Indian Automobile Manufacturers (SIAM) would be necessary. However, based on available public data, here is an overview of the vehicle population in India:\n\n1. **Registered Passenger Vehicles**: As of recent data from 2019, India had roughly 30 million registered passenger vehicles. \n\n2. **Overall Vehicle Count**: The total number of registered vehicles, including all categories such as two-wheelers, commercial vehicles, and more, was reported to be over 295 million in March 2019.\n\nFor the most up-to-date figures, it would be ideal to refer to the latest annual reports or statistical releases from the mentioned Indian government departments or industry associations. If you come across a specific document or report, feel free to upload it here, and I will extract the relevant details for you.',
      id: 1,
      msgBy: 'user',
    },
  ])

  function botSelected(e: ChangeEvent<HTMLSelectElement>): void {
    console.log(e.target.value)
    alert(e.target.value)
    const arr = bot?.filter((bots) => bots.assistantId === e.target.value)
    setactiveBot(arr != undefined ? arr[0] : null)
    console.log(arr != undefined && arr[0])
    setMessages([
      {
        message: 'Hi there How can I help you',
        id: 0,
        msgBy: 'AI',
      },
    ])
  }

  return (
    <>
      <div>
        {/* <h4>Bot available</h4>
        <select onChange={(e) => botSelected(e)}>
          {bot?.map((res) => {
            return <option value={res.assistantId}>{res.name}</option>
          })}
        </select> */}

        <div className="content-wrapper">
          <div className="container-xxl flex-grow-1 container-p-y pt-0">
            <div className="col-md-12">
              <Formik
                initialValues={{ msg: ' ' }}
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
                  console.log('🚀 ~ values:', values)
                  // setTimeout(() => {
                  //     alert(JSON.stringify(values, "null", 2));
                  //     setSubmitting(false);
                  // }, 400);
                  let data: Message = {
                    id: 1,
                    message: values.msg,
                    msgBy: 'user',
                  }
                  setMessages((msg) => [...msg, data])
                  let post = {
                    asstId: activeBot?.assistantId,
                    threadId: activeBot?.threadId,
                    text: values.msg,
                  }

                  axios
                    .post<MsgResponse>(constants.chatLink, post)
                    .then((res) => {
                      console.log(res)
                      setSubmitting(false)
                      let data1: Message = {
                        id: 1,
                        message: values.msg,
                        msgBy: 'user',
                      }
                      data1.message = res.data.response
                      data1.msgBy = 'AI'
                      setMessages((msg) => [...msg, data1])
                    })
                    .catch((err) => console.log(err))
                }}
              >
                {({ isSubmitting }) => (
                  <div className="">
                    <div className="flex-column d-flex justify-content-center align-items-center text-center mt-2 ">
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 6 }} gutterBottom>
                        Talk to CloudAssist
                      </Typography>

                      {/* <div className="">
                      <div className="form-check form-check-inline mt-3 mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="inlineCheckbox1"
                          value="option1"
                          autoFocus
                          disabled={isSubmitting}
                        />
                        <label className="form-check-label">GPT</label>
                      </div>
                      <div className="form-check form-check-inline">
                      
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="inlineCheckbox2"
                          value="option2"
                        />
                        <label className="form-check-label">AI</label>
                      </div>
                    </div> */}
                      {/* <Field name="msg">
             {({
               field, // { name, value, onChange, onBlur }
               form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
               meta,
              }) => (
               <div>
               <div className="col-md-8 d-flex justify-content-start align-items-center px-2 gap-2 border shadow rounded-pill bg-white border-0 ">
                 <div className="nav-item d-flex align-items-center card-body p-0 ">
                 <input
                          type="text"
                          className="form-control form-control-lg border-0 shadow-none ps-1 ps-sm-2 rounded-pill"
                          placeholder="Ask the Question"
                          aria-label="Search..."
                          style={{ fontSize: '18px' }}
                          {...field} />
                        <div className="text-end">
                          <CIcon icon={cilSearch} className="text-body-tertiary" />
                        </div>
                 
                 {meta.touched && meta.error && (
                   <div className="error">{meta.error}</div>
                 )}
               </div>
                      </div>
                    </div>
             )}
           </Field> */}
                      <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
                        <FormControl sx={{ m: 1, minWidth: 80, mb: 4 }} size="small">
                          <InputLabel id="demo-simple-select-label">Bot</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={(e) => botSelected(e)}
                            label="Bot"
                            autoWidth
                            style={{
                              borderRadius: '30px',
                            }}
                          >
                            {bot?.map((res) => {
                              return <MenuItem value={res.assistantId}>{res.name}</MenuItem>
                            })}
                          </Select>
                        </FormControl>
                        <Form>
                          <Field name="msg">
                            {({ field }) => (
                              <>
                                {/* <input
                                  type="text"
                                  className="form-control form-control-lg border-0 shadow-none ps-1 ps-sm-2 rounded-pill"
                                  placeholder="Ask the Question"
                                  aria-label="Search..."
                                  style={{ fontSize: '18px' }}
                                  {...field}
                                /> */}

                                <TextField
                                  {...field}
                                  onChange={handleChange}
                                  variant="outlined"
                                  label="Ask the Question"
                                  size="small"
                                  // placeholder="Ask the Question"
                                  multiline
                                  minRows={1} // Minimum number of rows
                                  maxRows={10} // Maximum number of rows before scroll appears
                                  value={text}
                                  InputLabelProps={{
                                    sx: {},
                                  }}
                                  sx={{
                                    '& .MuiInputBase-root': {
                                      // fontSize: '16px',
                                      padding: '3px',
                                      paddingLeft: '10px',
                                      lineHeight: '1',
                                      minWidth: '800px',
                                      maxWidth: '200px',
                                      backgroundColor: '#fff',
                                      borderRadius: '30px',
                                    },
                                  }}
                                  slotProps={{
                                    input: {
                                      endAdornment: (
                                        <InputAdornment position="start">
                                          <IconButton type="submit" disabled={isSubmitting}>
                                            <SendIcon color="action" fontSize="small" />
                                          </IconButton>
                                        </InputAdornment>
                                      ),
                                    },
                                  }}
                                />
                              </>
                            )}
                          </Field>
                          {/* <div>
                          <button type="submit" disabled={isSubmitting}>
                            Submit
                          </button>
                        </div> */}
                        </Form>
                      </Stack>
                    </div>

                    <div className="card1 d-flex justify-content-center align-items-center mt-4">
                      <div
                        className="card-body overflow-auto"
                        // style={{ maxHeight: '500px', minWidth: '60vw' }}
                      >
                        {messages.map((res) => {
                          return (
                            <>
                              <Markdown>{res.message}</Markdown>
                              <Typography variant="body2">{res.msgBy}</Typography>
                              {/* <Box
                                direction="row"
                                sx={{
                                  justifyContent: 'flex-end',
                                  alignItems: 'center',
                                }}
                              >
                                <IconButton aria-label="delete">
                                  <GridDeleteIcon />
                                </IconButton>
                                <IconButton aria-label="delete" disabled color="primary">
                                  <GridDeleteIcon />
                                </IconButton>
                              </Box> */}
                              <Stack
                                direction="row"
                                useFlexGap
                                sx={{ justifyContent: 'flex-end', alignItems: 'center' }}
                              >
                                <IconButton aria-label="delete">
                                  <GridDeleteIcon />
                                </IconButton>
                                <IconButton aria-label="delete" disabled color="primary">
                                  <GridDeleteIcon />
                                </IconButton>
                              </Stack>
                            </>
                          )
                        })}
                        <hr className="mt-2" />
                        {/* <p className="mb-1">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur rem
                        corporis cum beatae perspiciatis excepturi dignissimos delectus vero ullam
                        consequatur vel nihil non, voluptatem fugit, mollitia et eum eos facere.
                      </p>
                      <div className="text-end">
                        <i className="bx bx-like px-1 btn"></i>
                        <i className="bx bx-dislike px-1 btn"></i>
                      </div> */}
                      </div>
                    </div>
                  </div>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
