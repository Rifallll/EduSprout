"use client";

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default icon issue with Leaflet and Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface MapDisplayProps {
  address: string;
  apiKey: string;
}

const MapDisplay: React.FC<MapDisplayProps> = ({ address, apiKey }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${apiKey}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        if (result.features && result.features.length > 0) {
          const location = result.features[0].properties;
          setPosition([location.lat, location.lon]);
        } else {
          setError("Lokasi tidak ditemukan untuk alamat yang diberikan.");
        }
      } catch (err) {
        console.error("Error fetching coordinates:", err);
        setError("Gagal mengambil koordinat. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, [address, apiKey]);

  if (loading) {
    return <div className="flex items-center justify-center h-64 bg-muted rounded-lg text-muted-foreground">Memuat peta...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-64 bg-red-100 text-red-700 rounded-lg border border-red-300">{error}</div>;
  }

  if (!position) {
    return <div className="flex items-center justify-center h-64 bg-muted rounded-lg text-muted-foreground">Peta tidak tersedia.</div>;
  }

  return (
    <MapContainer center={position} zoom={15} scrollWheelZoom={false} className="h-96 w-full rounded-lg shadow-md">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          {address}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapDisplay;