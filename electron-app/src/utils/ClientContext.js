import React, { useState, createContext } from 'react';

const ClientContext = createContext([{}, () => {}]);

const ClientProvider = (props) => {
  const [state, setState] = useState({
    devices: [
      { name: 'Bedroom', ip: '192.168.0.1', selected: false },
      { name: 'Kitchen', ip: '192.168.0.2', selected: false },
      { name: 'Living Room', ip: '192.168.0.3', selected: false },
    ],
  });
  return (
    <ClientContext.Provider value={[state, setState]}>
      {props.children}
    </ClientContext.Provider>
  );
};

export { ClientContext, ClientProvider };
