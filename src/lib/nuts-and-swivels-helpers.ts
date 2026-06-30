export function buildSwivelPart(base: string, finishId: string, insulated: boolean): string {
  if (!finishId && !insulated) return base;
  return base + "-" + (finishId || "") + (insulated ? "I" : "");
}

export function buildAccessoryPart(base: string, finishId: string): string {
  return finishId ? base + "-" + finishId : base;
}

type MeterBarSel = {
  type: string;
  length: string;
  inlet: string;
  outlet: string;
  swivel: string;
  gasket?: string;
  union?: string;
  finish?: string;
};

export function buildMeterBarPart(sel: MeterBarSel): string {
  const lenTok =
    sel.length === "6" ? "6" : sel.length === "7" ? "7" : sel.length === "8" ? "8" : "";
  const finish = sel.finish ? "-" + sel.finish : "";
  if (sel.type === "MBSSL" || sel.type === "MBSD" || sel.type === "MBLG") {
    return `${sel.type}${lenTok}-${sel.inlet}-${sel.outlet}-${sel.swivel}${finish}`;
  }
  const gasket = sel.gasket || "F";
  const ins = sel.union === "I" ? "I" : "";
  return `${sel.type}${lenTok}-${sel.inlet}-${sel.outlet}-${sel.swivel}-${gasket}${ins}${finish}`;
}
