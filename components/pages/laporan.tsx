"use client";

import { useApp } from "@/context/app-context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown, Calendar } from "lucide-react";

export function Laporan() {
  const { woodBlocks } = useApp();

  const handleExportCSV = () => {
    // Create CSV content
    const headers = [
      "ID",
      "Zona",
      "Jenis Kayu",
      "Volume (m³)",
      "Jumlah Batang",
      "Grade",
      "Status",
      "Export Date",
    ];

    const rows = woodBlocks.map((block) => [
      block.id,
      block.zone,
      block.woodType,
      block.volume,
      block.logCount,
      block.grade,
      block.status,
      new Date().toLocaleDateString("id-ID"),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `sipeta-tpk-report-${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalVolume = woodBlocks.reduce((sum, b) => sum + b.volume, 0);
  const totalLogs = woodBlocks.reduce((sum, b) => sum + b.logCount, 0);
  const availableCount = woodBlocks.filter((b) => b.status === "Available").length;
  const soldCount = woodBlocks.filter((b) => b.status === "Sold").length;

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-emerald-950 mb-2">Laporan</h1>
        <p className="text-slate-600">Export dan kelola laporan persediaan kayu</p>
      </div>

      {/* Report Summary */}
      <Card className="bg-gradient-to-r from-emerald-50 to-white p-6 border-emerald-200">
        <h2 className="text-2xl font-bold text-emerald-950 mb-4">Ringkasan Laporan</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-slate-600 mb-1">Total Volume</p>
            <p className="text-2xl font-bold text-emerald-950">{totalVolume.toFixed(1)} m³</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">Total Batang</p>
            <p className="text-2xl font-bold text-blue-950">{totalLogs}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">Tersedia</p>
            <p className="text-2xl font-bold text-green-950">{availableCount}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">Terjual</p>
            <p className="text-2xl font-bold text-red-950">{soldCount}</p>
          </div>
        </div>
      </Card>

      {/* Export Options */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* CSV Export */}
        <Card className="p-6 border-2 border-emerald-200 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-emerald-950 mb-1">Export to CSV</h3>
              <p className="text-sm text-slate-600">
                Unduh data dalam format CSV untuk analisis lebih lanjut
              </p>
            </div>
            <FileDown className="h-8 w-8 text-emerald-600" />
          </div>
          <Button
            onClick={handleExportCSV}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <FileDown className="h-4 w-4 mr-2" />
            Download CSV
          </Button>
        </Card>

        {/* Monthly Report */}
        <Card className="p-6 border-2 border-blue-200 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-blue-950 mb-1">Laporan Bulanan</h3>
              <p className="text-sm text-slate-600">
                Laporan persediaan bulan ini ({new Date().toLocaleDateString("id-ID", { year: "numeric", month: "long" })})
              </p>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled>
            <Calendar className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <p className="text-xs text-slate-500 mt-2 text-center">
            Fitur ini akan segera tersedia
          </p>
        </Card>
      </div>

      {/* Report Details */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-emerald-950 mb-4">Detail Laporan</h3>
        <div className="space-y-3 text-slate-700">
          <div className="flex justify-between pb-2 border-b">
            <span>Tanggal Laporan:</span>
            <span className="font-semibold">{new Date().toLocaleDateString("id-ID")}</span>
          </div>
          <div className="flex justify-between pb-2 border-b">
            <span>Total Bidang:</span>
            <span className="font-semibold">{woodBlocks.length}</span>
          </div>
          <div className="flex justify-between pb-2 border-b">
            <span>Kapasitas Total:</span>
            <span className="font-semibold">500 m³</span>
          </div>
          <div className="flex justify-between pb-2 border-b">
            <span>Penggunaan Kapasitas:</span>
            <span className="font-semibold">{((totalVolume / 500) * 100).toFixed(1)}%</span>
          </div>
          <div className="flex justify-between">
            <span>Status Sistem:</span>
            <span className="font-semibold text-green-600">Online</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
