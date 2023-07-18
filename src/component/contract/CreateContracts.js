import * as contractService from "../../service/ContractService";
import React, {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../firebaseContract";


export const CreateContracts = () => {
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0); // Tổng số trang
    const [current, setCurrent] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    const [selectedFile, setSelectedFile] = useState(null);
    const [firebaseImg, setImg] = useState(null);
    const [progress, setProgress] = useState(0);
    const [imgErr, setImgErr] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [productType, setProductType] = useState([]);
    const [contractType, setContractType] = useState(1);
    const [contractStatus, setContractStatus] = useState(1);
    const [employees, setEmployees] = useState(1);
    const [customer, setCustomer] = useState([]);
    const [code, setCode] = useState('');
    const [idCustomer, setIdCustomer] = useState();
    const n = useNavigate();


    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        setImgErr("");
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleSubmitAsync = async () => {
        return new Promise((resolve, reject) => {
            const file = selectedFile;
            if (!file) return reject("Chưa có file nào được chọn ");
            const storageRef = ref(storage, `files/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);
                },
                (error) => {
                    reject(error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    setImg(downloadURL);
                    resolve(downloadURL);
                }
            );
        });
    };


    useEffect(() => {
        const getAllCustomer = async () => {
            const res = await contractService.findAllCustomer()
            setCustomer(res.content)
        }
        getAllCustomer()
    }, [])


    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleModalOpen = () => {
        setShowModal(true);
    };

    const getAllProductType = async () => {
        const res = await contractService.findAllProductType();
        setProductType(res)
    }
    const getAllContractType = async () => {
        const res = await contractService.findAllContractType();
        setContractType(res)
    }
    const getAllContractTStatus = async () => {
        const res = await contractService.findAllContractStatus();
        setContractStatus(res)
    }
    const getAllEmployee = async () => {
        const res = await contractService.findAllAndEmployee();
        setEmployees(res)
    }
    // const paginate = (page) => {
    //     if (page > 1) {
    //         setPage(page - 1)
    //     } else {
    //         setPage(page)
    //
    //     }
    // }


    const createContractCodeApi = async () => {
        const res = await contractService.createCodeContract();
        setCode(res);
    }
    const getIdProductTypes = (id) => {
        for (let productTypes of productType) {
            if (productTypes.id === id) {
                return productTypes
            }
        }
    }
    const getIdContractType = (id) => {
        for (let contractTypes of contractType) {
            if (contractTypes.id === id) {
                return contractTypes
            }
        }
    }
    const getIdContractStatus = (id) => {
        for (let contractStatusId of contractStatus) {
            if (contractStatusId.id === id) {
                return contractStatusId
            }
        }
    }

    // const handlePageClick = async (page) => {
    //     // setCurrent(+page.selected);
    //     // const res=await contractService.searchCustomer(customers,page.selected);
    //     // setCustomer(res.content);
    //     // setPageCount(Math.ceil(res.size*page.selected+1))
    // }

    useEffect(() => {
        getAllProductType()
        getAllContractType()
        getAllContractTStatus()
        getAllEmployee()
        createContractCodeApi()
    }, [])

    return (
        <>
            <div className="container">
                <div className="row height d-flex justify-content-center align-items-center">
                    <div className="col-md-6">
                        <div className="card px-5 py-4">
                            <div style={{textAlign: "center"}}>
                                <h1>Thêm mới dịch vụ cầm đồ</h1>
                            </div>
                            <Formik initialValues={{
                                customers: '',
                                contractCode: code,
                                productName: '',
                                productType: 0,
                                image: '',
                                loans: '',
                                startDate: '',
                                endDate: '',
                                profit: '',
                                contractStatus: 1,
                                contractType: 1,
                                employees: 1
                            }}
                                    onSubmit={async (values, {setSubmitting}) => {

                                        const createContracts = async () => {
                                            const newValue = {
                                                ...values,
                                                image: firebaseImg,
                                            };
                                            setSubmitting(false)
                                            newValue.image = await handleSubmitAsync();
                                            await contractService.createContract({
                                                ...newValue,
                                                image: newValue.image,
                                                customers: customer.find((cus) => cus.id === idCustomer),
                                                contractType: getIdContractType(+values.contractType),
                                                contractStatus: getIdContractStatus(+values.contractStatus),
                                                contractCode: code + values.contractCode,
                                                productType: getIdProductTypes(+values.productType)
                                            })
                                            console.log(newValue.image)
                                        }

                                        createContracts()
                                        n("/")
                                    }}
                            >
                                <Form>
                                    <div className="text-center m-2">
                                        <button
                                            type="button"
                                            className="btn btn-outline-success "
                                            data-bs-target="#static"
                                            onClick={async () => {
                                                handleModalOpen()
                                            }}>
                                            <b className="text-center">Chọn khách hàng</b>
                                        </button>
                                    </div>
                                    {/* nút thêm khách hàng là vd chưa có khách hàng trong danh sách
              lúc đó mình xẽ qua trang thêm khách hàng để thêm mới ạ*/}
                                    <div className="mt-4 inputs">
                                        <label>Tên khách hàng</label>
                                        <Field
                                            disabled
                                            name="customers"
                                            type='text'
                                            // as="select"
                                            className="form-control"
                                            data-error="Please specify your need."
                                            style={{height: 35}}
                                            value={customer.find((cus) => cus.id === idCustomer)?.name}
                                        />
                                    </div>
                                    <div className="mt-2 inputs"><label>Mã hợp đồng</label>
                                        <Field type="text" className="form-control" name="contractCode"
                                               aria-label="Small"
                                               value={'HD-' + code}
                                               style={{height: "35px"}}
                                        />
                                    </div>
                                    <div className="mt-2 inputs">
                                        <label>Đồ cầm</label>
                                        <Field
                                            type="text"
                                            className="form-control"
                                            name="productName"
                                            style={{height: 35}}
                                        />
                                    </div>
                                    <div className="mt-2 inputs">
                                        <label>Loại đồ</label>
                                        <Field
                                            name="productType"
                                            as="select"
                                            className="form-control"
                                            type="number"
                                            data-error="Please specify your need."
                                            style={{height: 35}}
                                        >
                                            <option value={0} selected="">-+-Chọn loại-+-</option>
                                            {productType.map((list, index) => (
                                                <option key={index} value={list.id}>{list.name}</option>
                                            ))}
                                        </Field>
                                    </div>
                                    {/*<div className="mt-2 inputs">*/}
                                    {/*    <label>Hình ảnh</label>*/}
                                    {/*    <Field*/}
                                    {/*        type="file"*/}
                                    {/*        className="form-control"*/}
                                    {/*        name="image"*/}
                                    {/*        style={{height: 35}}*/}
                                    {/*    />*/}
                                    {/*</div>*/}

                                    <div className="mt-2 inputs">
                                        <label>Tiền cho vay</label>
                                        <Field
                                            type="number"
                                            className="form-control"
                                            name="loans"
                                            style={{height: 35}}
                                        />
                                    </div>
                                    <div className="row mt-2  ">
                                        <div className="col-md-6 form-group">
                                            <label>Ngày bắt đầu</label>
                                            <Field
                                                type="date"
                                                className="form-control"
                                                name="startDate"
                                                style={{height: 36}}
                                            />
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <label>Ngày kết thúc</label>
                                            <Field
                                                type="date"
                                                className="form-control"
                                                name="endDate"
                                                style={{height: 36}}
                                            />
                                        </div>
                                    </div>
                                    {/* khi nhập số tiền cho vay vào và nhập ngày bắt đầu và ngày kết thúc sẽ hiện ra tiền lãi*/}
                                    <div className="mt-2 inputs">
                                        <label>Tiền lãi</label>
                                        <Field
                                            type="number"
                                            className="form-control"
                                            name="profit"
                                            style={{height: 35}}
                                        />
                                    </div>
                                    <div className="mt-2 inputs">
                                        {/*<label>Trạng thái</label>*/}
                                        <Field
                                            hidden
                                            disabled
                                            type="number"
                                            className="form-control"
                                            values="1"
                                            name="contractStatus"
                                            style={{height: 35}}
                                        />
                                    </div>
                                    <div className="mt-2 inputs">
                                        {/*<label>Loại hợp đồng</label>*/}
                                        <Field
                                            hidden
                                            disabled
                                            type="number"
                                            className="form-control"
                                            values="1"
                                            name="contractType"
                                            style={{height: 35}}
                                        />
                                    </div>
                                    <div className="mt-2 inputs">
                                        {/*<label>Nhân viên</label>*/}
                                        <Field
                                            hidden
                                            disabled
                                            type="number"
                                            className="form-control"
                                            values="1"
                                            name="employees"
                                            style={{height: 35}}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <div
                                            className="column-gap-lg-3"
                                            style={{width: "100%", marginBottom: "5%", marginLeft: "3%"}}
                                        >
                                            {selectedFile && (
                                                <img
                                                    className={"mt-2"}
                                                    src={URL.createObjectURL(selectedFile)}
                                                    style={{width: "100%"}}
                                                />
                                            )}
                                        </div>
                                        <div className="form-outline">
                                            <Field
                                                type="file"
                                                onChange={(e) => handleFileSelect(e)}
                                                id="image"
                                                name={"image"}
                                                className="form-control-plaintext d-none "
                                            />
                                            <p>
                                                <label
                                                    htmlFor="image"
                                                    style={{
                                                        display: "flex",
                                                        padding: "6px 12px",
                                                        border: "1px solid",
                                                        borderRadius: "4px",
                                                        marginLeft: "3%"
                                                    }}
                                                >
                                                    Chọn hình ảnh
                                                </label>
                                            </p>
                                            {!selectedFile && (
                                                <span className={"mt-2 text-danger"}>
                              Chưa có hình ảnh được chọn
                            </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="d-flex mt-4 justify-content-between">
                                        <div className="text-center" style={{marginLeft: "23.6%"}}>
                                            <Link to="/" className="btn btn-secondary ">
                                                <b className="text-center">Quay lại</b>
                                            </Link>
                                        </div>
                                        <div className="text-center" style={{marginRight: "23.6%"}}>
                                            <button type="submit" className="btn btn-success">
                                                <b className="text-center">Thêm mới</b>
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal */}
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
                            <Modal.Header style={{backgroundColor: "#00833e", color: "white"}}>
                                <Modal.Title style={{width: "100%", textAlign: "center"}}>
                                    <b>Chọn Khách hàng</b>
                                </Modal.Title>
                                <Button
                                    variant="secondary"
                                    className="btn-close"
                                    style={{marginLeft: 0}}
                                    onClick={handleModalClose}
                                />
                            </Modal.Header>
                            <Modal.Body>
                                <div className="controlsmodal-body d-flex justify-content-between">
                                    <div style={{marginTop: "0.6%"}}>
                                        <button type="submit" className="btn btn-outline-success ">
                                            <b className="textcenter">Thêm khách hàng</b>
                                        </button>
                                    </div>
                                    <Formik initialValues={{
                                        name: ""
                                    }}
                                            onSubmit={async (values) => {
                                                const search = async () => {
                                                    const res = await contractService.searchCustomer(values.name)
                                                    setCustomer(res.content)
                                                    console.log(values)
                                                }
                                                search()

                                            }}>
                                        <Form className="d-flex m-1">
                                            <Field
                                                style={{width: "18vw", height: "38px"}}
                                                className="form-control me-3"
                                                type="text"
                                                name="name"
                                                placeholder="Tìm kiếm theo tên khách hàng"
                                                aria-label="Search"
                                            />
                                            <button className="btn btn-outline-primary" type="submit">
                                                <i className="bi bi-search"/>
                                            </button>
                                        </Form>
                                    </Formik>
                                </div>
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th className="text-center">Mã khách hàng</th>
                                        <th className="text-center">Tên khách Hàng</th>
                                        <th className="text-center">CMND/Hộ chiếu</th>
                                        <th className="text-center">Chức Năng</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {customer.map((list, index) => (
                                        <tr key={index}>
                                            <td className="text-center">{list.id}</td>
                                            <td className="text-center">{list.name}</td>
                                            <td className="text-center">{list.citizenCode}</td>
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
                                </table>
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
            </>

        </>

    )
}