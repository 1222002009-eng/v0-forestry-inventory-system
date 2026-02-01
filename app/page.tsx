"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { InventoryProvider } from "@/context/inventory-context";
import { Sidebar } from "@/components/sidebar";
import { MapView } from "@/components/map-view";
import { DataView } from "@/components/data-view";
import { UpdateModal } from "@/components/update-modal";

type ViewType = "map" | "data";

function AppContent() {
  const [activeView, setActiveView] = useState<ViewType>("map");
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectLog = (id: string) => {
    setSelectedLogId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLogId(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />

      {/* Main Content */}
      <main className="ml-[260px] min-h-screen">
        <AnimatePresence mode="wait">
          {activeView === "map" ? (
            <motion.div
              key="map"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="h-screen"
            >
              <MapView onSelectLog={handleSelectLog} />
            </motion.div>
          ) : (
            <motion.div
              key="data"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="h-screen overflow-auto"
            >
              <DataView onSelectLog={handleSelectLog} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Update Modal */}
      <UpdateModal
        logId={selectedLogId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default function Page() {
  return (
    <InventoryProvider>
      <AppContent />
    </InventoryProvider>
  );
}
