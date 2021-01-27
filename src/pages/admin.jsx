import React, { useState, useEffect, Fragment } from 'react';
import useFetch from '../hooks/useFetch';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Container, Typography } from '@material-ui/core';
import UsersTableComponent from '../components/UsersTableComponent/UsersTableComponent';
import { USERS_API } from '../utils/keys';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '20px',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
    },
    routes: {
        display: 'flex',
        justifyContent: "flex-end",
        marginRight: '120px',
        marginTop: '20px',
    },
    link: {
        padding: '10px',
    },
    spinner: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
    grid: {
        marginTop: "30px",
    }
}));

const AdminPanelPage = props => {
    const classes = useStyles();
    const [progress, setProgress] = useState(0);
    const { data, isLoading, error } = useFetch(USERS_API);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Fragment>
            <div className={classes.routes}>
                <Link className={classes.link} to="/user-panel" variant="body2">{"User Panel"}</Link>
                <Link className={classes.link} to="/" variant="body2">{"Sign out"}</Link>
            </div>
            <Container maxWidth="md" className={classes.root}>

                <Typography gutterBottom variant="headline" component="h2">Admin Panel</Typography>
                <Grid container justify="center" className={classes.grid}>
                    {
                        isLoading ? <CircularProgress variant="static" value={50} />
                            : error ? <div>{error}</div>
                                : data && <UsersTableComponent users={data} />
                    }
                </Grid>
            </Container>
        </Fragment>
    );
}

export default AdminPanelPage;
