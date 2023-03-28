import "./home.scss"
import Posts from "../../components/posts/Posts"
import CreatePost from "../../components/createPost/CreatePost";
const Home = () => {
    return (
        <div className="home">
            <CreatePost/>
            <Posts/>
        </div>
    )
}

export default Home