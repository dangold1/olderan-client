import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { REGISTER_USER_API } from '../../utils/keys';
import { Grid } from '@material-ui/core';
import { Link } from "react-router-dom";
import axiosService from '../../services/axios.service';
import localStorageService from '../../services/localStorage.sevice';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const RegisterComponent = props => {
    const classes = useStyles();
    const history = useHistory();
    const { register, handleSubmit } = useForm();

    const onSubmit = async data => {
        data.role = "user";
        try {
            const response = await axiosService.send({ method: "post", url: REGISTER_USER_API, data });
            localStorageService.saveUser(response.data);
            history.push("/user-panel");
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">Register</Typography>
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        inputRef={register({ require: true })}
                        required
                        fullWidth
                        id="nickname"
                        label="Nickname"
                        name="nickname"
                        autoComplete="nickname"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        inputRef={register({ require: true })}
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        inputRef={register({ require: true })}
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Register
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/" variant="body2">{"Already have an account? Sign In"}</Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default RegisterComponent;