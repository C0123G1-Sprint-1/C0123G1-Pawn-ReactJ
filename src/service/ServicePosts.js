import axios from "axios";

export const findAllPosts = async () =>{
    const result = await axios.get(`http://localhost:8080/api/posts?_sort=createDate&_order=desc`)
    return result.data
}
export const findAllEmployees = async () =>{
    const result = await axios.get(`http://localhost:8080/api/posts/allEmployees`)
    return result.data
}
export const remove = async (id) =>{
    const result = await axios.delete(`http://localhost:8080/api/posts/delete/${id}`)
    return result.data
}
export const detail = async (id) =>{
    const result = await axios.get(`http://localhost:8080/api/posts/detailPosts/${id}`)
    return result.data
}
export const findByName = async (title) => {
    const result = await axios.get(`http://localhost:8080/api/posts?titleSearch=${title}`)
    return result.data
}
export const createPosts = async (newPost) => {
     await axios.post(`http://localhost:8080/api/posts/createPosts`,newPost)

}