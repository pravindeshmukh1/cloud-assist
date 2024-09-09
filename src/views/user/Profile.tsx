import { Title } from '@mui/icons-material'
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Divider,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@mui/material'

const Profile = () => {
  return (
    <>
      <Container>
        <Paper>
          <Card>
            <CardHeader subheader="Account Details"  />
            <Divider />
            <CardContent>
              <Typography variant="body2" gutterBottom>
                Email: raj@gmail.com
              </Typography>
              <Typography variant="body2" gutterBottom>
                Status:
                <Chip label="Active" variant="outlined" color="info" />
              </Typography>
              <Typography variant="body2" gutterBottom>
                Role:
                <Chip label="Admin" variant="filled" color="primary" />
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </Container>
    </>
  )
}

export default Profile
