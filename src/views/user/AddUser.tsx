import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import { useTheme } from '@emotion/react'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import CloseIcon from '@mui/icons-material/Close'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Chip from '@mui/material/Chip'
import { Field, Form, Formik } from 'formik'
import axios from 'axios'
import { Bot, users } from '../../interface'
import constants from '../../constants'
import * as Yup from 'yup';

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const userCreateSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  assistant: Yup.string().required('Required'),
  username: Yup.string().required('Required'),
  phoneNo: Yup.string().min(10, "mobile number must be 10 digit").max(10, "mobile number must be 10 digit").required('Required'),
  email: Yup.string().email('Invalid email').required('Required')
});

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
]

function getStyles(name: string, botName: readonly string[]) {
  return {
    fontWeight:
      botName.indexOf(name) === -1 ? 'typography.fontWeightRegular' : 'typography.fontWeightMedium',
  }
}

function createData(
  name: string,
  role: string,
  email: string,
  location: string,
  phoneNumber: number,
  createDate: string,
) {
  return { name, role, email, location, phoneNumber, createDate }
}

const rows = [
  createData('raj', 'Admin', 'raj@gma.com', 'mumbai', 9898989898, '22 Apr 2022, 1:43 PM	'),
]
const AddUser = () => {
  const [open, setOpen] = React.useState(false)
  const [openEdit, setOpenEdit] = React.useState(false)
  const theme = useTheme()
  const [bot, setBot] = React.useState<Bot[]>()
  const [editusr, seteditusr] = React.useState<users>()
  const [user, setuser] = React.useState<users[]>()
  interface userList {
    message: string,
    userLists: users[]
  }
  React.useEffect(() => {
    axios
      .get<Bot[]>(`${constants.getAssistantByUser}/${localStorage.getItem('userId')}`)
      .then((res) => {
        setBot(res.data)
      })
      .catch((err) => {
        console.error(err)
      })

  }, [])
  const [updateScreen, setupdateScreen] = React.useState(false)
  React.useEffect(() => {
    axios
      .get(`${constants.getusers}?cid=${localStorage.getItem('cid')}`)
      // .get<users[]>(`${constants.getusers}?cid=${3}`)
      .then((res) => {
        if (res.data?.message) {

        } else {
          console.log(res.data);
          setuser(res.data)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }, [updateScreen])

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClickOpenEditBot = (val: users) => {
    setOpenEdit(true)
    seteditusr(val)
    // setOpen(true)
  }

  const handleClose = () => {
    seteditusr(undefined)
    setOpen(false);
    setOpenEdit(false)
  }

  const [role, setRole] = React.useState('')
  // const [bot, setBot] = React.useState('')

  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string)
  }
  const handleBotChange = (event: SelectChangeEvent) => {
    setBot(event.target.value as string)
  }
  const [botName, setbotName] = React.useState<string[]>([])

  const handleChange = (event: SelectChangeEvent<typeof botName>) => {
    const {
      target: { value },
    } = event
    setbotName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    )
  }

  function deleteUser(row: users): void {
    axios
      .get<users[]>(`${constants.deleteuser}?id=${row.Id}`)
      // .get<users[]>(`${constants.getusers}?cid=${3}`)
      .then((res) => {
        setupdateScreen(res => !res)
        // console.log(res.data);
        // setuser(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <Box>
      <Card>
        <CardHeader
          action={
            <Button
              component="label"
              variant="contained"
              color="info"
              size="small"
              onClick={handleClickOpen}
              startIcon={<PersonAddAltIcon />}
            >
              Add User
            </Button>
          }
          title="User List"
          subheader=""
          titleTypographyProps={{ fontSize: 18 }}
        />

        <Dialog
          maxWidth="lg"
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle
            sx={{ m: 0, p: 1, borderBottom: 1, backgroundColor: 'blue' }}
            id="customized-dialog-title"
            fontSize={18}
            style={{ backgroundColor: 'skyblue' }}
          >
            Add User
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

              <Formik
                initialValues={{
                  name: editusr?.Username ? editusr?.Username : '',
                  email: editusr?.Email ? editusr?.Email : '',
                  phoneNo: editusr?.phone ? editusr?.phone : '',
                  password: '',
                  assistant: editusr?.assistantId ? editusr?.assistantId : '',
                  username: editusr?.Username ? editusr?.Username : '',
                }}
                validationSchema={userCreateSchema}
                onSubmit={async (values) => {
                  await new Promise((r) => setTimeout(r, 500));
                  alert(JSON.stringify(values, null, 2));


                  axios.post(`${constants.adduser}?Email=${values.email}&Password=${values.password}&UserType=User&cid=${localStorage.getItem('cid')}&assistantId=${values.assistant}&phone=${values.phoneNo}&Username=${values.username}`)
                    .then(res => {
                      alert(res.data)
                      console.log(res.data);
                      axios.post(`${constants.userAssistant}/23/add/${values.assistant}/${localStorage.getItem("userId")}`)

                    }).catch(err => console.log(err)
                    )
                }}
              >
                {({ values, isSubmitting, handleChange, handleBlur, handleSubmit, errors, touched ,isValid}) => (
                  <form onSubmit={handleSubmit}>
                    <div>
                      <FormControl sx={{ m: 2, minWidth: 257 }} size="small">
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
                        />
                      {errors.name && touched.name ? (
                        <span>{errors.name}</span>
                      ) : null}
                      </FormControl>
                      <FormControl sx={{ m: 2, minWidth: 257 }} size="small">
                        <TextField
                          label="Email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          margin="normal"
                          id="outlined-size-small"
                          size="small"
                          fullWidth
                        />
                        {errors.email && touched.email ? (
                        <span>{errors.email}</span>
                      ) : null}
                      </FormControl>
                    </div>
                    <div>
                      <FormControl sx={{ m: 2, minWidth: 257 }} size="small">
                        <TextField
                          label="Phone No"
                          name="phoneNo"
                          value={values.phoneNo}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          margin="normal"
                          id="outlined-size-small"
                          size="small"
                          fullWidth

                        />
                          {errors.phoneNo && touched.phoneNo ? (
                        <span>{errors.phoneNo}</span>
                      ) : null}
                      </FormControl>
                      <FormControl sx={{ m: 2, minWidth: 257 }} size="small">
                        <TextField
                          label="Password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          margin="normal"
                          id="outlined-size-small"
                          size="small"
                          fullWidth

                        />
                        {errors.password && touched.password ? (
                        <span>{errors.password}</span>
                      ) : null}
                      </FormControl>
                    </div>
                    <div>
                      <FormControl sx={{ m: 2, minWidth: 257 }} size="small">
                        <TextField
                          label="User Name"
                          name="username"
                          value={values.username}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          margin="normal"
                          id="outlined-size-small"
                          size="small"
                          fullWidth
                        />
                        {errors.username && touched.username ? (
                        <span>{errors.username}</span>
                      ) : null}
                      </FormControl>
                      <FormControl sx={{ m: 2, minWidth: 257 }} size="small">
                        <InputLabel id="demo-simple-select-label">Bot</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          label="Bot"
                          name="assistant"
                          value={values.assistant}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          id="outlined-size-small"
                          size="small"
                          fullWidth
                        >
                          {bot?.map(res => {
                            return (
                              <MenuItem value={res.assistantId}>{res.name}</MenuItem>
                            )
                          })}
                          <MenuItem value={10}>Ten</MenuItem>
                        </Select>
                        {errors.assistant && touched.assistant ? (
                        <span>{errors.assistant}</span>
                      ) : null}
                      </FormControl>
                    </div>
                    {isValid}
                    <Button variant="outlined" color="primary" type='submit' autoFocus disabled={!isValid}>
                      Save
                    </Button>
                    <Button autoFocus variant="outlined" color="info" onClick={handleClose}>
                      Close
                    </Button>
                  </form>
                  
                )}
                {/* <Form>
        <label htmlFor="firstName">First Name</label>
        <Field id="firstName" name="firstName" placeholder="Jane" />
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
        <label htmlFor="lastName">Last Name</label>
        <Field id="lastName" name="lastName" placeholder="Doe" />

        <label htmlFor="email">Email</label>
        <Field
          id="email"
          name="email"
          placeholder="jane@acme.com"
          type="email"
        />
        <button type="submit">Submit</button>
      </Form> */}
              </Formik>
            </DialogContentText>
          </DialogContent>
          {/* <DialogActions>
            <Button autoFocus variant="outlined" color="info" onClick={handleClose}>
              Close
            </Button>
            <Button variant="outlined" color="primary" onClick={handleClose} autoFocus>
              Save
            </Button>
          </DialogActions> */}
        </Dialog>

        <Dialog
          maxWidth="lg"
          open={openEdit}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle
            sx={{ m: 0, p: 1, borderBottom: 1, backgroundColor: 'blue' }}
            id="customized-dialog-title"
            fontSize={18}
            style={{ backgroundColor: 'skyblue' }}
          >
            Edit User
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
              <Formik
                initialValues={{
                  name: editusr?.Username ? editusr?.Username : '',
                  email: editusr?.Email ? editusr?.Email : '',
                  phoneNo: editusr?.phone ? editusr?.phone : '',
                  password: '',
                  assistant: editusr?.assistantId ? editusr?.assistantId : '',
                  username: editusr?.Username ? editusr?.Username : '',
                }}
                onSubmit={async (values) => {
                  await new Promise((r) => setTimeout(r, 500));
                  alert(JSON.stringify(values, null, 2));


                  axios.post(`${constants.updateusers}?&assistantId=${values.assistant}&phone=${values.phoneNo}&id=${editusr?.Id}`)
                    .then(res => {
                      alert(res.data)
                      console.log(res.data);

                    }).catch(err => console.log(err)
                    )
                }}
              >
                {({ values, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <div>
                      <FormControl sx={{ m: 2, minWidth: 257 }} size="small">
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
                        />
                      </FormControl>
                      <FormControl sx={{ m: 2, minWidth: 257 }} size="small">
                        <TextField
                          label="Email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          margin="normal"
                          id="outlined-size-small"
                          size="small"
                          fullWidth
                        />
                      </FormControl>
                    </div>
                    <div>
                      <FormControl sx={{ m: 2, minWidth: 257 }} size="small">
                        <TextField
                          label="Phone No"
                          name="phoneNo"
                          value={values.phoneNo}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          margin="normal"
                          id="outlined-size-small"
                          size="small"
                          fullWidth

                        />
                      </FormControl>
                      <FormControl sx={{ m: 2, minWidth: 257 }} size="small">
                        <TextField
                          label="Password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          margin="normal"
                          id="outlined-size-small"
                          size="small"
                          fullWidth

                        />
                      </FormControl>
                    </div>
                    <div>
                      <FormControl sx={{ m: 2, minWidth: 257 }} size="small">
                        <TextField
                          label="User Name"
                          name="username"
                          value={values.username}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          margin="normal"
                          id="outlined-size-small"
                          size="small"
                          fullWidth
                        />
                      </FormControl>
                      <FormControl sx={{ m: 2, minWidth: 257 }} size="small">
                        <InputLabel id="demo-simple-select-label">Bot</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          label="Bot"
                          name="assistant"
                          value={values.assistant}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          id="outlined-size-small"
                          size="small"
                          fullWidth
                        >
                          {bot?.map(res => {
                            return (
                              <MenuItem value={res.assistantId}>{res.name}</MenuItem>
                            )
                          })}
                          <MenuItem value={10}>Ten</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <Button variant="outlined" color="primary" type='submit' autoFocus>
                      Save
                    </Button>
                    <Button autoFocus variant="outlined" color="info" onClick={handleClose}>
                      Close
                    </Button>
                  </form>
                )}
              </Formik>



            </DialogContentText>

          </DialogContent>


        </Dialog>
        <CardContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
              <TableHead style={{ backgroundColor: 'skyblue' }}>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="left">Role</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Location</TableCell>
                  <TableCell align="left">Phone Number</TableCell>
                  <TableCell align="left">Create Date</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user ? <>

                  {user?.map((row) => (
                    <TableRow
                      key={row.Id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.Username}
                      </TableCell>
                      <TableCell align="left">
                        <Chip label={"User"} variant="filled" color="success" />
                      </TableCell>
                      <TableCell align="left">{row.Email}</TableCell>
                      <TableCell align="left">{row.Username}</TableCell>
                      <TableCell align="left">{row.phone}</TableCell>
                      <TableCell align="left">{row.createdDate}</TableCell>
                      <TableCell align="left">
                        <ButtonGroup variant="outlined" aria-label="Basic button group" size="small">
                          <Button
                            component="label"
                            variant="outlined"
                            startIcon={<Edit color="info" />}
                            onClick={() => handleClickOpenEditBot(row)}
                          >
                            Edit
                          </Button>
                          <Button
                            component="label"
                            variant="outlined"
                            color="error"
                            onClick={() => deleteUser(row)}
                            startIcon={<Delete color="error" />}
                          >
                            Delete
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))}
                </> : <>loading</>}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      {editusr?.createdDate}
    </Box>
  )
}

export default AddUser
