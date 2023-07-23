import * as servicePosts from "../../service/ServicePosts";
import React, {useEffect, useState} from "react";
import "../../css/Posts.css";
import {NavLink} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import moment from "moment";
import Swal from "sweetalert2";
import jwt from 'jwt-decode';

export function ListPosts() {
    const token = localStorage.getItem('token');
    const [decodedToken, setDecodedToken] = useState("");

    useEffect(() => {
        if (token) {
            const decoded = jwt(token);
            setDecodedToken(decoded);
        } else {
            // Xử lý khi không có token trong localStorage
        }
    }, [token]);
    const [posts, setPosts] = useState([])
    let [search, setSearch] = useState({
        title: ''
    });

// Hàm định dạng ngày giờ
    const formatDateTime = (dateTime) => {
        return moment(dateTime).format("DD/MM/YYYY HH:mm");
    };
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 4;

    const findAllListPost = async () => {
        const result = await servicePosts.findAllPosts()
        setPosts(result.content)
        console.log(result.content)
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
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-danger',
            cancelButton: 'btn btn-secondary me-3'
        },
        buttonsStyling: false
    })
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
    if (posts.length === 0) {
        return null;
    }
    return (
        <>
            <div className="mb-5 mt-5">
                <div className="d-flex justify-content-end">
                    <Formik
                        initialValues={{
                            title: ''
                        }}
                        onSubmit={(values) => {
                            const findName = async () => {
                                const result = await servicePosts.findByName(values.title)
                                await setSearch(values)
                                setPosts(result.content)
                            }
                            findName()
                        }}>{
                        <Form className="d-flex">
                            <Field className="form-control me-1" style={{width: "18rem"}} type="text"
                                   placeholder="Tìm kiếm tin tức" name="title"/>
                            <button className="btn btn-outline-success me-4" type="submit" style={{width: '3rem'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                     className="bi bi-search" viewBox="0 0 16 16">
                                    <path
                                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                            </button>
                        </Form>}
                    </Formik>
                </div>
                <div className="">
                    <h2 className="ms-3 text-posts" style={{
                        background: "url(https://chovayhanoi.com/wp-content/uploads/2020/04/border-title-02.png) no-repeat center bottom",
                        paddingBottom: "20px",
                        textTransform: "uppercase",
                        color: "#c57101",
                        textAlign: "center",
                        fontSize: "30px",
                        fontWeight: "600",
                        margin: "20px 0"
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
                             className="bi bi-postcard-fill" viewBox="0 0 16 16">
                            <path d="M11 8h2V6h-2v2Z"/>
                            <path
                                d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm8.5.5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7ZM2 5.5a.5.5 0 0 0 .5.5H6a.5.5 0 0 0 0-1H2.5a.5.5 0 0 0-.5.5ZM2.5 7a.5.5 0 0 0 0 1H6a.5.5 0 0 0 0-1H2.5ZM2 9.5a.5.5 0 0 0 .5.5H6a.5.5 0 0 0 0-1H2.5a.5.5 0 0 0-.5.5Zm8-4v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5Z"/>
                        </svg>
                        <span>  </span>
                        Tin tức - Kinh nghiệm cầm đồ
                    </h2>
                </div>
            </div>

            {
                decodedToken.role === ("ROLE_ADMIN"||"EMPLOYEE") ?
                    <button className="btn btn-success ms-5">
                        <NavLink className="text-decoration-none text-white" to={'/listPosts/createPosts'}>Đăng Tin</NavLink>
                    </button>
                    : ""
            }
            <ul className="cards-post text-posts">
                {
                    currentPosts.length===0? (
                            <h4 style={{color: "red"}}>Dữ liệu không tồn tại</h4>
                        ):
                        currentPosts.map((post) => (
                            <li className="cards_item">
                                <div className="card-post">
                                    <div className="card_image">
                                        <NavLink className="text-decoration-none" to={`detail/${post.id}`}>
                                            <img
                                                style={{height: "200px", width: "300px", verticalAlign: "middle"}}
                                                src={post.image} alt=""/>
                                        </NavLink>
                                    </div>
                                    <div className="card_content">
                                        <NavLink className="text-decoration-none text-black" to={`detail/${post.id}`}>
                                            <h6 className="card_title">
                                                {post.title}</h6>
                                        </NavLink>
                                    </div>
                                    <div className="card-date time-post">
                                        {formatDateTime(post.createDate)}
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        {

                                            decodedToken.role === ("ROLE_ADMIN" || "EMPLOYEE") ?
                                                <>
                                                    <button className=" btn btn-outline-danger m-2"
                                                            onClick={() => {
                                                                swalWithBootstrapButtons.fire({
                                                                    icon: "warning",
                                                                    title: "Xác nhận xóa",
                                                                    html: `Bạn có muốn xoá <span style="color: red">${post.title}</span> không ?`,
                                                                    showCancelButton: true,
                                                                    confirmButtonText: 'Có',
                                                                    cancelButtonText: 'Không',
                                                                    reverseButtons: true
                                                                }).then((res) => {
                                                                    if (res.isConfirmed) {
                                                                        handleDelete(post?.id)
                                                                    }
                                                                })
                                                            }}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                             fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                                            <path
                                                                d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                                        </svg>
                                                    </button>
                                                </>
                                                :""
                                        }
                                    </div>
                                </div>
                            </li>
                        ))
                }
            </ul>

            {(currentPosts.length === 0) ? ("") : (
                <div className="pagination-container-huy me-5">
                    {currentPage !== 1 && (
                        <button onClick={() => handlePageChange(currentPage - 1)}>
                            Trước
                        </button>
                    )}
                    {Array.from({length: totalPages}, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            style={{fontWeight: currentPage === index + 1 ? 'bold' : 'normal'}}
                        >
                            {index + 1}
                        </button>
                    ))}
                    {currentPage !== totalPages && (
                        <button onClick={() => handlePageChange(currentPage + 1)}>
                            Sau
                        </button>
                    )}
                </div>
            )}
        </>
    )
}