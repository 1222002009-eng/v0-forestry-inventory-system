// ============================================================
// SUPABASE SERVICE LAYER FOR SIPETA TPK
// ============================================================
// This file contains the Supabase client and database functions.
// Currently using mock data for preview, but structured for real Supabase.
//
// TO CONNECT TO REAL SUPABASE:
// 1. Uncomment the supabase client import and initialization below
// 2. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY env vars
// 3. The functions will automatically use the real database
// ============================================================

// import { createClient } from '@supabase/supabase-js'
//
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//
// export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ============================================================
// DATABASE TYPES (matches stok_kayu table schema)
// ============================================================

export type LogStatus = "Available" | "Sold";

export interface StokKayu {
  id: string;
  zone: string;
  wood_type: string;
  volume: number;
  log_count: number;
  grade: string;
  status: LogStatus;
  coordinates: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

// Transform from DB format to UI format
export interface LogItem {
  id: string;
  zone: "Zona A" | "Zona B";
  woodType: string;
  volume: number;
  logCount: number;
  grade: string;
  status: LogStatus;
  coordinates: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

// ============================================================
// MOCK DATA (used when Supabase is not connected)
// ============================================================

const mockStokKayu: StokKayu[] = [
  // Zona A logs
  {
    id: "A-01",
    zone: "Zona A",
    wood_type: "Jati",
    volume: 12.5,
    log_count: 45,
    grade: "A.I",
    status: "Available",
    coordinates: { x: 8, y: 15, w: 8, h: 6 },
  },
  {
    id: "A-02",
    zone: "Zona A",
    wood_type: "Mahoni",
    volume: 8.3,
    log_count: 32,
    grade: "A.II",
    status: "Sold",
    coordinates: { x: 18, y: 12, w: 7, h: 5 },
  },
  {
    id: "A-03",
    zone: "Zona A",
    wood_type: "Sonokeling",
    volume: 15.2,
    log_count: 58,
    grade: "A.I",
    status: "Available",
    coordinates: { x: 28, y: 18, w: 9, h: 7 },
  },
  {
    id: "A-04",
    zone: "Zona A",
    wood_type: "Jati",
    volume: 6.8,
    log_count: 24,
    grade: "B.I",
    status: "Available",
    coordinates: { x: 12, y: 28, w: 6, h: 5 },
  },
  {
    id: "A-05",
    zone: "Zona A",
    wood_type: "Mahoni",
    volume: 11.0,
    log_count: 40,
    grade: "A.II",
    status: "Available",
    coordinates: { x: 22, y: 32, w: 8, h: 6 },
  },
  {
    id: "A-06",
    zone: "Zona A",
    wood_type: "Akasia",
    volume: 9.5,
    log_count: 35,
    grade: "B.II",
    status: "Sold",
    coordinates: { x: 34, y: 25, w: 7, h: 5 },
  },
  // Zona B logs
  {
    id: "B-01",
    zone: "Zona B",
    wood_type: "Jati",
    volume: 18.5,
    log_count: 68,
    grade: "A.I",
    status: "Available",
    coordinates: { x: 58, y: 15, w: 10, h: 8 },
  },
  {
    id: "B-02",
    zone: "Zona B",
    wood_type: "Sonokeling",
    volume: 7.2,
    log_count: 28,
    grade: "A.II",
    status: "Sold",
    coordinates: { x: 70, y: 12, w: 6, h: 5 },
  },
  {
    id: "B-03",
    zone: "Zona B",
    wood_type: "Mahoni",
    volume: 14.0,
    log_count: 52,
    grade: "A.I",
    status: "Available",
    coordinates: { x: 78, y: 20, w: 8, h: 7 },
  },
  {
    id: "B-04",
    zone: "Zona B",
    wood_type: "Jati",
    volume: 10.8,
    log_count: 42,
    grade: "B.I",
    status: "Sold",
    coordinates: { x: 62, y: 30, w: 7, h: 6 },
  },
  {
    id: "B-05",
    zone: "Zona B",
    wood_type: "Akasia",
    volume: 5.5,
    log_count: 20,
    grade: "B.II",
    status: "Available",
    coordinates: { x: 72, y: 35, w: 5, h: 4 },
  },
  {
    id: "B-06",
    zone: "Zona B",
    wood_type: "Sonokeling",
    volume: 13.2,
    log_count: 48,
    grade: "A.II",
    status: "Sold",
    coordinates: { x: 82, y: 28, w: 8, h: 6 },
  },
];

// In-memory store for mock data (simulates database)
let mockDataStore = [...mockStokKayu];

// ============================================================
// TRANSFORM FUNCTIONS
// ============================================================

function transformToLogItem(row: StokKayu): LogItem {
  return {
    id: row.id,
    zone: row.zone as "Zona A" | "Zona B",
    woodType: row.wood_type,
    volume: row.volume,
    logCount: row.log_count,
    grade: row.grade,
    status: row.status,
    coordinates: {
      x: row.coordinates.x,
      y: row.coordinates.y,
      width: row.coordinates.w,
      height: row.coordinates.h,
    },
  };
}

function transformToStokKayu(item: Partial<LogItem>): Partial<StokKayu> {
  const result: Partial<StokKayu> = {};
  
  if (item.woodType !== undefined) result.wood_type = item.woodType;
  if (item.volume !== undefined) result.volume = item.volume;
  if (item.logCount !== undefined) result.log_count = item.logCount;
  if (item.grade !== undefined) result.grade = item.grade;
  if (item.status !== undefined) result.status = item.status;
  if (item.coordinates !== undefined) {
    result.coordinates = {
      x: item.coordinates.x,
      y: item.coordinates.y,
      w: item.coordinates.width,
      h: item.coordinates.height,
    };
  }
  
  return result;
}

// ============================================================
// DATABASE FUNCTIONS
// ============================================================

/**
 * Fetch all stok_kayu records
 * 
 * Real Supabase implementation:
 * const { data, error } = await supabase
 *   .from('stok_kayu')
 *   .select('*')
 *   .order('id');
 */
export async function fetchAllStokKayu(): Promise<LogItem[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  // ----- UNCOMMENT FOR REAL SUPABASE -----
  // try {
  //   const { data, error } = await supabase
  //     .from('stok_kayu')
  //     .select('*')
  //     .order('id');
  //   
  //   if (error) throw error;
  //   return (data || []).map(transformToLogItem);
  // } catch (error) {
  //   console.error('Error fetching stok_kayu:', error);
  //   // Fallback to mock data
  //   return mockDataStore.map(transformToLogItem);
  // }
  // ----------------------------------------
  
  // Return mock data for preview
  return mockDataStore.map(transformToLogItem);
}

/**
 * Update a stok_kayu record by ID
 * 
 * Real Supabase implementation:
 * const { data, error } = await supabase
 *   .from('stok_kayu')
 *   .update({ wood_type, volume, log_count, grade, status })
 *   .eq('id', id)
 *   .select()
 *   .single();
 */
export async function updateStokKayu(
  id: string,
  updates: Partial<LogItem>
): Promise<LogItem | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200));
  
  const dbUpdates = transformToStokKayu(updates);
  
  // ----- UNCOMMENT FOR REAL SUPABASE -----
  // try {
  //   const { data, error } = await supabase
  //     .from('stok_kayu')
  //     .update(dbUpdates)
  //     .eq('id', id)
  //     .select()
  //     .single();
  //   
  //   if (error) throw error;
  //   return data ? transformToLogItem(data) : null;
  // } catch (error) {
  //   console.error('Error updating stok_kayu:', error);
  //   return null;
  // }
  // ----------------------------------------
  
  // Update mock data store
  const index = mockDataStore.findIndex((item) => item.id === id);
  if (index !== -1) {
    mockDataStore[index] = { ...mockDataStore[index], ...dbUpdates };
    return transformToLogItem(mockDataStore[index]);
  }
  
  return null;
}

