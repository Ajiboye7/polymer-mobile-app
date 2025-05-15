export const generateRandomPinSuggestion = (): string => {
    const digits = '0123456789'.split('');
    let pin = '';
    
    // Ensure no repeating digits
    while (pin.length < 4) {
      const randomDigit = digits[Math.floor(Math.random() * digits.length)];
      if (!pin.includes(randomDigit)) {
        pin += randomDigit;
      }
    }
    
    return pin;
  };