import React, { useContext, useEffect } from "react";
import MapContext from "../map/MapContext";
import { FullScreen } from "ol/control";

function FullScreenControl() {
  const { map } = useContext(MapContext);
  useEffect(() => {
    if (!map) return;
    let fullScreenControl = new FullScreen({});
    map.controls.push(fullScreenControl);

    return () => map.controls.remove(fullScreenControl);
  }, [map]);
  return null;
}

export default FullScreenControl;