/**
 * Get stok_kayu by zone
 * 
 * Real Supabase implementation:
 * const { data, error } = await supabase
 *   .from('stok_kayu')
 *   .select('*')
 *   .eq('zone', zone);
 */
export async function fetchStokKayuByZone(zone: string): Promise<LogItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  
  // ----- UNCOMMENT FOR REAL SUPABASE -----
  // try {
  //   const { data, error } = await supabase
  //     .from('stok_kayu')
  //     .select('*')
  //     .eq('zone', zone);
  //   
  //   if (error) throw error;
  //   return (data || []).map(transformToLogItem);
  // } catch (error) {
  //   console.error('Error fetching stok_kayu by zone:', error);
  //   return mockDataStore.filter(item => item.zone === zone).map(transformToLogItem);
  // }
  // ----------------------------------------
  
  return mockDataStore
    .filter((item) => item.zone === zone)
    .map(transformToLogItem);
}

/**
 * Get aggregate stats for a zone
 */
export function calculateZoneStats(logs: LogItem[], zone: string) {
  const zoneLogs = logs.filter((log) => log.zone === zone);
  return {
    totalLogs: zoneLogs.reduce((sum, log) => sum + log.logCount, 0),
    totalVolume: zoneLogs.reduce((sum, log) => sum + log.volume, 0),
    stackCount: zoneLogs.length,
  };
}
