import {Autocomplete, Button, Card, CardActions, CardContent, IconButton, TextField} from "@mui/material";
import {Container} from "@mui/system";
import {useCallback, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {BACKEND_API_URL} from "../../constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import {Event} from "../../models/Event";
import {Email} from "../../models/Email";
import {debounce} from "lodash";

export const AddEmailToEvent = () => {
    const navigate = useNavigate();

    const [emailToEvent, setEmailToEvent] = useState({
        name: "",
        details: "",
        email: 0,
        event: 0,
    });

    const [emails, setEmails] = useState<Email[]>([]);
    const [events_, setEvents_] = useState<Event[]>([]);

    const fetchSuggestions = async (query: string) => {
        try {
            let url = `${BACKEND_API_URL}/emails/${query}`;
            await fetch(url).then(async (response) => {
                const jsn = await response.json();
                setEmails(jsn);
                console.log(jsn);
            });
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    const fetchSuggestions2 = async (query: string) => {
        try {
            let url = `${BACKEND_API_URL}/events/${query}`;
            await fetch(url).then(async (response) => {
                const jsn = await response.json();
                setEvents_(jsn);
                console.log(jsn);
            });
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 500), []);
    const debouncedFetchSuggestions2 = useCallback(debounce(fetchSuggestions2, 500), []);

    useEffect(() => {
        return () => {
            debouncedFetchSuggestions.cancel();
        };
    }, [debouncedFetchSuggestions]);

    const handleInputChange = (event: any, value: any, reason: any) => {
        console.log("input", value, reason);

        if (reason === "input") {
            debouncedFetchSuggestions(value);
        }
    };

    const handleInputChange2 = (event: any, value: any, reason: any) => {
        console.log("input", value, reason);

        if (reason === "input") {
            debouncedFetchSuggestions2(value);
        }
    };

    const addEvent = async (event: { preventDefault: () => void }) => {
            event.preventDefault();
            try {
                await axios.post(`${BACKEND_API_URL}/emailtoevent/`, emailToEvent, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                navigate("/emailtoevent");
            } catch
                (error) {
                console.log(error);
            }
        };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{mr: 3}} to={`/emailtoevent`}>
                        <ArrowBackIcon/>
                    </IconButton>{" "}
                    <form onSubmit={addEvent}>

                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setEmailToEvent({...emailToEvent, name: event.target.value})}
                        />

                        <TextField
                            id="description"
                            label="Description"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setEmailToEvent({...emailToEvent, details: event.target.value})}
                        />

                        <Autocomplete
                            id="emails"
                            options={emails}
                            renderInput={(params) => <TextField {...params} label="Email" variant="outlined"/>}
                            getOptionLabel={(option) => `${option.address} - ${option.user_full_name}`}
                            filterOptions={(options, state) => options.filter((option) => option.address.toLowerCase().includes(state.inputValue.toLowerCase()))}

                            onInputChange={handleInputChange}
                            onChange={(event, value) => {
                                if (value) {
                                    console.log(value);
                                    if (value.id !== undefined) {
                                        setEmailToEvent({...emailToEvent, email: value.id});
                                    }
                                }
                            }}
                        />

                        <Autocomplete
                            id="events"
                            options={events_}
                            renderInput={(params) => <TextField {...params} label="Event" variant="outlined"/>}
                            getOptionLabel={(option) => `${option.name} - ${option.description}`}
                            filterOptions={(options, state) => options.filter((option) => option.name.toLowerCase().includes(state.inputValue.toLowerCase()))}

                            onInputChange={handleInputChange2}
                            onChange={(event, value) => {
                                if (value) {
                                    console.log(value);
                                    if (value.id !== undefined) {
                                        setEmailToEvent({...emailToEvent, event: value.id});
                                    }
                                }
                            }}
                        />

                        <Button type="submit">Add Email To Event</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};