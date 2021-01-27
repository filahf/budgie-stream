import React, { useContext, useEffect, useState } from "react";
import { Badge, Tooltip } from "@material-ui/core";
import SpeakerIcon from "@material-ui/icons/Speaker";
import { ClientContext } from "../../../utils/ClientContext";

const DevicesBadge = () => {
  const { playback } = useContext(ClientContext);
  const [state] = playback;
  const [nbrDevices, setNbrDevices] = useState("0");
  // eslint-disable-next-line
  const getNbrOfDevices = () => {
    const count = state.devices.filter((device) => device.selected === true)
      .length;
    setNbrDevices(count);
  };

  useEffect(() => {
    getNbrOfDevices();
  }, [state.devices, getNbrOfDevices]);

  return (
    <>
      <Tooltip title="Devices/Groups Selected" aria-label="Devices">
        <Badge color="secondary" badgeContent={nbrDevices}>
          <SpeakerIcon />
        </Badge>
      </Tooltip>
    </>
  );
};

export default DevicesBadge;
