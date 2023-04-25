import {Autocomplete, Button, Card, CardActions, CardContent, IconButton, TextField} from "@mui/material";
import {Container} from "@mui/system";
import {useCallback, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {BACKEND_API_URL} from "../../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import {debounce} from "lodash";
import {Email} from "../../models/Email";

export const AddSubscription = () => {
    const navigate = useNavigate();

    const [subscription, setSubscription] = useState({
        name: "",
        description: "",
        price: 11,
        period: "",
        period_paid: 7,
        mail: 100
    });

    const [emails, setEmails] = useState<Email[]>([]);

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

    const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 500), []);

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

    const addSubscription = async (event: { preventDefault: () => void }) => {
            event.preventDefault();
            try {
                await axios.post(`${BACKEND_API_URL}/subscriptions/`, subscription, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                navigate("/subscriptions");
            } catch
                (error) {
                console.log(error);
            }
        }
    ;

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{mr: 3}} to={`/subscriptions`}>
                        <ArrowBackIcon/>
                    </IconButton>{" "}
                    <form onSubmit={addSubscription}>

                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setSubscription({...subscription, name: event.target.value})}
                        />

                        <TextField
                            id="description"
                            label="Description"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setSubscription({...subscription, description: event.target.value})}
                        />

                        <TextField
                            id="price"
                            label="Price"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setSubscription({...subscription, price: Number(event.target.value)})}
                        />

                        <TextField
                            id="period"
                            label="Period"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setSubscription({...subscription, period: event.target.value})}
                        />

                        <TextField
                            id="period_paid"
                            label="Period Paid"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setSubscription({
                                ...subscription,
                                period_paid: Number(event.target.value)
                            })}
                        />

                        <Autocomplete
                            id="mail"
                            options={emails}
                            renderInput={(params) => <TextField {...params} label="Email" variant="outlined"/>}
                            getOptionLabel={(option) => `${option.address} - ${option.user_full_name}`}
                            filterOptions={(options, state) => options.filter((option) => option.address.toLowerCase().includes(state.inputValue.toLowerCase()))}

                            onInputChange={handleInputChange}
                            onChange={(event, value) => {
                                if (value) {
                                    console.log(value);
                                    if (value.id !== undefined) {
                                        setSubscription({...subscription, mail: value.id});
                                    }
                                }
                            }}
                        />

                        <Button type="submit">Add Sub</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};