
import { useEffect, useState } from "react";
import useDetails from "../hooks/useDetails";
import { useDispatch } from "react-redux";
import { EditePost } from "../state/postSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

import { Form, Button } from "react-bootstrap";
import WithGuard from "../utill/WithGuard";

const Edit = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { loading, error, record } = useDetails();

  const [title, setTitle] = useState("");
  const [Description, setDescription] = useState("");

  useEffect(()=>{
    if (record) {
      setTitle(record?.title);
      setDescription(record?.Description)
    }

  },[record]);

  useEffect(()=>{
    return () => {
      dispatch({type: "posts/cleanRecord"})
    }
  },[dispatch])

  const formHandler = (e) => {
    e.preventDefault();
    dispatch(EditePost({ id:record.id , title, Description }))
      .unwrap()
      .then(() => {
        navigate("/");
      })
  };

  return (
    <Form onSubmit={formHandler}>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>Title</Form.Label>
      <Form.Control
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </Form.Group>
    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
      <Form.Label>Description</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        value={Description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </Form.Group>
    <Loading loading={loading} error={error}>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Loading>
  </Form>
  )
}

export default WithGuard(Edit)