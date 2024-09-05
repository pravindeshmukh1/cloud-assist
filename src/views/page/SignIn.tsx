import { Box, Paper, Stack, Typography } from '@mui/material'

import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded'
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded'
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded'
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded'
import ContentImage from './ContentImage'

import Button from '@mui/material/Button'
import MuiCard from '@mui/material/Card'
import Checkbox from '@mui/material/Checkbox'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import CAImage from '../../assets/brand/CloudAssist.webp'

import { styled } from '@mui/material/styles'
import { Link } from 'react-router-dom'

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}))
const items = [
  {
    icon: <SettingsSuggestRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Adaptable performance',
    description:
      'Our product effortlessly adjusts to your needs, boosting efficiency and simplifying your tasks.',
  },
  {
    icon: <ConstructionRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Built to last',
    description:
      'Experience unmatched durability that goes above and beyond with lasting investment.',
  },
  {
    icon: <ThumbUpAltRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Great user experience',
    description:
      'Integrate our product into your routine with an intuitive and easy-to-use interface.',
  },
  {
    icon: <AutoFixHighRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Innovative functionality',
    description:
      'Stay ahead with features that set new standards, addressing your evolving needs better than the rest.',
  },
]

const SignIn = () => {
  return (
    <Paper>
      <Stack
        direction="column"
        component="main"
        className="d"
        sx={[
          {
            justifyContent: 'space-between',
            height: { xs: 'auto', md: '100vh' },
          },
        ]}
      >
        <Stack
          direction={{ xs: 'column-reverse', md: 'row' }}
          sx={{
            justifyContent: 'center',
            gap: { xs: 6, sm: 12 },
            p: 2,
            m: 'auto',
          }}
        >
          <Stack sx={{ flexDirection: 'row', alignSelf: 'center', gap: 4, maxWidth: '40vw' }}>
            <img
              // src="https://content.cloudsocial.io/wp-content/uploads/CloudQMS.webp"
              src={CAImage}
              loading="lazy"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </Stack>
          <Card variant="elevation">
            <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>Welcome Back! 👋</Box>
            <Typography component="h4" variant="body1" sx={{ width: '100%', fontWeight: '600' }}>
              Please sign-in to your account and start the adventure
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
            >
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ ariaLabel: 'email' }}
                />
              </FormControl>
              <FormControl>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Link component="button" variant="" sx={{ alignSelf: 'baseline' }}>
                    Forgot your password?
                  </Link>
                </Box>
                <TextField
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              {/* <ForgotPassword open={open} handleClose={handleClose} /> */}
              <Button type="submit" size="small" fullWidth variant="contained">
                Sign in
              </Button>
              <Typography sx={{ textAlign: 'center' }}>
                Don&apos;t have an account?{' '}
                <span>
                  <Link to="/signUp">Sign up</Link>
                </span>
              </Typography>
            </Box>
          </Card>
        </Stack>
      </Stack>
    </Paper>
  )
}

export default SignIn
