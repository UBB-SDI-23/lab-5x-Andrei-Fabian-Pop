import {Button, Card, CardActions, CardContent, IconButton, TextField} from "@mui/material";
import {Container} from "@mui/system";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {BACKEND_API_URL} from "../../constants";
import {EmailNoId} from "../../models/Email";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

export const AddEmail = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState<EmailNoId>({
        address: "",
        corporate_email: false,
        user_full_name: "", // TODO: also read the teacher_id from the form (NOT from the user!)
        language: "",
        country: ""
    });

    const addEmail = async (event: { preventDefault: () => void }) => {
            event.preventDefault();
            try {
                await axios.post(`${BACKEND_API_URL}/emails/`, email, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                navigate("/emails");
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
                    <IconButton component={Link} sx={{mr: 3}} to={`/emails`}>
                        <ArrowBackIcon/>
                    </IconButton>{" "}
                    <form onSubmit={addEmail}>

                        <TextField
                            id="address"
                            label="Address"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setEmail({...email, address: event.target.value})}
                        />

                        <TextField
                            id="corporate_email"
                            label="Corporate email"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setEmail({...email, corporate_email: event.target.value === ""})}
                        />

                        <TextField
                            id="user_full_name"
                            label="Full Name"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setEmail({...email, user_full_name: event.target.value})}
                        />

                        <TextField
                            id="language"
                            label="Language (RO, EN, PT)"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setEmail({...email, language: event.target.value})}
                        />

                        <TextField
                            id="country"
                            label="Country (RO, I, PT)"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setEmail({...email, country: event.target.value})}
                        />

                        <Button type="submit">Add Email</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};