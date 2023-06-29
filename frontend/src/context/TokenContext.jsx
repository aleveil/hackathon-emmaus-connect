import React, { createContext, useState, useContext, useMemo } from "react";
import PropTypes from "prop-types";

const TokenContext = createContext(null);

export function useToken() {
  return useContext(TokenContext);
}

export default function TokenProvider({ children }) {
  const [token, setToken] = useState("");

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  return (
    <TokenContext.Provider value={contextValue}>
      {children}
    </TokenContext.Provider>
  );
}

TokenProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
