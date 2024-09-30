import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  useColorModes,
  CProgress,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilContrast,
  cilEnvelopeOpen,
  cilList,
  cilMenu,
  cilMoon,
  cilSun,
} from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { Box, Button, LinearProgress, Menu, MenuItem } from '@mui/material'
import BasicMenu from './BasicMenu'
import axios from 'axios'
import constants from '../constants'

const AppHeader = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const [payment, setpayment] = useState()

  useEffect(() => {
    axios.get(`${constants.getPayment}/${localStorage.getItem('cid')}`).then(res=>{
      setpayment(res.data)
    })
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [anchorEl])
  // const addSBL = () => {
  //   const scriptId = 'fsc-api'
  //   const existingScript = document.getElementById(scriptId)
  //   if (!existingScript) {
  //     const storeFrontToUse = 'cloudpoint.onfastspring.com/popup-CloudAssist'
  //     const script = document.createElement('script')

  //     script.type = 'text/javascript'
  //     script.id = scriptId
  //     script.src = 'https://sbl.onfastspring.com/sbl/1.0.1/fastspring-builder.min.js'
  //     script.dataset.storefront = storeFrontToUse
  //     // Make sure to add callback function to window so that the DOM is aware of it
  //     window.fastSpringCallBack = fastSpringCallBack
  //     script.setAttribute('data-data-callback', 'fastSpringCallBack')

  //     document.body.appendChild(script)
  //   }
  // }
  // addSBL()
  // const buyProduct = () => {
  //   window.fastspring.builder.push({
  //     checkout: true,
  //   })
  // }
  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        {/* <CHeaderNav className="d-none d-md-flex">
          <CNavItem>
            <CNavLink to="/dashboard" as={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Users</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Settings</CNavLink>
          </CNavItem>
        </CHeaderNav> */}
        {/* <CHeaderNav className="ms-auto">
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav> */}
        {/* <CHeaderNav className="">
          <CProgress value={25}>25%</CProgress>
        </CHeaderNav> */}
         <div>
      
    </div>
        <CHeaderNav>
          <Box
            width={300}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={1}
          >
            <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        CREDITS
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <div onClick={handleClose}>
          <div>Total Credits left</div>
          <div>{payment?.currentToken}</div>
          <div>Recharge Date</div>
          <div>{payment?.rechargeDt}</div>
          <div>Last Updated Date</div>
          <div>{payment?.updatedDt}</div>
        </div>
        {/* <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem> */}
      </Menu>
           
            <li className="nav-item py-1">
              <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
            </li>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              data-fsc-item-path-value="cloudassist"
              data-fsc-action="Add, Checkout"
              sx={{ paddingLeft: '20px', paddingRight: '20px' }}
            >
              Subscribe
            </Button>
          </Box>
          {/* <button data-fsc-item-path-value="phot-io-main-app" data-fsc-action="Add, Checkout">
            Add to cart
          </button> */}
          {/* 
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li> */}
          {/* <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('light')}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('dark')}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'auto'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('auto')}
              >
                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown> */}
          {/* <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <AppHeaderDropdown /> */}
        </CHeaderNav>
      </CContainer>
      {/* <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer>
      */}
    </CHeader>
  )
}

export default AppHeader
