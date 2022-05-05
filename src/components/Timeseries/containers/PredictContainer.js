import React from "react";
import Fab from "@mui/material/Fab";
import { Box } from "@mui/system";
import { Container, Grid } from "@mui/material";
import { Button } from "@mui/material";
import PredictionPlot from "../plots/PredictionPlot";

const PredictContainer = props => {

    return (

        <Container sx={{ mt: 2, p: 3 }}>
            <Grid sx={{ boxShadow: 5, p: 2 }} container spacing={2} xs={12} width={1}>
                <Grid>

                </Grid>
                {props.predicted && props.predictions.length > 0 ? (
                    <Grid item lg={12} md={12} xs={12}>
                        <PredictionPlot datasets={props.predictions} plot={"prediction"} />
                    </Grid>
                ) : null}
            </Grid>
            <Box sx={{ mt: 2, float: "right" }}>

                <Button
                    onClick={props.handleBack}
                    variant="contained"
                >
                    Back
                </Button>
                <Button
                    color="primary"
                    onClick={props.handleReset}
                    variant="contained"
                >
                    Reset
                </Button>
            </Box>
        </Container>
    );
};

export default PredictContainer;
