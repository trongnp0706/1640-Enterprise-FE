import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'

function Header() {
    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar bg='primary' variant='dark' expand='lg'>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>1640 Web Enterprise</Navbar.Brand>
                    </LinkContainer>
                    <SearchBox/>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Quản lý' id='adminmenu'>
                                    <LinkContainer to='/admin/users'>
                                        <NavDropdown.Item>Người dùng</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                            {userInfo && Object.keys(userInfo).length !== 0 ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Tài khoản</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/'>
                                        <NavDropdown.Item onClick={logoutHandler}>Đăng xuất</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link>
                                        <i className='fas fa-user'></i> Đăng nhập
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header