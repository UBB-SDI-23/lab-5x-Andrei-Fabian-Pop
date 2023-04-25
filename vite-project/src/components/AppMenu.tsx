import {Box, AppBar, Toolbar, IconButton, Typography, Button} from "@mui/material";
import {Link, useLocation} from "react-router-dom";
import EmailIcon from "@mui/icons-material/EmailRounded";
import EmailTwoTone from "@mui/icons-material/EmailTwoTone";
import Star from "@mui/icons-material/StarBorder";
import {useState} from "react";
import {Container} from "@mui/system";
import {AllEmails} from "./emails/AllEmails";
import {StatisticsYearly} from "./statistics/StatisticsYearly";
import {AllSubscriptions} from "./subscription/AllSubscriptions";
import {AllEvents} from "./event/AllEvents";
import {AllEmailToEvent} from "./emailtoevent/AllEmailToEvent";

export const AppMenu = () => {
    const [state, setState] = useState(0)
    const location = useLocation();
    const path = location.pathname;

    return (
        <Container>
            {state === 0 && (
                <Box sx={{flexGrow: 1}}>
                    <AppBar position="static" sx={{marginBottom: "20px"}}>
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{mr: 5}}>
                                Email management:
                            </Typography>
                            <Button
                                variant={path.startsWith("/emails") ? "outlined" : "text"}
                                to="/"
                                component={Link}
                                color="inherit"
                                sx={{mr: 5}}
                                onClick={() => setState(1)}
                                startIcon={<EmailTwoTone/>}>
                                Emails
                            </Button>
                        </Toolbar>
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{mr: 5}}>
                                Statistics:
                            </Typography>
                            <Button
                                variant={path.startsWith("/statistics/yearly_pay/") ? "outlined" : "text"}
                                to="/"
                                component={Link}
                                color="inherit"
                                sx={{mr: 5}}
                                onClick={() => setState(2)}
                                startIcon={<Star/>}>
                                Statistics
                            </Button>
                        </Toolbar>
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{mr: 5}}>
                                Subscription management:
                            </Typography>
                            <Button
                                variant={path.startsWith("/subscriptions") ? "outlined" : "text"}
                                to="/"
                                component={Link}
                                color="inherit"
                                sx={{mr: 5}}
                                onClick={() => setState(3)}
                                startIcon={<EmailTwoTone/>}>
                                Subscriptions
                            </Button>
                        </Toolbar>
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{mr: 5}}>
                                Events management:
                            </Typography>
                            <Button
                                variant={path.startsWith("/events") ? "outlined" : "text"}
                                to="/"
                                component={Link}
                                color="inherit"
                                sx={{mr: 5}}
                                onClick={() => setState(4)}
                                startIcon={<EmailTwoTone/>}>
                                Events
                            </Button>
                        </Toolbar>
                         <Toolbar>
                            <Typography variant="h6" component="div" sx={{mr: 5}}>
                                Email To Events management:
                            </Typography>
                            <Button
                                variant={path.startsWith("/emailtoevents") ? "outlined" : "text"}
                                to="/"
                                component={Link}
                                color="inherit"
                                sx={{mr: 5}}
                                onClick={() => setState(5)}
                                startIcon={<EmailTwoTone/>}>
                                Email To Events
                            </Button>
                        </Toolbar>
                    </AppBar>
                </Box>
            )}
            {state === 1 && (
                <><Button
                    to="/"
                    component={Link}
                    color="inherit"
                    sx={{mr: 5}}
                    startIcon={<EmailIcon/>}
                    onClick={() => setState(0)}
                >
                    Back
                </Button><AllEmails/></>
            )}
            {state === 2 && (
                <><Button
                    to="/"
                    component={Link}
                    color="inherit"
                    sx={{mr: 5}}
                    startIcon={<Star/>}
                    onClick={() => setState(0)}
                >
                    Back
                </Button><StatisticsYearly/></>
            )}
            {state === 3 && (
                <><Button
                    to="/"
                    component={Link}
                    color="inherit"
                    sx={{mr: 5}}
                    startIcon={<Star/>}
                    onClick={() => setState(0)}
                >
                    Back
                </Button><AllSubscriptions/></>
            )}
            {state === 4 && (
                <><Button
                    to="/"
                    component={Link}
                    color="inherit"
                    sx={{mr: 5}}
                    startIcon={<Star/>}
                    onClick={() => setState(0)}
                >
                    Back
                </Button><AllEvents/></>
            )}
            {state === 5 && (
                <><Button
                    to="/"
                    component={Link}
                    color="inherit"
                    sx={{mr: 5}}
                    startIcon={<Star/>}
                    onClick={() => setState(0)}
                >
                    Back
                </Button><AllEmailToEvent/></>
            )}
        </Container>
    );
};