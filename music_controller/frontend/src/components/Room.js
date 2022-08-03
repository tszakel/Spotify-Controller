import { Button, Typography, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";  


export default function Room() {
    
    const[votesToSkip, setVotesToSkip] = useState(2);
    const[guestCanPause, setGuestCanPause] = useState(false);
    const[isHost, setIsHost] = useState(false);
    
    const { roomCode } = useParams();

    let navigate = useNavigate();
    /* const clearRoomCode = () => {
        setState({roomCode: null})
    } */
    
    //<Route path='/room/:roomCode' element={<Room clearRoomCodeCallback={clearRoomCode} />} />

    /* fetch('/api/get-room?code='+roomCode)
    .then((response) => response.json())
    .then((data) => {
        setVotesToSkip(data.votes_to_skip);
        setGuestCanPause(data.guest_can_pause);
        setIsHost(data.is_host);
        
    }); */

    React.useEffect(() => {
        fetch('/api/get-room?code='+roomCode)
            .then(response => {
                if (!response.ok) {
                    this.props.leaveRoomCallback(); // clears roomCode state in HomePage
                    navigate("/");
                } else {
                    return response.json();
                }
            })
            .then(data => {
                setState({
                    votesToSkip: data.votes_to_skip,
                    guestCanPause: data.guest_can_pause,
                    isHost: data.is_host,
                });
            });
    }, []);

    const leaveButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        };
        fetch(`/api/leave-room`, requestOptions)
            .then(_response => {
                this.props.leaveRoomCallback(); // clears roomCode state in HomePage
                navigate("/");
            });
    }
       

    return <Grid container spacing={1}>
        <Grid item xs={12} align="center">
            <Typography variant="h4" component="h4">
                Code: {roomCode}
            </Typography>
        </Grid>
        <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
                Votes: {votesToSkip}
            </Typography>
        </Grid>
        <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
                Guest Can Pause: {String(guestCanPause)}
            </Typography>
        </Grid>
        <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
                Host: {String(isHost)}
            </Typography>
        </Grid>
        <Grid item xs={12} align="center">
            <Button variant="contained" color="secondary" onClick={leaveButtonPressed}>
                Leave Room
            </Button>
        </Grid>

    </Grid>
}

/* <div>
            <h3>{roomCode}</h3>
            <p>Votes: {votesToSkip}</p>
            <p>Guest Can Pause: {String(guestCanPause)}</p>
            <p>Host: {String(isHost)}</p>
        </div> */