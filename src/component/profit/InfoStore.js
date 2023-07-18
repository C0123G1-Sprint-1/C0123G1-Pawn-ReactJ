import {NavLink} from "react-router-dom";
import React from "react";
import {Outlet} from "react-router";

export default function InfoStore() {
    return (
        <>
            <div id="content" className="container">
                <div className="row mt-3" style={{zIndex: "-1"}}>
                    <div className="col-md-12 col-lg-3" style={{zIndex: "-1"}}>
                        <div className="list-group">
                            <NavLink to={"/"} style={({isActive})=>{
                                return{
                                    backgroundColor: isActive ? "#27533e": "",
                                    color: isActive ? "#fff": ""
                                }
                            }}
                                className="border-0 list-group-item list-group-item-action active "
                                id="nav-side-bar"
                                aria-current="true"
                            >
                                Thông tin cửa hàng
                            </NavLink>
                            <NavLink to={"/"} style={({isActive})=>{
                                return{
                                    backgroundColor: isActive ? "#27533e": "",
                                    color: isActive ? "#fff": ""
                                }
                            }}  className="border-0 list-group-item list-group-item-action">
                                Tài chính
                            </NavLink>
                            <NavLink to={"/"} style={({isActive})=>{
                                return{
                                    backgroundColor: isActive ? "#27533e": "",
                                    color: isActive ? "#fff": ""
                                }
                            }}  className="border-0 list-group-item list-group-item-action">
                                Danh sách đồ cầm trong kho
                            </NavLink>
                            <NavLink to={"/"} style={({isActive})=>{
                                return{
                                    backgroundColor: isActive ? "#27533e": "",
                                    color: isActive ? "#fff": ""
                                }
                            }}  className="border-0 list-group-item list-group-item-action">
                                Lịch sử giao giao dịch
                            </NavLink>
                            <NavLink to={"/"} style={({isActive})=>{
                                return{
                                    backgroundColor: isActive ? "#27533e": "",
                                    color: isActive ? "#fff": ""
                                }
                            }}  className="border-0 list-group-item list-group-item-action ">
                                Top 10 hợp đồng mới nhất
                            </NavLink>
                            <NavLink to={"/info-store/profit"} style={({isActive})=>{
                                return{
                                    backgroundColor: isActive ? "#27533e": "",
                                    color: isActive ? "#fff": ""
                                }
                            }}  className="border-0 list-group-item list-group-item-action" id="statistic-profit">
                                Thống kê lợi nhuận
                            </NavLink>
                        </div>
                    </div>
                    <Outlet/>
                </div>
            </div>
        </>
    )

}