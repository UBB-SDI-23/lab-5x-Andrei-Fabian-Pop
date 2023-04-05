import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableBody,
    Container,
    TableCell,
    CircularProgress,
} from "@mui/material"
import {useEffect, useState} from "react";
import {BACKEND_API_URL} from "../../constants";

export const StatisticsYearly = () => {
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState<[[]]>([[]]);

    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/statistics/yearly_pay/`)
            .then(async (response) => {
                const jsn = await response.text();
                const arr = JSON.parse(jsn);
                setStats(arr);
            })
            .catch((error) => {
                alert(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <Container>
            <h1>Yearly pay</h1>

            {loading && <CircularProgress/>}
            {!loading && stats.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="left">Address</TableCell>
                                <TableCell align="left">Payment this year</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stats.map((item: [], index) => (
                                <TableRow>
                                    <TableCell component="th" scope="row">{index + 1}</TableCell>
                                    <TableCell component="th" scope="row">{item.at(0)}</TableCell>
                                    <TableCell component="th" scope="row">{item.at(1)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
}
