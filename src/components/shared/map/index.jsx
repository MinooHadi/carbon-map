import React, { useContext, useEffect, useRef, useState } from "react";
import MapContext from "./MapContext";
import * as ol from "ol";

function Map({ children, zoom, center, className }) {
  const { map } = useContext(MapContext);
  const mapRef = useRef();

  // on component mount
  useEffect(() => {
    console.log(map);
    if (!map) return;
    map.setView(new ol.View({ zoom, center }));
    
    // map.setProperties({ options });
    map.setTarget(mapRef.current);
  }, [map]);

  // zoom change handler
  useEffect(() => {
    if (!map) return;
    map.getView().setZoom(zoom);
  }, [zoom]);

  // center change handler
  useEffect(() => {
    if (!map) return;
    map.getView().setCenter(center);
  }, [center]);

  return (
    <div ref={mapRef} className={className}>
      {children}
    </div>
  );
}

export default Map;
