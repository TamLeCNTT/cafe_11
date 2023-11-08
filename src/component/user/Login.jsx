
import { NavLink } from 'react-router-dom';
import './User.css'
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"

// import logo from '../../Asset/img/logo4.png'
import { connect } from 'react-redux';
import userService from '../../service/userService';

// import Header from '../Layout/Header';
import Header from '../layout/Header';
const Login = (props) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    let navitive = useNavigate()

    useEffect(() => {





    }, [])
    const ChangeUsername = (e) => {
        setUsername(e.target.value)

    }
    const ChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const login = (e) => {
        let user = { username: username, password: password }
        userService.login(user).then(res => {
            console.log(res.data)
            if (res.data) {
                toast.success("Đăng nhập thành công")

                sessionStorage.setItem("user", JSON.stringify(res.data))
                navitive("/")
            }
            else {
                toast.error("Sai mật khẩu")
            }
            // localStorage.setItem("user", JSON.stringify(user))
        }).catch(e => {
            toast.error("Tài khoản không tồn tại")
        })
    }

    return (
        <>
            <Header />
            <main className='mains'>


                <section id="about" class="about">
                    <div class="container" style={{ marginTop: "-70px" }}>

                        <div class="row py-5 mt-4 align-items-center">

                            <div class="col-md-5 pr-lg-5 mb-5 mb-md-0">
                                <img src="https://bootstrapious.com/i/snippets/sn-registeration/illustration.svg" alt="" class="img-fluid mb-3 d-none d-md-block" />
                                <h1 className='title' >Chào mừng bạn trở lại</h1>
                                {/* <p class="font-italic text-muted mb-0">Create a minimal registeration page using Bootstrap 4 HTML form elements.</p>
                                <p class="font-italic text-muted">Snippet By <a href="https://bootstrapious.com" class="text-muted">
                                    <u>Bootstrapious</u></a>
                                </p> */}
                            </div>


                            <div class="col-md-7 col-lg-6 ml-auto">

                                <div class="row">
                                    <h3 className='title'>Đăng nhập</h3>

                                    <div class="input-group col-6 mb-2">

                                        <input id="firstName" type="text" name="firstname" placeholder="Tên đăng nhập" value={username} onChange={(e) => ChangeUsername(e)} class="form-control bg-white border-left-0 border-md"
                                            onKeyPress={event => {
                                                if (event.key === 'Enter') {
                                                    login(event)
                                                }
                                            }} />
                                    </div>


                                    <div class="input-group col-6 mb-4">

                                        <input required id="lastName" type="password" name="lastname" placeholder="Mật khẩu" value={password} onChange={(e) => ChangePassword(e)} class="form-control bg-white border-left-0 border-md" onKeyPress={event => {
                                            if (event.key === 'Enter') {
                                                login(event)
                                            }
                                        }} />
                                    </div>





                                    <div class="form-group col-lg-12 mx-auto mb-0">
                                        <button class="btn btn-primary btn-block py-2" onClick={(e) => login(e)}>
                                            <span class="font-weight-bold">Đăng nhập</span>
                                        </button>
                                    </div>






                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </main>






        </>
    )
}
const mapStateToProps = (state) => {
    console.log(state);
    return {


        dataRedux: state.trangthai
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (e) => dispatch({ type: 'LOGIN', payload: e }),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);