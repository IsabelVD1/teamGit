import { Table } from "reactstrap";
import MessageTableRow from "./MessageTableRow";


const MessageTable = (props) => {
    return (
        <>
        <h2>Message</h2>
        <Table>
            <thead>
                <tr>
                    
                    <th>When</th>
                    <th>User</th>
                    <th>Room</th>
                    <th>Body</th>
                </tr>
            </thead>
            <tbody>
                {props.messages.map((message, index) => ( <MessageTableRow key={index} message={message} token={props.token} getViewAllMessages={props.getViewAllMessages} /> ))}
            </tbody>
        </Table>    
      </>
   );
};
 
export default MessageTable;