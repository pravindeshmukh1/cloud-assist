import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import constants from '../../constants'
import { Assistant, Bot } from '../../interface'
import { useState } from 'react'
import { prompts } from "../../prompts";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
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
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import {
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import YouTubeIcon from '@mui/icons-material/YouTube'
import LinkIcon from '@mui/icons-material/Link'
import LiveHelpIcon from '@mui/icons-material/LiveHelp'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import HdrStrongOutlinedIcon from '@mui/icons-material/HdrStrongOutlined'
import HdrWeakOutlinedIcon from '@mui/icons-material/HdrWeakOutlined'
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import MoreTimeIcon from '@mui/icons-material/MoreTime'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import DoneIcon from '@mui/icons-material/Done'

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
  const navigate=useNavigate()
  const location = useLocation()
  const { name, model1 } = location.state
  console.log(name);
  console.log(model1);
  
  
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
    if(files!=null){
    if(files?.length>0){
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
    }}
    navigate("/botList",{state:{assistant}})
  }
  const handleUpload = async (assistantId: string) => {
    // if(files!=null){
    if (files) {
      setStatus('uploading')

      const formData = new FormData();
      [...files].forEach((file) => {
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
  // }
    if(websiteUrl.length>0){
      let data={
        "userId":localStorage.getItem("userId"),
        assistantId,
        url:websiteUrl
      }
      axios
            .post<Assistant>(`${constants.uploadWebsite}`, { ...data })
            .then((res) => {}).catch(err=>console.log(err)
            )
    }
  }

  const [model, setModel] = useState(model1)
  const [instruction, setinstruction] = useState("")
  const [url, seturl] = useState("")

  const [websiteUrl, setwebsiteUrl] = useState<Array<String>>([])

  const handleModelChange = (event: SelectChangeEvent) => {
    setModel(event.target.value)
  }
  function updatedName(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    let val =event.target.value
    seturl(val)
    // setwebsiteUrl([...websiteUrl,val])
  }


  
  function addVal(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
const regex = new RegExp(expression);
const t = url;

if (t.match(regex)) {
  // alert("Successful match");
  seturl('')
  setwebsiteUrl([...websiteUrl,url])
} else {
  alert("must be a url");
}
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

  //model
  const [dialog, setDialogOpen] = useState(false)
  const [youtubeDialog, setYoutubeDialog] = useState(false)
  const [faqDialog, setFaqDialog] = useState(false)

  const handleDialogOpen = () => {
    setDialogOpen(true)
  }

  const handleClose = () => {
    setDialogOpen(false)
    setYoutubeDialog(false)
    setFaqDialog(false)
  }
  const handleYoutubeDialogOpen = () => {
    setYoutubeDialog(true)
  }
  const handleFaqDialogOpen = () => {
    setFaqDialog(true)
  }

  //faq
  const [faqs, setFAQs] = useState([
    {
      question: '',
      answer: '',
    },
  ])

  const handleAddQuestion = () => {
    setFAQs([...faqs, { question: '', answer: '' }])
  }

  const handleRemoveQuestion = (index) => {
    setFAQs(faqs.filter((_, i) => i !== index))
  }

  const handleChanges = (event, index, field) => {
    const updatedFAQs = [...faqs]
    updatedFAQs[index][field] = event.target.value
    setFAQs(updatedFAQs)
  }

  const handleFaqSubmit = () => {
    // Handle form submission (e.g., send data to server)
    
    console.log(faqs)
  }
  // bot files
  interface Column {
    id: string
    label: string
    minWidth?: number
    align?: 'left'
    format?: (value: number) => string
  }

  const columns: readonly Column[] = [
    { id: 'name', label: 'File Name', minWidth: 170 },
    {
      id: 'size',
      label: 'Size',
      minWidth: 170,
      align: 'left',
      format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'noOfDocs',
      label: 'No of Documents',
      minWidth: 170,
      align: 'left',
      format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'createdDt',
      label: 'Created Date',
      minWidth: 170,
      align: 'left',
      format: (value: number) => value.toLocaleString('en-US'),
    },
  ]
  function createData(name: string, code: string, population: number, size: number): Data {
    const density = population / size
    return { name, code, population, size, density }
  }
  const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
  ]
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  interface Document {
    size: string
    id: number
    name: string
    description: string
    assistantId: string
    threadId: string
    userId: string
    documentId: string
    createdDt: string
    instruction: string
  }
  const [document, setDocument] = useState<Document[]>([
    {
      id: 0,
      name: '',
      description: '',
      assistantId: '',
      threadId: '',
      userId: '',
      documentId: '',
      createdDt: '',
      instruction: '',
      size: '',
    },
  ])

  return (
    <Card>
      {/* {bot?.id} */}
      {/* <h1>{props.assistant}</h1> */}
      {/* <Button onClick={()=>props.updateVal}>update</Button> */}
      <Formik
        initialValues={{
          name: name != null ? name : '',
          description: '',
          model: model1!=null?model1:'',
          promptName: '',
          instructions: instruction,
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
                <CardHeader
                  action={
                    // <Button
                    //   component="label"
                    //   variant="contained"
                    //   color="info"
                    //   size="small"
                    //   onClick={handleClickOpen}
                    //   startIcon={<AddIcon />}
                    // >
                    //   Add
                    // </Button>
                    <CDropdown variant="btn-group">
                      <CDropdownToggle color="info" size="sm" style={{ color: 'white' }}>
                        <AddIcon />
                        Add
                      </CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem style={{ marginRight: 12 }} onClick={handleDialogOpen}>
                          <LinkIcon fontSize="small" color="primary" style={{ marginRight: 10 }} />
                          Website Url
                        </CDropdownItem>
                        <CDropdownItem onClick={handleYoutubeDialogOpen}>
                          <YouTubeIcon fontSize="small" color="error" style={{ marginRight: 10 }} />
                          YouTube
                        </CDropdownItem>
                        <CDropdownItem onClick={handleFaqDialogOpen}>
                          <LiveHelpIcon
                            fontSize="small"
                            color="primary"
                            style={{ marginRight: 10 }}
                          />
                          FAQ
                        </CDropdownItem>
                        <CDropdownDivider />
                        <CDropdownItem href="#">Separated link</CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                  }
                  title="Bot Configuration"
                  subheader=""
                  titleTypographyProps={{ fontSize: 18 }}
                />

                  {/* <FormControl size="small" fullWidth sx={{ marginTop: 1, marginBottom: 1 }}>
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
                  </FormControl> */}

                  {/* <TextField
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
                  /> */}
                  {/* <TextField
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
                  /> */}

                  {/* <Button
                    component="label"
                    // role={undefined}
                    variant="outlined"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    fullWidth
                    sx={{ p: 10, border: '1px dashed grey', marginTop: 2, marginBottom: 0 }}
                    /> */}
                <Dialog
                  maxWidth="lg"
                  open={dialog}
                  onClose={handleClose}
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogTitle
                    sx={{ m: 0, p: 1, borderBottom: 1 }}
                    id="customized-dialog-title"
                    fontSize={18}
                  >
                    Import a Website URL
                  </DialogTitle>
                  <IconButton
                    aria-label="close"
                    size="small"
                    onClick={handleClose}
                    sx={(theme) => ({
                      position: 'absolute',
                      right: 4,
                      top: 4,
                      color: theme.palette.grey[500],
                    })}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>

                  <DialogContent>
                    <DialogContentText>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: 1,
                          width: '400px',
                        }}
                      >
                        <TextField
                          label="Please copy Website URL:"
                          id="outlined-size-small"
                          size="small"
                          fullWidth
                          value={url}
                          onChange={updatedName}
                        />
                        <Button autoFocus variant="outlined" color="info" onClick={addVal}>
                          Add
                        </Button>
                        <Divider />
                      </Box>
                      <Box
                        sx={{
                          width: '400px',
                          mt: 2,
                        }}
                      >
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                          {websiteUrl.map((value,index) => (
                            <ListItem
                              key={index}
                              disableGutters
                              secondaryAction={
                                <IconButton aria-label="comment">
                                  <DeleteForeverIcon color="error" fontSize="small" />
                                </IconButton>
                              }
                            >
                              <Chip
                                label={value}
                                // onClick={handleClick}
                                // onDelete={handleDelete}
                                deleteIcon={<DeleteForeverIcon />}
                                variant="filled"
                                color="success"
                              />
                              <Divider variant="inset" component="li" />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    </DialogContentText>
                  </DialogContent>
                </Dialog>

                <Dialog
                  maxWidth="lg"
                  open={youtubeDialog}
                  onClose={handleClose}
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogTitle
                    sx={{ m: 0, p: 1, borderBottom: 1 }}
                    id="customized-dialog-title"
                    fontSize={18}
                  >
                    Import a Youtube Video
                  </DialogTitle>
                  <IconButton
                    aria-label="close"
                    size="small"
                    onClick={handleClose}
                    sx={(theme) => ({
                      position: 'absolute',
                      right: 4,
                      top: 4,
                      color: theme.palette.grey[500],
                    })}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>

                  <DialogContent>
                    <DialogContentText>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: 1,
                          width: '400px',
                        }}
                      >
                        <TextField
                          label="Please copy the video link below:"
                          id="outlined-size-small"
                          size="small"
                          fullWidth
                        />
                        <Button autoFocus variant="outlined" color="info">
                          Add
                        </Button>
                        <Divider />
                      </Box>
                      <Box
                        sx={{
                          width: '400px',
                          mt: 2,
                        }}
                      >
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                          {[1].map((value) => (
                            <ListItem
                              key={value}
                              disableGutters
                              secondaryAction={
                                <IconButton aria-label="comment">
                                  <DeleteForeverIcon color="error" fontSize="small" />
                                </IconButton>
                              }
                            >
                              <Chip
                                label="https://www.youtube.com/watch?v=YraxnPsxZgc"
                                // onClick={handleClick}
                                // onDelete={handleDelete}
                                deleteIcon={<DeleteForeverIcon />}
                                variant="filled"
                                color="success"
                              />
                              <Divider variant="inset" component="li" />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    </DialogContentText>
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={faqDialog}
                  onClose={handleClose}
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogTitle
                    sx={{ m: 0, p: 1, borderBottom: 1 }}
                    id="customized-dialog-title"
                    fontSize={18}
                  >
                    Add FAQ's
                  </DialogTitle>
                  <IconButton
                    aria-label="close"
                    size="small"
                    onClick={handleClose}
                    sx={(theme) => ({
                      position: 'absolute',
                      right: 4,
                      top: 4,
                      color: theme.palette.grey[500],
                    })}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>

                  <DialogContent>
                    <DialogContentText>
                      {faqs.map((faq, index) => (
                        <Box key={index}>
                          <TextField
                            label="Enter the question"
                            size="small"
                            fullWidth
                            variant="outlined"
                            sx={{ mb: 2 }}
                            value={faq.question}
                            onChange={(e) => handleChanges(e, index, 'question')}
                          />
                          <TextField
                            fullWidth
                            label="Enter the answer"
                            size="small"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={faq.answer}
                            onChange={(e) => handleChanges(e, index, 'answer')}
                          />
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                              alignItems: 'center',
                              gap: 1,
                              mt: 2,
                            }}
                          >
                            <Divider />
                            <Button
                              onClick={() => handleRemoveQuestion(index)}
                              variant="outlined"
                              color="error"
                              size="small"
                              startIcon={<DeleteForeverIcon />}
                              sx={{ mb: 2, mt: 2, float: 'right' }}
                            >
                              Remove
                            </Button>
                          </Box>
                        </Box>
                      ))}
                    </DialogContentText>
                    <DialogActions>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: 3,
                          mt: 1,
                        }}
                      >
                        <Divider />
                        <Button
                          variant="outlined"
                          color="info"
                          size="small"
                          onClick={handleAddQuestion}
                          startIcon={<AddIcon />}
                        >
                          Add Question
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={handleFaqSubmit}
                          startIcon={<SaveAltOutlinedIcon />}
                        >
                          Save FAQ
                        </Button>
                      </Box>
                    </DialogActions>
                  </DialogContent>
                </Dialog>

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
                          <MenuItem value="gpt-4o-mini">GPT-4o Mini</MenuItem>
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
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table" size="small">
            <TableHead style={{ backgroundColor: 'skyblue' }}>
              <TableRow>
                {columns.map((column) => (
                  <>
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, backgroundColor: 'skyblue' }}
                    >
                      {column.label}
                    </TableCell>
                  </>
                ))}
                <TableCell
                style={{backgroundColor: 'skyblue' }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {document.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                function deletAssistant(assistantId: string) {
                  axios
                    .delete(`${constants.deleteAssistant}/${assistantId}`)
                    .catch((err) => console.log(err))
                }

                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id]
                      return (
                        <>
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        </>
                      )
                    })}
                    <TableCell sx={{ float: 'left' }}>
                      <Button
                        onClick={deletAssistant(row.assistantId)}
                        variant="outlined"
                        color="error"
                        size="small"
                        startIcon={<DeleteForeverIcon />}
                        sx={{ mb: 2, mt: 2, float: 'right' }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Card>
  )
}

export default BotConfig
