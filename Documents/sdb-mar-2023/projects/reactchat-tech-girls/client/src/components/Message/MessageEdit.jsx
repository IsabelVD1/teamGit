/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import React, {useState, useEffect} from "react";

const MessageEdit = (props) => {
    const [when, setWhen] = useState(0);
    const [user, setUser] = useState("");
    const [room, setRoom] = useState("");
    const [body, setBody] = useState("");

    const {room_name} = useParams();
    const {id} = useParams();

    useEffect(() => {
        if (props.token) {
            getMessagebyId();
        }
    }, [props.token]);

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(room_name);

        let url = `http://localhost:4000/message/update/` + id;

        let bodyObject = {
            when,
            user,
            room,
            body,
        }

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", props.token);
      
      
        const requestOptions ={
          headers: myHeaders,
          method: "PATCH",
          body: JSON.stringify(bodyObject)
        };
      
        try {
          const response = await fetch(url, requestOptions);
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error(error.message);
        }    
    }

    async function getMessagebyId() {
        console.log(props.name);
        let url = `http://localhost:4000/message/display-all/${props.name}`;

        let myHeaders = new Headers()
    myHeaders.append("Authorization", props.token);

    const requestOptions = {
        headers: myHeaders,
        method: "GET",
    }

    try {
        const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data); 
        setWhen(data.message.when); 
        setUser(data.message.user);
        setRoom(data.message.room);
        setBody(data.message.body);

    } catch (error) {
        console.error(error.message)
    }
}
   useEffect(() => {
         if (props.token) {
                getMessagebyId();
            }
        }, [props.token]);

    return ( 
    <>
    <Container>
        <Row>
            <Col md="4"></Col>
            <h4>Instructions</h4>
            <p>
                Correct any errors you may find in your message and click the update button.
            </p>
            <Col md="8">
                <Form className="mb-5" onSubmit={handleSubmit}>

                <FormGroup>
                    <Label>When:</Label>
                    <Input type="number"
                  value={when}
                  onChange={(e) => setWhen(e.target.value)}/>
                </FormGroup>

               
                <FormGroup>
                    <Label>User:</Label>
                    <Input type="text"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}/>
                </FormGroup>


                <FormGroup>
                    <Label>Room:</Label>
                    <Input type="text"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}/>
                </FormGroup>


                <FormGroup>
                    <Label>Body:</Label>
                    <Input type="text"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}/>
                </FormGroup>
                <div className="d-grid gap-2 mb-4">
                    <Button type="submit" color="success">
                        Save Message
                    </Button>
                </div>
            </Form>
            </Col>
        </Row>
    </Container>
    </> 
    );
}
 
export default MessageEdit;