import React,{ useState, useEffect} from "react";
import { Col, Container, Row } from "reactstrap";
import RoomCreate from "./RoomCreate";
import RoomTable from "./RoomTable";


const RoomIndex = (props) => {
    const [rooms, setRooms] = useState([]);

    async function getViewAllRooms() {
        let url = `http://localhost:4000/room/view-all`;

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
            setRooms(data.room);
        }
        catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        if (props.token) {
            getViewAllRooms();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.token]);

    return (
        <>
            <Container>
                <Row>
                    <Col md="4">
                        <RoomCreate token={props.token} getViewAllRooms={getViewAllRooms} />
                    </Col>
                    <Col md="8">
                        <RoomTable rooms={rooms} token={props.token} getViewAllRooms={getViewAllRooms} />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default RoomIndex;