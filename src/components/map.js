import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';
import { Protocol } from 'pmtiles';
import layers from 'protomaps-themes-base';

export default function Map(){
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(-122.268);
  const [lat] = useState(37.805);
  const [zoom] = useState(14);

  useEffect(() => {
    if (map.current) return;

    // aim is to invoke only once
    let protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);

    const basePmUrl = process.env.NODE_ENV === 'development' ? 'http://10.243.111.227:8080/public' : 'https://kuanbutts.com/pm-maps-oak';
    
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        glyphs:'https://cdn.protomaps.com/fonts/pbf/{fontstack}/{range}.pbf',
        sources: {
          protomaps: {
                type: 'vector',
                url: `pmtiles://${basePmUrl}/oakland.pmtiles`,
                attribution: '<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>'
            }
        },
        layers: layers('protomaps', 'light')
      },
      center: [lng, lat],
      zoom: zoom,
      maxBounds: [[-122.36159, 37.71505], [-122.12976, 37.88092]]
    });
  });

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}