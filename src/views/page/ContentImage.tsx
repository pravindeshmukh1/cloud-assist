import { Box, Stack, Typography } from '@mui/material'

import Button from '@mui/material/Button'
import MuiCard from '@mui/material/Card'
import Checkbox from '@mui/material/Checkbox'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'

import { styled } from '@mui/material/styles'

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
const ContentImage = () => {
  return (
    <Stack sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: '40vw' }}>
      <img
        src="https://content.cloudsocial.io/wp-content/uploads/CloudQMS.webp"
        // loading="lazy"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      <Card variant="elevation">
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>{/* <SitemarkIcon /> */}</Box>
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
        >
          Sign In
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
              sx={{ ariaLabel: 'email' }}
            />
          </FormControl>
          <FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Link component="button" variant="body2" sx={{ alignSelf: 'baseline' }}>
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
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {/* <ForgotPassword open={open} handleClose={handleClose} /> */}
          <Button type="submit" fullWidth variant="contained">
            Sign in
          </Button>
          <Typography sx={{ textAlign: 'center' }}>
            Don&apos;t have an account?{' '}
            <span>
              <Link
                href="/material-ui/getting-started/templates/sign-in/"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign up
              </Link>
            </span>
          </Typography>
        </Box>
      </Card>
    </Stack>
  )
}

export default ContentImage
