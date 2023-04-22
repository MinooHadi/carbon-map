import { useEffect, useRef, useState } from "react";
import MapContext from "./components/shared/map/MapContext";
import GateWay from "./routes/index";
import * as ol from "ol";
import "./App.css";

function App() {
  const [map, setMap] = useState(null);

  // on component mount
  useEffect(() => {
    const mapObject = new ol.Map({
      layers: [],
      controls: [],
      overlays: [],
    });
    setMap(mapObject);
    return () => mapObject.setTarget(undefined);
  }, []);

  return (
    <MapContext.Provider value={{ map }}>
      <GateWay />
    </MapContext.Provider>
  );
}

export default App;
