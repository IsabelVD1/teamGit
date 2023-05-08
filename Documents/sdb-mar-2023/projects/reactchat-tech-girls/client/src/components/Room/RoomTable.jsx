import{ Table } from "reactstrap";
import RoomTableRow from "./RoomTableRow";

const RoomTable = (props) => {
    return (
        <>
          <h1>Room's</h1>
          <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Added Users</th>
                    </tr>
                </thead>
                <tbody>
                    {props.rooms.map((room, index) => (
                        <RoomTableRow key={index} room={room} token={props.token} getViewAllRooms={props.getViewAllRooms} />
                    ))}
                </tbody>
                </Table>
        </>
    );

}

export default RoomTable;
