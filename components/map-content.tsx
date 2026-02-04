"use client";

import { useEffect, useState } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  GeoJSON as LeafletGeoJSON,
  useMap,
} from "react-leaflet";
import { GeoJSONCollection } from "@/lib/geojson-data";

interface MapContentProps {
  geoJsonData: GeoJSONCollection;
  onSelectFeature: (id: string) => void;
}

function GeoJSONLayer({
  data,
  onSelectFeature,
}: {
  data: GeoJSONCollection;
  onSelectFeature: (id: string) => void;
}) {
  const geoJsonRef: any = React.useRef(null);
  const map = useMap();

  useEffect(() => {
    if (geoJsonRef.current) {
      map.removeLayer(geoJsonRef.current);
    }

    const geoJsonLayer = L.geoJSON(data as any, {
      style: (feature: any) => {
        const status = feature?.properties?.status;
        return {
          fillColor: status === "Available" ? "#10b981" : "#ef4444",
          weight: 2,
          opacity: 1,
          color: "#ffffff",
          dashArray: "3",
          fillOpacity: 0.7,
        };
      },
      onEachFeature: (feature: any, layer) => {
        const props = feature.properties;
        const popupContent = `
          <div style="font-family: sans-serif; width: 200px;">
            <strong style="color: #065f46; font-size: 16px;">${props.id}</strong><br/>
            <hr style="margin: 8px 0; border: none; border-top: 1px solid #e5e7eb;"/>
            <div style="font-size: 13px; color: #374151; space-y: 6px;">
              <p><strong>Zona:</strong> ${props.zone}</p>
              <p><strong>Kayu:</strong> ${props.woodType}</p>
              <p><strong>Volume:</strong> ${props.volume} m³</p>
              <p><strong>Batang:</strong> ${props.logCount}</p>
              <p><strong>Grade:</strong> ${props.grade}</p>
              <p><strong>Status:</strong> <span style="color: ${
          props.status === "Available" ? "#059669" : "#dc2626"
        }; font-weight: bold;">${props.status}</span></p>
            </div>
          </div>
        `;

        const popup = L.popup({ maxWidth: 250 }).setContent(popupContent);
        layer.bindPopup(popup);

        layer.on("click", () => {
          onSelectFeature(props.id);
        });
      },
    });

    geoJsonRef.current = geoJsonLayer;
    geoJsonLayer.addTo(map);

    // Fit bounds to GeoJSON
    try {
      const bounds = geoJsonLayer.getBounds();
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    } catch (e) {
      // Fallback center if bounds fail
      map.setView([-7.13, 110.43], 15);
    }

    return () => {
      if (geoJsonRef.current) {
        map.removeLayer(geoJsonRef.current);
      }
    };
  }, [data, map, onSelectFeature]);

  return null;
}

export default function MapContent({
  geoJsonData,
  onSelectFeature,
}: MapContentProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-slate-100">
        <div className="text-slate-600">Memuat peta...</div>
      </div>
    );
  }

  return (
    <MapContainer
      center={[-7.13, 110.43]}
      zoom={15}
      style={{ width: "100%", height: "100vh" }}
      className="z-0"
    >
      {/* Satellite Base Layer - Esri World Imagery */}
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
        maxZoom={19}
      />

      {/* GeoJSON Data Layer */}
      <GeoJSONLayer data={geoJsonData} onSelectFeature={onSelectFeature} />
    </MapContainer>
  );
}

// Fix for leaflet default icon
import React from "react";
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});
