"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useApp } from "@/context/app-context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EditModal } from "@/components/edit-modal";
import { MapPin, Info } from "lucide-react";

interface MapInventoryProps {
  onEditBlock: (id: string) => void;
}

// Dynamically import the map component to avoid SSR issues
const MapContent = dynamic(() => import("@/components/map-content"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center bg-slate-100">
      <div className="text-slate-600">Memuat peta...</div>
    </div>
  ),
});

export function MapInventory({ onEditBlock }: MapInventoryProps) {
  const { geoJsonData } = useApp();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<any>(null);

  const handleSelectFeature = (id: string) => {
    setEditingId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  return (
    <div className="relative w-full h-screen">
      {/* Map Container */}
      <MapContent
        geoJsonData={geoJsonData}
        onSelectFeature={handleSelectFeature}
      />

      {/* Legend - Fixed at bottom left */}
      <Card className="absolute bottom-6 left-6 bg-white/95 backdrop-blur p-4 shadow-lg z-10">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-emerald-950">Legend</p>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-slate-700">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-slate-700">Sold</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Info Panel - Fixed at top right */}
      <Card className="absolute top-6 right-6 bg-white/95 backdrop-blur w-80 shadow-lg z-10">
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="h-5 w-5 text-emerald-600" />
            <h3 className="font-semibold text-emerald-950">Informasi Peta</h3>
          </div>

          {editingId && selectedFeature ? (
            <>
              <div className="bg-emerald-50 p-3 rounded border border-emerald-200">
                <p className="text-xs text-slate-600">ID Bidang</p>
                <p className="font-bold text-emerald-950">{selectedFeature.id}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded border border-slate-200">
                <p className="text-xs text-slate-600">Zona</p>
                <p className="font-semibold text-slate-900">{selectedFeature.zone}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded border border-slate-200">
                <p className="text-xs text-slate-600">Jenis Kayu</p>
                <p className="font-semibold text-slate-900">{selectedFeature.woodType}</p>
              </div>
              <Button
                onClick={() => handleSelectFeature(selectedFeature.id)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Update Data
              </Button>
            </>
          ) : (
            <div className="text-center py-4">
              <Info className="h-8 w-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm text-slate-500">
                Klik pada bidang kayu di peta untuk melihat detail
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Edit Modal */}
      <EditModal
        blockId={editingId}
        isOpen={showModal}
        onClose={handleCloseModal}
      />
    </div>
  );
}
