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
import {Email} from "../../models/Email";
import {BACKEND_API_URL} from "../../constants";
import AddIcon from "@mui/icons-material/Add";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {Paginator} from "../pagination/Pagination";

export const AllEmails = () => {
    const [loading, setLoading] = useState(false);
    const [emails, setEmails] = useState<Email[]>([]);
    const [order, setOrder] = useState("asc");
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

    const sorting = (collum: string) => {
        if (order === "asc") {
            const sorted = [...emails].sort((email1: Email, email2: Email) =>
                // @ts-ignore
                email1[collum].toLowerCase() > email2[collum].toLowerCase() ? 1 : -1
            );
            setEmails(sorted);
            setOrder("des");
        }
        if (order === "des") {
            const sorted = [...emails].sort((email1: Email, email2: Email) =>
                // @ts-ignore
                email1[collum].toLowerCase() < email2[collum].toLowerCase() ? 1 : -1
            );
            setEmails(sorted);
            setOrder("asc");
        }
    }

    const fetchEmails = async () => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/emails/${page}`)
            .then(async (response) => {
                const jsn = await response.json();
                setEmails(jsn.data);
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
        fetchEmails();
    }, [page]);

    return (
        <Container>
            <h1>All Emails</h1>

            {loading && <CircularProgress/>}
            {!loading && emails.length === 0 && <p>No emails found...</p>}
            {!loading && (
                <IconButton component={Link} sx={{mr: 3}} to={`/emails/add`}>
                    <Tooltip title={"Add a new email"} arrow>
                        <AddIcon color={"primary"}/>
                    </Tooltip>
                </IconButton>
            )}
            {!loading && emails.length > 0 && (
                <><TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="center" onClick={() => sorting("address")}>Address</TableCell>
                                <TableCell align="center">Corporate Email</TableCell>
                                <TableCell align="center">User Full Name</TableCell>
                                <TableCell align="center">Language</TableCell>
                                <TableCell align="center">Country</TableCell>
                                <TableCell align="center">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {emails.map((email, index) => (
                                <TableRow key={email.id}>
                                    <TableCell component="th" scope="row">
                                        {index + 100*page + 1}
                                    </TableCell>

                                    <TableCell component="th" scope="row" align="center">
                                        <Link to={`/emails/${email.id}/details`} title="View email details">
                                            {email.address}
                                        </Link>
                                    </TableCell>

                                    <TableCell component="th" scope="row" align="center">
                                        <Link to={`/emails/${email.id}/details`} title="View email details">
                                            {(email.corporate_email) ? <p>Corporate</p> : <p>Personal</p>}
                                        </Link>
                                    </TableCell>

                                    <TableCell component="th" scope="row" align="center">
                                        <Link to={`/emails/${email.id}/details`} title="View email details">
                                            {email.user_full_name}
                                        </Link>
                                    </TableCell>

                                    <TableCell component="th" scope="row" align="center">
                                        <Link to={`/emails/${email.id}/details`} title="View email details">
                                            {email.language}
                                        </Link>
                                    </TableCell>

                                    <TableCell component="th" scope="row" align="center">
                                        <Link to={`/emails/${email.id}/details`} title="View email details">
                                            {email.country}
                                        </Link>
                                    </TableCell>

                                    <TableCell align="center">
                                        {/*<IconButton*/}
                                        {/*    component={Link}*/}
                                        {/*    sx={{mr: 3}}*/}
                                        {/*    to={`/emails/${email.id}/details`}>*/}
                                        {/*    <Tooltip title="View email details" arrow>*/}
                                        {/*        <ReadMoreIcon color="primary"/>*/}
                                        {/*    </Tooltip>*/}
                                        {/*</IconButton>*/}

                                        <IconButton component={Link} sx={{mr: 3}} to={`/emails/${email.id}/edit`}>
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr: 3}} to={`/emails/${email.id}/delete`}>
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
