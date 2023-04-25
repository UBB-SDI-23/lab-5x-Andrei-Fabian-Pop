import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CircularProgress,
    Container,
    IconButton,
    Tooltip
} from "@mui/material"
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {BACKEND_API_URL} from "../../constants";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {Paginator} from "../pagination/Pagination";
import {EmailToEvent} from "../../models/EmailToEvent";

export const AllEmailToEvent = () => {
    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState<EmailToEvent[]>([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(100);
    const [totalRows, setTotalRows] = useState(0);

    const [isLastPage, setIsLastPage] = useState(false);

    const setCurrentPage = (newPage: number) => {
        setLoading(true);
        setPage(newPage);
    }

    const goToNextPage = () => {
        if (isLastPage) {
            return;
        }

        setPage(page + 1);
    }

    const goToPrevPage = () => {
        if (page === 1) {
            return;
        }

        setPage(page - 1);
    }

    const fetchEmailToEvents = async () => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/emailtoevent/${page}`)
            .then(async (response) => {
                const jsn = await response.json();
                setEvents(jsn.data);
                setTotalRows(jsn.totalRows);
            })
            .catch((error) => {
                alert(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchEmailToEvents();
    }, [page]);

    return (
        <Container>
            <h1>All Email To Events</h1>

            {loading && <CircularProgress/>}
            {!loading && events.length === 0 && <p>No email to events found...</p>}
            {!loading && (
                <IconButton component={Link} sx={{mr: 3}} to={`/emailtoevent/add`}>
                    <Tooltip title={"Add a new email to event"} arrow>
                        <AddIcon color={"primary"}/>
                    </Tooltip>
                </IconButton>
            )}
            {!loading && events.length > 0 && (
                <><TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Details</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {events.map((event, index) => (
                                <TableRow key={event.id}>
                                    <TableCell component="th" scope="row">
                                        {index + 100*page + 1}
                                    </TableCell>

                                    <TableCell component="th" scope="row" align="center">
                                        <Link to={`/emailtoevent/${event.id}/details`} title="View emailtoevents details">
                                            {event.name}
                                        </Link>
                                    </TableCell>

                                    <TableCell component="th" scope="row" align="center">
                                        <Link to={`/emailtoevent/${event.id}/details`} title="View emailtoevents details">
                                            {event.details}
                                        </Link>
                                    </TableCell>

                                    <TableCell align="center">
                                        <IconButton component={Link} sx={{mr: 3}} to={`/emailtoevent/${event.id}/edit`}>
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr: 3}} to={`/emailtoevent/${event.id}/delete`}>
                                            <DeleteForeverIcon sx={{color: "red"}}/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                    <Paginator
                    rowsPerPage={pageSize}
                    totalRows={totalRows}
                    currentPage={page}
                    isFirstPage={page === 1}
                    isLastPage={page === 9999}
                    setPage={setCurrentPage}
                    goToNextPage={goToNextPage}
                    goToPrevPage={goToPrevPage}/></>
            )}
        </Container>
    );
}
