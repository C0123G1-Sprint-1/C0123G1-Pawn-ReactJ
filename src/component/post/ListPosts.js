import * as servicePosts from "../../service/ServicePosts";
import React, {useEffect, useState} from "react";
import "../../css/Posts.css";
import {NavLink} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import moment from "moment";
import Swal from "sweetalert2";

export function ListPosts() {
    const [posts, setPosts] = useState([])
    const [idDelete, setIdDelete] = useState()
    const [nameDelete, setNameDelete] = useState()
// Hàm định dạng ngày giờ
    const formatDateTime = (dateTime) => {
        return moment(dateTime).format("DD/MM/YYYY HH:mm:ss");
    };
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 3;

    const findAllListPost = async () => {
        const result = await servicePosts.findAllPosts()
        setPosts(result.content)
    }
    const propsDelete = async (id, name) => {
        setIdDelete(id)
        setNameDelete(name)
    }
    const handleDelete = async (id) => {
        await servicePosts.remove(id)
        findAllListPost();
        deleteSuccess();
    }
    useEffect(() => {
        findAllListPost();
    }, [])

    const deleteSuccess = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Xoá tin thành công ',
            showConfirmButton: false,
            timer: 1500
        })
    }

    const indexOfLastPosts = currentPage * postsPerPage;
    const indexOfFirstPosts = indexOfLastPosts - postsPerPage;
    const currentPosts = posts.slice(
        indexOfFirstPosts,
        indexOfLastPosts
    );

    const totalPages = Math.ceil(posts.length / postsPerPage);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const showPreviousButton = currentPage > 1;
    const showNextButton = currentPage < totalPages;
    if(posts.length === 0){
        return null;
    }
    return (
        <>
            <div className="row mb-5">
                <div className="col-8">
                    <h2 className="ms-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
                             className="bi bi-postcard-fill" viewBox="0 0 16 16">
                            <path d="M11 8h2V6h-2v2Z"/>
                            <path
                                d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm8.5.5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7ZM2 5.5a.5.5 0 0 0 .5.5H6a.5.5 0 0 0 0-1H2.5a.5.5 0 0 0-.5.5ZM2.5 7a.5.5 0 0 0 0 1H6a.5.5 0 0 0 0-1H2.5ZM2 9.5a.5.5 0 0 0 .5.5H6a.5.5 0 0 0 0-1H2.5a.5.5 0 0 0-.5.5Zm8-4v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5Z"/>
                        </svg>   Tin tức - Kinh nghiệm cầm đồ</h2>
                </div>
                <div className="col-4">
                    <Formik
                        initialValues={{
                            title: ''
                        }}
                        onSubmit={(values) => {
                            const findName = async () => {
                                const result = await servicePosts.findByName(values.title)
                                setPosts(result.content)
                            }
                            findName()
                        }}>{
                        <Form className="d-flex">
                            <Field className="form-control me-1" style={{width:"15rem"}} type="text" name="title"/>
                            <button className="codepro-custom-btn codepro-btn-7" target="blank" title="Code Pro" type="submit"
                                    style={{width: '8rem'}}><b>Tìm kiếm</b>
                            </button>
                        </Form>}
                    </Formik>
                </div>
            </div>

            <button className="codepro-custom-btn codepro-btn-13 ms-3" target="blank" title="Code Pro">
                <NavLink className="text-decoration-none text-white" to={'/createPosts'}><b>Đăng Tin</b></NavLink>
            </button>
            <ul className="cards">
                {
                    currentPosts.map((post) => (
                        <li className="cards_item">
                            <div className="card">
                                <div className="card_image"><img
                                    src={post.image} alt=""/>
                                </div>
                                <div className="card_content">
                                    <NavLink className="text-decoration-none text-black" to={`detail/${post.id}`}>
                                        <h6 className="card_title">
                                            {post.title}</h6>
                                    </NavLink>
                                    <div className="time">
                                        {formatDateTime(post.createDate)}
                                    </div>
                                    <button className="btn btn-outline-danger mt-2" data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            onClick={() => propsDelete(post.id, post.title)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                            <path
                                                d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                        </svg> <b>  Xóa</b>
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
            <div className="pagination-container">
                {showPreviousButton && (
                    <button
                        className="pagination-button"
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        &lt;
                    </button>
                )}
                {Array.from({length: totalPages}, (_, index) => index + 1).map(
                    (pageNumber) => (
                        <button
                            key={pageNumber}
                            className={`pagination-button ${
                                pageNumber === currentPage ? "active" : ""
                            }`}
                            onClick={() => handlePageChange(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    )
                )}
                {showNextButton && (
                    <button
                        className="pagination-button"
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        &gt;
                    </button>
                )}
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Xóa tin tức</h1>
                        </div>
                        <div className="modal-body">
                            Bạn muốn xóa <span style={{color: 'red'}}>{nameDelete}</span> ?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary"
                                    data-bs-dismiss="modal">Đóng
                            </button>
                            <button type="submit" className="btn btn-outline-danger" data-bs-dismiss="modal"
                                    onClick={() => handleDelete(idDelete)}>Xóa
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}