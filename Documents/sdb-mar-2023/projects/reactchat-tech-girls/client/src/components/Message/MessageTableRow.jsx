import {useNavigate} from "react-router-dom";
import { Button } from "reactstrap";

const MessageTableRow = (props) => {
    const {date, user, room, body, _id} = props.message;

    let formattedDate = date.split("T")[0]

    const navigate = useNavigate();

    async function handleDelete() {

        let url = `http://localhost:4000/message/delete` + _id;

        let myHeaders = new Headers();
        myHeaders.append("Authorization", props.token);

        let requestOptions = {
            headers: myHeaders,
            method: "DELETE",
        };

        try{
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            console.log(data);
           
            props.getViewAllMessages();
        } catch (error){
            console.error(error.message);
        }
    }
    return (
    <>
      <td>{formattedDate}</td>
      <td>{user}</td>
      <td>{room}</td>
      <td>{body}</td>
      <td>
        <Button color="warning" onClick={() => navigate(`/update/${_id}`)}>
          Update
        </Button>
      </td>
      {/* <td>
      <Button color="danger" onClick={handleDelete} >
        Delete
      </Button>
      </td> */}
    </>  
    );
}
 
export default MessageTableRow;