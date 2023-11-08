import './Nav.css';
import './Layout.scss';
import {

    NavLink
} from "react-router-dom";
import { connect } from "react-redux";


import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";


import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const Header = (props) => {
    const users = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;


    let navigate = useNavigate()



    useEffect(() => {
        // const users = props.dataRedux.user.tenDangNhap ? props.dataRedux.user : null;
        // if (users) {
        //     GioHangService.getlist(users).then(
        //         res => {
        //             props.addcart(res.data)
        //         }
        //     )
        // }

    }, [])
    const logOut = () => {
        props.logout()
        if (localStorage.getItem("users"))
            toast.success("Tài khoản đã được đăng xuất ")
        localStorage.clear()

        navigate("/home")
    };
    return (
        <>

            <header id="header" className="fixed-top " style={{ marginBottom: "calc(10px + 2vmin)" }}>
                <div className="container d-flex align-items-center">
                    <Navbar collapseOnSelect expand="lg" className='test' style={{ color: "white" }}>
                        <Container>
                            <Navbar.Brand className='test' style={{ color: "aliceblue !important" }}>
                                <NavLink style={{ "textDecoration": "none" }} to="/" activeclassname="nav-link scrollto active" exact="true">

                                    Cafe Hưng Thịnh
                                </NavLink>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="#features" className='test' style={{ "color": "while" }} >Features</Nav.Link>
                                    <Nav.Link href="#pricing" className='test'>Pricing</Nav.Link>
                                    {
                                        users && users.roleId == 1 && (<NavDropdown title="Quản lý" className='test' id="collasible-nav-dropdown">
                                            <NavDropdown.Item className="hover" href="#">
                                                <NavLink className="hovers" to="/product/list">
                                                    Kho
                                                </NavLink>

                                            </NavDropdown.Item>
                                            <NavDropdown.Item href="#" className="hover">
                                                <NavLink className="hover" to="/admin/thongke">
                                                    Thống kê
                                                </NavLink>
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.3" className="hover">Something</NavDropdown.Item>
                                            {/* <NavDropdown.Divider /> */}
                                            <NavDropdown.Item href="#action/3.4" className="hover">
                                           
                                            </NavDropdown.Item>
                                        </NavDropdown>)
                                    }

                                </Nav>
                                <Nav>
                                    <Nav.Link href="#deets" className='test'>More deets</Nav.Link>
                                    <Nav.Link eventKey={4} href="#memes" className='test'>
                                        Dank memes
                                    </Nav.Link>
                                    <NavLink className="test" to="/user/login">
                                                 Đăng nhập
                                                </NavLink>
                                </Nav>
                                <Form className="d-flex">
                                    <Form.Control
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                    />
                                    <Button variant="outline-success">Search</Button>
                                </Form>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>


                </div>
            </header>

        </>
    )
}
const mapStateToProps = (state) => {
    return { dataRedux: state }
}


const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch({ type: 'LOGOUT' }),
        addcart: (e) => dispatch({ type: 'ADDCART', payload: e }),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header)
