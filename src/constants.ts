const baseurl = 'http://localhost:8080'
const userBaseUrl='https://cloudassist.cloudpoint.co.in'
// const baseurl = 'https://cloudhsm.cloudpoint.co.in'
const constants = {
  updateOtherDoc:`${baseurl}/assistant/upload/text`,
  deleteuser:`${userBaseUrl}/Home/deleteuser`,
  updateusers:`${userBaseUrl}/Home/updateuser`,
  getusers:`${userBaseUrl}/Home/UserList`,
  adduser:`${userBaseUrl}/Home/adduser`,
  link: `${baseurl}/assistant/create`,
  userAssistant: `${baseurl}/assistant/user`,
  modifyAssistant: `${baseurl}/assistant/modify`,
  uploadLink: `${baseurl}/assistant/file/upload`,
  getAssistant: `${baseurl}/assistant/id`,
  getPayment:`${baseurl}/payment/user`,
  getAssistantHistory:`${baseurl}/history/assistant`,
  uploadLocalFiles: `${baseurl}/assistant/file/update`,
  userId: '5b5b695d4d014e2db8ca',
  assistantId: 'asst_4FBwgYPCJU4MyorZ2sqfOukC',
  getAssistantByUser: `${baseurl}/assistant/user`,
  chatLink: `${baseurl}/runner/chat`,
  deleteAssistant: `${baseurl}/assistant`,
  getHistory: `${baseurl}/history`,
  createThread:`${baseurl}/thread/create`,
  getDocuments:`${baseurl}/document/list`,
  uploadWebsite:`${baseurl}/assistant/upload/website`
}
// asst_UWIlkTxmN1HnKyFY9j5RavlS
Object.freeze(constants)

export default constants
