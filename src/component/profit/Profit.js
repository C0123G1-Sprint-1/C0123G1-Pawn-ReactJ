import {ChartComponent} from "./Chart";
import {NavLink, useParams} from "react-router-dom"
import {Chart} from "chart.js/auto"
import React, {useEffect, useState} from "react";
import {Outlet} from "react-router";
import {Field, Form, Formik} from "formik";
import * as ProfitService from "../../service/ProfitService"
import "../../css/interest.css"

export default function Profit() {
    const [contracts, setContract] = useState()
    const [profitType, setProfitType] = useState("interest");
    const [totalPage, setTotalPage] = useState();
    const [totalProfit, setTotalProfit] = useState(0);
    const params = useParams();
    const [dataProfit, setDataProfit] = useState();
    const [dateTimeProfit, setDateTimeProfit] = useState({
        startDate: "",
        endDate: ""
    })
    const [currentPage, setCurrentPage] = useState(0);
    const [statisticsStatus, setStatisticsStatus] = useState(true);

    const getContractByPage = async (startDate, endDate, page, profitType) => {
        await getContract(dateTimeProfit.startDate, dateTimeProfit.endDate, page, profitType || params.profitType)
        setCurrentPage(page);
    }
    const pagination = () => {
        const page = [];
        for (let i = 0; i < totalPage; i++) {
            const isCurrentPage = currentPage === i;
            const pageLinkClassName = isCurrentPage ? 'page-link active' : 'page-link';

            page.push(
                <li className="page-item" key={i}>
                    <a className={pageLinkClassName}
                       onClick={() => getContractByPage(dateTimeProfit.startDate, dateTimeProfit.endDate, i, profitType || params.profitType)}>
                        {i + 1}
                    </a>
                </li>
            )
        }
        return page;
    }
    const getProfit = async (startDate, endDate, profitType) => {
        const res = await ProfitService.getProfit(startDate, endDate, profitType)
        if (res === null) {
            setTotalProfit(0)
        } else {
            setTotalProfit(res.data)

        }
    }

    const getDataProfit = async (startDate, endDate, profitType) => {
        const res = await ProfitService.getDataChart(startDate, endDate, profitType)
        if (res === null) {
            setDataProfit([{
                month: null,
                profit: null
            }])
        } else {
            setDataProfit(res.data)
        }
    }
    const getContract = async (startDate, endDate, page, profitType) => {
        const res = await ProfitService.getAllContract(startDate, endDate, page, profitType)
        if (res === null) {
            setTotalPage(null)
            setContract(null)
        } else {
            setTotalPage(res.data.totalPages)
            setContract(res.data.content)
        }
    }
    const setProfit = async (profitType) => {
        await setCancel()
        await setProfitType(() => profitType)
    }
    const setDate = async (event) => {
        await setDateTimeProfit({
            ...dateTimeProfit,
            startDate: event.target.value
        })
    }
    const setCancel = async () => {
        await setStatisticsStatus(!statisticsStatus)
        await setDateTimeProfit({
            startDate: "",
            endDate: ""
        })
    }

    useEffect(() => {
        // alert(profitType || params.profitType  + " " + dateTimeProfit.startDate)
        const fectData = async () => {
            await setCurrentPage(0);
            await getContract(dateTimeProfit.startDate, dateTimeProfit.endDate, 0, profitType || params.profitType)
            await getDataProfit(dateTimeProfit.startDate, dateTimeProfit.endDate, profitType || params.profitType)
            await getProfit(dateTimeProfit.startDate, dateTimeProfit.endDate, profitType || params.profitType)
        }
        fectData()
    }, [profitType, dateTimeProfit])
    // useEffect(()=>{
    //     alert(profitType || params.profitType+2 + dateTimeProfit.startDate)
    //     const fectData = async () => {
    //         await setCurrentPage(0);
    //         await getContract(dateTimeProfit.startDate, dateTimeProfit.endDate, 0, profitType || params.profitType)
    //         await getDataProfit(dateTimeProfit.startDate, dateTimeProfit.endDate, profitType || params.profitType)
    //         await getProfit(dateTimeProfit.startDate, dateTimeProfit.endDate, profitType || params.profitType)
    //     }
    //     fectData()
    // },[dateTimeProfit])
    if (!dataProfit || !contracts && contracts !== null) {
        return null;
    }
    return (
        <>
            {/*<div id="content" className="container">*/}
            {/*    <div className="row mt-5">*/}
            {/*<div className="col-md-12 col-lg-3">*/}
            {/*    <div className="list-group">*/}
            {/*        <a*/}
            {/*            href="#"*/}
            {/*            className="list-group-item list-group-item-action active "*/}
            {/*            id="nav-side-bar"*/}
            {/*            aria-current="true"*/}
            {/*        >*/}
            {/*            Thông tin cửa hàng*/}
            {/*        </a>*/}
            {/*        <a href="#" className="list-group-item list-group-item-action">*/}
            {/*            Tài chính*/}
            {/*        </a>*/}
            {/*        <a href="#" className="list-group-item list-group-item-action">*/}
            {/*            Danh sách đồ cầm trong kho*/}
            {/*        </a>*/}
            {/*        <a href="#" className="list-group-item list-group-item-action">*/}
            {/*            Lịch sử giao giao dịch*/}
            {/*        </a>*/}
            {/*        <a className="list-group-item list-group-item-action ">*/}
            {/*            Top 10 hợp đồng mới nhất*/}
            {/*        </a>*/}
            {/*        <a className="list-group-item list-group-item-action active" id="statistic-profit">*/}
            {/*            Thống kê lợi nhuận*/}
            {/*        </a>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="col-md-12 col-lg-9 content-profit">
                <div className="row">
                    <div className=" col-lg-12" align="center">
                        <ul className="d-flex nav-content justify-content-center p-0">
                            <li className="col-4"><NavLink onClick={() => setProfit("interest")}
                                                           style={({isActive}) => {
                                                               return {
                                                                   backgroundColor: isActive ? "#27533e" : "",
                                                                   color: isActive ? "#fff" : "",
                                                                   width: "100%"
                                                               }
                                                           }} to="/nav/info-store/profit/interest/interest"
                                                           className="btn btn-sm rounded-4  ">Lợi nhuận từ tiền
                                lãi</NavLink></li>
                            <li className="col-4"><NavLink onClick={() => setProfit("liquidation")}
                                                           style={({isActive}) => {
                                                               return {
                                                                   backgroundColor: isActive ? "#27533e" : "",
                                                                   color: isActive ? "#fff" : "",
                                                                   width: "100%"
                                                               }
                                                           }} to="/nav/info-store/profit/liquidation/liquidation"
                                                           className="btn btn-sm rounded-4  ">Lợi nhuận từ thanh
                                lý</NavLink>
                            </li>
                            <li className="col-4"><NavLink onClick={() => setProfit("foresee")} style={({isActive}) => {
                                return {
                                    backgroundColor: isActive ? "#27533e" : "",
                                    color: isActive ? "#fff" : "",
                                    width: "100%"
                                }
                            }} to="/nav/info-store/profit/foresee/foresee" className="btn btn-sm rounded-4  ">Lợi nhuận dự
                                kiến</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="row  col-lg-12 mt-3 p-0">
                        <div className="p-0">
                            <Formik
                                initialValues={{
                                    startDate: "",
                                    endDate: ""
                                }}
                                onSubmit={async (values) => {
                                    await getContract(values.startDate, values.endDate, 0, profitType || params.profitType)
                                    await getDataProfit(values.startDate, values.endDate, profitType || params.profitType)
                                    await getProfit(values.startDate, values.endDate, profitType || params.profitType)
                                    await setDateTimeProfit({
                                        startDate: values.startDate,
                                        endDate: values.endDate
                                    })
                                }}>
                                <Form className="p-0 ms-5">
                                    <div className="d-flex col-lg-12 justify-content-between p-0">
                                        <div className=" col-lg-5 p-0">
                                            <span>Từ ngày : <Field name="startDate" type="date"
                                                onChange={(event)=>setDate(event)}
                                                                   value={dateTimeProfit?.startDate}/></span>
                                        </div>
                                        <div className=" col-lg-5">
                                            <span>Đến : <Field name="endDate" type="date"/></span>
                                        </div>
                                        <div className=" col-lg-2 p-0 d-flex justify-content-end">
                                            <button type="submit" className="btn btn-sm btn-primary">Thống kê
                                            </button>
                                            <button type="button" onClick={() => setCancel()}
                                                    className="btn btn-sm btn-primary ms-1">Hủy
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            </Formik>
                            <label className="mt-3 p-0 ms-5" style={{color: "indianred"}}>
                                Tổng lợi nhuận :{" "}
                                <input type="text" disabled value={
                                    totalProfit
                                }/>
                            </label>
                        </div>
                    </div>
                    <div className="container" style={{height: "45vh"}}>
                        {
                            dataProfit ?
                                <ChartComponent data={dataProfit}/>
                                : ""
                        }
                    </div>
                </div>
            </div>
            <div className=" mt-3 container col-12">
                <div align="center">
                    <h1>Danh sách hợp đồng</h1>
                </div>
                <Outlet context={contracts}/>
                {
                    contracts ?
                        <div className="d-flex  col-lg-12 justify-content-end">
                            <nav aria-label="...">
                                <ul className="pagination">
                                    <li className="page-item">
                                        {
                                            currentPage !== 0 ?
                                                <a className="page-link"
                                                   onClick={() => getContractByPage(dateTimeProfit.startDate, dateTimeProfit.endDate, currentPage - 1, profitType || params.profitType)}>
                                                    Trước
                                                </a>
                                                :
                                                ""
                                        }
                                    </li>
                                    {
                                        pagination()
                                    }
                                    <li className="page-item">
                                        {
                                            currentPage !== totalPage - 1 ?
                                                <a className="page-link"
                                                   onClick={() => getContractByPage(dateTimeProfit.startDate, dateTimeProfit.endDate, currentPage + 1, profitType || params.profitType)}>
                                                    Sau
                                                </a>
                                                :
                                                ""
                                        }
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        :
                        ""
                }
            </div>
        </>
    )
}