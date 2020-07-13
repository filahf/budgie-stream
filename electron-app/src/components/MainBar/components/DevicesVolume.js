import { List, ListItem, ListItemText, Slider } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(() => ({
	root: {
		width: '100%',
		maxWidth: '36ch',
		backgroundColor: '#2e3440',
		'& .MuiListItem-root': {
			paddingBottom: '0px',
			paddingTop: '0px',
		},
	},
	slider: {
		color: '#d8dee9',
	},
	typo: {
		color: '#d8dee9',
	},
}));

const DevicesVolume = (props) => {
	const classes = useStyles();
	const devices = props.devices;

	return (
		<List className={classes.root}>
			{devices.map((device, index) => (
				<ListItem key={device.name} alignItems='flex-start'>
					<ListItemText
						className={classes.typo}
						primary={device.name}
						secondary={
							<>
								<Slider
									value={devices[index].vol}
									onChange={(event, value) =>
										props.handleChange(device.name, value)
									}
									className={classes.slider}
								/>
							</>
						}
					/>
				</ListItem>
			))}
		</List>
	);
};

export default DevicesVolume;
