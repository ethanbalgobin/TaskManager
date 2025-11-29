import { useParams } from "react-router-dom";

export default function TaskEdit() {
  const { id } = useParams();
  return <h1>Edit Task: {id}</h1>;
}
