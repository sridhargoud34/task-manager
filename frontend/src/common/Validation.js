
export const validateRegistration = (email, password, confirmPassword) => {
    const errors = {};
  
    if (!email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid.";
    }
  
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }
  
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
  
    return errors;
  };
export const validateLogin = (email, password) => {
    const errors = {};
  
    if (!email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid.";
    }
  
    if (!password) {
      errors.password = "Password is required.";
    }
  
    return errors;
  };
  
  