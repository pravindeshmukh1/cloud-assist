import classNames from 'classnames'

import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'
import { Field, Form, Formik } from 'formik'
import axios from 'axios'
import { useState } from 'react'
import constants from '../../constants'

const Dashboard = () => {
  interface Message {
    message: string
    id: number
    msgBy: string
  }

  interface MsgResponse {
    response: string
    text: string
    date: string
    resp_time: string
  }
  const [messages, setMessages] = useState<Message[]>([
    {
      message: 'Hi there How can I help you',
      id: 0,
      msgBy: 'AI',
    },
  ])

  return (
    <>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y pt-0">
          <div className="col-md-12">
            <Formik
              initialValues={{ msg: ' ' }}
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
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2))
                  setSubmitting(false)
                }, 400)
                let data: Message = {
                  id: 1,
                  message: values.msg,
                  msgBy: 'user',
                }
                setMessages((msg) => [...msg, data])
                let post = {
                  asstId: 'asst_IvYaMqtb6TsKpur4hF6J7RJU',
                  threadId: 'thread_4QEcf8ajgsChkDm6YTDI4945',
                  text: values.msg,
                }

                axios
                  .post<MsgResponse>(constants.chatLink, post)
                  .then((res) => {
                    console.log(res)

                    data.message = res.data.response
                    data.msgBy = 'AI'
                  })
                  .catch((err) => console.log(err))
                  .then((res) => {
                    setMessages((msg) => [...msg, data])
                  })
              }}
            >
              {({ isSubmitting }) => (
                <Form className=" card1 ">
                  <div className="flex-column height d-flex justify-content-center align-items-center text-center mt-2">
                    <h3 className="mb-3">Talk to CloudAssist</h3>
                    <div className="">
                      <div className="form-check form-check-inline mt-3 mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="inlineCheckbox1"
                          value="option1"
                          autoFocus
                          disabled={isSubmitting}
                        />
                        <label className="form-check-label">GPT</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="inlineCheckbox2"
                          value="option2"
                        />
                        <label className="form-check-label">AI</label>
                      </div>
                    </div>
                    <div className="col-md-8 d-flex justify-content-start align-items-center px-2 gap-2 border shadow rounded-pill bg-white border-0 ">
                      <div className="nav-item d-flex align-items-center card-body p-0 ">
                        <input
                          type="text"
                          className="form-control form-control-lg border-0 shadow-none ps-1 ps-sm-2 rounded-pill"
                          placeholder="Ask the Question"
                          aria-label="Search..."
                          style={{ fontSize: '18px' }}
                        />
                        <div className="text-end">
                          <CIcon icon={cilSearch} className="text-body-tertiary" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card d-flex justify-content-center align-items-center mt-4">
                    <div className="card-body overflow-auto" style={{ maxHeight: '500px',minWidth:"60vw" }}>
                      {messages.map((res) => {
                        return (
                          <>
                            <p>{res.message}</p>
                            <p>{res.msgBy}</p>
                          </>
                        )
                      })}
                      <hr className="mt-2" />
                      {/* <p className="mb-1">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur rem
                        corporis cum beatae perspiciatis excepturi dignissimos delectus vero ullam
                        consequatur vel nihil non, voluptatem fugit, mollitia et eum eos facere.
                      </p>
                      <div className="text-end">
                        <i className="bx bx-like px-1 btn"></i>
                        <i className="bx bx-dislike px-1 btn"></i>
                      </div> */}
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
