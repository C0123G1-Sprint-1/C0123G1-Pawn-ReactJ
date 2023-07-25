import * as contractService from "../../../service/ContractService";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
export function ModalCustomers() {
    const [showModal, setShowModal] = useState(false);
    const [idCustomer, setIdCustomer] = useState();
    const [customerName, setCustomerName] = useState('');
    const [customer, setCustomer] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0); // Tổng số trang
    const getAllCustomer = async () => {
        try {
            const res = await contractService.findAllCustomer(currentPage, customerName)
            setCustomer(res.content)
            setPageCount(res.totalPages)
        } catch (e) {
        }
    }
    //  Sổ list  chọn khách hàng
    useEffect(() => {
        getAllCustomer()
    }, [currentPage, customerName])

    const handlePage = async (pages) => {
        setCurrentPage(+pages.selected);
        const res = await contractService.findAllCustomer(currentPage, customerName)
        setCustomer(res.content)
    }
    // Modal
    const handleModalClose = () => {
        setShowModal(false);
        setCustomerName("")
    };

    const handleModalOpen = () => {
        setShowModal(true);
    };
    return(
        <>
            <div className="text-center mt-4 btn-group p-3 m-l-2">
                <div className="text-center m-auto">

                    <Modal
                        className="modal-lg"
                        show={showModal}
                        onHide={handleModalClose}

                        keyboard={false}
                        centered
                    >
                        <Modal.Header style={{ backgroundColor: "#00833e", color: "white" }}>
                            <Modal.Title style={{ width: "100%", textAlign: "center" }}>
                                <b>Chọn khách hàng</b>
                            </Modal.Title>
                            <Button
                                variant="secondary"
                                className="btn-close btn-close-white"
                                style={{ marginLeft: 0,}}
                                onClick={handleModalClose}
                            />
                        </Modal.Header>
                        <Modal.Body>
                            <div className="controlsmodal-body d-flex justify-content-between">
                                <div style={{ marginTop: "0.6%" }}>
                                    <Link to="/nav/manager-customer/create" type="submit" className="btn btn-outline-success ">
                                        <b className="textcenter">Thêm khách hàng</b>
                                    </Link>
                                </div>
                                <Formik initialValues={{
                                    name: ""
                                }}
                                        onSubmit={async (values) => {

                                            const search = async () => {
                                                await setCustomerName(values.name)
                                                const res = await contractService.findAllCustomer(pageCount, values.name)
                                                setCustomer(res.content)
                                                setPageCount(0)
                                                console.log(values)
                                            }
                                            search()

                                        }}>
                                    <Form className="d-flex m-1">
                                        <Field
                                            style={{ width: "18vw", height: "38px" }}
                                            className="form-control me-3"
                                            type="text"
                                            name="name"
                                            placeholder="Tìm kiếm theo tên khách hàng"
                                            aria-label="Search"

                                        />
                                        <button className="btn btn-outline-success" type="submit">
                                            <i className="bi bi-search" />
                                        </button>
                                    </Form>
                                </Formik>
                            </div>
                            <table className="table table-striped">
                                <thead>
                                <tr style={{ textAlign: "start" }}>
                                    <th className="">STT</th>
                                    <th className="">Tên khách hàng</th>
                                    <th className="">CMND/CCCD</th>
                                    <th className="text-center">Chức Năng</th>
                                </tr>
                                </thead>
                                {customer.length === 0 ?
                                    <tr>
                                        <td colSpan="4" className="text-center">
                                            <h4 style={{ color: "red" }}>Dữ liêu không tồn tại</h4>
                                        </td>
                                    </tr>
                                    :
                                    <tbody>
                                    {customer.map((list, index) => (
                                        <tr key={index}>
                                            <td >{list.id}</td>
                                            <td className=" ">{list.name}</td>
                                            <td className="">{list.citizenCode}</td>
                                            <td className="text-center">
                                                <button onClick={() => {
                                                    setIdCustomer(list.id)
                                                    handleModalClose(true);
                                                }} className="btn btn-success text-center">
                                                    Chọn
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                    }
                                    {/* Other table rows */}
                                    </tbody>
                                }
                            </table>
                            {customer.length === 0 ? '' :
                                <div className="d-grid">
                                    <ReactPaginate
                                        breakLabel="..."
                                        nextLabel="Sau"
                                        onPageChange={handlePage}
                                        pageCount={pageCount}
                                        previousLabel="Trước"
                                        containerClassName="pagination"
                                        pageLinkClassName="page-num"
                                        nextLinkClassName="page-num"
                                        previousLinkClassName="page-num"
                                        activeClassName="active"
                                        disabledClassName="d-none"
                                    />
                                </div>
                            }
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </>
    )

}