import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import constants from '../../constants'
import { Assistant, Bot } from '../../interface'
import { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  styled,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import HdrStrongOutlinedIcon from '@mui/icons-material/HdrStrongOutlined'
import HdrWeakOutlinedIcon from '@mui/icons-material/HdrWeakOutlined'
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import MoreTimeIcon from '@mui/icons-material/MoreTime'
import { Label } from '@mui/icons-material'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}))

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const BotConfig = () => {
  const [status1, setStatus1] = useState<boolean>(false)
  const bot: Bot = {
    assistantId: '',
    createdDt: '',
    description: '',
    documentId: '',
    expireDt: '',
    id: 0,
    instruction: '',
    model: '',
    name: '',
    noOfDocs: '',
    size: '',
    threadId: '',
    userId: '',
  }

  const [files, setFiles] = useState<FileList | null>(null)
  const [status, setStatus] = useState<'initial' | 'uploading' | 'success' | 'fail'>('initial')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setStatus('initial')
      setFiles(e.target.files)
    }
  }
  function completeSetup(assistant: string): void {
    let data = {
      asstId: assistant,
      path: '',
      botName: 'car',
    }
    axios
      .post(`${constants.uploadLocalFiles}`, data)
      .then((res) => {
        console.log(res)
        if (res.status == 200) {
          alert(true)
          setStatus1(true)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handleUpload = async (assistantId: string) => {
    if (files) {
      setStatus('uploading')

      const formData = new FormData()
      ;[...files].forEach((file) => {
        formData.append('files', file)
      })
      formData.append('body', assistantId)

      try {
        const result = await fetch(`${constants.uploadLink}/${localStorage.getItem('userId')}`, {
          method: 'POST',
          body: formData,
        })

        const data = await result.json()

        console.log(data)
        setStatus('success')
      } catch (error) {
        console.error(error)
        setStatus('fail')
      }
    }
  }

  const [model, setModel] = useState('')

  const handleModelChange = (event: SelectChangeEvent) => {
    setModel(event.target.value)
  }

  //Bot Schedule

  // Initialize state with an empty array for each weekday and enabled status
  const [schedules, setSchedules] = useState(
    weekdays.reduce((acc, day) => {
      acc[day] = [{ startTime: '09:00', endTime: '17:00' }]
      return acc
    }, {}),
  )

  const [enabledStatus, setEnabledStatus] = useState(
    weekdays.reduce((acc, day) => {
      acc[day] = true // Default all days to enabled
      return acc
    }, {}),
  )

  const [selectedDay, setSelectedDay] = useState(weekdays[0])

  const addSchedule = () => {
    setSchedules((prevSchedules) => ({
      ...prevSchedules,
      [selectedDay]: [...prevSchedules[selectedDay], { startTime: '09:00', endTime: '17:00' }],
    }))
  }

  const handleChange = (index, field, value) => {
    if (!enabledStatus[selectedDay]) return // Prevent changes if disabled

    setSchedules((prevSchedules) => {
      const updatedSchedules = prevSchedules[selectedDay].map((schedule, i) => {
        if (i === index) {
          const newSchedule = { ...schedule, [field]: value }

          // Validate time
          if (field === 'startTime' && newSchedule.startTime > newSchedule.endTime) {
            return schedule // Invalid start time
          } else if (field === 'endTime' && newSchedule.endTime < newSchedule.startTime) {
            return schedule // Invalid end time
          }

          return newSchedule
        }
        return schedule
      })

      return {
        ...prevSchedules,
        [selectedDay]: updatedSchedules,
      }
    })
  }

  const removeSchedule = (index) => {
    setSchedules((prevSchedules) => {
      const updatedSchedules = prevSchedules[selectedDay].filter((_, i) => i !== index)

      return {
        ...prevSchedules,
        [selectedDay]: updatedSchedules,
      }
    })
  }

  const toggleDayStatus = () => {
    setEnabledStatus((prevStatus) => ({
      ...prevStatus,
      [selectedDay]: !prevStatus[selectedDay],
    }))
  }
  return (
    <Card>
      {/* {bot?.id} */}
      {/* <h1>{props.assistant}</h1> */}
      {/* <Button onClick={()=>props.updateVal}>update</Button> */}
      <Formik
        initialValues={{
          name: bot != null ? bot.name : '',
          description: '',
          model: '',
          promptName: '',
          instructions: '',
        }}
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
          setSubmitting(false)
          // setTimeout(() => {
          //     alert(JSON.stringify(values, null, 2));
          //     setSubmitting(false);
          // }, 400);
          let data = {
            name: values.name,
            description: values.description,
            model: model,
            instructions: values.instructions,
            userid: localStorage.getItem('userId'),
            tools: [
              {
                type: 'file_search',
              },
            ],
          }
          console.log('🚀 ~ data:', data)
          axios
            .post<Assistant>(`${constants.link}/${localStorage.getItem('userId')}`, { ...data })
            .then((res) => {
              let threadData = {
                assistantId: res.data.id,
                userId: localStorage.getItem('userId'),
              }
              axios.post(`${constants.createThread}`, threadData).then((res) => {
                handleUpload(String(threadData.assistantId)).then((res) => {
                  completeSetup(String(threadData.assistantId))
                })
              })
              console.log(res)
            })
            .catch((err) => console.log(err))
        }}
      >
        {({ values, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Paper>
              <Card>
                <CardHeader title="Bot Config" />
                <CardContent>
                  <Stack direction="row" spacing={2}>
                    <Item>
                      <TextField
                        label="Name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        margin="normal"
                        id="outlined-size-small"
                        size="small"
                        fullWidth
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <SmartToyOutlinedIcon color="info" fontSize="inherit" />
                              </InputAdornment>
                            ),
                          },
                        }}
                      />
                      <TextField
                        label="Description"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        margin="normal"
                        id="outlined-size-small"
                        size="small"
                        fullWidth
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <DescriptionOutlinedIcon color="info" fontSize="inherit" />
                              </InputAdornment>
                            ),
                          },
                        }}
                      />

                      <FormControl size="small" fullWidth sx={{ marginTop: 1, marginBottom: 1 }}>
                        <InputLabel id="demo-select-small-label">Model</InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={model}
                          label="Model"
                          onChange={handleModelChange}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value="gpt-4o">GPT-4o</MenuItem>
                          <MenuItem value="gpt-4-turbo">GPT-4 Turbo and GPT-4</MenuItem>
                          <MenuItem value="gpt-3.5-turbo">GPT-3.5 Turbo</MenuItem>
                        </Select>
                      </FormControl>

                      <TextField
                        label="Prompt Name"
                        name="promptName"
                        value={values.promptName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        margin="normal"
                        id="outlined-size-small"
                        size="small"
                        fullWidth
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <HdrStrongOutlinedIcon color="info" fontSize="inherit" />
                              </InputAdornment>
                            ),
                          },
                        }}
                      />
                      <TextField
                        multiline
                        label="Prompt Instructions"
                        name="instructions"
                        value={values.instructions}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        margin="normal"
                        id="outlined-size-small"
                        size="small"
                        fullWidth
                        slotProps={{
                          input: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <HdrWeakOutlinedIcon color="info" fontSize="inherit" />
                              </InputAdornment>
                            ),
                          },
                        }}
                      />

                      <Button
                        component="label"
                        // role={undefined}
                        variant="outlined"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        fullWidth
                        sx={{ p: 10, border: '1px dashed grey', marginTop: 2, marginBottom: 0 }}
                      >
                        file here to upload
                        <VisuallyHiddenInput
                          type="file"
                          id="file"
                          onChange={handleFileChange}
                          multiple
                        />
                      </Button>
                      <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                        <Typography color="gray" fontSize={13} padding={0}>
                          <b>Supported Formats:</b> - Words, TXT, Excel, PDF Doc, DocX, PPT, PPTX,
                          XLS, XLSX, CSV Google Docs, Google Sheet, Google Slides , SQL Videos -
                          MP4, MOV, WMV
                        </Typography>
                      </Box>
                      <Box>
                        {files &&
                          [...files].map((file, index) => (
                            // <section key={file.name}>
                            //   File number {index + 1} details:
                            //   <ul>
                            //     <li>Name: {file.name}</li>
                            //     <li>Type: {file.type}</li>
                            //     <li>Size: {file.size} bytes</li>
                            //   </ul>
                            // </section>
                            <Box key={file.name}>
                              <List>
                                <ListItem className="flex-row gap-2">
                                  <Chip
                                    variant="outlined"
                                    color="info"
                                    size="small"
                                    label={index + 1}
                                  />
                                  <ListItemText primary={file.name} secondary={file.type} />
                                  <ListItemButton sx={{ fontSize: '14px' }} disabled>
                                    Size: {file.size} bytes
                                  </ListItemButton>
                                </ListItem>
                              </List>
                            </Box>
                          ))}
                      </Box>
                    </Item>
                    <Item sx={{ minWidth: '20vw' }}>
                      <InputLabel htmlFor="input-with-icon-adornment" sx={{ mb: 2, float: 'left' }}>
                        Schedule Bot
                      </InputLabel>

                      <FormControl fullWidth>
                        <InputLabel>Select Day</InputLabel>
                        <Select
                          value={selectedDay}
                          onChange={(e) => setSelectedDay(e.target.value)}
                          label="Select Day"
                          size="small"
                        >
                          {weekdays.map((day) => (
                            <MenuItem key={day} value={day}>
                              {day}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <FormControlLabel
                        control={
                          <Switch
                            checked={enabledStatus[selectedDay]}
                            onChange={toggleDayStatus}
                            color="primary"
                            size="small"
                          />
                        }
                        label={enabledStatus[selectedDay] ? 'Enabled' : 'Disabled'}
                      />

                      {enabledStatus[selectedDay] ? (
                        <>
                          {schedules[selectedDay].map((schedule, index) => (
                            <div
                              key={index}
                              style={{
                                marginBottom: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <TextField
                                variant="outlined"
                                type="time"
                                size="small"
                                value={schedule.startTime}
                                onChange={(e) => handleChange(index, 'startTime', e.target.value)}
                              />
                              <span> - </span>
                              <TextField
                                variant="outlined"
                                type="time"
                                size="small"
                                value={schedule.endTime}
                                onChange={(e) => handleChange(index, 'endTime', e.target.value)}
                              />
                              <IconButton
                                color="error"
                                onClick={() => removeSchedule(index)}
                                style={{ marginLeft: '10px' }}
                              >
                                <DeleteForeverIcon />
                              </IconButton>
                            </div>
                          ))}
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={addSchedule}
                            startIcon={<MoreTimeIcon />}
                          >
                            Add Time Schedule
                          </Button>
                        </>
                      ) : (
                        <p>Schedules are disabled for this day.</p>
                      )}
                    </Item>
                  </Stack>

                  <CardActions sx={{ float: 'right' }}>
                    <Button
                      variant="contained"
                      type="submit"
                      color="info"
                      disabled={isSubmitting}
                      startIcon={<SaveAltOutlinedIcon />}
                    >
                      Save
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            </Paper>
          </form>
        )}
      </Formik>
    </Card>
  )
}

export default BotConfig
