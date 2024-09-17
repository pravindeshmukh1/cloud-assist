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
  CardContent,
  Chip,
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
import MicIcon from '@mui/icons-material/Mic'
import SearchIcon from '@mui/icons-material/Search'
import { GridDeleteIcon } from '@mui/x-data-grid'
import { useParams, useSearchParams } from 'react-router-dom'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'
const Dashboard = () => {
  const [searchParam, setSearchParam] = useSearchParams()
  console.log(searchParam.get('uid'))
  console.log(searchParam.get('role'))
  console.log(searchParam.get('flag'))
  console.log(searchParam.get('Cid'))

  if (searchParam.size > 0) {
    localStorage.setItem('userId', searchParam.get('uid'))
    localStorage.setItem('role', searchParam.get('role'))
    localStorage.setItem('flag', searchParam.get('flag'))
    localStorage.setItem('cid', searchParam.get('Cid'))
  }
  const [bot, setBot] = useState<Bot[]>([])

  const [text, setText] = useState('')

  const handleChange = (event) => {
    setText(event.target.value)
  }

  useEffect(() => {
    axios
      .get<Bot[]>(`${constants.getAssistantByUser}/${localStorage.getItem('userId')}`)
      .then((res) => {
        setBot(res.data)
        setactiveBot(res.data[0])
      })
      .catch((err) => {
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
      {!(bot.length == 0) ? (
        <div>{'No bots avalaible Please create one'}</div>
      ) : (
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
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    console.log('🚀 ~ values:', values)
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2))
                      setSubmitting(false)
                    }, 400)
                    let data: Message = {
                      id: 1,
                      message: values.msg,
                      msgBy: 'user',
                    }
                    setMessages((msg) => [...msg, data])
                    // let post = {
                    //   asstId: activeBot?.assistantId,
                    //   threadId: activeBot?.threadId,
                    //   text: values.msg,
                    //   userId:localStorage.getItem("userId")
                    // }

                    // axios
                    //   .post<MsgResponse>(constants.chatLink, post)
                    //   .then((res) => {
                    //     console.log(res)
                    //     setSubmitting(false)
                    //   }, 400)
                    //   let data: Message = {
                    //     id: 1,
                    //     message: values.msg,
                    //     msgBy: 'user',
                    //   }
                    //   setMessages((msg) => [...msg, data])
                    //   let post = {
                    //     asstId: activeBot?.assistantId,
                    //     threadId: activeBot?.threadId,
                    //     text: values.msg,
                    //   }

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
                        resetForm()
                      })
                      .catch((err) => console.log(err))
                  }}
                >
                  {({ isSubmitting, resetForm }) => (
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
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{
                            mb: 4,
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            alignItems: 'center',
                            rowGap: 2,
                          }}
                        >
                          <FormControl sx={{ m: 1, minWidth: 80, mb: 1 }} size="small">
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
                                  {/* <div style={{ display: 'flex' }}>
                                    <input
                                      type="text"
                                      className="form-control form-control-lg shadow-none ps-1 ps-sm-2 rounded-pill"
                                      placeholder="Ask the Question"
                                      aria-label="Search..."
                                      style={{
                                        fontSize: '18px',
                                        borderStyle: 'solid',
                                        border: '1px solid #afafaf',
                                        padding: '3px',
                                        paddingLeft: '10px',
                                        lineHeight: '1',
                                        minWidth: '800px',
                                        maxWidth: '200px',
                                        // backgroundColor: '#fff',
                                        borderRadius: '30px',
                                      }}
                                      {...field}
                                    />
                                    <IconButton
                                      style={{ marginLeft: '-50px' }}
                                      type="submit"
                                      disabled={isSubmitting}
                                    >
                                      <SendIcon color="action" fontSize="small" />
                                    </IconButton>
                                    <IconButton style={{ marginLeft: '-80px' }}>
                                      <MicIcon color="action" fontSize="small" />
                                    </IconButton>
                                  </div> */}
                                  <Box sx={{ minWidth: '50vw', maxWidth: '100%' }}>
                                    <TextField
                                      fullWidth
                                      {...field}
                                      onChange={handleChange}
                                      variant="outlined"
                                      label="Ask the Question"
                                      size="small"
                                      // placeholder="Ask the Question"
                                      // multiline
                                      minRows={1} // Minimum number of rows
                                      maxRows={10} // Maximum number of rows before scroll appears
                                      value={text}
                                      InputLabelProps={{
                                        sx: {},
                                      }}
                                      sx={{
                                        '& .MuiInputBase-root': {
                                          // fontSize: '16px',
                                          padding: '1px',
                                          paddingLeft: '10px',
                                          lineHeight: '1',
                                          // minWidth: '800px',
                                          // maxWidth: '200px',
                                          backgroundColor: '#fff',
                                          borderRadius: '30px',
                                        },
                                      }}
                                      slotProps={{
                                        input: {
                                          endAdornment: (
                                            <InputAdornment position="start">
                                              <IconButton>
                                                <MicIcon color="action" fontSize="small" />
                                              </IconButton>
                                              <IconButton type="submit" disabled={isSubmitting}>
                                                <SendIcon color="action" fontSize="small" />
                                              </IconButton>
                                            </InputAdornment>
                                          ),
                                        },
                                      }}
                                    />
                                  </Box>
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
                                <Card
                                  sx={{
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    m: 0.5,
                                  }}
                                >
                                  <CardContent>
                                    <Markdown>{res.message}</Markdown>
                                    <Stack
                                      direction="row"
                                      sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                                    >
                                      {res.msgBy === 'AI' ? (
                                        <Chip
                                          label={res.msgBy}
                                          color="default"
                                          variant="outlined"
                                          size="small"
                                        />
                                      ) : (
                                        <Chip
                                          label={res.msgBy}
                                          color="primary"
                                          variant="outlined"
                                          size="small"
                                        />
                                      )}
                                      <Box>
                                        <IconButton size="small">
                                          <ThumbUpOffAltIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small">
                                          <ThumbDownOffAltIcon fontSize="small" />
                                        </IconButton>
                                      </Box>
                                    </Stack>
                                  </CardContent>
                                </Card>
                              </>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Dashboard
