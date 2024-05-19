import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, deletePosts } from "../state/postSlice";
import PostList from "../components/PostList";
import Loading from "../components/Loading";

const Index = () => {

  const dispatch = useDispatch()
  const { records, loading, error } = useSelector((state) => state.posts);
  const { isLoggedIn } = useSelector((state) => state.auth);
  
  useEffect(()=>{
    dispatch(getPosts())
  },[dispatch])

  const deleteRecord = useCallback(
    (id)=> dispatch(deletePosts(id))
    ,[dispatch] )
  // console.log(records);
  return (
    <Loading loading={loading} error={error} >

      <PostList data={records} deleteRecord={deleteRecord} isLoggedIn={isLoggedIn}/>
    </Loading>

  );
};

export default Index;