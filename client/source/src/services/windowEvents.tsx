import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

type WindowEventsContext = {
  resize: number;
};

const windowEventsContext = createContext<WindowEventsContext | undefined>(undefined);

const useWindowEvents = (): WindowEventsContext => {
  const context = useContext(windowEventsContext);

  if (context === undefined) {
    throw new Error('useWindowEvents must be used with a WindowEvents provider');
  }

  return context;
};

const WindowEventsProvider: React.FC = (props) => {
  const { children } = props;

  const [resize, setResize] = useState<number>(1);

  const onWindowResize = useCallback(() => setResize((previousValue) => previousValue + 1), []);

  useEffect(() => {
    if (onWindowResize) {
      window.addEventListener('resize', onWindowResize, false);
      return () => window.removeEventListener('resize', onWindowResize);
    }
  });

  const value: WindowEventsContext = {
    resize,
  };

  return <windowEventsContext.Provider value={value}>{children}</windowEventsContext.Provider>;
};

export { useWindowEvents, WindowEventsProvider };
