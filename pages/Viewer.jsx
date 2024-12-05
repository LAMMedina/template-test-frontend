import React, { useEffect } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

const Viewer = () => {
  useEffect(() => {
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [-8341494.78, -1780719.66], // Coordenadas de Perú en EPSG:3857
        zoom: 6,
      }),
    });

    return () => map.setTarget(null);
  }, []);

  return <div id="map" style={{ width: '100%', height: '100vh' }} />;
};

export default Viewer;
