import React, {useState} from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const RoomCreate = (props) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [addedUsers, setAddedUsers] = useState("");

    //Function here
    async function handleSubmit(e) {
       e.preventDefault();
         let url = "http://localhost:4000/room/create";

            let bodyObject = {
                name: name,
                description: description,
                addedUsers: addedUsers,
            };

            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", props.token);

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(bodyObject),
            };

            try {
                const response = await fetch(url, requestOptions);
                const data = await response.json();
                console.log(data);
                props.getViewAllRooms();
            }
            catch (error) {
                console.error(error.message);
            }

        }
        return (
            <>
            <h3>Create a Room</h3>
            <Form className="mb-5" onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Name:</Label>
                    <Input type="text" value={name} onChange={(e) => setName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Description:</Label>
                    <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)}
                    />
                </FormGroup>
                
                
                <Button type="submit">Create Room</Button>
            </Form>
            </>
        );
    };

export default RoomCreate;







