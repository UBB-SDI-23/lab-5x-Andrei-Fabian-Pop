import {Button, Card, CardActions, CardContent, IconButton, TextField} from "@mui/material";
import {Container} from "@mui/system";
import {useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {BACKEND_API_URL} from "../../constants";
import {Event} from "../../models/Event";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

export const UpdateEvent = () => {
    const {eventid} = useParams();
    const navigate = useNavigate();

    const [event_, setEvent_] = useState<Event>({
        id: (typeof eventid === "string" ? parseInt(eventid) : -1),
        name: "",
        description: "",
        start_date: "",
        end_date: "",
        recurring: false
    });

    const updateEmail = async (event: { preventDefault: () => void }) => {
            event.preventDefault();
            try {
                await axios.patch(`${BACKEND_API_URL}/events/?id=${eventid}`, event_, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                navigate("/events");
            } catch (error) {
                console.log(error);
            }
        }
    ;

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{mr: 3}} to={`/events`}>
                        <ArrowBackIcon/>
                    </IconButton>{" "}
                    <form onSubmit={updateEmail}>

                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setEvent_({...event_, name: event.target.value})}
                        />

                        <TextField
                            id="description"
                            label="Description"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setEvent_({...event_, description: event.target.value})}
                        />

                        <TextField
                            id="start_date"
                            label="start Date"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setEvent_({...event_, start_date: event.target.value})}
                        />

                        <TextField
                            id="end_date"
                            label="End Date"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setEvent_({...event_, end_date: event.target.value})}
                        />

                        <TextField
                            id="recurring"
                            label="Recurring"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setEvent_({...event_, recurring: Boolean(event.target.value)})}
                        />

                        <Button type="submit">Update Event</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};