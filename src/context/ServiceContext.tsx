'use client';

import { createContext, useState, useContext, Dispatch, SetStateAction, ReactNode } from 'react';

// Context để chứa giá trị state.
// Các component chỉ cần đọc state sẽ sử dụng context này.
const ActiveServiceStateContext = createContext<string>('');

// Context để chứa hàm dispatch (cập nhật state).
// Các component chỉ cần cập nhật state sẽ sử dụng context này.
const ActiveServiceDispatchContext = createContext<Dispatch<SetStateAction<string>>>(() => {});

/**
 * Custom hook để chỉ sử dụng giá trị state (`activeService`).
 * Các component dùng hook này sẽ re-render khi `activeService` thay đổi.
 */
export const useActiveServiceState = () => useContext(ActiveServiceStateContext);

/**
 * Custom hook để chỉ sử dụng hàm dispatch (`setActiveService`).
 * Các component dùng hook này sẽ KHÔNG re-render khi `activeService` thay đổi,
 * giúp cải thiện hiệu suất.
 */
export const useActiveServiceDispatch = () => useContext(ActiveServiceDispatchContext);

export const ServiceProvider = ({ children }: { children: ReactNode }) => {
  const [activeService, setActiveService] = useState('');
  return (
    <ActiveServiceStateContext.Provider value={activeService}>
      <ActiveServiceDispatchContext.Provider value={setActiveService}>
        {children}
      </ActiveServiceDispatchContext.Provider>
    </ActiveServiceStateContext.Provider>
  );
};