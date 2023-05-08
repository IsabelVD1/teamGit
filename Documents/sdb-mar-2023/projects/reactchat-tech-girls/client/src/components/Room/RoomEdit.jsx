import React, { useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label, Container, Row, Col} from "reactstrap";


const RoomEdit = (props) => {
    const [name, setName] = useState("");
    const [roomDescription, setRoomDescription] = useState("");

    // UseParams() from react-router-dom 
    const {id} = useParams();

    //useEffect() to get the room by id
    useEffect(() => {
        if(props.token){
            getRoomById();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.token]);

        //Function here

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(id);
        let url = `http://localhost:4000/room/update/`+id;
        let bodyObject = {
            name,
            roomDescription,
        };

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", props.token);

        const requestOptions = {
            headers: myHeaders,
            method: "PATCH",
            body: JSON.stringify(bodyObject),

        };

        try {

            const response = await fetch(url, requestOptions);
            const data = await response.json();
            console.log(data);
            // If it works then go back to the roomtable url 
        }
        catch (error) {
            console.error(error.message);
        }

    };

    async function getRoomById() {
        let url = `http://localhost:4000/room/`+id;

        let myHeaders = new Headers();
        myHeaders.append("Authorization", props.token);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };
        try {
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            console.log(data);
            setName(data.room.name);
            setRoomDescription(data.room.roomDescription);
        }
        catch (error) {
            console.error(error.message);
        }
    }

    return (
        <>
           <Container>

        <Row>
            <Col md="4">
                <h4>Instructions</h4>
                <p>
                    Correct any error you may find in your room and click the "Update Room" button.    
                </p>
            </Col>
            <Col md="8">
            
                <Form className='mb-5' onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label>Name:</Label>
                        <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Room Description:</Label>
                        <Input type="text" value={roomDescription} onChange={(e) => setRoomDescription(e.target.value)} />
                    </FormGroup>
                    <Button type="submit">Update Room</Button>
                </Form>
            </Col>
            </Row>
            </Container>
        </>
    );
}

export default RoomEdit;















