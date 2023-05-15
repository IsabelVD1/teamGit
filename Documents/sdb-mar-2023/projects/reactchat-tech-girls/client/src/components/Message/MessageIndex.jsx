//import {useParams} from "react-router-dom";
import {Col, Container, Row } from "reactstrap";
import React, {useState, useEffect} from "react";
import MessageTable from "./MessageTable";

const MessageIndex = (props) => {
  const [messages, setMessages] = useState([]);

   //const {room_name} = useParams();

    async function getViewAllMessages() {
        let url = `http://localhost:4000/message/display-all/`+props.name;
        ;

        let myHeaders = new Headers();
        myHeaders.append("Authorization", props.token);

        let requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        try {
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            console.log(data);
            setMessages(data.message);
        }
        catch (error) {
            console.error(error.message);
        }

    }

    useEffect(() => {
        if (props.token) {
            getViewAllMessages();
        }
    }, [props.token]);

  

    return ( 
    <>
    <Container>
        <Row>

                    <Col md="8">
                        <MessageTable messages={messages} token={props.token} getViewAllMessages={getViewAllMessages} />
                    </Col>

        
        </Row>
    </Container>
    </> 
    );
}
 
export default MessageIndex;