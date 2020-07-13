import React, { useContext, useState } from 'react';
import { fetch } from '../../../utils/useSonos';
import { ClientContext } from '../../../utils/ClientContext';
import { withStyles } from '@material-ui/core/styles';
import {
	Checkbox,
	Dialog,
	DialogTitle,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	ListItemSecondaryAction,
	DialogContent,
	DialogActions,
	IconButton,
	Typography,
	CircularProgress,
	Button,
} from '@material-ui/core/';
import SyncIcon from '@material-ui/icons/Sync';
import SpeakerIcon from '@material-ui/icons/Speaker';

const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(5),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
	title: {
		marginLeft: theme.spacing(3),
	},
	loading: {
		marginLeft: theme.spacing(6),
	},
});

const CustomDialogTitle = withStyles(styles)((props) => {
	const { children, classes, onRefresh, ...other } = props;
	return (
		<DialogTitle disableTypography className={classes.root} {...other}>
			<Typography className={classes.title} variant='h6'>
				{children}
			</Typography>

			<IconButton
				aria-label='refresh'
				className={classes.closeButton}
				onClick={onRefresh}
			>
				<SyncIcon />
			</IconButton>
		</DialogTitle>
	);
});

const DeviceDialog = (props) => {
	const { onClose, open } = props;

	const [state, setState] = useContext(ClientContext);
	const [selected, setSelected] = useState(null);
	const loading = state.devices.length === 0;

	const handleChange = (deviceName) => {
		const deviceIndex = state.devices.findIndex(
			(device) => device.name === deviceName
		);
		state.devices[deviceIndex].selected = !state.devices[deviceIndex].selected;
		setSelected({ ...state });
	};
	const handleOnClose = () => {
		if (selected !== null) {
			setState({ ...selected });
		}
		onClose();
	};

	const refreshDeviceList = () => {
		setState({
			devices: [],
			playing: false,
		});
		fetch();
	};

	return (
		<Dialog
			onClose={handleOnClose}
			maxWidth='xs'
			fullWidth
			aria-labelledby='simple-dialog-title'
			open={open}
		>
			<CustomDialogTitle onRefresh={refreshDeviceList} id='simple-dialog-title'>
				Select Devices
			</CustomDialogTitle>
			<DialogContent>
				<List>
					{loading ? (
						<CircularProgress
							style={{ marginLeft: '180px' }}
							color='secondary'
						/>
					) : (
						state.devices.map((device) => (
							<ListItem
								button
								onClick={() => handleChange(device.name)}
								key={device.name}
							>
								<ListItemIcon>
									<SpeakerIcon />
								</ListItemIcon>
								<ListItemText
									id='switch-list-label-wifi'
									primary={device.name}
								/>
								<ListItemSecondaryAction>
									<Checkbox
										checked={device.selected}
										name={device.name}
										onClick={() => handleChange(device.name)}
									/>
								</ListItemSecondaryAction>
							</ListItem>
						))
					)}
				</List>
				<DialogActions>
					<Button onClick={handleOnClose} color='primary' autoFocus>
						SAVE
					</Button>
				</DialogActions>
			</DialogContent>
		</Dialog>
	);
};

export default DeviceDialog;
