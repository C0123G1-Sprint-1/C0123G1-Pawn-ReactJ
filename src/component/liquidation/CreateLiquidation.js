import React, {useState} from "react";
import {Field, Form, Formik} from "formik";
import '../../css/liquidation.css';
import {Modal} from "react-bootstrap";

export function CreateLiquidation() {
    const [showModal, setShowModal] = useState(false);

    const handleModalClose = () => {
        setShowModal(false);
    };
    const handleModalOpen = () => {
        setShowModal(true);
    };
    return (
        <>
            <Formik initialValues={{
                customers: "",
                contracts: "",
                totalPrice: ""
            }} onSubmit={values => console.log("dsfd")}>
                <div className="container mb-5">
                    <div className="row height d-flex justify-content-center align-items-center">
                        <div className="col-md-6">
                            <div className="card px-5 py-4">
                                <div style={{textAlign: "center"}}>
                                    <h1>Thanh lý hàng</h1>
                                </div>
                                <Form>
                                    <div className="text-center mt-4 btn-group p-3 m-l-2">
                                        <div className="text-center m-auto">
                                            <button variant="primary" onClick={handleModalOpen}>
                                                <b className="text-center">Chọn khách hàng</b>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-4 inputs"><label>Tên khách hàng</label>
                                        <Field type="text" className="form-control" id="name" name="name" disabled/>
                                    </div>
                                    <div className="mt-4 inputs"><label>CMND</label>
                                        <Field type="text" className="form-control" id="cmnd" name="name" disabled/>
                                    </div>
                                    <div className="mt-2 inputs">
                                        <label>Đồ thanh lý</label>
                                        <div className="text-center m-auto">
                                            <button type="button" className="btn btn-outline-success"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#staticBackdrop1">
                                                <b className="text-center">Chọn đồ thanh lý</b>
                                            </button>
                                        </div>
                                        <div className="justify-content-between mt-4">
                                            <div className="input-group">
                                                <Field type="text" className="form-control" id="cmnd" name="name"
                                                       disabled/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-2 inputs"><label>Tổng tiền</label>
                                        <Field type="text" className="form-control" id="" name="birthday" disabled/>
                                    </div>
                                    <div className="text-center mt-4 btn-group p-3 m-l-2">
                                        <div className="text-center" style={{marginLeft: "23%"}}>
                                            <button type="button" className="btn btn-secondary ">
                                                <b className="text-center">Quay lại</b>
                                            </button>
                                        </div>
                                        <div className="text-center" style={{marginRight: "23%"}}>
                                            <button type="submit" className="btn btn-success">
                                                <b className="text-center">Thêm mới</b>
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </Formik>

            <Modal
                show={showModal}
                onHide={handleModalClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title className="text-center">Chọn khách hàng</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="d-flex justify-content-between">
                        <div>
                            <Button variant="outline-success">
                                <b className="textcenter">Thêm khách hàng</b>
                            </Button>
                        </div>
                        <Form className="d-flex m-1">
                            <Form.Control
                                style={{width: "18vw", borderColor: "black"}}
                                type="text"
                                name="ngayMua"
                                placeholder="Tìm kiếm"
                                aria-label="Search"
                            />
                            <Button variant="outline-primary" type="submit">
                                <i className="bi bi-search"></i>
                            </Button>
                        </Form>
                    </div>

                    <Table striped>
                        <thead>
                        <tr>
                            <th className="text-center">Tên khách hàng</th>
                            <th className="text-center">SĐT</th>
                            <th className="text-center">CMND</th>
                            <th className="text-center">Số lượng HD</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="text-center">Nguyễn Đức Thắng</td>
                            <td className="text-center">0905124562</td>
                            <td className="text-center">203652485</td>
                            <td className="text-center">4</td>
                            <td className="text-center">
                                <Button variant="success" className="text-center">
                                    Chọn
                                </Button>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </Modal.Body>

                <Modal.Footer>
                    <div className="d-flex col-12 justify-content-end" style={{marginLeft: "-5%"}}>
                        <nav aria-label="...">
                            <ul className="pagination">
                                <li className="page-item disabled">
                                    <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">
                                        Trước
                                    </a>
                                </li>
                                <li className="page-item" aria-current="page">
                                    <a className="page-link active" href="#">
                                        1
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        2
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        3
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        Sau
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </Modal.Footer>
            </Modal>


            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
                    crossorigin="anonymous"/>
        </>
    )
}