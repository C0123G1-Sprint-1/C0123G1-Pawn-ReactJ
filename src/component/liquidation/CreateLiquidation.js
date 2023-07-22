import React, {useEffect, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import jwt from 'jwt-decode';
import {Modal} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import '../../css/liquidation.css';
import {
    getListCustomerAPI,
    getListProductAPI,
    getListProductTypeAPI, saveLiquidationAPI,
} from "../../service/LiquidationService";
import {useNavigate} from "react-router";
import * as Swal from "sweetalert2";
import {Link, NavLink} from "react-router-dom";


const token = localStorage.getItem('token');
const decodedToken = jwt(token);
console.log(decodedToken.sub)
console.log(decodedToken.role)

export function CreateLiquidation() {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [idCustomer, setIdCustomer] = useState(0);
    const [contracts, setContracts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [productTypes, setProductTypes] = useState([]);
    const [listProduct, setListProduct] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [customerPage, setCustomerPage] = useState(0);
    const [contractPage, setContractPage] = useState(0);
    const [customerTotalPages, setCustomerTotalPages] = useState(0);
    const [contractTotalPages, setContractTotalPages] = useState(0);
    const [name, setName] = useState('');
    const [productName, setProductName] = useState('');
    const [productType, setProductType] = useState('');
    const [loans, setLoans] = useState('');


    const formatCurrency = (amount) => {
        return amount.toLocaleString({style: 'currency', currency: 'VND'});
    };

    const handleDeleteProduct = (productId) => {
        const updatedList = listProduct.filter((p) => p.id !== productId);
        setListProduct(updatedList);
    };

    const getListCustomer = async () => {
        try {
            const response = await getListCustomerAPI(customerPage, name);
            setCustomers(response.data?.content);
            setCustomerTotalPages(response?.data.totalPages);
        } catch (error) {
            console.error('Error while loading customers:', error);
        }
    };

    const getListProduct = async () => {
        try {
            const response = await getListProductAPI(contractPage, productName, productType, loans);
            setContracts(response?.data.content);
            setContractTotalPages(response?.data.totalPages);
        } catch (error) {
            console.error('Error while loading products:', error);
        }
    };
    const getListProductType = async () => {
        const res = await getListProductTypeAPI();
        setProductTypes(res.data);
    }
    const paginateCustomers = async (page) => {
        setCustomerPage(page);
    };

    const paginateContracts = (page) => {
        setContractPage(page);
    };

    useEffect(() => {
        getListProductType();
        getListCustomer();
        getListProduct();
    }, [customerPage, name, contractPage, productType, productName, loans]);


    const onSelectContract = (id) => {
        const selectedContract = contracts.find((c) => c.id === id);
        if (selectedContract && !listProduct.filter(lp => lp.id === selectedContract.id)[0]) {
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
        products: listProduct.map((p) => p.id).join(",")
    };

    const handleModalClose = () => {
        setCustomerPage(0);
        setShowModal(false);
        setName('');
    };
    const handleModalOpen = () => {
        setShowModal(true);
    };

    const handleModalClose1 = () => {
        setContractPage(0);
        setShowModal1(false);
        setProductType('');
        setProductName('');
        setProductName('');
    };
    const handleModalOpen1 = () => {
        setShowModal1(true);
    };

    const loadContracts = async () => {

        // Sử dụng hàm fire() của Swal bằng cách gán kết quả vào biến result.
        let timerInterval
        Swal.fire({
            title: 'Chúng tôi đang sử lí mong đợi trong vài giây',
            html: 'Vui lòng đợi trong  <b></b> giây.',
            timer: 4000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
        })
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
                contractType: 2,
                contractStatus: 5,
                customers: '',
                image: contracts.image,
                products: '',
                totalPrice: 0,
                createTime: null
            }}
                // validationSchema={yup.object({
                //     customers: yup.string().required("Vui lòng chọn khách hàng."),
                //     products: yup.string().required("Vui lòng chọn sản phẩm.")
                // })}
                    onSubmit={async (values) => {
                        await saveLiquidationAPI({
                            ...values,
                            totalPrice: totalPrice,
                            customers: customers.find((c) => c.id === idCustomer),
                            products: data.products
                        });
                        navigate("/nav/info-store/transaction-history")
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

                <div className="container ">
                    <div className="row height d-flex justify-content-center align-items-center">
                        <div className="col-md-6">
                            <div className="card px-5 py-4">
                                <div style={{textAlign: "center"}}>
                                    <h2>THANH LÝ HÀNG</h2>
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
                                    <Field type="text" className="form-control" id="name" name="customers"
                                           hidden
                                           value={customers.find((c) => c.id === idCustomer)?.id}/>

                                    <div className="mt-4 inputs"><label>Tên khách hàng</label>
                                        <Field type="text" className="form-control" id="name" name="name"
                                               disabled
                                               value={customers.find((c) => c.id === idCustomer)?.name}/>
                                    </div>
                                    <div className="mt-4 inputs"><label>CMND</label>
                                        <Field type="text" className="form-control" id="cmnd"
                                               name="citizenCode"
                                               disabled
                                               value={customers.find((c) => c.id === idCustomer)?.citizenCode}/>
                                    </div>
                                    <div className="mt-4 inputs">
                                        <label>Đồ thanh lý</label>

                                        <div className="justify-content-between mt-4">
                                            <div className="input-group">
                                                <div className="product-list">
                                                    {listProduct.map((p) => (
                                                        <div style={{position: 'relative'}}>
                                                            <div style={{
                                                                position: 'absolute',
                                                                top: -5,
                                                                right: -5,
                                                                width: '15px',
                                                                height: '15px',
                                                                border: '1px solid gray',
                                                                borderRadius: '50%',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                fontSize: '10px',
                                                                cursor: 'pointer'
                                                            }} onClick={() => handleDeleteProduct(p.id)}>
                                                                <span>x</span>
                                                            </div>
                                                            <div
                                                                key={p.id}
                                                                className="product-item"
                                                            >{p.productName}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center m-auto">
                                            <button type="button" className="btn btn-outline-success"
                                                    onClick={handleModalOpen1}>
                                                <b className="text-center">Chọn đồ thanh lý</b>
                                            </button>
                                        </div>
                                        <ErrorMessage name="products" component="span"
                                                      style={{color: "red"}}/>
                                    </div>

                                    <div className="mt-2 inputs"><label>Tổng tiền</label>
                                        <Field type="text" className="form-control" id="" name="totalPrice"
                                               value={formatCurrency(totalPrice) + " VNĐ"} disabled/>
                                    </div>
                                    <div className="text-center mt-4 btn-group p-3 m-l-2">
                                        <div className="text-center m-auto">
                                            <NavLink
                                                type="button"
                                                className="btn btn-secondary"
                                                to={"/"}>
                                                Quay lại
                                            </NavLink>
                                        </div>
                                        <div
                                            className="text-center m-auto">


                                            <button type="submit" className="btn btn-success"
                                                    onClick={loadContracts}
                                                    disabled={!idCustomer || listProduct.length === 0}>
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
                            await setName(values.name)
                            const res = await getListCustomerAPI(customerPage, values.name);
                            await setCustomerPage(0);
                            await setCustomers(res.data.content);
                        }
                        searchCustomer();
                    }}>
                        <div className="d-flex justify-content-between">
                            <Link to="/nav/create" type="submit" className="btn btn-outline-success ">
                                <b className="textcenter">Thêm khách hàng</b>
                            </Link>
                            <Form className="d-flex m-1">

                                <Field style={{width: "18vw", borderColor: "black"}}
                                       class="form-control me-3"
                                       type="text"
                                       placeholder="Tìm kiếm"
                                       aria-label="Search" name="name"/>

                                <button className="btn btn-outline-success" type="submit">
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
                        {customers.length === 0 ?
                            <tr>
                                <td colSpan="4" className="text-center">
                                    <h4 style={{color: "red"}}>Dữ liêu không tồn tại</h4>
                                </td>
                            </tr>
                            :
                            <tbody>
                            {
                                customers.map((c) => {
                                    return (
                                        <tr key={c.id}>
                                            <td className="text-md-start">{c.name}</td>
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
                        }
                    </table>
                </Modal.Body>

                <Modal.Footer>
                    <div className="d-flex col-12 justify-content-end" style={{marginLeft: "-5%"}}>
                        <nav aria-label="...">
                            {customerTotalPages > 0 && (
                                <ul className="pagination">
                                    <li hidden={customerPage === 0} className="page-item">
                                        <button className="page-link" tabIndex={-1} onClick={() => paginateCustomers(customerPage - 1)}>
                                            Trước
                                        </button>
                                    </li>
                                    {Array.from({ length: customerTotalPages }, (a, index) => index).map((page) => {
                                        // Kiem tra neu trang hien tai gan voi trang dau tien hoac gan voi trang cuoi cung
                                        if (page === 0 || page === customerTotalPages - 1 || Math.abs(page - customerPage) <= 1) {
                                            return (
                                                <li className={`page-item ${page === customerPage ? "active" : ""}`} key={page}>
                                                    <button className="page-link" onClick={() => paginateCustomers(page)}>
                                                        {page + 1}
                                                    </button>
                                                </li>
                                            );
                                        } else if (Math.abs(page - customerPage) === 2) {
                                            // Them dau "..." khi trang cach trang hien tai chinh xac 2 trang
                                            return (
                                                <li className="page-item" key={page}>
                                                    <span className="page-link">...</span>
                                                </li>
                                            );
                                        }
                                        return null; // Khong hien thi trang nay trong danh sach
                                    })}
                                    <li hidden={customerPage + 1 === customerTotalPages} className="page-item">
                                        <button className="page-link" tabIndex={-1} onClick={() => paginateCustomers(customerPage + 1)}>
                                            Sau
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </nav>
                    </div>
                </Modal.Footer>
            </Modal>

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
                        loans: "",
                    }} onSubmit={async (values) => {
                        const searchProduct = async () => {
                            await setProductName(values.productName)
                            await setProductType(values.productType)
                            await setLoans(values.loans)
                            const res = await getListProductAPI(contractPage, values.productName, values.productType, values.loans);
                            await setContractPage(0)
                            await setContracts(res.data.content);
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
                                                        productTypes.map((pt) => (
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
                                        <div className="col-lg-2" style={{marginTop: "1.9vw"}}>
                                            <div className="form-group">
                                                <button type="submit" className="btn btn-outline-success ">
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
                            <th className="text-center">Giá (VNĐ)</th>
                        </tr>
                        </thead>
                        {contracts.length === 0 ? <tr>
                                <td colSpan="4" className="text-center">
                                    <h4 style={{color: "red"}}>Dữ liêu không tồn tại</h4>
                                </td>
                            </tr>
                            :
                            <tbody>
                            {
                                contracts.map((ct) => {
                                    return (
                                        <tr key={ct.id}>
                                            <td className="text-md-start">{ct.productName}</td>
                                            <td className="text-center">{ct.productType}</td>
                                            <td className="text-center">1</td>
                                            <td className="text-center">{(+ct.loans).toLocaleString()}</td>
                                            <td className="text-center">
                                                <button type="button" onClick={() => {
                                                    onSelectContract(ct.id);
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
                        }
                    </table>
                </Modal.Body>

                <Modal.Footer>
                    <div className="d-flex col-12 justify-content-end" style={{marginLeft: '-5%'}}>
                        <nav aria-label="">
                            {contractTotalPages > 0 && (
                                <ul className="pagination">
                                    <li hidden={contractPage === 0} className="page-item">
                                        <button className="page-link" tabIndex={-1} onClick={() => paginateContracts(contractPage - 1)}>
                                            Trước
                                        </button>
                                    </li>
                                    {Array.from({ length: contractTotalPages }, (a, index) => index).map((page) => {
                                        // Kiem tra neu trang hien tai gan voi trang dau tien hoac gan voi trang cuoi cung
                                        if (page === 0 || page === contractTotalPages - 1 || Math.abs(page - contractPage) <= 1) {
                                            return (
                                                <li className={`page-item ${page === contractPage ? "active" : ""}`} key={page}>
                                                    <button className="page-link" onClick={() => paginateContracts(page)}>
                                                        {page + 1}
                                                    </button>
                                                </li>
                                            );
                                        } else if (Math.abs(page - contractPage) === 2) {
                                            // Them dau "..." khi trang cach trang hien tai chinh xac 2 trang
                                            return (
                                                <li className="page-item" key={page}>
                                                    <span className="page-link">...</span>
                                                </li>
                                            );
                                        }
                                        return null; // Khong hien thi trang nay trong danh sach
                                    })}
                                    <li hidden={contractPage + 1 === contractTotalPages} className="page-item">
                                        <button className="page-link" tabIndex={-1} onClick={() => paginateContracts(contractPage + 1)}>
                                            Sau
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </nav>
                    </div>

                </Modal.Footer>
            </Modal>
        </>
    )
}