import React, { useEffect, useState } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Cluster from 'ol/source/Cluster';
import {Style, Icon, Text, Fill, Stroke, Circle} from 'ol/style';
import {fromLonLat} from 'ol/proj';
import ModalInfo from '../components/ModalInfo';





const Viewer = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

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
      

    // Crear la capa de clúster para las instituciones educativas
    const institutionSource = new VectorSource({
        url: '/data/output_instituciones_educ.geojson', // Cargar el GeoJSON de instituciones educativas
        format: new GeoJSON(),
      });
  
      const clusterSource = new Cluster({
        distance: 40, // Distancia mínima para agrupar los puntos
        minDistance: 20, // Distancia mínima para mostrar los puntos individuales
        source: institutionSource, // Fuente de datos del GeoJSON
      });
  
      // Capa de clúster con estilo personalizado
      const clusterLayer = new VectorLayer({
        source: clusterSource,
        
        style: (feature) => {
            const size = feature.get('features').length; // Tamaño del clúster
            return new Style({
              image: new Circle({
                radius: 10, // Tamaño del círculo
                fill: new Fill({ color: '#3388ff' }), // Color de fondo
                stroke: new Stroke({
                  color: '#fff', // Color del borde
                  width: 2, // Grosor del borde
                }),
              }),
              text: new Text({
                text: size.toString(), // Número de puntos en el clúster
                font: '12px sans-serif',
                fill: new Fill({ color: '#fff' }), // Color del texto
              }),
          });
        },
      });
  

      // Añadir la capa de clúster al mapa
      map.addLayer(clusterLayer);


      // Añadir las capas de provincias y distritos al mapa
      map.addLayer(provinciasLayer);
      map.addLayer(distritosLayer);
    
      //Control de visibilidad de las capas
      const view = map.getView();
      view.on('change:resolution', () => {
        const zoom = view.getZoom();

        
        departamentosLayer.setVisible(zoom < 9);
        provinciasLayer.setVisible(zoom >= 9 && zoom < 11);
        distritosLayer.setVisible(zoom >= 11);
      });

       // Manejar el clic en los marcadores para mostrar el modal
       const handleMapClick = (event) => {
        map.forEachFeatureAtPixel(event.pixel, (feature) => {
          // Verifica si la característica es un clúster
          if (feature.get('features')) {
            const features = feature.get('features'); // Las características agrupadas
            const properties = features[0].getProperties(); // Toma las propiedades de la primera institución educativa del clúster
            setModalData(properties); // Establecer los datos para el modal
            setModalOpen(true); // Abrir el modal
          }
        });
      };
      
      map.on('click', handleMapClick); // Asociar el clic al mapa

    return () => map.setTarget(null);
  }, []);

    return (
        <>  
        <div id="map" style={{ width: '100%', height: '100vh' }} />
        <ModalInfo open={modalOpen} handleClose={() => setModalOpen(false)} data={modalData} />
        </>
    );
};

export default Viewer;
