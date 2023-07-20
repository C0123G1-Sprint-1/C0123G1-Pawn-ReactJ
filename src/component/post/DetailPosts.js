import * as servicePosts from "../../service/ServicePosts";
import React, {useEffect, useState} from "react";
import "../../css/Posts.css";
import {useParams} from "react-router";
import {NavLink} from "react-router-dom";
import moment from "moment";

export function DetailPosts() {
    const param = useParams()
    const [postsDetail, setPostsDetail] = useState([])
    const [posts, setPosts] = useState([])
    // Hàm định dạng ngày giờ
    const formatDateTime = (dateTime) => {
        return moment(dateTime).format("DD/MM/YYYY HH:mm");
    };
    const findDetailPosts = async () => {
        const result = await servicePosts.detail(param.id)
        setPostsDetail(result)
    }
    const findAllListPost = async () => {
        const result = await servicePosts.findAllPosts()
        setPosts(result.content)
    }
    useEffect(() => {
        findAllListPost();
    }, [])
    useEffect(() => {
        findDetailPosts()
    }, [param.id])
    if (!postsDetail) {
        return null
    }
    return (
        <>
            <h2 className="d-flex justify-content-center">Tin tức - Kinh nghiệm cầm đồ</h2>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-xl-9">
                        <div className="main-content mt-4">
                            <div className="time-post1">
                                {formatDateTime(postsDetail.createDate)}
                            </div>
                            <h1 style={{fontSize: "28px", fontWeight: "400", textAlign: "center", fontFamily: "Courier New"}} className="title-news">{postsDetail.title}</h1>
                            <div className="time-post1">
                               bởi: {postsDetail.employees?.name}
                            </div>
                            <div className="full-content"><p></p>

                                <div className="form-old-row" style={{display: "flex"}}>
                                    <img className="imgDetail" style={{width: "auto",display: "block", marginLeft: "auto", marginRight: "auto"}}
                                         src={postsDetail.image} alt=""/>
                                </div>

                                <div
                                     style={{
                                         marginTop: "15px",
                                         fontSize: "15pt",
                                         color: "#666",
                                         fontStyle: "italic"
                                     }}>
                                    <p
                                        style={{
                                            lineHeight: "unset !important",
                                            margin: "5px"
                                        }}>{postsDetail.content}</p></div>
                            </div>
                        </div>

                    </div>
                    <div className="col-lg-4 col-xl-3">
                        <div className="right-pane">
                            <div className="main-news-other"><h2 className="title-other">Tin liên quan</h2>
                                <div className="list-news-other">{
                                    posts.map((post) => (
                                        <div className="other-item">
                                            <div className="row mt-3">
                                                <div className="col-4">
                                                    <div className="image-post"><a href={`/detail/${post.id}`}>
                                                        <img style={{width: "100%",height: "100%",objectFit: "cover"}}
                                                        src={post.image} alt=""/> </a></div>
                                                </div>
                                                <div className="col-8 mt-2">
                                                    <a className="text-decoration-none" href={`/detail/${post.id}`}><h3 className="title-post">{post.title}</h3></a>
                                                    <span className="time-post1 d-flex justify-content-end">{formatDateTime(post.createDate)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}