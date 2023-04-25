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
import {Subscription} from "../../models/Subscription";
import {BACKEND_API_URL} from "../../constants";
import AddIcon from "@mui/icons-material/Add";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {Paginator} from "../pagination/Pagination";
import {Email} from "@mui/icons-material";

export const AllSubscriptions = () => {
    const [loading, setLoading] = useState(false);
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
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

    const fetchSubscriptions = async () => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/subscriptions/${page}`)
            .then(async (response) => {
                const jsn = await response.json();
                setSubscriptions(jsn.data);
                console.log(jsn.data);
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
        fetchSubscriptions();
    }, [page]);

    return (
        <Container>
            <h1>All Subscriptions</h1>

            {loading && <CircularProgress/>}
            {!loading && subscriptions.length === 0 && <p>No subs found...</p>}
            {!loading && (
                <IconButton component={Link} sx={{mr: 3}} to={`/subscriptions/add`}>
                    <Tooltip title={"Add a new sub"} arrow>
                        <AddIcon color={"primary"}/>
                    </Tooltip>
                </IconButton>
            )}
            {!loading && subscriptions.length > 0 && (
                <><TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Period</TableCell>
                                <TableCell align="center">Period Paid</TableCell>
                                <TableCell align="center">Email ID</TableCell>
                                <TableCell align="center">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {subscriptions.map((subscription, index) => (
                                <TableRow key={subscription.id}>
                                    <TableCell component="th" scope="row">
                                        {index + 100*page + 1}
                                    </TableCell>

                                    <TableCell component="th" scope="row" align="center">
                                        <Link to={`/subscriptions/${subscription.id}/details`} title="View subscription details">
                                            {subscription.name}
                                        </Link>
                                    </TableCell>

                                    <TableCell component="th" scope="row" align="center">
                                        <Link to={`/subscriptions/${subscription.id}/details`} title="View subscription details">
                                            {(subscription.description) ? <p>Corporate</p> : <p>Personal</p>}
                                        </Link>
                                    </TableCell>

                                    <TableCell component="th" scope="row" align="center">
                                        <Link to={`/subscriptions/${subscription.id}/details`} title="View subscription details">
                                            {subscription.price}
                                        </Link>
                                    </TableCell>

                                    <TableCell component="th" scope="row" align="center">
                                        <Link to={`/subscriptions/${subscription.id}/details`} title="View subscription details">
                                            {subscription.period}
                                        </Link>
                                    </TableCell>

                                    <TableCell component="th" scope="row" align="center">
                                        <Link to={`/subscriptions/${subscription.id}/details`} title="View subscription details">
                                            {subscription.period_paid}
                                        </Link>
                                    </TableCell>

                                    {/*<TableCell component="th" scope="row" align="center">*/}
                                    {/*    <Link to={`/subscriptions/${subscription.id}/details`} title="View subscription details">*/}
                                    {/*        {Email(subscription.mail_id.id)}*/}
                                    {/*    </Link>*/}
                                    {/*</TableCell>*/}

                                    <TableCell align="center">
                                        <IconButton component={Link} sx={{mr: 3}} to={`/subscriptions/${subscription.id}/edit`}>
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr: 3}} to={`/subscriptions/${subscription.id}/delete`}>
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
