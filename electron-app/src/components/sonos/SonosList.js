import React, { useState, useMemo } from 'react';
import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardBody,
} from './componets/Card';

const dummyData = {
  devices: [
    { name: 'Sonos 1', ip: '192.168.0.1', selected: false },
    { name: 'Sonos 2', ip: '192.168.0.2', selected: false },
    { name: 'Sonos 3', ip: '192.168.0.3', selected: false },
    { name: 'Sonos 4', ip: '192.168.0.4', selected: false },
  ],
};

const SonosList = () => {
  const [state, setState] = useState(dummyData);

  const toggleSelection = (deviceIp) => {
    const deviceIndex = state.devices.findIndex(
      (device) => device.ip === deviceIp
    );
    state.devices[deviceIndex].selected = !state.devices[deviceIndex].selected;
    //setState(state);
    console.log(state);
  };
  const deviceList = useMemo(() => {
    return state.devices.map((x) => (
      <CardWrapper primary={x.selected} onClick={() => toggleSelection(x.ip)}>
        <CardHeader>
          <CardHeading>{x.name}</CardHeading>
        </CardHeader>
        <CardBody></CardBody>
      </CardWrapper>
    ));
  }, [state, toggleSelection]);

  return <>{deviceList}</>;
};

export default SonosList;
