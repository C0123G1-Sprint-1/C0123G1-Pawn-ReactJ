import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap"
import React from "react";
import {NavLink} from "react-router-dom";
import {Outlet} from "react-router";
import jwt from 'jwt-decode';

export default function Navbars() {
    const token = localStorage.getItem('token');
    const decodedToken = jwt(token);
    console.log(decodedToken.sub)
    return (
        <>

            <nav className="navbar navbar-expand-lg p-0" style={{
                height: "8vh",
                boxShadow: "0px 5px 10px #e9e4e4",
                position: "sticky",
                left: "0px",
                top: "0px",
                zIndex: "1",
                right: "0px",
                backgroundColor: "rgb(255, 255, 255)"
            }}>
                <div className="container-fluid" style={{height: "100%", justifyContent: "center"}}>
                    <ul className="navbar-nav d-flex align-items-center" style={{height: "100%",  display: "flex",
                        justifyContent: "center" ,
                        flexDirection: "row",
                        gap: "50px",
                    }}>
                        <li className="nav-item">
                            <NavLink style={({isActive}) => {
                                return {
                                    backgroundColor: isActive ? "#27533e" : "",
                                    color: isActive ? "#fff" : "",
                                    borderRadius: "10px"
                                }
                            }} className="nav-link active" aria-current="page" to={"/pawn"}>
                                Cầm đồ
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink style={({isActive}) => {
                                return {
                                    backgroundColor: isActive ? "#27533e" : "",
                                    color: isActive ? "#fff" : "",
                                    borderRadius: "10px"
                                }
                            }} className="nav-link active" aria-current="page" to={"/liquidation"}>
                                Thanh lý
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink style={({isActive}) => {
                                return {
                                    backgroundColor: isActive ? "#27533e" : "",
                                    color: isActive ? "#fff" : "",
                                    borderRadius: "10px"
                                }
                            }} className="nav-link" to={"/nav/redeem"}>
                                Trả đồ
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink style={({isActive}) => {
                                return {
                                    backgroundColor: isActive ? "#27533e" : "",
                                    color: isActive ? "#fff" : "",
                                    borderRadius: "10px"
                                }
                            }} className="nav-link" to={"/nav/info-store"}>
                                Thông tin cửa hàng
                            </NavLink>
                        </li>
                        {
                            decodedToken.role === "ROLE_ADMIN" ?
                                <>
                                    <li className="nav-item">
                                        <NavLink style={({isActive}) => {
                                            return {
                                                backgroundColor: isActive ? "#27533e" : "",
                                                color: isActive ? "#fff" : "",
                                                borderRadius: "10px"
                                            }
                                        }} className="nav-link" to={"/manager-customer"}>
                                            Quản lý khách hàng
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink style={({isActive}) => {
                                            return {
                                                backgroundColor: isActive ? "#27533e" : "",
                                                color: isActive ? "#fff" : "",
                                                borderRadius: "10px"
                                            }
                                        }} className="nav-link" to={"/nav/api/employee"}>
                                            Quản lý nhân viên
                                        </NavLink>
                                    </li>
                                </> :
                                <li className="nav-item">
                                    <NavLink style={({isActive}) => {
                                        return {
                                            backgroundColor: isActive ? "#27533e" : "",
                                            color: isActive ? "#fff" : "",
                                            borderRadius: "10px"
                                        }
                                    }} className="nav-link" to={"/nav/api/employee"}>
                                        Quản lý nhân viên
                                    </NavLink>
                                </li>
                        }

                        <li className="nav-item">
                            <NavLink style={({isActive}) => {
                                return {
                                    backgroundColor: isActive ? "#27533e" : "",
                                    color: isActive ? "#fff" : "",
                                    borderRadius: "10px"
                                }
                            }} className="nav-link" to={"/info"}>
                                Thông tin cá nhân
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink style={({isActive}) => {
                                return {
                                    backgroundColor: isActive ? "#27533e" : "",
                                    color: isActive ? "#fff" : "",
                                    borderRadius: "10px"
                                }
                            }} className="nav-link" to={"/message"}>
                                Nhắn tin
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
            <Outlet/>
        </>
    )
}
