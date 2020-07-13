import React, { useState } from 'react';
import { Grid, IconButton, Tooltip } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import LocalCafeOutlinedIcon from '@material-ui/icons/LocalCafeOutlined';
import SettingsDialog from './SettingsDialog';
import BmcDialog from './BmcDialog';

const Header = (props) => {
	const [showSettings, setShowSettings] = useState(false);
	const [showBmc, setShowBmc] = useState(false);

	return (
		<>
			<Grid
				container
				direction='row'
				style={{ padding: '1rem' }}
				justify='space-between'
				alignItems='center'
			>
				<Grid item>
					<Tooltip title='Support this project' aria-label='add'>
						<IconButton
							size='small'
							aria-label='coffe'
							onClick={(e) => setShowBmc(true)}
						>
							<LocalCafeOutlinedIcon />
						</IconButton>
					</Tooltip>
				</Grid>
				<Grid item>
					<Tooltip title='Settings'>
						<IconButton
							onClick={(e) => setShowSettings(true)}
							aria-label='settings'
						>
							<SettingsIcon />
						</IconButton>
					</Tooltip>
				</Grid>
			</Grid>
			<SettingsDialog
				close={(e) => setShowSettings(false)}
				open={showSettings}
			/>
			<BmcDialog close={(e) => setShowBmc(false)} open={showBmc} />
		</>
	);
};

export default Header;
