import {NavLink} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Outlet} from "react-router";

export default function InfoStore() {
    const [isActives, setIsActive] = useState(true);
    useEffect(()=>{
        setIsActive(false)
    },[isActives])
    return (
        <>
            <div id="content" className="container">
                <div className="row mt-3" style={{zIndex: "-1"}}>
                    <div className="col-md-12 col-lg-3 pb-1" style={{zIndex: "0"}}>
                        <div className="list-group">
                            <button
                                className="border-0 list-group-item list-group-item-action active "
                                id="nav-side-bar"
                                aria-current="true"
                            >
                                Thông tin cửa hàng
                            </button>
                            <NavLink to={"/nav/info-store/profit"} style={({isActive})=>{
                                if(isActive){
                                    // alert(isActive)
                                    setIsActive(()=>false)
                                }
                                return{
                                    backgroundColor: isActive || isActives === true  ? "#27533e": "",
                                    color: isActive || isActives === true ? "#fff": ""
                                }
                            }}  className="border-0 list-group-item list-group-item-action" id="statistic-profit">
                                Thống kê lợi nhuận
                            </NavLink>
                            <NavLink to={"/nav/info-store/all-contract"} onClick={()=>{
                                setIsActive(false)
                            }} style={({isActive})=>{
                                return{
                                    backgroundColor: isActive ? "#27533e": "",
                                    color: isActive ? "#fff": ""
                                }
                            }}  className="border-0 list-group-item list-group-item-action">
                                Danh sách đồ cầm trong kho
                            </NavLink>
                            <NavLink to={"/nav/info-store/transaction-history"} onClick={()=>{
                                setIsActive(false)
                            }} style={({isActive})=>{
                                return{
                                    backgroundColor: isActive ? "#27533e": "",
                                    color: isActive ? "#fff": ""
                                }
                            }}  className="border-0 list-group-item list-group-item-action">
                                Lịch sử giao giao dịch
                            </NavLink>
                            <NavLink to={"/nav/info-store/top-10"} onClick={()=>{
                                setIsActive(false)
                            }} style={({isActive})=>{
                                return{
                                    backgroundColor: isActive ? "#27533e": "",
                                    color: isActive ? "#fff": ""
                                }
                            }}  className="border-0 list-group-item list-group-item-action ">
                                Top 10 hợp đồng mới nhất
                            </NavLink>
                        </div>
                    </div>
                    <Outlet/>
                </div>
            </div>
        </>
    )

}