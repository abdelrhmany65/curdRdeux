import { memo } from "react";
import { Table } from "react-bootstrap";
import PostListitem from "./PostListitem";

const PostList = ({data, deleteRecord, isLoggedIn }) => {

  return (
    <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th style={{ width: "70%" }}>Title</th>
        <th style={{ width: "10%" }}></th>
      </tr>
    </thead>
    <tbody>

      <PostListitem data={data} deleteRecord={deleteRecord} isLoggedIn={isLoggedIn}/>

    </tbody>
  </Table>
  );
};

export default memo(PostList);