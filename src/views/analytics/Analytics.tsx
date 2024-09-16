import React from 'react'
import {
  Paper,
  Grid,
  Box,
  Divider,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Fab,
  Card,
  CardContent,
  CardActions,
  InputAdornment,
  IconButton,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { styled } from '@mui/material/styles'

const MessageArea = styled(List)(({ theme }) => ({
  height: '70vh',
  overflowY: 'auto',
}))

const TypingContainer = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
}))
const Analytics = () => {
  return (
    <>
      <Paper>
        <MessageArea>
          <ListItem key="1" sx={{ flexDirection: 'row-reverse' }}>
            <Card>
              <CardContent>
                <ListItemText primary="Hey man, What's up ?" />
              </CardContent>
              <CardActions sx={{ float: 'right' }}>
                <ListItemText secondary="09:30" />
              </CardActions>
            </Card>
          </ListItem>
          <ListItem key="2">
            <Card>
              <CardContent>
                <ListItemText primary="Hey, I am Good! What about you ?" />
              </CardContent>
              <CardActions>
                <ListItemText secondary="09:31" />
              </CardActions>
            </Card>
          </ListItem>
          <ListItem key="3" sx={{ flexDirection: 'row-reverse' }}>
            <Card>
              <CardContent>
                <ListItemText primary="Hey man, What's up ?" />
              </CardContent>
              <CardActions sx={{ float: 'right' }}>
                <ListItemText secondary="09:30" />
              </CardActions>
            </Card>
          </ListItem>
        </MessageArea>
        <Divider />
        <TypingContainer container>
          <TextField
            variant="outlined"
            // label="Ask the Question"
            size="small"
            placeholder="Ask the Question"
            //multiline
            minRows={1} // Minimum number of rows
            maxRows={10} // Maximum number of rows before scroll appears
            // value={text}
            fullWidth
            sx={{
              '& .MuiInputBase-root': {
                // fontSize: '16px',
                padding: '1px',
                paddingLeft: '10px',
                lineHeight: '1',
                backgroundColor: '#fff',
                borderRadius: '30px',
                boxShadow: 6,
              },
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="start">
                    {/* <IconButton>
                      <MicIcon color="action" fontSize="small" />
                    </IconButton> */}
                    <IconButton type="submit">
                      <SendIcon color="action" fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </TypingContainer>
      </Paper>
    </>
  )
}

export default Analytics
