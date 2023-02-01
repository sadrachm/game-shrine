import { API } from "aws-amplify";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../../graphql/queries";
import Post from "./post";

const template = {
    content:[],
    createdAt:"",
    ingredients:[],
    tags:[], 
    title:[], 
    type:'recipe'
}

const SingleRecipe = () => {
  let { id } = useParams();
  const [post, setPost] = useState(template);
  async function getPostHelper() {
    const postResult = await API.graphql({
      query: getPost,
      variables: { id },
    });
    let newPost = postResult.data.getPost;
    setPost({
        content:newPost.content.split('\n'),
        createdAt: newPost.createdAt,
        ingredients:newPost.ingredients.split(','),
        tags: newPost.tags,
        title: newPost.title,
        type: newPost.type})
  }
  useEffect(() => {
    getPostHelper();
  }, []);
  return (
    <div style={{width:'80%', margin:'20px auto'}}>
        <h1>{post.title}</h1>
        <h1>Ingredients: </h1>
        {post.ingredients.map((el, index) => <h3 style={{color:'black'}} key={index}> {el}</h3>)}
        <h1>Steps: </h1>
        {post.content.map((el, index) => <h3 style={{color:'black'}} key={index}>{index+1} - {el}</h3>)}
    </div>
  );
};

export default SingleRecipe;
