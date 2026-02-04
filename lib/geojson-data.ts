export interface WoodBlock {
  id: string;
  zone: string;
  woodType: string;
  volume: number;
  logCount: number;
  grade: string;
  status: "Available" | "Sold";
}

export interface GeoJSONFeature {
  type: "Feature";
  properties: WoodBlock;
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
}

export interface GeoJSONCollection {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}

// TPK_GEOJSON_DATA - Global constant with GeoJSON data
// User can replace this with their own SHP-to-GeoJSON converted data
export const TPK_GEOJSON_DATA: GeoJSONCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: "A-01",
        zone: "Zona A",
        woodType: "Jati",
        volume: 45.5,
        logCount: 120,
        grade: "A.II",
        status: "Available",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-7.1234, 110.4123],
            [-7.1234, 110.4234],
            [-7.1145, 110.4234],
            [-7.1145, 110.4123],
            [-7.1234, 110.4123],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "A-02",
        zone: "Zona A",
        woodType: "Mahoni",
        volume: 32.8,
        logCount: 95,
        grade: "B.I",
        status: "Available",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-7.1234, 110.4345],
            [-7.1234, 110.4456],
            [-7.1145, 110.4456],
            [-7.1145, 110.4345],
            [-7.1234, 110.4345],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "A-03",
        zone: "Zona A",
        woodType: "Pinus",
        volume: 28.2,
        logCount: 78,
        grade: "C.I",
        status: "Sold",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-7.1234, 110.4567],
            [-7.1234, 110.4678],
            [-7.1145, 110.4678],
            [-7.1145, 110.4567],
            [-7.1234, 110.4567],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "B-01",
        zone: "Zona B",
        woodType: "Sengon",
        volume: 56.3,
        logCount: 145,
        grade: "A.I",
        status: "Available",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-7.1345, 110.4123],
            [-7.1345, 110.4234],
            [-7.1256, 110.4234],
            [-7.1256, 110.4123],
            [-7.1345, 110.4123],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "B-02",
        zone: "Zona B",
        woodType: "Meranti",
        volume: 38.9,
        logCount: 102,
        grade: "B.II",
        status: "Available",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-7.1345, 110.4345],
            [-7.1345, 110.4456],
            [-7.1256, 110.4456],
            [-7.1256, 110.4345],
            [-7.1345, 110.4345],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "B-03",
        zone: "Zona B",
        woodType: "Kayu Putih",
        volume: 19.5,
        logCount: 52,
        grade: "C.II",
        status: "Sold",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-7.1345, 110.4567],
            [-7.1345, 110.4678],
            [-7.1256, 110.4678],
            [-7.1256, 110.4567],
            [-7.1345, 110.4567],
          ],
        ],
      },
    },
  ],
};
