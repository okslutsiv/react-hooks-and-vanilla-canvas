import { useEffect, useState, useRef } from "react";

const usePersistentCanvas = () => {
  const canvasRef = useRef(null);
  const parentRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const parent = parentRef.current;
    setDimensions({ width: parent.offsetWidth, height: parent.offsetHeight });
    function handleWindowResize() {
      console.log(parent.offsetWidth);
      setDimensions({ width: parent.offsetWidth, height: parent.offsetHeight });
    }
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return { canvasRef, parentRef, dimensions };
};

export default usePersistentCanvas;
