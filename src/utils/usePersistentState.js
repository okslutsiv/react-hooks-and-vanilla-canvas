import { useEffect, useState } from "react";

const usePersistentState = () => {
  const [locations, setLocations] = useState(
    JSON.parse(localStorage.getItem("draw-app")) || [],
  );
  useEffect(() => {
    localStorage.setItem("draw-app", JSON.stringify(locations));
  }, [locations]);

  return [locations, setLocations];
};
export default usePersistentState;
