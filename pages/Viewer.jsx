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

    // Añadir las capas de provincias y distritos
    const provinciasLayer = new VectorLayer({
        source: new VectorSource({
          url: '/data/output_provincias.geojson',
          format: new GeoJSON(),
        }),
        visible: false,
      });
      
      const distritosLayer = new VectorLayer({
        source: new VectorSource({
          url: '/data/output_distritos.geojson',
          format: new GeoJSON(),
        }),
        visible: false,
      });
      
      map.addLayer(provinciasLayer);
      map.addLayer(distritosLayer);
    
      const view = map.getView();
    
      view.on('change:resolution', () => {
        const zoom = view.getZoom();
        departamentosLayer.setVisible(zoom < 9);
        provinciasLayer.setVisible(zoom >= 9 && zoom < 11);
        distritosLayer.setVisible(zoom >= 11);
      });

    return () => map.setTarget(null);
  }, []);

  return <div id="map" style={{ width: '100%', height: '100vh' }} />;
};

export default Viewer;
