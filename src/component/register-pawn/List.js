import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {RegisterPawn} from "./RegisterPawn";
import {ListPosts} from "../post/ListPosts";
// import "../../css/home.css"
// import io from "socket.io-client"
// import data from "bootstrap/js/src/dom/data";
//
// const socket =io.connect("http://localhost:8080/api/register/create");
// import SockJsClient from 'react-stomp';
export function List() {
    const navigate = useNavigate();

    // const [messageReceived,setMessageReceived] = useState("");
    // useEffect(() => {
    //     socket.on("receive_message",(data) => {
    //         setMessageReceived(data.message)
    //     })
    // },[socket])




    return (
        <>


            {/*<SockJsClient url='http://localhost:8080/api/register/'*/}
            {/*              topics={['/topic/user']}*/}
            {/*              onConnect={() => {*/}
            {/*                  console.log("connected");*/}
            {/*              }}*/}
            {/*              onDisconnect={() => {*/}
            {/*                  console.log("Disconnected");*/}
            {/*              }}*/}
            {/*              onMessage={(msg) => {*/}
            {/*                  console.log(msg);*/}
            {/*              }}*/}
            {/*              ref={(client) => {*/}
            {/*                  this.clientRef = client*/}
            {/*              }}/>*/}

            {/*<h1>Message : {messageReceived}</h1>*/}

            {/*<ListPosts/>*/}
            <div>
                <div id="demo" class="carousel slide" data-bs-ride="carousel">

                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"/>
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="1"/>
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="2"/>
                    </div>

                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="anh/z4495656532190_6887c6aeaabc3b081c72e969ab66c288.jpg" alt="Los Angeles" class="d-block" style={{width:"100%"}}/>
                        </div>
                        <div class="carousel-item">
                            <img src="anh/z4495656624664_bd45947738323e226dfe27013a92ff29.jpg" alt="Chicago" class="d-block" style={{width:"100%"}}/>
                        </div>
                        <div class="carousel-item">
                            <img src="anh/z4495656653609_0a57b810f61e9f559a15eef36a363504.jpg" alt="New York" class="d-block" style={{width:"100%"}}/>
                        </div>
                    </div>

                    <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon"/>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                        <span class="carousel-control-next-icon"/>
                    </button>
                </div>


                {/*<header>*/}
                {/*    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">*/}
                {/*        <div className="carousel-indicators">*/}
                {/*            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={0}*/}
                {/*                    className="active" aria-current="true" aria-label="Slide 1"/>*/}
                {/*            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={1}*/}
                {/*                    aria-label="Slide 2"/>*/}
                {/*            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={2}*/}
                {/*                    aria-label="Slide 3"/>*/}
                {/*        </div>*/}

                {/*        <div className="carousel-inner row">*/}
                {/*            <div className="carousel-item active col-12"*/}
                {/*                 style={{backgroundImage: 'url("anh/z4495656532190_6887c6aeaabc3b081c72e969ab66c288.jpg")'}}>*/}
                {/*                <div className="carousel-caption">*/}
                {/*                </div>*/}
                {/*            </div>*/}

                {/*            <div className="carousel-item active col-12"*/}
                {/*                 style={{backgroundImage: 'url("anh/z4495656624664_bd45947738323e226dfe27013a92ff29.jpg")'}}>*/}

                {/*            </div>*/}
                {/*            <div className="carousel-item  active col-12"*/}
                {/*                 style={{backgroundImage: 'url("anh/z4495656653609_0a57b810f61e9f559a15eef36a363504.jpg")'}}>*/}

                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <button className="carousel-control-prev" type="button"*/}
                {/*                data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">*/}
                {/*            <span className="carousel-control-prev-icon" aria-hidden="true"/>*/}
                {/*            <span className="visually-hidden">Previous</span>*/}
                {/*        </button>*/}
                {/*        <button className="carousel-control-next" type="button"*/}
                {/*                data-bs-target="#carouselExampleCaptions" data-bs-slide="next">*/}
                {/*            <span className="carousel-control-next-icon" aria-hidden="true"/>*/}
                {/*            <span className="visually-hidden">Next</span>*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</header>*/}
                <div className="recommend">
                    <h2 style={{padding : "1.5rem",marginTop:"-1rem"}} className="title">DỊCH VỤ CẦM ĐỒ PAWN SHOP </h2>
                    <div className="recommend-content">
                        <img src="./anh/tempsnip.png" alt=""/>
                        <div className="description" style={{textAlign: "justify"}}>
                            <p>
                                <strong>Pawnshop.com</strong> với gần 10 năm kinh nghiệm cung cấp dịch vụ
                                <a href="https://vi.wikipedia.org/wiki/Cầm_đồ" target="_blank" rel="noopener">
                                    <strong>cầm đồ</strong>
                                </a>
                                . Cam kết đảm bảo bạn sẽ hài lòng vì tài sản của bạn được{" "}
                                <b>niêm phong có chữ ký xác nhận và bảo hiểm 100% giá trị tài sản</b>{" "}
                                khi bạn chọn <b>Cầm Đồ </b>tại đây.
                            </p>
                            <p>
                                Thời hạn cầm cố tài sản linh động, có thể trả trước hạn linh hoạt tùy
                                theo nhu cầu của khách hàng, không tính phí phạt.
                            </p>
                            <p>Hãy liên hệ ngay cho chúng tôi để được hỗ trợ nhanh nhất!</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="title-css">
                <h2 className="title" style={{fontWeight: "600" ,   color: "#c57101",
                    textAlign: "center",padding:"0.5rem" , fontSize: "30px"}}>DỊCH VỤ NỔI BẬT</h2>

            </div>
            <p style={{textAlign: "center", justifyContent: "center"}}>
                {" "}
                Khám phá các dịch vụ được khách hàng cầm nhiều nhất tại pawn shop{" "}
            </p>
            <div id="exTab" className="container">
                <ul className="nav nav-pills">
                    <li className="active">
                        <a href="#1a" data-toggle="tab">
                            Cầm xe
                        </a>
                    </li>
                    <li>
                        <a href="#2a" data-toggle="tab">
                            Cầm sổ đỏ
                        </a>
                    </li>
                    <li>
                        <a href="#3a" data-toggle="tab">
                            Cầm trang sức
                        </a>
                    </li>
                    <li>
                        <a href="#4a" data-toggle="tab">
                            Cầm laptop
                        </a>
                    </li>
                </ul>
                <div className="tab-content ">
                    <div className="tab-pane active" id="1a">
                        <div className="tab-item" style={{display: "flex"}}>
                            <div className="tab-item-content">
                                <div className="form-intro">
                                    <h1> Xe máy </h1>
                                    <div className="box-content-info">
                                        <div className="item-option">
                                            <i className="fa-solid fa-check"/>
                                            <p> Cầm xe máy uy tin </p>
                                        </div>
                                        <div className="item-option">
                                            <i className="fa-solid fa-check"/>
                                            <p>15 phút có tiền</p>
                                        </div>
                                        <div className="item-option">
                                            <i className="fa-solid fa-check"/>
                                            <p>Khoản tiền lên đến 30 triệu</p>
                                        </div>
                                        <div className="item-option">
                                            <i className="fa-solid fa-check"/>
                                            <p>Chi phí cầm hợp lý</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="wrapper-img-option">
                                    <img style={{marginTop :"2rem",marginBottom:"2rem"}} src="./anh/home-image-1.jpg" alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane" id="2a">
                        <div className="tab-item" id="tab-2" style={{display: "flex"}}>
                            <div className="tab-item-content">
                                <div className="form-intro">
                                    <h1> SỔ đỏ </h1>
                                    <div className="box-content-info">
                                        <div className="item-option">
                                            <i className="fa-solid fa-check"/>
                                            <p> Cầm sổ đỏ uy tin </p>
                                        </div>
                                        <div className="item-option">
                                            <i className="fa-solid fa-check"/>
                                            <p>15 phút có tiền</p>
                                        </div>
                                        <div className="item-option">
                                            <i className="fa-solid fa-check"/>
                                            <p>Cầm mọi lúc mọi nơi</p>
                                        </div>
                                        <div className="item-option">
                                            <i className="fa-solid fa-check"/>
                                            <p>Chi phí cầm hợp lý</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="wrapper-img-option">
                                    <img  style={{marginTop :"2rem",height: "85%"}}
                                          src="https://vietsinggroup.com/wp-content/uploads/2021/09/cach-doc-thong-tin-so-do.jpg"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane" id="3a">
                        <div className="tab-item" style={{display: "flex"}}>
                            <div className="tab-item-content">
                                <div className="form-intro">
                                    <h1> Trang sức </h1>
                                    <div className="box-content-info">
                                        <div className="item-option">
                                            <i className="fa-solid fa-check"/>
                                            <p> Cầm trang sức uy tin </p>
                                        </div>
                                        <div className="item-option">
                                            <i className="fa-solid fa-check"/>
                                            <p>15 phút có tiền</p>
                                        </div>
                                        <div className="item-option">
                                            <i className="fa-solid fa-check"/>
                                            <p>Cầm mọi lúc mọi nơi</p>
                                        </div>
                                        <div className="item-option">
                                            <i className="fa-solid fa-check"/>
                                            <p>Chi phí cầm hợp lý</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="wrapper-img-option">
                                    <img      style={{marginTop :"2rem",height: "85%",marginRight:"1rem"}}
                                        src="https://cdn3.dhht.vn/wp-content/uploads/2022/01/5-vang-999-la-gi-bao-nhieu-1-chi-co-ban-lai-duoc-khong.jpg"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane" id="4a">
                        <div className="tab-item" style={{display: "flex"}}>
                            <div className="tab-item-content">
                                <div className="form-intro">
                                    <h1> Laptop</h1>
                                    <div className="box-content-info">
                                        <div className="item-option">
                                            <i className="fa-solid fa-check"/>
                                            <p> Cầm laptop uy tín </p>
                                        </div>
                                        <div className="item-option">
                                            <i className="fa-solid fa-check"/>
                                            <p>15 phút có tiền</p>
                                        </div>
                                        <div className="item-option">
                                            <i className="fa-solid fa-check"/>
                                            <p>Cầm mọi lúc mọi nơi</p>
                                        </div>
                                        <div className="item-option">
                                            <i className="fa-solid fa-check"/>
                                            <p>Chi phí cầm hợp lý</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="wrapper-img-option">
                                    <img  style={{marginTop :"2rem",height: "85%"}}
                                        src=" https://2.bp.blogspot.com/-iYgZOlwuoGg/Vu0Go3WxonI/AAAAAAAAXWw/dJEZYCp310UA-Eq0ANX9goiNtz9fQ0_GA/s1600/ASUS-R510.jpg"
                                        alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <>
                <div style={{marginBottom: "2.5rem", marginTop: "2.5rem", gap: 10}}>
                    <div className="section-content relative">
                        <h2
                            className="title-main"
                            style={{textAlign: "center",margin: "0",marginTop :"-2rem" ,padding:"1.5rem"}}>
                            Bạn đã đúng khi chọn chúng tôi?
                        </h2>
                        <p style={{textAlign: "center",marginTop : "1rem"}}>
                            Khi lựa chọn cầm cố tài sản tại{" "}
                            <span style={{color: "red"}}>Pawn Shop</span> thì đảm bảo quý khách sẽ
                            nhận được rất nhiều ưu điểm của chúng tôi như nhiệt tình, thủ tục nhanh,
                            lãi suất thấp… mục đích giải ngân vốn nhanh chóng.
                        </p>
                        <div id="row-533179783" style={{justifyContent: "center"}}>
                            {/*    card*/}
                            <div className="section-container">
                                <div className="card ">
                                    <div>
                                        <img
                                            src="https://chovayhanoi.com/wp-content/uploads/2020/04/customer-service.png"
                                            alt="..."
                                        />
                                    </div>
                                    <div>
                                        <div className="card-body">
                                            <h5 className="uppercase">TƯ VẤN NHIỆT TÌNH MIỄN PHÍ </h5>
                                            <h6>Tư vấn hoàn toàn miễn phí trước khi cầm đồ</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="card ">
                                    <div>
                                        <img
                                            src="https://chovayhanoi.com/wp-content/uploads/2020/04/refund.png"
                                            alt="..."
                                        />
                                    </div>
                                    <div>
                                        <div className="card-body">
                                            <h5 className="uppercase">LÃI SUẤT LUÔN RẺ NHẤT</h5>{" "}
                                            <h6>Cam kết cầm xe ô tô với lãi suất thấp nhất</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="card ">
                                    <div>
                                        <img
                                            src="https://chovayhanoi.com/wp-content/uploads/2020/04/layer.png"
                                            alt="..."
                                        />
                                    </div>
                                    <div>
                                        <div className="card-body">
                                            <h5 className="uppercase">ĐƠN GIẢN – NHANH CHÓNG</h5>{" "}
                                            <h6>Thủ tục đơn giản, giải ngân chỉ trong 30 phút</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="card ">
                                    <div>
                                        <img
                                            src="https://chovayhanoi.com/wp-content/uploads/2020/04/certificate.png"
                                            alt="..."
                                        />
                                    </div>
                                    <div>
                                        <div className="card-body">
                                            <h5 className="uppercase">THƯƠNG HIỆU UY TÍN</h5>
                                            <h6>Uy tín 10 năm, luôn làm theo pháp luật</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <RegisterPawn/>

                {/*<ListPosts/>*/}

                <div className="mb-3">
                    <iframe
                        style={{border: 0, width: "100%", height: 350, marginTop: "1rem"}}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d981550.4679898163!2d107.56138222715613!3d16.056067821121232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219a486b7f699%3A0xae6269b629a63e82!2zQ29kZUd5bSDEkMOgIE7hurVuZw!5e0!3m2!1sen!2s!4v1686461057056!5m2!1sen!2s"
                        width={600}
                        height={450}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        frameBorder={0}
                        allowFullScreen=""
                    />
                </div>
                {/* End Google Maps */}
            </>


        </>


    )
}

