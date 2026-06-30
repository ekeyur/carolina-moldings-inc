export const orderingForms: Record<
  string,
  {
    title: string;
    intro: string;
    fields: { key: string; label: string; type: string; options?: string[]; unit?: string }[];
  }
> = {
  bend: {
    title: "Meter Bend / Direct-Pipe Ordering Guide",
    intro: "Tell us the bend you need and we'll fabricate and quote it.",
    fields: [
      { key: "bendType", label: "Type of bend", type: "radio", options: ["90°", "180°"] },
      { key: "pipeSize", label: "Pipe size", type: "radio", options: ['3/4"', '1"', '1-1/4"'] },
      { key: "inletSide", label: "Inlet side", type: "radio", options: ["Threaded", "Plain"] },
      { key: "outletSide", label: "Outlet side", type: "radio", options: ["Threaded", "Swivel connection"] },
      { key: "connSize", label: "Connection size", type: "radio", options: ["10LT", "1A", "EMCO", "20LT", "30LT"] },
      { key: "radius", label: "Radius (for 90° bends)", type: "number", unit: "in" },
      { key: "ctc", label: "Center-to-center (for 180° loops)", type: "number", unit: "in" },
      { key: "inletDim", label: "Inlet dimension (A)", type: "number", unit: "in" },
      { key: "outletDim", label: "Outlet dimension (B)", type: "number", unit: "in" },
      { key: "finish", label: "Finish", type: "radio", options: ["Black", "Galvanized", "Zinc plated", "Painted"] },
      { key: "paintColor", label: "Paint color (if painted)", type: "text" },
    ],
  },
  manifold: {
    title: "Meter Manifold / Set Ordering Guide",
    intro: "Describe the manifold and we'll build and quote it to spec.",
    fields: [
      { key: "headerSize", label: "Header pipe size", type: "radio", options: ['1"', '1-1/4"', '1-1/2"', '2"'] },
      { key: "numConn", label: "Number of meter connections", type: "number" },
      { key: "connPipe", label: "Pipe size of meter connections", type: "radio", options: ['3/4"', '1"', '1-1/4"'] },
      { key: "connSep", label: "Inches separating the meter connections", type: "number", unit: "in" },
      { key: "inletToFirst", label: "Inlet to center of first connection", type: "number", unit: "in" },
      { key: "lastToEnd", label: "Last connection to end of manifold", type: "number", unit: "in" },
      { key: "connStyle", label: "Meter connections", type: "radio", options: ["Straight", "Bent"] },
      { key: "takeoff", label: "Take-off pipe dimension", type: "text" },
      { key: "valve", label: "Valve on the meter take-off?", type: "radio", options: ["Yes", "No"] },
      { key: "valveModel", label: "Valve model (if yes)", type: "text" },
      { key: "finish", label: "Finish", type: "radio", options: ["Black", "Galvanized", "Zinc plated", "Painted"] },
    ],
  },
  meterbarguide: {
    title: "Meter Bar Ordering Guide",
    intro: "Specify your meter bar and we'll build and quote it to spec.",
    fields: [
      { key: "inletLoc", label: "Inlet location", type: "radio", options: ["Side", "Top", "Rear"] },
      { key: "inletThread", label: "Inlet thread", type: "radio", options: ['3/4"', '1"', '1-1/4"'] },
      { key: "outletLoc", label: "Outlet location", type: "radio", options: ["Side", "Top", "Rear"] },
      { key: "outletStyle", label: "Outlet style", type: "radio", options: ["Insulated union", "Threaded"] },
      { key: "outletSize", label: "Outlet size", type: "radio", options: ['3/4"', '1"', '1-1/4"'] },
      { key: "swivelConn", label: "Swivel connections", type: "radio", options: ['3/4"', '1"', '1-1/4"'] },
      { key: "swivelIntegral", label: "Integral swivel size", type: "radio", options: ["10LT", "1A", "EMCO", "20LT", "30LT"] },
      { key: "swivelCtc", label: "Swivels center-to-center", type: "radio", options: ['6"', '6-1/2"', '7"', '8-1/4"'] },
      { key: "finish", label: "Finish", type: "radio", options: ["Black", "Galvanized", "Zinc plated", "Painted"] },
      { key: "pressureTap", label: "Pressure tap (size & location)", type: "text" },
    ],
  },
};
