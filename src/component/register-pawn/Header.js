import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../css/header.css"
import "../../css/home.css"
import {useNavigate} from "react-router";
import jwt from 'jwt-decode';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link, NavLink} from "react-router-dom";
import {Dropdown, DropdownToggle, DropdownMenu} from 'reactstrap';

export function Header() {

    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const token = localStorage.getItem('token');

    const [decodedToken, setDecodedToken] = useState("");
    const [username, setUsername] = useState();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    useEffect(() => {
        if (token) {
            const decoded = jwt(token);
            setDecodedToken(decoded);
            setUsername(decoded.sub);
            setIsLogin(true);
        } else {
            // Xử lý khi không có token trong localStorage
        }
    }, [token]);


    const handlerLogout = () => {
        localStorage.removeItem("token");
        setIsLogin(false);
        toast.success("Đăng xuất thành công !!");
        navigate("/login")
    };
    // console.log(decodedToken.sub)
    return (
        <>
            <>
                {/*header*/}

                <header id="header" className="header d-flex align-items-center">
                    <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
                        <NavLink to="/" className="logo d-flex align-items-center">
                            {/* Uncomment the line below if you also wish to use an image logo */}
                            <div className="pnj">
                                <img src="/anh/pawnshop.png" style={{marginLeft: "40%", maxHeight: 90}} alt=""/>
                            </div>
                        </NavLink>
                        <nav id="navbar" className="navbar">
                            <ul>
                                <li>
                                    <NavLink style={{color: "white", fontSize: '20px',}} to="/"
                                             className=" font-a-header">
                                        Trang chủ
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink style={{color: "white", fontSize: '20px',}} to="/listPosts">Tin
                                        tức</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/create" className='font-a-header'
                                             style={{color: "white", fontSize: '20px',}}>Đăng ký cầm đồ</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/condition" className='font-a-header'
                                             style={{color: "white", fontSize: '20px',}}>Điều khoản & Điều
                                        kiện</NavLink>
                                </li>

                                {/*<li className="dropdown">*/}
                                {/*    <a href="#">*/}
                                {/*        <span>Cầm Đồ Theo Tỉnh</span>{" "}*/}
                                {/*        <i className="bi bi-chevron-down dropdown-indicator" />*/}
                                {/*    </a>*/}
                                {/*    <ul>*/}
                                {/*        <li>*/}
                                {/*            <a href="#">Cầm Đồ Quảng Nam</a>*/}
                                {/*        </li>*/}
                                {/*        <li className="dropdown">*/}
                                {/*            <a href="#">*/}
                                {/*                <span>Cầm Đồ Đà Nẵng</span>{" "}*/}
                                {/*                <i className="bi bi-chevron-down dropdown-indicator" />*/}
                                {/*            </a>*/}
                                {/*            <ul>*/}
                                {/*                <li>*/}
                                {/*                    <a href="#">Quận Hải Châu</a>*/}
                                {/*                </li>*/}
                                {/*                <li>*/}
                                {/*                    <a href="#">Quận Thanh Khê</a>*/}
                                {/*                </li>*/}
                                {/*                <li>*/}
                                {/*                    <a href="#">Quận Cẩm Lệ</a>*/}
                                {/*                </li>*/}
                                {/*                <li>*/}
                                {/*                    <a href="#">Huyện Hòa Vang</a>*/}
                                {/*                </li>*/}
                                {/*            </ul>*/}
                                {/*        </li>*/}
                                {/*        <li>*/}
                                {/*            <a href="#">Cầm Đồ Huế</a>*/}
                                {/*        </li>*/}
                                {/*    </ul>*/}
                                {/*</li>*/}


                                <li style={{
                                    display: "flex", textAlign: "center",
                                    alignItems: "center", color: "white", fontWeight: "300"
                                }}>
                                    {isLogin ?
                                        (
                                            <>
                                                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}
                                                          className="nav-info-user">
                                                    <DropdownToggle
                                                        style={{
                                                            backgroundColor: "#00833e",
                                                            color: "white",
                                                            borderColor: "white",
                                                            borderRadius: "80%",
                                                            fontWeight: "700",
                                                            fontSize: "20px",
                                                            fontFamily: "var(--font-secondary)"
                                                        }}
                                                        className="nav-link"
                                                    >
                                                        {username}
                                                    </DropdownToggle>
                                                    <DropdownMenu className="abc">
                                                        <a className="dropdown-item " id="dropdown-info-user" style={{color: "black"}}>
                                                            Thông tin cá nhân<i style={{marginRight: "0.5rem"}}
                                                                                className="fa-solid fa-info"></i></a>
                                                        <a className="dropdown-item " onClick={() => handlerLogout()}
                                                           style={{color: "black"}}>Đăng xuất<i
                                                            className="fa-solid fa-right-from-bracket"></i></a>
                                                        <Link to="/nav/info-store" className="dropdown-item "
                                                              style={{color: "black"}}>Quản lý cửa hàng<i
                                                            className="fa-solid fa-list-check"></i></Link>
                                                    </DropdownMenu>
                                                </Dropdown>
                                                {/*<i style={{ marginLeft: "0.5rem" }}*/}
                                                {/*   className="fa-solid fa-right-from-bracket"*/}
                                                {/*   onClick={() => handlerLogout()}></i>*/}
                                                <i style={{marginLeft: "0.5rem"}} className="fa-regular fa-user"></i>
                                            </>
                                        )
                                        :
                                        (
                                            <>
                                                <a onClick={() => navigate("/login")} style={{fontSize: "18px"}}>Đăng
                                                    nhập</a>
                                                <i style={{marginLeft: "0.5rem"}} className="fa-regular fa-user"></i>
                                            </>
                                        )
                                    }
                                </li>

                            </ul>
                        </nav>

                        <i onClick={() => mobileNavToggle()}
                           className="fa-solid fa-bars mobile-nav-toggle mobile-nav-show bi bi-list"/>
                        <i onClick={() => mobileNavToggle()}
                           className="fa-solid fa-xmark mobile-nav-toggle mobile-nav-hide d-none bi bi-x"/>


                    </div>
                </header>
            </>
            <ToastContainer/>
        </>

    )

}


function mobileNavToggle() {
    const mobileNavShow = document.querySelector('.mobile-nav-show');
    const mobileNavHide = document.querySelector('.mobile-nav-hide');

    console.log(mobileNavHide);

    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');

}
