import { API } from "aws-amplify"
import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getPost } from "../../graphql/queries"
import Post from "./post"

const SingleRecipe = () => {
    let { id } = useParams()
    const [post, setPost] = useState(null)
    async function getPostHelper() {
        const postResult =  await API.graphql({
            query:getPost,
            variables:{id}
        })
        let newPost = postResult.data.getPost
        newPost = new Post(newPost.content, newPost.createdAt, newPost.ingredients, newPost.tags, newPost.title, newPost.type)
        setPost(newPost)
    }
    useEffect(() => {
        getPostHelper()
    }, [])
    return <div>
        {post==null ? <div></div> : 
            <h1>{post.title}</h1> 
        }
    </div>
    
}

export default SingleRecipe