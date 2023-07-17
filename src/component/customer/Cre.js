import {Formik,Form,Field,ErrorMessage} from "formik";
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import * as Yup from "yup";
import * as newsService from "../../service/NewsService/NewsService";
// import 'react-toastify/dist/ReactToastify.css';
// import {toast} from "react-toastify";
import '../../css/News/News.css'
import { Oval } from "react-loader-spinner";
import Swal from "sweetalert2";
import {
    ref,
    getDownloadURL,
    uploadBytesResumable
} from "firebase/storage";
import { storage } from "../../firebase";

function NewsCreate() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);

    let navigate = useNavigate();
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let currDate = `${yyyy}-${mm}-${dd}`

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleSubmitAsync = async () => {
        return new Promise((resolve, reject) => {
            const file = selectedFile;
            if (!file) return reject("No file selected");
            const storageRef = ref(storage, `files/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgresspercent(progress);
                },
                (error) => {
                    reject(error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve(downloadURL);
                }
            );
        });
    };
    return(
        <>
            <div id="thong">
                <Formik initialValues={{title:"",content:"",image:""}}
                        validationSchema={Yup.object({
                            title:Yup.string().required("không được để trống"),
                            content:Yup.string().required("không được để trống"),
                            // image:Yup.string().required("không được để trống")
                        })}
                        onSubmit={async (values, {resetForm, setSubmitting }) => {
                            try {
                                let img = await handleSubmitAsync();
                                let newValues = {...values, image: img, dayPost: currDate}
                                await newsService.save(newValues);
                                console.log(newValues)
                                resetForm();
                                setSubmitting(false);
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Thanh cong'
                                })
                                // navigate("/");
                            } catch (e) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'That bai'
                                });

                                setSubmitting(false);
                            }
                        }}
                >
                    {({isSubmitting})=>(
                        <Form>
                            <>
                                <style
                                    // dangerouslySetInnerHTML={{
                                    //     __html:
                                    //         '\n    body {\n        font-family: Arial, sans-serif;\n        margin: 0;\n        padding: 20px;\n    }\n\n    h1 {\n        text-align: center;\n    }\n\n\n    .form-container {\n        max-width: 850px;\n        margin: 0 auto;\n        background-color: #fff;\n        padding: 20px;\n        border-radius: 5px;\n        box-shadow: 1px 3px 10px 5px rgba(0, 0, 0, 0.2);\n    }\n\n    .form-group {\n        margin-bottom: 20px;\n    }\n\n    .form-group label {\n        display: block;\n        font-weight: bold;\n        color: #333;\n    }\n\n    .form-group input[type="text"],\n    .form-group textarea {\n        width: 100%;\n        padding: 10px;\n        font-size: 16px;\n        border: 1px solid #ccc;\n        border-radius: 4px;\n    }\n\n    .form-group textarea {\n        height: 150px;\n    }\n\n    .form-group button {\n        padding: 10px 20px;\n        background-color: #4CAF50;\n        color: white;\n        border: none;\n        cursor: pointer;\n        border-radius: 4px;\n    }\n    button {\n        padding: 17px 40px;\n        border-radius: 50px;\n        border: 0;\n        background-color: white;\n        box-shadow: rgb(0 0 0 / 5%) 0 0 8px;\n        letter-spacing: 1.5px;\n        text-transform: uppercase;\n        font-size: 15px;\n        transition: all .5s ease;\n    }\n\n    button:hover {\n        letter-spacing: 3px;\n        background-color: hsl(261deg 80% 48%);\n        color: hsl(0, 0%, 100%);\n        box-shadow: rgb(93 24 220) 0px 7px 29px 0px;\n    }\n\n    button:active {\n        letter-spacing: 3px;\n        background-color: hsl(261deg 80% 48%);\n        color: hsl(0, 0%, 100%);\n        box-shadow: rgb(93 24 220) 0px 0px 0px 0px;\n        transform: translateY(10px);\n        transition: 100ms;\n    }\n    .custom-header {\n        background-color: #4c8bf5; /* Màu gradient đầu */\n        background-image: linear-gradient(to right, #4c8bf5, #55a7f9); /* Gradient màu từ trái sang phải */\n        color: white; /* Màu chữ */\n        padding: 10px; /* Khoảng cách giữa viền và chữ */\n    }\n'
                                    // }}
                                />
                                <div></div>
                                <div className="form-container">
                                    <h1 className="custom-header">Đăng tin tức</h1>

                                    <div className="form-group">
                                        <label htmlFor="title">Tiêu đề:</label>
                                        <Field
                                            type="text"
                                            id="title"
                                            name="title"
                                            placeholder="tiêu đề"
                                        />
                                        <ErrorMessage
                                            name="title"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="content">Nội dung:</label>
                                        <Field
                                            as='textarea'
                                            id="content"
                                            name="content"
                                            placeholder="nội dung"
                                            defaultValue={""}
                                        />
                                        <ErrorMessage
                                            name="content"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </div>

                                    <div className="mb-3 form-group">
                                        <label
                                            htmlFor="image"
                                            className="form-label"
                                            style={{ fontWeight: "bold" }}
                                        >
                                            Hình Ảnh:
                                        </label>
                                        <Field
                                            type="file"
                                            onChange={handleFileSelect}
                                            className="form-control"
                                            id="image"
                                            name="img"
                                        />
                                        {/*<ErrorMessage*/}
                                        {/*    name="title"*/}
                                        {/*    component="div"*/}
                                        {/*    className="text-danger"*/}
                                        {/*/>*/}
                                        {selectedFile && (
                                            <img
                                                className={"mt-2"}
                                                src={URL.createObjectURL(selectedFile)}
                                                style={{ width: "50%" }}
                                            />

                                        )}
                                    </div>

                                    <div className="form-group">
                                        {isSubmitting ? (
                                            <Oval
                                                height={80}
                                                width={80}
                                                color="#4fa94d"
                                                wrapperStyle={{}}
                                                wrapperClassName=""
                                                visible={true}
                                                ariaLabel="oval-loading"
                                                secondaryColor="#4fa94d"
                                                strokeWidth={2}
                                                strokeWidthSecondary={2}
                                            />
                                        ) : (
                                            <div>
                                                <Link to="/" className="btn btn-primary" style={{ marginRight: "10px" }} >
                                                    Thoát
                                                </Link>


                                                <button
                                                    id='submit'
                                                    type="submit"
                                                    style={{ marginRight: "10px" }}
                                                    className='btn btn-primary'
                                                >
                                                    Thêm
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}
export default NewsCreate;