import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Loading from "../components/Loading";
import useDetails from "../hooks/useDetails";

const Details = () => {
  
  const { record, loading, error }= useDetails();
  // console.log(record);
  const dispatch = useDispatch()

  useEffect(()=>{
    return () => {
      dispatch({type: "posts/cleanRecord"})
    }
  },[dispatch])

  return (
    <div>
      <Loading loading={loading} error={error}>
        <p>Title: {record?.title}</p>
        <p>Description: {record?.Description}</p>
      </Loading>
    </div>
  )
}

export default Details






