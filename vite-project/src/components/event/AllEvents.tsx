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
import {Event} from "../../models/Event";
import {BACKEND_API_URL} from "../../constants";
import AddIcon from "@mui/icons-material/Add";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {Paginator} from "../pagination/Pagination";

export const AllEvents = () => {
    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState<Event[]>([]);
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

    const fetchEvents = async () => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/events/${page}`)
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
        fetchEvents();
    }, [page]);

    return (
        <Container>
            <h1>All Events</h1>

            {loading && <CircularProgress/>}
            {!loading && events.length === 0 && <p>No events found...</p>}
            {!loading && (
                <IconButton component={Link} sx={{mr: 3}} to={`/events/add`}>
                    <Tooltip title={"Add a new event"} arrow>
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
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center">Start Date</TableCell>
                                <TableCell align="center">End Date</TableCell>
                                <TableCell align="center">Recurring</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {events.map((event, index) => (
                                <TableRow key={event.id}>
                                    <TableCell component="th" scope="row">
                                        {index + 100*page + 1}
                                    </TableCell>

                                    <TableCell component="th" scope="row" align="center">
                                        <Link to={`/events/${event.id}/details`} title="View email details">
                                            {event.name}
                                        </Link>
                                    </TableCell>

                                    <TableCell component="th" scope="row" align="center">
                                        <Link to={`/events/${event.id}/details`} title="View email details">
                                            {event.description}
                                        </Link>
                                    </TableCell>

                                    <TableCell component="th" scope="row" align="center">
                                        <Link to={`/events/${event.id}/details`} title="View email details">
                                            {event.start_date}
                                        </Link>
                                    </TableCell>

                                    <TableCell component="th" scope="row" align="center">
                                        <Link to={`/events/${event.id}/details`} title="View email details">
                                            {event.end_date}
                                        </Link>
                                    </TableCell>

                                    <TableCell component="th" scope="row" align="center">
                                        <Link to={`/events/${event.id}/details`} title="View email details">
                                            {event.recurring}
                                        </Link>
                                    </TableCell>

                                    <TableCell align="center">
                                        <IconButton component={Link} sx={{mr: 3}} to={`/events/${event.id}/edit`}>
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr: 3}} to={`/events/${event.id}/delete`}>
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
