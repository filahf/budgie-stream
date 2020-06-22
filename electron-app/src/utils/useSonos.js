import { useContext } from 'react';
import { ClientContext } from './ClientContext';

const useSonos = () => {
  const [state, setState] = useContext(ClientContext);

  function togglePlay() {
    setState((state) => ({ ...state, isPlaying: !state.isPlaying }));
  }

  return {
    togglePlay,
  };
};

export default useSonos;
