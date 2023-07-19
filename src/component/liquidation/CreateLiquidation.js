import React, {useEffect, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as yup from "yup";
import {Modal} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import '../../css/liquidation.css';
import {
    getListCustomerAPI,
    getListProductAPI,
    getListProductTypeAPI, saveLiquidationAPI, searchContractAPI,
    searchCustomerAPI
} from "../../service/LiquidationService";
import {useNavigate} from "react-router";
import * as Swal from "sweetalert2";

export function CreateLiquidation() {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [idCustomer, setIdCustomer] = useState(0);
    const [contracts, setContracts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [productType, setProductType] = useState([]);
    const [listProduct, setListProduct] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const getListCustomer = async () => {
        try {
            const response = await getListCustomerAPI(page);
            setCustomers(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error while loading customers:', error);
        }
    };

    const getListProduct = async () => {
        try {
            const response = await getListProductAPI(page);
            setContracts(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error while loading products:', error);
        }
    };
    const getListProductType = async () => {
        const res = await getListProductTypeAPI();
        setProductType(res.data);
    }
    const paginate = (page) => {
        setPage(page)
    }
    useEffect(() => {
        getListCustomer();
        getListProduct()
        getListProductType();
    }, [page]);

    const getProduct = (id) => {
        const selectedContract = contracts.find((c) => c.id === id);
        if (selectedContract) {
            setListProduct([...listProduct, selectedContract]);
        }
    };

    useEffect(() => {
        const calculateTotalPrice = () => {
            const totalPrice = listProduct.reduce(
                (accumulator, product) => accumulator + parseInt(product.loans),
                0
            );
            setTotalPrice(totalPrice);
        };
        calculateTotalPrice();
    }, [listProduct]);

    const data = {
        products: listProduct.map((p) => p.productName).join(",")
    };

    const handleModalClose = () => {
        setShowModal(false);
    };
    const handleModalOpen = () => {
        setShowModal(true);
    };

    const handleModalClose1 = () => {
        setShowModal1(false);
    };
    const handleModalOpen1 = () => {
        setShowModal1(true);
    };
    if (!customers) {
        return null
    }
    if (!contracts) {
        return null
    }
    return (
        <>
            <Formik initialValues={{
                id: '',
                customers: '',
                products: [''],
                totalPrice: 0,
                createTime: null
            }}
                // validationSchema={yup.object({
                //     customers: yup.number().required("Vui lòng chọn khách hàng."),
                //     products: yup.array().required("Vui lòng chọn sản phẩm.")
                // })}
                    onSubmit={async (values) => {
                        await saveLiquidationAPI({
                            ...values,
                            totalPrice: totalPrice,
                            customers: customers.find((c) => c.id === idCustomer),
                            products: data.products
                        });
                        navigate("/")
                        const save = () => {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Thêm mới tin thành công ',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                        save();
                    }}>
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
                                            <button onClick={handleModalOpen} type="button"
                                                    className="btn btn-outline-success ">
                                                <b className="text-center">Chọn khách hàng</b>
                                            </button>
                                        </div>
                                    </div>
                                    <ErrorMessage name="customers" component="span" style={{color: "red"}}/>
                                    <Field type="text" className="form-control" id="name" name="customers" hidden
                                           value={customers.find((c) => c.id === idCustomer)?.id}/>

                                    <div className="mt-4 inputs"><label>Tên khách hàng</label>
                                        <Field type="text" className="form-control" id="name" name="name" disabled
                                               value={customers.find((c) => c.id === idCustomer)?.name}/>
                                    </div>
                                    <div className="mt-4 inputs"><label>CMND</label>
                                        <Field type="text" className="form-control" id="cmnd" name="citizenCode"
                                               disabled
                                               value={customers.find((c) => c.id === idCustomer)?.citizenCode}/>
                                    </div>
                                    <div className="mt-4 inputs">
                                        <label>Đồ thanh lý</label>
                                        <div className="text-center m-auto">
                                            <button type="button" className="btn btn-outline-success"
                                                    onClick={handleModalOpen1}>
                                                <b className="text-center">Chọn đồ thanh lý</b>
                                            </button>
                                        </div>
                                        <ErrorMessage name="products" component="span" style={{color: "red"}}/>
                                        <div className="justify-content-between mt-4">
                                            <div className="input-group">
                                                <div className="product-list">
                                                    {listProduct.map((p) => (
                                                        <Field
                                                            key={p.id}
                                                            name="products"
                                                            type="text"
                                                            className="product-item"
                                                            value={p.productName}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-2 inputs"><label>Tổng tiền</label>
                                        <Field type="text" className="form-control" id="" name="totalPrice"
                                               value={totalPrice} disabled/>
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
                className="modal-lg"
                show={showModal}
                onHide={handleModalClose}
                backdrop="static"
                keyboard={false}

            >
                <Modal.Header style={{backgroundColor: "#00833e", color: "white"}}>
                    <Modal.Title className="text-center" style={{width: "100%", textAlign: "center"}}>Chọn khách
                        hàng</Modal.Title>
                    <button type="button" className="btn-close" onClick={handleModalClose} aria-label="Close"></button>

                </Modal.Header>
                <Modal.Body>
                    <Formik initialValues={{
                        name: "",
                    }} onSubmit={async (values) => {
                        const searchCustomer = async () => {
                            const res = await searchCustomerAPI(0, values.name);
                            setCustomers(res.data.content);
                        }
                        searchCustomer();

                    }
                    }>
                        <div className="d-flex justify-content-between">
                            <button type="submit" className="btn btn-outline-success ">
                                <b className="textcenter">Thêm khách hàng</b>
                            </button>
                            <Form className="d-flex m-1">

                                <Field style={{width: "18vw", borderColor: "black"}}
                                       class="form-control me-3"
                                       type="text"
                                       placeholder="Tìm kiếm"
                                       aria-label="Search" name="name"/>

                                <button className="btn btn-outline-primary" type="submit">
                                    <i className="bi bi-search"></i>
                                </button>
                            </Form>
                        </div>
                    </Formik>


                    <table className=" table table-striped">
                        <thead>
                        <tr>
                            <th className="text-center">Tên khách hàng</th>
                            <th className="text-center">CMND</th>
                            <th className="text-center">Số lượng HĐ</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            customers.map((c) => {
                                return (
                                    <tr key={c.id}>
                                        <td className="text-center">{c.name}</td>
                                        <td className="text-center">{c.citizenCode}</td>
                                        <td className="text-center">{c.quantityContract}</td>
                                        <td className="text-center">
                                            <button className="btn btn-success text-center" onClick={async () => {
                                                await setIdCustomer(c.id)
                                                handleModalClose(true)
                                            }}>
                                                Chọn
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </Modal.Body>

                <Modal.Footer>
                    <div className="d-flex col-12 justify-content-end" style={{marginLeft: "-5%"}}>
                        <nav aria-label="...">
                            <ul className="pagination">
                                <li hidden={page === 0} className="page-item ">
                                    <button className="page-link" tabIndex={-1}
                                            onClick={() => paginate(page - 1)}>
                                        Trước
                                    </button>
                                </li>
                                {
                                    Array.from({length: totalPages}, (a, index) => index).map((page) => (
                                        <li className="page-item">
                                            <button className="page-link " key={page}
                                                    onClick={() => paginate(page)}>
                                                {page + 1}
                                            </button>
                                        </li>
                                    ))
                                }
                                <li disabled={page + 1 === totalPages}
                                    className="page-item">
                                    <button className="page-link" tabIndex={-1}
                                            onClick={() => paginate(page + 1)}>
                                        Tiếp
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </Modal.Footer>
            </Modal>


            (
            <Modal
                className="modal-lg"
                show={showModal1}
                onHide={handleModalClose1}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header style={{backgroundColor: '#00833e', color: 'white'}}>
                    <Modal.Title className="text-center" style={{width: '100%', textAlign: 'center'}}>
                        Chọn đồ thanh lý
                    </Modal.Title>
                    <button type="button" className="btn-close" onClick={handleModalClose1} aria-label="Close"></button>
                </Modal.Header>

                <Modal.Body>
                    <Formik initialValues={{
                        productName: "",
                        productType: "",
                        loans: ""
                    }} onSubmit={async (values) => {
                        const searchProduct = async () => {
                            const res = await searchContractAPI(0, values.productName, values.productType, values.loans);
                            setContracts(res.data.content);
                        }
                        searchProduct();
                    }}>
                        <div className="modal-body">
                            <div className="">
                                <Form action="">
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className="form-group">
                                                <label htmlFor="kh">Tên đồ</label>
                                                <Field style={{borderColor: "black"}} id="kh" type="text"
                                                       name="productName" className="form-control"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="form-group">
                                                <label htmlFor="doCam">Loại đồ</label>
                                                <Field as="select" style={{borderColor: "black"}} id="doCam"
                                                       type="text"
                                                       name="productType" className="form-control">
                                                    <option value="">--Chọn--</option>
                                                    {
                                                        productType.map((pt) => (
                                                            <option key={pt.id} value={pt.id}>
                                                                {pt.name}
                                                            </option>
                                                        ))
                                                    }
                                                </Field>
                                            </div>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="form-group">
                                                <label>Giá</label>
                                                <Field
                                                    as="select"
                                                    style={{borderColor: 'black'}}
                                                    name="loans"
                                                    className="form-control"
                                                >
                                                    <option value="">--Chọn--</option>
                                                    <option value="1">Dưới 5 triệu</option>
                                                    <option value="2">5 triệu - 10 triệu</option>
                                                    <option value="3">10 triệu - 20 triệu</option>
                                                    <option value="4">Trên 20 triệu</option>
                                                </Field>
                                            </div>
                                        </div>
                                        <div className="col-lg-2" style={{marginTop: "1.5vw"}}>
                                            <div className="form-group">
                                                <button type="submit" className="btn btn-outline-primary ">
                                                    <i className="bi bi-search"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </Formik>


                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th className="text-center">Tên đồ</th>
                            <th className="text-center">Loại đồ</th>
                            <th className="text-center">Số lượng</th>
                            <th className="text-center">Giá</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            contracts.map((ct) => {
                                return (
                                    <tr key={ct.id}>
                                        <td className="text-center">{ct.productName}</td>
                                        <td className="text-center">{ct.productType}</td>
                                        <td className="text-center">1</td>
                                        <td className="text-center">{ct.loans}</td>
                                        <td className="text-center">
                                            <button type="button" onClick={() => {
                                                getProduct(ct.id);
                                                handleModalClose1(true);
                                            }}
                                                    className="btn btn-success text-center">Chọn
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </Modal.Body>

                <Modal.Footer>
                    <div className="d-flex col-12 justify-content-end" style={{marginLeft: '-5%'}}>
                        <nav aria-label="...">
                            <ul className="pagination">
                                <li hidden={page === 0} className="page-item ">
                                    <button className="page-link" tabIndex={-1}
                                            onClick={() => paginate(page - 1)}>
                                        Trước
                                    </button>
                                </li>
                                {
                                    Array.from({length: totalPages}, (a, index) => index).map((page) => (
                                        <li className="page-item">
                                            <button className="page-link " key={page}
                                                    onClick={() => paginate(page)}>
                                                {page + 1}
                                            </button>
                                        </li>
                                    ))
                                }
                                <li disabled={page + 1 === totalPages}
                                    className="page-item">
                                    <button className="page-link" tabIndex={-1}
                                            onClick={() => paginate(page + 1)}>
                                        Tiếp
                                    </button>
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