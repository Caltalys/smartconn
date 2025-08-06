'use client';

import { createContext, useState, useContext, Dispatch, SetStateAction } from 'react';

interface ServiceContextType {
  activeService: string;
  setActiveService: Dispatch<SetStateAction<string>>;
}

const ServiceContext = createContext<ServiceContextType>({
  activeService: '',
  setActiveService: () => {},
});

export const useServiceContext = () => useContext(ServiceContext);

export const ServiceProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeService, setActiveService] = useState('');
  return <ServiceContext.Provider value={{ activeService, setActiveService }}>{children}</ServiceContext.Provider>;
};