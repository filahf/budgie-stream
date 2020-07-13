import React, { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetch } from './useSonos';
const { ipcRenderer } = window.require('electron');

const ClientContext = createContext([{}, () => {}]);

const ClientProvider = (props) => {
	const fetchDevices = () => {
		var groups = [];
		fetch();
		ipcRenderer.on('devices', (event, arg) => {
			groups = JSON.parse(arg);
			groups.forEach((element) => {
				if (element.Name !== 'BRIDGE') {
					setState((prevState) => ({
						...prevState,
						devices: [
							...prevState.devices,
							{ name: element.Name, selected: false, vol: 30 },
						],
					}));
				}
			});
		});
	};

	const [state, setState] = useState({
		devices: [
			{ name: 'Device1', selected: false, vol: 30 },
			{ name: 'Device2', selected: false, vol: 30 },
		],
		playing: false,
	});

	useEffect(() => {
		fetchDevices();
	}, []);

	return (
		<ClientContext.Provider value={[state, setState]}>
			{props.children}
		</ClientContext.Provider>
	);
};

ClientProvider.propTypes = {
	children: PropTypes.element,
};

export { ClientContext, ClientProvider };
