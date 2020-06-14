import React, { useState, useEffect } from 'react';
import SonosCard from './componets/SonosCard';

const dummyData = [
  { name: 'Sonos 1', ip: '192.168.0.1', selected: false },
  { name: 'Sonos 2', ip: '192.168.0.2', selected: false },
  { name: 'Sonos 3', ip: '192.168.0.3', selected: false },
  { name: 'Sonos 4', ip: '192.168.0.4', selected: false },
];

const SonosMain = () => {
  const [state, setState] = useState(dummyData);

  const handleOnClick = (deviceIp) => {
    const newState = state;
    const deviceIndex = state.findIndex((device) => device.ip === deviceIp);
    newState[deviceIndex].selected = !state[deviceIndex].selected;
    setState([...state]);
  };
  useEffect(() => {}, [state]);

  return (
    <>
      {state.map((x) => (
        <SonosCard key={x.ip} devices={x} onClick={handleOnClick} />
      ))}
    </>
  );
};

export default SonosMain;
