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
        return moment(dateTime).format("DD/MM/YYYY HH:mm:ss");
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
    if (!posts) {
        return null
    }
    return (
        <>
            <h2 className="d-flex justify-content-center">Tin tức - Kinh nghiệm cầm đồ</h2>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-xl-9">
                        <div className="main-content mt-4">
                            <h1 className="title-news">{postsDetail.title}</h1>
                            <div className="time">
                                {formatDateTime(posts.createDate)}
                            </div>
                            <div className="full-content"><p></p>

                                <div className="form-old-row" style={{display: "flex"}}>
                                    <img className="imgDetail" style={{display: "block", marginLeft: "auto", marginRight: "auto"}}
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
                                                    <div className="image"><NavLink to={`detail/${post.id}`}> <img
                                                        src={post.image} alt=""/> </NavLink></div>
                                                </div>
                                                <div className="col-8">
                                                    <h3 className="title">{post.title}</h3>
                                                    <span className="time1">{formatDateTime(post.createDate)}</span>
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