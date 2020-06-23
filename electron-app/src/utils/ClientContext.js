import React, { useState, createContext, useEffect } from 'react';
const { ipcRenderer } = window.require('electron');

const ClientContext = createContext([{}, () => {}]);

const ClientProvider = (props) => {
  const fetchDevices = () => {
    var groups = [];
    ipcRenderer.send('fetchDevices', null);
    ipcRenderer.on('devices', (event, arg) => {
      groups = JSON.parse(arg);
      groups.forEach((element) => {
        setState({
          devices: [...state.devices, { name: element.Name, selected: false }],
        });
      });
    });
  };
  const [state, setState] = useState({
    devices: [
      { name: 'Kitchen', selected: false },
      { name: 'Living Room', selected: false },
    ],
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

export { ClientContext, ClientProvider };
