import React, { useContext } from 'react';
import { ClientContext } from '../../utils/ClientContext';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
const { ipcRenderer } = window.require('electron');

const UpdateDialog = () => {
	const { updateStatus } = useContext(ClientContext);
	const [update, setUpdate] = updateStatus;

	const handleClose = (e) => {
		e.preventDefault();
		setUpdate((prevState) => ({ ...prevState, updateDialog: false }));
	};

	const handleRestart = (e) => {
		e.preventDefault();
		ipcRenderer.send('restart_app');
	};

	const downloadMsg = (
		<p>
			A new update is available. <br /> Downloading now...
		</p>
	);
	const restartMsg = (
		<p>
			Update downloaded. It will be installed on restart. <br /> Restart now?
		</p>
	);

	return (
		<div>
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				open={update.updateDialog}
				onClose={handleClose}
				message={update.rdyForUpdate ? restartMsg : downloadMsg}
				action={
					<>
						{update.rdyForUpdate ? (
							<>
								<Button color='secondary' size='small' onClick={handleRestart}>
									Yes
								</Button>{' '}
								<Button color='secondary' size='small' onClick={handleClose}>
									No
								</Button>{' '}
							</>
						) : (
							<Button color='secondary' size='small' onClick={handleClose}>
								Close
							</Button>
						)}
					</>
				}
			/>
		</div>
	);
};

export default UpdateDialog;
