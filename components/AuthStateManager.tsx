import { useState, useEffect } from 'react';
import { Persistor } from 'redux-persist'; // Make sure to import Persister
import { store, persistor } from '../redux/store'; // Import your store and persistor

const CustomPersistGate = ({ children }: { children: React.ReactNode }) => {
    const [rehydrated, setRehydrated] = useState(false);
  
    useEffect(() => {
      const unsubscribe = persistor.subscribe(() => {
        const { bootstrapped } = persistor.getState();
        if (bootstrapped && !rehydrated) {
          console.log('Rehydration completed, current state:', store.getState());
          setRehydrated(true);
        }
      });
      
      return () => unsubscribe();
    }, []);
  
    if (!rehydrated) {
      console.log('Waiting for rehydration...');
      return null; // or loading screen
    }
  
    return <>{children}</>;
};

export default CustomPersistGate;
