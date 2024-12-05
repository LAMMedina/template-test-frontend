import React, { useEffect } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';

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
        center: [-8246936.494308056, -1119428.8251098266], 
        zoom: 7,
        maxZoom: 50,
        minZoom: 5,
      }),
    });

    // Añadir la capa de departamentos
    const departamentosLayer = new VectorLayer({
      source: new VectorSource({
        url: '/data/output_departamentos.geojson',
        format: new GeoJSON(),
      }),
    });

    map.addLayer(departamentosLayer);

    return () => map.setTarget(null);
  }, []);

  return <div id="map" style={{ width: '100%', height: '100vh' }} />;
};

export default Viewer;
