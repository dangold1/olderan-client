import React, { useState, useEffect, Fragment } from 'react';
import useFetch from '../hooks/useFetch';
import { IMAGES_API } from '../utils/keys';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { Link } from "react-router-dom";
import localStorageService from '../services/localStorage.sevice';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '20px',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
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
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    card: {
        minWidth: 250,
        minHeight: 250,
        maxWidth: 250,
        maxHeight: 250,
        margin: theme.spacing(2),
    }
}));

const UserPanelPage = props => {
    const classes = useStyles();
    const [progress, setProgress] = useState(0);
    const { data, isLoading, error } = useFetch(IMAGES_API);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const isAdmin = localStorageService.getIsAdmin();
    
    return (
        <Fragment>
            <div className={classes.routes}>
                {isAdmin && <Link className={classes.link} to="/admin-panel" variant="body2">{"Admin Panel"}</Link>}
                <Link className={classes.link} to="/" variant="body2">{"Sign out"}</Link>
            </div>
            <Grid container className={classes.root} spacing={2}>
                <Typography gutterBottom variant="headline" component="h2">User Panel</Typography>
                <Grid container justify="center">
                    {
                        isLoading ? <CircularProgress variant="static" value={50} />
                            : error ? <div>{error}</div>
                                : data && data.slice(0, 10).map((image) => (
                                    <Grid key={image.id} item>
                                        <Card className={classes.card}>
                                            <CardMedia
                                                className={classes.media}
                                                image={image.thumbnailUrl}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="headline" component="body">
                                                    {image.title}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))
                    }
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default UserPanelPage;
