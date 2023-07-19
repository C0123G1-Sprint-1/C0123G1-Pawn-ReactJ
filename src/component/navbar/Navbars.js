import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {NavLink} from "react-router-dom";
import {Outlet} from "react-router";

export default function Navbars() {

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{height: "4rem"}}>
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink style={({isActive})=>{
                                return {
                                    backgroundColor: isActive ? "#27533e": "",
                                    color: isActive ? "black": ""
                                }
                            }} className="nav-link active" aria-current="page" to={"/pawn"}>
                                Cầm đồ
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink style={({isActive})=>{
                                return {
                                    backgroundColor: isActive ? "#27533e": "",
                                    color: isActive ? "black": ""
                                }
                            }} className="nav-link active" aria-current="page" to={"/liquidation"}>
                                Thanh lý
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink style={({isActive})=>{
                                return {
                                    backgroundColor: isActive ? "#27533e": "",
                                    color: isActive ? "black": ""
                                }
                            }} className="nav-link" to={"/return-pawn"}>
                                Trả đồ
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink style={({isActive})=>{
                                return {
                                    backgroundColor: isActive ? "#27533e": "",
                                    color: isActive ? "black": ""
                                }
                            }} className="nav-link" to={"/info-store"}>
                                Thông tin cửa hàng
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink style={({isActive})=>{
                                return {
                                    backgroundColor: isActive ? "#27533e": "",
                                    color: isActive ? "black": ""
                                }
                            }} className="nav-link" to={"/api/customer"}>
                                Quản lý khách hàng
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink style={({isActive})=>{
                                return {
                                    backgroundColor: isActive ? "#27533e": "",
                                    color: isActive ? "black": ""
                                }
                            }} className="nav-link" to={"/info"}>
                                Thông tin cá nhân
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink style={({isActive})=>{
                                return {
                                    backgroundColor: isActive ? "#27533e": "",
                                    color: isActive ? "black": ""
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
