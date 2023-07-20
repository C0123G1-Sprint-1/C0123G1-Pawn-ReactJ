import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../css/home.css"

export function Footer() {
    return(

        <>
            <footer id="footer" className="footer">
                <div className="container">
                    <div className="row gy-4">
                        <div className="col-lg-5 col-md-12 footer-info">
                            <div className="logo d-flex align-items-center">
                                <img
                                    src="./anh/pawnshop.png"
                                    style={{ maxHeight: "10rem" }}
                                    alt=""
                                />
                            </div>
                            <div className="social-links d-flex mt-4">
                                <a href="" className="twitter">
                                    <i className="fa-brands fa-twitter" />
                                </a>
                                <a href="#" className="facebook">
                                    <i className="fa-brands fa-facebook" />
                                </a>
                                <a href="#" className="instagram">
                                    <i className="fa-brands fa-instagram" />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-2 col-6 footer-links">
                            <h4>Điều khiển &amp; Điều kiện</h4>
                            <ul>
                                <li>
                                    <a href="#">Điều khiển &amp; Điều kiện</a>
                                </li>
                                <li>
                                    <a href="#">Chính sách bảo mật thông tin</a>
                                </li>
                                <li>
                                    <a href="#">Chính sách bảo quản tài sản</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-2 col-6 footer-links">
                            <h4>Hỗ trợ khách hàng</h4>
                            <ul>
                                <li>
                                    <a href="#">Câu hỏi thường gặp</a>
                                </li>
                                <li>
                                    <a href="#">Sự cố hay gặp</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
                            <h4>Liên hệ</h4>
                            <p>
                                280 Trần Hưng Đạo, <br />
                                An Hải Tây , Sơn Trà ,<br />
                                Đà Nẵng <br />
                                <br />
                                <strong>Phone:</strong> 0236 6517 021
                                <br />
                                <strong>Email:</strong> pawshop@codegym.vn
                                <br />
                            </p>
                        </div>
                    </div>
                </div>
                <div className="container mt-4">
                    <div className="copyright">
                        © Copyright{" "}
                        <strong>
                            <span>C0123G1</span>
                        </strong>
                        . All Rights Reserved
                    </div>
                </div>
            </footer>



        </>
    )
}