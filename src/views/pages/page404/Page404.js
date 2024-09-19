import React from 'react'
import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMagnifyingGlass } from '@coreui/icons'
import { Button } from '@coreui/coreui'
import { Link } from 'react-router-dom'

const Page404 = () => {
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <div className="clearfix">
              <h1 className="float-start display-3 me-4">404</h1>
              <h4 className="pt-3">Oops! You{"'"}re lost.</h4>
              <p className="text-body-secondary float-start">
                The page you are looking for was not found.
              </p>
            </div>
            {/* <Button>Home</Button> */}
            {/* <Button>Home</Button> */}
            {/* <CInputGroup className="input-prepend"> */}
              {/* <CInputGroupText>
                <CIcon icon={cilMagnifyingGlass} />
              </CInputGroupText> */}
              {/* <CFormInput type="text" placeholder="What are you looking for?" /> */}
              <Link to="/">
              <CButton color="info">Home</CButton>
              </Link> 
            {/* </CInputGroup> */}
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page404
