import React from "react";
import { useRef } from "react";

const Error = function ({ erro }) {
  const ref1 = useRef();

  React.useEffect(() => {
    ref1.current.innerHTML = erro;
  }, [erro]);

  return <div ref={ref1}>{erro}</div>;
};

export default Error;
