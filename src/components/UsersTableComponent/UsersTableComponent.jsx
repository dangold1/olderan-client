import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const UsersTable = props => {
    const classes = useStyles();
    const { users } = props;
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="users table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nickname</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Password</TableCell>
                        <TableCell>Role</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user._id}>
                            <TableCell component="th" scope="row">{user._id}</TableCell>
                            <TableCell>{user.nickname}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.password}</TableCell>
                            <TableCell>{user.role}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default UsersTable;