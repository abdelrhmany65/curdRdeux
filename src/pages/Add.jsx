import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { insertPost } from "../state/postSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

import { Form, Button } from "react-bootstrap";
import WithGuard from "../utill/WithGuard";

import { useFormik } from 'formik';
import * as Yup from 'yup';

const postSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

const Add = () => {

  // const [title, setTitle] = useState("");
  // const [Description, setDescription] = useState("");


  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { loading, error } = useSelector((state)=> state.posts)

  // const formHandler = (e) => {
  //   e.preventDefault();
  //   let id = Math.floor(Math.random() * 500);
  //   dispatch(insertPost({ id, title, Description }))
  //   .unwrap()
  //   .then(() => {
  //     navigate("/");
  //   })
  // };



    const formik = useFormik({
      initialValues: {
        title: "",
        description: "",
      },
      validationSchema: postSchema,
      onSubmit: (values) => {
        const id = Math.floor(Math.random() * 500);
        dispatch(
          insertPost({ id, title: values.title, description: values.description })
        )
          .unwrap()
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
          });
      },
    });
  

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          onChange={formik.handleChange}
          value={formik.values.title}
          isInvalid={!!formik.errors.title}
          // value={title}
          // onChange={(e) => setTitle(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.title}
        </Form.Control.Feedback>
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
          isInvalid={!!formik.errors.title}

          // value={Description}
          // onChange={(e) => setDescription(e.target.value)}
        
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

export default WithGuard(Add);