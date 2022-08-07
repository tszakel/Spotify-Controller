import { Button, Typography, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import props from 'prop-types'; 
import CreateRoomPage from "./CreateRoomPage";


export default function Room() {
    
    const[votesToSkip, setVotesToSkip] = useState(2);
    const[guestCanPause, setGuestCanPause] = useState(false);
    const[isHost, setIsHost] = useState(false);
    const[showSettings, setShowSettings] = useState(false);

    
    const { roomCode } = useParams();

    let navigate = useNavigate();

    React.useEffect(() => {
        fetch('/api/get-room?code='+roomCode)
            .then(response => {
                if (!response.ok) {
                    props.clearRoomCodeCallback; // clears roomCode state in HomePage
                    navigate("/");
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                setVotesToSkip(data.votes_to_skip);
                setGuestCanPause(data.guest_can_pause);
                setIsHost(data.is_host);
            });
        });

    const leaveButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        };
        fetch(`/api/leave-room`, requestOptions)
            .then(_response => {
                props.clearRoomCodeCallback; 
                navigate("/");
            });
    }

    const updateShowSettings = (value) =>{
        setShowSettings(value);
    }

    const renderSettings = () => {
        return (
          <Grid container spacing={1}>
            <Grid item xs={12} align="center">
              <CreateRoomPage update={true}
                votesToSkip={votesToSkip}
                guestCanPause={guestCanPause}
                roomCode={roomCode}
                updateCallback={null}
              />
            </Grid>
            <Grid item xs={12} align="center">
              <Button
                variant="contained"
                color="secondary"
                onClick={() => updateShowSettings(false)}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        );
    }

    const renderSettingsButton = () => {
        return(
            <Grid item xs={12} align="center">
              <Button
                variant="contained"
                color="primary"
                onClick={() => updateShowSettings(true)}
              >
                Settings
              </Button>
            </Grid>
        );
    }
       

    if(showSettings){
        return renderSettings()
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
        {isHost ? renderSettingsButton() : null}
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
        
        
        /* fetch('/api/get-room?code='+roomCode)
    .then((response) => response.json())
    .then((data) => {
        setVotesToSkip(data.votes_to_skip);
        setGuestCanPause(data.guest_can_pause);
        setIsHost(data.is_host);
        
    }); */