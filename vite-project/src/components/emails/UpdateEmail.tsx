import {Button, Card, CardActions, CardContent, IconButton, TextField} from "@mui/material";
import {Container} from "@mui/system";
import {useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {BACKEND_API_URL} from "../../constants";
import {Email} from "../../models/Email";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

export const UpdateEmail = () => {
	const { emailid } = useParams();
    const navigate = useNavigate();

    const [email, setEmail] = useState<Email>({
        id: (typeof emailid === "string" ? parseInt(emailid) : -1),
        address: "",
        corporate_email: false,
        user_full_name: "", // TODO: also read the teacher_id from the form (NOT from the user!)
        language: "",
        country: ""
    });

    const updateEmail = async (event: { preventDefault: () => void }) => {
            event.preventDefault();
            try {
                await axios.patch(`${BACKEND_API_URL}/emails/${emailid}/`, email, {
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
                    <form onSubmit={updateEmail}>

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

                        <Button type="submit">Update Email</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};