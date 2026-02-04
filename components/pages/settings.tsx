"use client";

import { useApp } from "@/context/app-context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Info, AlertCircle } from "lucide-react";

export function Settings() {
  const { user } = useApp();

  const canEditSettings = user?.role === "admin";

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-emerald-950 mb-2">Settings</h1>
        <p className="text-slate-600">Pengaturan sistem dan preferensi pengguna</p>
      </div>

      {/* Permission Warning */}
      {!canEditSettings && (
        <Card className="bg-amber-50 border-amber-200 p-4 flex gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-amber-900">Akses Terbatas</p>
            <p className="text-sm text-amber-800">
              Hanya Admin yang dapat mengubah pengaturan sistem. Anda saat ini login sebagai{" "}
              <span className="font-semibold capitalize">{user?.role}</span>.
            </p>
          </div>
        </Card>
      )}

      {/* User Account */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-emerald-950 mb-4 flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Akun Pengguna
        </h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-slate-600 mb-1">Username</p>
            <p className="text-lg font-semibold text-slate-900 capitalize">{user?.username}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">Role</p>
            <div>
              <Badge
                className={
                  user?.role === "admin"
                    ? "bg-red-100 text-red-800"
                    : "bg-blue-100 text-blue-800"
                }
              >
                {user?.role === "admin" ? "Administrator" : "Staff"}
              </Badge>
            </div>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">Permissions</p>
            <div className="text-sm text-slate-700 space-y-1">
              {user?.role === "admin" ? (
                <>
                  <p className="flex items-center gap-2">
                    <span className="text-green-600">✓</span> Full Access
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-green-600">✓</span> Edit All Data
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-green-600">✓</span> Access Settings
                  </p>
                </>
              ) : (
                <>
                  <p className="flex items-center gap-2">
                    <span className="text-green-600">✓</span> View Dashboard
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-green-600">✓</span> Update Data
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-slate-400">✗</span> Edit Settings
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* System Settings */}
      {canEditSettings && (
        <Card className="p-6 border-emerald-200 bg-emerald-50">
          <h2 className="text-xl font-bold text-emerald-950 mb-4 flex items-center gap-2">
            <Info className="h-5 w-5" />
            Pengaturan Sistem
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-600 mb-1">Nama TPK</p>
              <p className="text-lg font-semibold text-slate-900">TPK Cabak</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Lokasi</p>
              <p className="text-lg font-semibold text-slate-900">Desa Cabak, Jawa Tengah</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Kapasitas Total</p>
              <p className="text-lg font-semibold text-slate-900">500 m³</p>
            </div>
            <Button disabled className="mt-4 bg-emerald-600 text-white">
              Edit System Settings
            </Button>
          </div>
        </Card>
      )}

      {/* Map Configuration */}
      {canEditSettings && (
        <Card className="p-6 border-blue-200 bg-blue-50">
          <h2 className="text-xl font-bold text-blue-950 mb-4">Konfigurasi Peta</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-600 mb-1">Map Source</p>
              <p className="text-lg font-semibold text-slate-900">Esri Satellite (JOSM)</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Default Zoom</p>
              <p className="text-lg font-semibold text-slate-900">15</p>
            </div>
            <Button disabled className="mt-4 bg-blue-600 text-white">
              Configure Map
            </Button>
          </div>
        </Card>
      )}

      {/* About */}
      <Card className="p-6 bg-slate-50">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Tentang Sistem</h2>
        <div className="space-y-2 text-sm text-slate-700">
          <p>
            <span className="font-semibold">Nama Sistem:</span> SIPETA TPK v1.0
          </p>
          <p>
            <span className="font-semibold">Deskripsi:</span> Sistem Informasi Peta TPK
            (Taman Produksi Kayu) dengan fitur GIS terintegrasi untuk manajemen persediaan
            kayu di Perhutani Cabak.
          </p>
          <p>
            <span className="font-semibold">Teknologi:</span> Next.js 14, React Leaflet, Tailwind CSS, Recharts
          </p>
          <p className="pt-2 text-xs text-slate-600">
            © 2024 Perhutani Cabak. All rights reserved.
          </p>
        </div>
      </Card>
    </div>
  );
}
