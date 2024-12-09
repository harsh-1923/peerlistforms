"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { toast } from "sonner";

interface AppContextType {
  currentFormUID: string | null;
  setUID: (uid: string | null) => void;
  savedForms: string[];
  setSavedForms: (uids: string[]) => void;
}

const defaultAppContextValue: AppContextType = {
  currentFormUID: null,
  setUID: () => {},
  savedForms: [],
  setSavedForms: () => {},
};

const AppContext = createContext<AppContextType>(defaultAppContextValue);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentFormUID, setUID] = useState<string | null>(null);
  const [savedForms, setSavedForms] = useState<string[]>([]);

  useEffect(() => {
    const indexStr =
      typeof window !== "undefined" ? localStorage.getItem("formIndex") : null;
    if (indexStr) {
      try {
        const formUids: string[] = JSON.parse(indexStr);
        setSavedForms(formUids);
      } catch (error) {
        toast.error("Failed to initialise forms.");
      }
    }
  }, []);

  const value: AppContextType = {
    currentFormUID,
    setUID,
    savedForms,
    setSavedForms,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  return useContext(AppContext);
};
