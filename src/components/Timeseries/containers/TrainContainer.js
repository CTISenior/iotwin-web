import React from "react";
import {
	withStyles
} from '@mui/styles';
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import EpochLog from "../plots/EpochLog";
import PredictionPlot from "../plots/PredictionPlot"

import { split_sequences, train, predict } from "../data/DataUtil";
import { Button, Container } from "@mui/material";
import { Box } from "@mui/system";

const PrettoSlider = withStyles({
	root: {
		color: "#52af77",
		height: 8
	},
	thumb: {
		height: 24,
		width: 24,
		backgroundColor: "#fff",
		border: "2px solid currentColor",
		marginTop: -8,
		marginLeft: -12,
		"&:focus,&:hover,&$active": {
			boxShadow: "inherit"
		}
	},
	active: {},
	valueLabel: {
		left: "calc(-50% + 4px)"
	},
	track: {
		height: 8,
		borderRadius: 4
	},
	rail: {
		height: 8,
		borderRadius: 4
	}
})(Slider);

const TrainContainer = props => {
	const [lags, setLags] = React.useState(6);
	const [epochs, setEpochs] = React.useState(5);
	const [trained, setTrained] = React.useState(false);
	const [predicted, setPredicted] = React.useState(false);
	const [model, setModel] = React.useState(null);
	const [splitSeqX, setSplitSeqX] = React.useState([]);
	const [splitSeqY, setSplitSeqY] = React.useState([]);
	const [trainStatus, setTrainStatus] = React.useState(false);
	// const [loading, setLoading] = React.useState(false);
	const [lossData, setLossData] = React.useState({
		count: epochs,
		text: [],
		X: [],
		y: [],
		trained: trained
	});

	const [predictions, setPredictions] = React.useState([]);

	const resetLossData = () => {
		setLossData({
			count: 0,
			text: [],
			X: [],
			y: [],
			trained: false
		});
		setTrained(false);
	};
	const handleLagsChanged = (event, newValue) => {
		if (typeof newValue === 'number') {
			resetLossData();
			setLags(parseInt(newValue, 10));
		}
	};

	const handleEpochsChanged = (event, newValue) => {
		if (typeof newValue === 'number') {
			resetLossData();
			setEpochs(parseInt(newValue, 10));
		}
	};
	const handleNextStep = () => {
		handlePredict();
		props.handleNext();
	};
	const onEpochEnd = (epoch, logs) => {
		let losses = { ...lossData };
		console.log(`Epoch: ${epoch + 1} Loss:${logs.loss}}`);

		losses.text.push(`Epoch: ${epoch + 1} | Loss: {${logs.loss}}`)
		losses.X.push(epoch);
		losses.y.push(logs.loss);
		losses.trained = trained;

		setLossData(losses);
	};

	const handleTrain = event => {
		const tsdata = props.tsdata;

		split_sequences(tsdata.y, lags).then(d => {
			const split_seq_X = d.seq_x;
			const split_seq_y = d.seq_y;
			setTrainStatus(true);

			train(
				lags,
				epochs,
				1,
				split_seq_X,
				split_seq_y,
				onEpochEnd
			).then(model => {
				console.log(`[UnivariateStepper.js] Done Training...`);
				setSplitSeqX(split_seq_X);
				setSplitSeqY(split_seq_y);
				setTrained(true);
				setModel(model);
				setTrainStatus(false);

			});
		});
	};

	const handlePredict = event => {

		predict(lags, 1, model, splitSeqX).then(predict => {
			// console.log(`Predictions: ${predict}`);
			const tsdata = [];
			tsdata.push(props.tsdata);
			tsdata.push({
				X: props.tsdata.X,
				y: predict.predictions,
				X_label: "test",
				y_label: "test2"
			});
			props.setPredictions(tsdata);
			props.setPredicted(true);
		});
	};

	let lgSize = 12;

	if (predicted && predictions.length) {
		lgSize = 6;
	}

	return (

		<Container>
			<Grid sx={{ mt: 2, boxShadow: 5, p: 3 }} container spacing={2} xs={12} width={1} >
				<Grid item lg={6} md={6} xs={12}>
					<Typography variant="caption" id="Select-Lags" gutterBottom>
						Select Lags
					</Typography>
					<Slider
						id="selectLags"
						valueLabelDisplay="on"
						aria-labelledby="Select-Lags"
						min={1}
						max={10}
						defaultValue={lags}
						onChange={handleLagsChanged}
					/>
				</Grid>
				<Grid item lg={6} md={6} xs={12}>

					<Typography id="Select-Epochs" variant="caption" gutterBottom>
						Select Epochs
					</Typography>
					<Slider
						id="selectEpochs"
						valueLabelDisplay="on"
						aria-labelledby="Select-Epochs"
						min={1}
						max={200}
						defaultValue={epochs}
						onChange={handleEpochsChanged}
					/>
				</Grid>

				<Box sx={{ mt: 2, float: "right" }}>
					{!trainStatus ? (
						<Button
							color="primary"
							onClick={handleTrain}
							variant="contained"
						>
							Train
						</Button>

					) : (
						<Button
							disabled
							color="primary"
							onClick={handleTrain}
							variant="contained"
						>
							Train
						</Button>
					)}

				</Box>

				<Grid item xs={12}>
					<Typography id="Epochs-Logs" variant="caption" gutterBottom>
						Epochs Log
					</Typography>
					<Grid sx={{ height: 250, maxHeight: 250, overflow: 'auto', boxShadow: 5 }}>
						<EpochLog data={lossData} />
					</Grid>
				</Grid>
				{predicted && predictions.length > 0 ? (
					<Grid item lg={12} md={12} xs={12}>
						<PredictionPlot datasets={predictions} plot={"prediction"} />
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

				{trained ? (
					<Button
						color="primary"
						onClick={handleNextStep}
						variant="contained"
					>
						Next
					</Button>
				) : (
					<Button
						disabled
						color="primary"
						onClick={handleNextStep}
						variant="contained"
					>
						Next
					</Button>
				)}
				{/* {loading && (
					<Box display={"flex"}>
						<CircularProgress />
					</Box>)
				} */}
			</Box>


		</Container>

	);
};

export default TrainContainer;
