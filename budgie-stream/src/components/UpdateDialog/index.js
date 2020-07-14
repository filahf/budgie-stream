import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

const UpdateDialog = () => {
	const [open, setOpen] = useState(true);
	const [readyForUpdate, setReadyForUpdate] = useState(false);

	const handleClose = () => {
		setOpen(false);
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
				open={open}
				autoHideDuration={10000}
				onClose={handleClose}
				message={readyForUpdate ? restartMsg : downloadMsg}
				action={
					<>
						{readyForUpdate ? (
							<>
								<Button color='secondary' size='small' onClick={handleClose}>
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
