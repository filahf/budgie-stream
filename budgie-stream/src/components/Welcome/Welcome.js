import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import BudgieLogo from '../../assets/budgieLogo';
import UpdateDialog from '../UpdateDialog';

const useStyles = makeStyles(() => ({
	container: {
		flex: '1',
		marginTop: '0',
		paddingLeft: '4rem',
		paddingBottom: '1rem',
	},
}));

const Welcome = (props) => {
	const classes = useStyles();
	return (
		<>
			<Grid
				container
				className={classes.container}
				direction='row'
				justify='flex-start'
				alignItems='center'
				spacing={0}
			>
				<Grid item style={{ marginTop: '2rem' }}>
					<Typography color='primary' variant='h4' component='h1'>
						Budgie Stream
					</Typography>
					<Typography
						color='primary'
						variant='body1'
						component='h2'
						gutterBottom
					>
						{'Stream What You Hear to Sonos'}
					</Typography>
				</Grid>
				<Grid item xs={5}>
					<BudgieLogo />
				</Grid>
			</Grid>
			<Grid container direction='column' justify='center' alignItems='center'>
				{props.children}
			</Grid>
			<UpdateDialog />
		</>
	);
};

Welcome.propTypes = {
	children: PropTypes.element,
};

export default Welcome;
