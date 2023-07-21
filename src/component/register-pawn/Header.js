import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../css/header.css"
import "../../css/home.css"
import {useNavigate} from "react-router";
import jwt from 'jwt-decode';
import {NavLink} from "react-router-dom";
export function Header() {

const navigate = useNavigate();
// bo thanh header
    const token = localStorage.getItem('token');
    const decodedToken = jwt(token);

    // const token = localStorage.getItem('token');
    // const decodedToken = jwt(token);
    const  [username,setUsername] = useState();

    useEffect(()=>{
        // alert(decodedToken.sub)
        setUsername(decodedToken.sub)
    },[])
    // console.log(decodedToken.sub)
    return(
        <>
            <>
                {/*header*/}
                <header id="header" className="header d-flex align-items-center" style={{top:0, position:"sticky",zIndex:'100'}}>
                    <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
                        <NavLink to= "/"  className="logo d-flex align-items-center">
                            {/* Uncomment the line below if you also wish to use an image logo */}
                            <div className="pnj">
                                <img  src="/anh/pawnshop.png"   style={{ marginLeft: "40%", maxHeight: 90 }}  alt=""  />
                            </div>
                        </NavLink>
                         <nav id="navbar"  className="navbar">
                            <ul>
                                <li>
                                    <NavLink style={{color : "white",fontSize:'20px',}} to= "/" className=" font-a-header">
                                        Trang Chủ
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink  style={{color : "white",fontSize:'20px',}} to="/listPost">Tin Tức</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/create"  className='font-a-header' style={{color : "white",fontSize:'20px',}} >Đăng ký cầm đồ</NavLink>
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


                                <li style={{display : "flex",textAlign: "center",
                                    alignItems: "center",color:"white",fontWeight:"300"}}>
                                    <a onClick={() => navigate("/login")}>{username}</a>
                                    <i style={{marginLeft : "0.5rem"}} className="fa-regular fa-user"></i>
                                </li>

                            </ul>
                        </nav>

                            <i  onClick={() => mobileNavToggle()} className="fa-solid fa-bars mobile-nav-toggle mobile-nav-show bi bi-list" />
                            <i  onClick={() => mobileNavToggle()} className="fa-solid fa-xmark mobile-nav-toggle mobile-nav-hide d-none bi bi-x" />




                    </div>
                </header>
            </>




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
