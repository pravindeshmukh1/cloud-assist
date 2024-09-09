import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import {
  Avatar,
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
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import { useTheme } from '@emotion/react'
import { GridCloseIcon } from '@mui/x-data-grid'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'

import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Chip from '@mui/material/Chip'

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
      botName.indexOf(name) === -1
        ? 'typography.fontWeightRegular'
        : 'typography.fontWeightMedium',
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
  const theme = useTheme()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

    const [role, setRole] = React.useState('')

    const handleRoleChange = (event: SelectChangeEvent) => {
      setRole(event.target.value as string)
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
          <DialogTitle id="responsive-dialog-title" color="info" borderBottom={1}>
            Add User
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              position: 'absolute',
              left: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <GridCloseIcon />
          </IconButton>

          <DialogContent>
            <DialogContentText>
              <Box component="form" sx={{ '& .MuiTextField-root': { m: 2, width: '400px' } }}>
                <div>
                  <TextField label="Name" id="outlined-size-small" defaultValue="" size="small" />
                  <TextField label="Email" id="outlined-size-small" defaultValue="" size="small" />
                </div>
                <div>
                  <TextField
                    label="Phone Number"
                    id="outlined-size-small"
                    defaultValue=""
                    size="small"
                  />
                  <TextField
                    label="Size"
                    id="outlined-size-small"
                    defaultValue="Small"
                    size="small"
                  />
                </div>
                <div>
                  <FormControl sx={{ m: 2, width: 400 }} size="small">
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={role}
                      label="Role"
                      onChange={handleRoleChange}
                    >
                      <MenuItem value={'admin'}>Admin</MenuItem>
                      <MenuItem value={'user'}>User</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ m: 2, width: 400 }} size="small">
                    <InputLabel id="">Bot</InputLabel>
                    <Select
                      labelId=""
                      id=""
                      multiple
                      value={botName}
                      onChange={handleChange}
                      input={<OutlinedInput id="select-multiple-chip" label="Bot" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {names.map((name) => (
                        <MenuItem key={name} value={name} style={getStyles(name, botName)}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus variant="outlined" color="info" onClick={handleClose}>
              Close
            </Button>
            <Button variant="outlined" color="primary" onClick={handleClose} autoFocus>
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <CardContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
              <TableHead style={{ backgroundColor: 'skyblue' }}>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Role</TableCell>
                  <TableCell align="left">Location</TableCell>
                  <TableCell align="left">Phone Number</TableCell>
                  <TableCell align="left">Create Date</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="left">
                      <Chip label={row.role} variant="filled" color="success" />
                    </TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.location}</TableCell>
                    <TableCell align="left">{row.phoneNumber}</TableCell>
                    <TableCell align="left">{row.createDate}</TableCell>
                    <TableCell align="left">
                      <ButtonGroup variant="outlined" aria-label="Basic button group" size="small">
                        <Button
                          component="label"
                          variant="outlined"
                          startIcon={<Edit color="info" />}
                        >
                          Edit
                        </Button>
                        <Button
                          component="label"
                          variant="outlined"
                          color="error"
                          startIcon={<Delete color="error" />}
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  )
}

export default AddUser
