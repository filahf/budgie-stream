import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SonosCard from './componets/SonosCard';
const { ipcRenderer } = window.require('electron');

const dummyData = [
  { name: 'Sonos 1', ip: '192.168.0.1', selected: false },
  { name: 'Sonos 2', ip: '192.168.0.2', selected: false },
  { name: 'Sonos 3', ip: '192.168.0.3', selected: false },
  { name: 'Sonos 4', ip: '192.168.0.4', selected: false },
];

const SonosMain = () => {
  const [state, setState] = useState(dummyData);

  const fetchDevices = () => {
    ipcRenderer.send('fetchDevices', null);
    ipcRenderer.on('devices', (event, arg) => {
      console.log(arg);
    });
  };

  const handleOnClick = (deviceIp) => {
    const deviceIndex = state.findIndex((device) => device.ip === deviceIp);
    state[deviceIndex].selected = !state[deviceIndex].selected;
    setState([...state]);
  };

  // const selectedDevices = () => {
  //   const result = state.filter((device) => device.selected === true);
  //   console.log('Selected devices', result);
  // };

  useEffect(() => {}, [state]);

  return (
    <CardsWrapper>
      {state.map((x) => (
        <SonosCard key={x.ip} devices={x} onClick={handleOnClick} />
      ))}
    </CardsWrapper>
  );
};

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export default SonosMain;
