import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the type for the context value
interface ProfileContextType {
  isBusinessMode: boolean;
  setIsBusinessMode: (mode: boolean) => void;
}

// Create the context with an initial undefined value to avoid direct initialization issues
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// Define the props for the provider component
interface ProfileProviderProps {
  children: ReactNode;
}

// Create the provider with proper typing
export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const [isBusinessMode, setIsBusinessMode] = useState(false);

  return (
    <ProfileContext.Provider value={{ isBusinessMode, setIsBusinessMode }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Custom hook with error handling
export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
