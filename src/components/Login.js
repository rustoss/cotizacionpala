import React, { useState, useEffect } from 'react';
import {Avatar, Button, CssBaseline, TextField, FormControlLabel} from '@material-ui/core';
import {Checkbox, Link, Grid, Box, Typography, makeStyles, Container} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Axios from 'axios'
import Error from './Error'

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Pavimentos Laguna SA de CV
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}


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

const Login = ({ guardarBandLogin }) => {

    const [ datoslogeo, guardarDatosLogeo] = useState({
        email: '',
        password: ''
    })
    const [ error, guardarError ] = useState(false)

    const { email, password } = datoslogeo
    
    const changeSubmit = e =>{
        guardarDatosLogeo({
            ...datoslogeo,
            [e.target.name]: e.target.value
        })
    }
    


    // const consultarAPI = async () => {
    //     const consulta = Axios.post('http://localhost:5000/api/auth', {
    //         email: email,
    //         password: password
    //     })
    //     consulta
    //         .then(value => {
    //             guardarBandLogin(true)
    //         })
    //         .catch(error => guardarError(true))
    // }
    const consultarAPI = async () => {
        try{
            const consulta = await Axios.post('http://localhost:5000/api/auth', {
                email: email,
                password: password
            })
            guardarBandLogin(true)            
        }
        catch{
            guardarError(true)            
        }
      
    }

    const logeo = e => {
        e.preventDefault()

        if ( email.trim() === '' || password.trim() === '') {
            guardarError(true)
            return
        }
        guardarError(false)
        consultarAPI()
    }

    const classes = useStyles();
    return ( 
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            { error ? <Error mensaje='Email o password incorrecto'/> : null}
            <form 
                className={classes.form} noValidate
                onSubmit={logeo}   
            >
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={changeSubmit}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={changeSubmit}
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                Sign In
                </Button>
                <Grid container>
                <Grid item xs>
                    <Link href="#" variant="body2">
                        Forgot password?
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
                </Grid>
            </form>
            </div>
            <Box mt={8}>
            <Copyright />
            </Box>
        </Container>
     );
}
 
export default Login;