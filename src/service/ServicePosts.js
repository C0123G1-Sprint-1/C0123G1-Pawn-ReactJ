import axios from "axios";
export const findAllPosts = async () =>{
    const token = localStorage.getItem('token')
    const result = await axios.get(`http://localhost:8080/api/posts?_sort=createDate&_order=desc`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    return result.data
}
export const findAllEmployees = async () =>{
    const token = localStorage.getItem('token')
    const result = await axios.get(`http://localhost:8080/api/posts/allEmployees`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    return result.data
}
export const remove = async (id) =>{
    const token = localStorage.getItem('token')
    const result = await axios.delete(`http://localhost:8080/api/posts/delete/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    return result.data
}
export const detail = async (id) =>{
    const token = localStorage.getItem('token')
    const result = await axios.get(`http://localhost:8080/api/posts/detailPosts/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    return result.data
}
export const findByName = async (title) => {
    const token = localStorage.getItem('token')
    const result = await axios.get(`http://localhost:8080/api/posts?titleSearch=${title}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    return result.data
}
export const createPosts = async (newPost) => {
    const token = localStorage.getItem('token')
    await axios.post(`http://localhost:8080/api/posts/createPosts`,newPost,
         {
             headers: {
                 Authorization: `Bearer ${token}`,
             }
         })

}