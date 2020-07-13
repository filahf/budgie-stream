import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	AppBar,
	Button,
	Dialog,
	IconButton,
	List,
	Divider,
	ListItem,
	ListItemText,
	ListSubheader,
	TextField,
	MenuItem,
	Select,
	InputLabel,
	FormControl,
	Toolbar,
	Typography,
} from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Store from '../../utils/userConfig';

const { ipcRenderer } = window.require('electron');

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: 'relative',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
	textField: {
		width: '20ch',
	},
	formControl: {
		minWidth: '20ch',
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const SettingsDialog = (props) => {
	const { close } = props;
	const classes = useStyles();
	const [ip, setIp] = useState('');
	const [appVersion, setAppVersion] = useState(null);
	const [sampleRate, setSampleRate] = useState(Store.get('samplerate'));

	const handleSampleChange = (e) => {
		setSampleRate(e.target.value);
	};

	const handleOnClose = () => {
		Store.set('samplerate', sampleRate);
		close();
	};

	const fetchInfo = () => {
		ipcRenderer.send('appInfo', null);
		ipcRenderer.on('appInfo', (event, arg) => {
			ipcRenderer.removeAllListeners('appInfo');
			const { appVersion, ip } = arg;
			setAppVersion(appVersion);
			setIp(ip);
		});
	};

	useEffect(() => {
		fetchInfo();
	}, []);

	return (
		<Dialog
			fullScreen
			open={props.open}
			onClose={close}
			TransitionComponent={Transition}
		>
			<AppBar className={classes.appBar}>
				<Toolbar>
					<IconButton
						edge='start'
						color='inherit'
						onClick={close}
						aria-label='close'
					>
						<CloseIcon />
					</IconButton>
					<Typography variant='h6' className={classes.title}>
						SETTINGS
					</Typography>
					<Button autoFocus color='inherit' onClick={handleOnClose}>
						SAVE
					</Button>
				</Toolbar>
			</AppBar>

			<List>
				<ListSubheader>App Info</ListSubheader>
				<ListItem>
					<ListItemText primary='Budgie Version' secondary={appVersion} />
				</ListItem>
				<ListItem>
					<ListItemText primary='Local IP' secondary={ip} />
				</ListItem>
				<Divider />
				<ListSubheader>Settings</ListSubheader>
				<ListItem>
					<TextField
						label='Sample Rate (hz)'
						type='number'
						className={classes.textField}
						value={sampleRate || 48000}
						onChange={handleSampleChange}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</ListItem>
				<ListItem>
					<FormControl className={classes.formControl}>
						<InputLabel>Source</InputLabel>
						<Select>
							<MenuItem>Source 1</MenuItem>
							<MenuItem>Source 2</MenuItem>
						</Select>
					</FormControl>
				</ListItem>
			</List>
		</Dialog>
	);
};

SettingsDialog.propTypes = {
	close: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
};

export default SettingsDialog;
