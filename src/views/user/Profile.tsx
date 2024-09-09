import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Divider,
  Paper,
  Typography,
} from '@mui/material'

const Profile = () => {
  return (
    <>
      <Container>
        <Paper>
          <Card>
            <CardHeader
              title="Account Details"
              sx={{ backgroundColor: 'skyblue' }}
              titleTypographyProps={{ fontSize: 18 }}
            />
            <Divider />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
                <Typography variant="body2" gutterBottom>
                  Email :
                </Typography>
                <Typography variant="body2" gutterBottom>
                  raj@gmail.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
                <Typography variant="body2" gutterBottom>
                  Status :
                </Typography>
                <Chip label="Active" variant="outlined" color="primary" />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
                <Typography variant="body2" gutterBottom>
                  Role :
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Admin
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Paper>
      </Container>
    </>
  )
}

export default Profile
