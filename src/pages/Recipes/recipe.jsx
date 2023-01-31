import { Hub, Auth, API } from "aws-amplify";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { listPosts, listsByDate } from "../../graphql/queries";

 
 const Recipe = () => {
    
 let [user, setUser] = useState(null)
 
 let [ids, setIds] = useState([])
 async function authStore() {
    try {
        let user = await Auth.currentAuthenticatedUser()
        console.log(user)
        setUser(user)
    } catch {
        setUser(null)
    }
}
async function getPosts () {
    const posts = await API.graphql({
        query: listsByDate,
        variables : {type:'recipe'}
    })
    let x = []
    for (let i of posts.data.listsByDate.items) {
        x.push(i.id)
    }
    setIds(x)
}
 useEffect(()=> {
    let updateUser = authStore
    Hub.listen('auth', updateUser)
    updateUser()
    getPosts()
    return ()=> Hub.remove('auth', updateUser)
}, [])
    return <div style={{minHeight:"100vh", backgroundColor:"#F8EDE3"}}>
        <div style={{aspectRatio:'1/1', height:'300px', border:'solid 1px', margin:'auto', textAlign:'center' }}>
        {ids.map((el) => {
            let link = "/recipe/"+el
            return <Link to={link}>
           <button>{link}</button></Link>
        })}
           <h1>Carousel fo Recent Recipes Added</h1>
           <Link to="/recipe/123">
           <button>Hello</button></Link>
        </div>
        <h1 style={{ textAlign:'center', border:'solid 1px', margin:'0'}}>Search bar</h1>
    </div>
}


export default Recipe;