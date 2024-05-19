import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOnePost } from '../state/postSlice';
import { useParams } from 'react-router-dom';

const useDetails = () => {
    
    const { id } = useParams();
    const dispatch = useDispatch()
    const { record, loading, error } = useSelector((state) => state.posts);
    
    useEffect(()=>{
        dispatch(getOnePost(id))
    },[dispatch,id])
    
  return { record, loading, error }
}

export default useDetails