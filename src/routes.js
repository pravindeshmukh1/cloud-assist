import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const History = React.lazy(() => import('./views/history/History'))
const Analytics = React.lazy(() => import('./views/analytics/Analytics'))
const AddUser = React.lazy(() => import('./views/user/AddUser'))
const Profile = React.lazy(() => import('./views/user/Profile'))
const BotList = React.lazy(() => import('./views/bot/BotList'))
const EditBot = React.lazy(() => import('./views/bot/EditBot'))
const BotConfig = React.lazy(() => import('./views/bot/BotConfig'))
const EditConfig = React.lazy(() => import('./views/bot/EditConfig'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/history', name: 'History', element: History },
  { path: '/analytics', name: 'Dashboard', element: Analytics },
  { path: '/addUser', name: 'AddUser', element: AddUser },
  { path: '/profile', name: 'Profile', element: Profile },
  { path: '/botList', name: 'BotList', element: BotList },
  { path: '/editBot', name: 'EditBot', element: EditBot },
  { path: '/botConfig', name: 'BotConfig', element: BotConfig },
  { path: '/editBotConfig', name: 'EditConfig', element:EditConfig  },

]

export default routes
