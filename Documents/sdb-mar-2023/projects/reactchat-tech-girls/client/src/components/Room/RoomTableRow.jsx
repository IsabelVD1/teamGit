import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const RoomTableRow = (props) => {
    const{name, description, addedUsers, _id} = props.room;

   // let formattedDate = date.split("T")[0];

    const navigate= useNavigate();

   
    async function handleDelete() {
        let url = `http://localhost:4000/room/delete/` + _id;

        let myHeaders = new Headers();
        myHeaders.append("Authorization", props.token);

        let requestOptions = {
            method: "DELETE",
            headers: myHeaders,
        };

        try {
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            console.log(data);
            // refresh the table after it has been deleted  
            props.getViewAllRooms();
        }
        catch (error) {
            console.error(error.message);
        }
    }
    return (
        <>
          <tr>
                
                <td>{name}</td>
                <td>{description}</td>
              
                <td><Button color="warning" onClick={() => navigate(`/update/${_id}`)}>Update</Button></td>
                <td><Button color="danger" onClick={handleDelete}>Delete</Button></td>
          </tr>
        </>
    );


}


export default RoomTableRow;