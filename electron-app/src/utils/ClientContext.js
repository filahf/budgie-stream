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
        setState((prevState) => ({
          ...prevState,
          devices: [
            ...prevState.devices,
            { name: element.Name, selected: false, vol: 30 },
          ],
        }));
      });
    });
  };

  const [state, setState] = useState({
    devices: [
      { name: 'Kitchen', selected: false, vol: 25 },
      { name: 'Living Room', selected: false, vol: 30 },
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

export { ClientContext, ClientProvider };
