"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { useQuote } from "@/context/QuoteContext";
import { buildSwivelPart, buildAccessoryPart, buildMeterBarPart } from "@/lib/nuts-and-swivels-helpers";
import type { NutsAndSwivelsFamily } from "@/types/nuts-and-swivels";
import catalog from "@/data/nuts-and-swivels-catalog.json";

const finishes = catalog.finishes as { id: string; name: string; suffix: string }[];
const meterBarConfig = catalog.meterBarConfig as {
  types: { id: string; name: string; gasketUnion: boolean }[];
  sizes: string[];
  lengths: { id: string; name: string }[];
  gaskets: { id: string; name: string }[];
  unions: { id: string; name: string }[];
};

const selectValue = (setter: (v: string) => void) => (v: string | null) => {
  if (v !== null) setter(v);
};

type Props = {
  family: NutsAndSwivelsFamily | null;
  open: boolean;
  onClose: () => void;
};

type ControlProps = {
  family: NutsAndSwivelsFamily;
  onPartChange: (partNo: string, specLine: string) => void;
};

function ToggleBtn({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3.5 py-1.5 text-sm font-medium rounded-[3px] border transition-colors ${
        selected
          ? "bg-navy text-white border-navy"
          : "bg-white text-ink border-line hover:border-slate-400"
      }`}
    >
      {label}
    </button>
  );
}

function SwivelControls({ family, onPartChange }: ControlProps) {
  const [variantBase, setVariantBase] = useState(family.variants?.[0]?.base || "");
  const [finishId, setFinishId] = useState("");
  const [insulated, setInsulated] = useState(false);

  const partNo = useMemo(
    () => buildSwivelPart(variantBase, finishId, insulated),
    [variantBase, finishId, insulated]
  );
  const variant = family.variants?.find((v) => v.base === variantBase);
  const specLine = variant?.specs || "";

  useEffect(() => {
    onPartChange(partNo, specLine);
  }, [partNo, specLine, onPartChange]);

  return (
    <div className="space-y-4">
      {family.variantLabel && (
        <div className="space-y-1.5">
          <Label className="font-mono-brand text-[10px] text-slate-500 tracking-[0.14em] uppercase">
            {family.variantLabel}
          </Label>
          <Select value={variantBase} onValueChange={selectValue(setVariantBase)}>
            <SelectTrigger className="rounded-[3px] w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="min-w-(--radix-select-trigger-width)">
              {family.variants?.map((v) => (
                <SelectItem key={v.base} value={v.base}>
                  {v.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {variant && (
            <p className="text-[11px] text-slate-400">{variant.specs}</p>
          )}
        </div>
      )}

      {family.hasFinish && (
        <div className="space-y-1.5">
          <Label className="font-mono-brand text-[10px] text-slate-500 tracking-[0.14em] uppercase">
            Finish
          </Label>
          <div className="flex flex-wrap gap-2">
            {finishes.map((f) => (
              <ToggleBtn
                key={f.id}
                label={f.name}
                selected={finishId === f.id}
                onClick={() => setFinishId(f.id)}
              />
            ))}
          </div>
        </div>
      )}

      {family.hasInsulated && (
        <div className="space-y-1.5">
          <Label className="font-mono-brand text-[10px] text-slate-500 tracking-[0.14em] uppercase">
            Insulation
          </Label>
          <div className="flex gap-2">
            <ToggleBtn
              label="Standard"
              selected={!insulated}
              onClick={() => setInsulated(false)}
            />
            <ToggleBtn
              label="Insulated"
              selected={insulated}
              onClick={() => setInsulated(true)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function AccessoryControls({ family, onPartChange }: ControlProps) {
  const [variantBase, setVariantBase] = useState(family.variants?.[0]?.base || "");
  const [finishId, setFinishId] = useState("");

  const partNo = useMemo(
    () => buildAccessoryPart(variantBase, finishId),
    [variantBase, finishId]
  );
  const variant = family.variants?.find((v) => v.base === variantBase);
  const specLine = variant?.specs || "";

  useEffect(() => {
    onPartChange(partNo, specLine);
  }, [partNo, specLine, onPartChange]);

  return (
    <div className="space-y-4">
      {family.variantLabel && (
        <div className="space-y-1.5">
          <Label className="font-mono-brand text-[10px] text-slate-500 tracking-[0.14em] uppercase">
            {family.variantLabel}
          </Label>
          <Select value={variantBase} onValueChange={selectValue(setVariantBase)}>
            <SelectTrigger className="rounded-[3px] w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="min-w-(--radix-select-trigger-width)">
              {family.variants?.map((v) => (
                <SelectItem key={v.base} value={v.base}>
                  {v.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {variant && (
            <p className="text-[11px] text-slate-400">{variant.specs}</p>
          )}
        </div>
      )}

      {family.hasFinish && (
        <div className="space-y-1.5">
          <Label className="font-mono-brand text-[10px] text-slate-500 tracking-[0.14em] uppercase">
            Finish
          </Label>
          <div className="flex flex-wrap gap-2">
            {finishes.map((f) => (
              <ToggleBtn
                key={f.id}
                label={f.name}
                selected={finishId === f.id}
                onClick={() => setFinishId(f.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AdaptorControls({ family, onPartChange }: ControlProps) {
  const pilots = family.pilots || [];
  const [from, setFrom] = useState(pilots[0] || "");
  const [to, setTo] = useState(pilots[1] || pilots[0] || "");

  const partNo = `Adaptor ${from} — ${to}`;
  const specLine = `Adapts a ${from} connection to ${to}`;

  useEffect(() => {
    onPartChange(partNo, specLine);
  }, [partNo, specLine, onPartChange]);

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3">
      <div className="space-y-1.5">
        <Label className="font-mono-brand text-[10px] text-slate-500 tracking-[0.14em] uppercase">
          Existing
        </Label>
        <Select value={from} onValueChange={selectValue(setFrom)}>
          <SelectTrigger className="rounded-[3px] w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {pilots.map((p) => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <span className="text-slate-400 pb-2.5">→</span>
      <div className="space-y-1.5">
        <Label className="font-mono-brand text-[10px] text-slate-500 tracking-[0.14em] uppercase">
          New
        </Label>
        <Select value={to} onValueChange={selectValue(setTo)}>
          <SelectTrigger className="rounded-[3px] w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {pilots.map((p) => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

function MeterBarControls({
  onPartChange,
}: {
  onPartChange: (partNo: string, specLine: string) => void;
}) {
  const firstType = meterBarConfig.types[0];
  const [mbType, setMbType] = useState(firstType.id);
  const [inlet, setInlet] = useState(meterBarConfig.sizes[0]);
  const [outlet, setOutlet] = useState(meterBarConfig.sizes[0]);
  const [swivel, setSwivel] = useState(meterBarConfig.sizes[0]);
  const [length, setLength] = useState(meterBarConfig.lengths[0].id);
  const [gasket, setGasket] = useState(meterBarConfig.gaskets[0].id);
  const [union, setUnion] = useState(meterBarConfig.unions[1].id);
  const [finish, setFinish] = useState("");

  const typeConfig = meterBarConfig.types.find((t) => t.id === mbType) || firstType;
  const partNo = useMemo(
    () => buildMeterBarPart({ type: mbType, length, inlet, outlet, swivel, gasket, union, finish }),
    [mbType, length, inlet, outlet, swivel, gasket, union, finish]
  );
  const specLine = `${mbType} · ${inlet}" in · ${outlet}" out · ${length}"`;

  useEffect(() => {
    onPartChange(partNo, specLine);
  }, [partNo, specLine, onPartChange]);

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label className="font-mono-brand text-[10px] text-slate-500 tracking-[0.14em] uppercase">
          Type
        </Label>
        <Select value={mbType} onValueChange={selectValue(setMbType)}>
          <SelectTrigger className="rounded-[3px] w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {meterBarConfig.types.map((t) => (
              <SelectItem key={t.id} value={t.id}>
                {t.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Inlet", value: inlet, onChange: setInlet, items: meterBarConfig.sizes },
          { label: "Outlet", value: outlet, onChange: setOutlet, items: meterBarConfig.sizes },
          { label: "Swivel", value: swivel, onChange: setSwivel, items: meterBarConfig.sizes },
          {
            label: "Length",
            value: length,
            onChange: setLength,
            items: meterBarConfig.lengths.map((l) => ({ value: l.id, label: l.name })),
          },
        ].map(({ label, value, onChange, items }) => (
          <div key={label} className="space-y-1.5">
            <Label className="font-mono-brand text-[10px] text-slate-500 tracking-[0.14em] uppercase">
              {label}
            </Label>
            <Select value={value} onValueChange={selectValue(onChange)}>
              <SelectTrigger className="rounded-[3px] w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {items.map((item) =>
                  typeof item === "string" ? (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ) : (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>

      {typeConfig.gasketUnion && (
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="font-mono-brand text-[10px] text-slate-500 tracking-[0.14em] uppercase">
              Gasket
            </Label>
            <Select value={gasket} onValueChange={selectValue(setGasket)}>
              <SelectTrigger className="rounded-[3px] w-full">
                <span className="flex-1 text-sm text-left truncate">
                  {meterBarConfig.gaskets.find((g) => g.id === gasket)?.name ?? "Select…"}
                </span>
              </SelectTrigger>
              <SelectContent>
                {meterBarConfig.gaskets.map((g) => (
                  <SelectItem key={g.id} value={g.id}>
                    {g.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="font-mono-brand text-[10px] text-slate-500 tracking-[0.14em] uppercase">
              Union
            </Label>
            <Select value={union} onValueChange={selectValue(setUnion)}>
              <SelectTrigger className="rounded-[3px] w-full">
                <span className="flex-1 text-sm text-left truncate">
                  {meterBarConfig.unions.find((u) => u.id === union)?.name ?? "Select…"}
                </span>
              </SelectTrigger>
              <SelectContent>
                {meterBarConfig.unions.map((u) => (
                  <SelectItem key={u.id || "__std__"} value={u.id}>
                    {u.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div className="space-y-1.5">
        <Label className="font-mono-brand text-[10px] text-slate-500 tracking-[0.14em] uppercase">
          Finish
        </Label>
        <div className="flex flex-wrap gap-2">
          {finishes.map((f) => (
            <ToggleBtn
              key={f.id}
              label={f.name}
              selected={finish === f.id}
              onClick={() => setFinish(f.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function PartNumberBox({ partNo, specLine }: { partNo: string; specLine: string }) {
  return (
    <div className="bg-navy rounded-lg px-4 py-3">
      <p className="font-mono-brand text-carolina text-[10px] tracking-[0.14em] uppercase mb-1.5">
        Your Part Number
      </p>
      <p className="font-mono-brand font-bold text-white text-[1.375rem] leading-none">
        {partNo || "—"}
      </p>
      {specLine && (
        <p className="text-white/55 text-xs mt-1.5">{specLine}</p>
      )}
    </div>
  );
}

export function ConfiguratorDialog({ family, open, onClose }: Props) {
  const { add, setQty: setQuoteQty } = useQuote();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [currentPartNo, setCurrentPartNo] = useState("");
  const [currentSpecLine, setCurrentSpecLine] = useState("");

  useEffect(() => {
    setQty(1);
    setCurrentPartNo("");
    setCurrentSpecLine("");
    setAdded(false);
  }, [family?.id]);

  const handlePartChange = useCallback((partNo: string, specLine: string) => {
    setCurrentPartNo(partNo);
    setCurrentSpecLine(specLine);
  }, []);

  const handleAdd = () => {
    if (!family) return;
    const itemId = `${family.id}-${currentPartNo}-${Date.now()}`;
    add({
      id: itemId,
      name: family.name,
      partNo: currentPartNo,
      supplier: "nuts-and-swivels",
      image: `/nuts-and-swivels/${family.id}.png`,
      specLine: currentSpecLine,
    });
    if (qty > 1) setQuoteQty(itemId, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!family) return null;

  const isMeterBar = family.configurator === "meterbar";
  const isAdaptor = family.configurator === "adaptor";
  const isAccessory = family.cat === "accessories" && !isMeterBar && !isAdaptor;
  const imgSrc = `/nuts-and-swivels/${family.id}.png`;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      {isMeterBar ? (
        /* ── Meter bar: single column, compact image header ── */
        <DialogContent className="sm:max-w-lg p-0 rounded-[8px] shadow-[0_40px_80px_rgba(0,0,0,.3)] overflow-hidden gap-0">
          <div className="flex items-start gap-4 p-5 border-b border-line bg-surface">
            <div className="relative w-14 h-14 shrink-0 bg-white rounded-[6px] border border-line overflow-hidden">
              <Image
                src={imgSrc}
                alt={family.name}
                fill
                sizes="56px"
                className="object-contain p-1.5"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-mono-brand text-carolina text-[10px] font-semibold tracking-[0.16em] uppercase mb-0.5">
                Nuts &amp; Swivels
              </p>
              <h2 className="font-heading font-bold text-navy text-lg leading-tight">
                {family.name}
              </h2>
              <p className="text-slate-500 text-sm leading-snug mt-0.5">{family.blurb}</p>
            </div>
          </div>

          <div className="p-5 space-y-4 overflow-y-auto max-h-[70vh]">
            <MeterBarControls key={family.id} onPartChange={handlePartChange} />

            <PartNumberBox partNo={currentPartNo} specLine={currentSpecLine} />

            <div className="space-y-1.5">
              <Label className="font-mono-brand text-[10px] text-slate-500 tracking-[0.14em] uppercase">
                Quantity
              </Label>
              <Input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                className="rounded-[3px] w-full"
              />
            </div>

            {added && (
              <div className="bg-green-50 text-green-700 text-sm font-semibold px-4 py-2 rounded-[3px] text-center">
                ✓ Added to Quote List
              </div>
            )}

            <Button
              onClick={handleAdd}
              className="w-full bg-brand-red hover:bg-red-700 text-white rounded-[3px] font-semibold"
            >
              + Add to Quote List
            </Button>
            <p className="text-center text-xs text-slate-400 pb-1">
              No prices shown online — we'll send a personalized quote.
            </p>
          </div>
        </DialogContent>
      ) : (
        /* ── Swivel / Accessory: two-column, image panel left ── */
        <DialogContent className="sm:max-w-2xl p-0 rounded-[8px] shadow-[0_40px_80px_rgba(0,0,0,.3)] overflow-hidden gap-0">
          <div className="grid grid-cols-1 md:grid-cols-[40%_60%]">
            {/* Left: image + product info */}
            <div className="bg-surface p-5 flex flex-col gap-4 md:border-r border-b md:border-b-0 border-line">
              <div className="relative aspect-square w-full bg-white rounded-[6px] border border-line overflow-hidden">
                <Image
                  src={imgSrc}
                  alt={family.name}
                  fill
                  sizes="(max-width: 768px) 90vw, 300px"
                  className="object-contain p-6"
                />
              </div>
              <div>
                <p className="font-mono-brand text-carolina text-[10px] font-semibold tracking-[0.16em] uppercase mb-1">
                  Nuts &amp; Swivels
                </p>
                <h2 className="font-heading font-bold text-navy text-lg leading-tight mb-1.5">
                  {family.name}
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-3">{family.blurb}</p>
                {family.features && family.features.length > 0 && (
                  <ul className="space-y-1.5">
                    {family.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="h-3.5 w-3.5 text-carolina shrink-0 mt-0.5" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Right: configure panel */}
            <div className="p-6 flex flex-col gap-4 overflow-y-auto max-h-[85vh]">
              <h3 className="font-heading font-bold text-navy text-lg">Configure your part</h3>

              <div key={family.id}>
                {isAdaptor ? (
                  <AdaptorControls family={family} onPartChange={handlePartChange} />
                ) : isAccessory ? (
                  <AccessoryControls family={family} onPartChange={handlePartChange} />
                ) : (
                  <SwivelControls family={family} onPartChange={handlePartChange} />
                )}
              </div>

              <PartNumberBox partNo={currentPartNo} specLine={currentSpecLine} />

              <div className="space-y-1.5">
                <Label className="font-mono-brand text-[10px] text-slate-500 tracking-[0.14em] uppercase">
                  Quantity
                </Label>
                <Input
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                  className="rounded-[3px] w-full"
                />
              </div>

              {added && (
                <div className="bg-green-50 text-green-700 text-sm font-semibold px-4 py-2 rounded-[3px] text-center">
                  ✓ Added to Quote List
                </div>
              )}

              <Button
                onClick={handleAdd}
                className="w-full bg-brand-red hover:bg-red-700 text-white rounded-[3px] font-semibold"
              >
                + Add to Quote List
              </Button>
              <p className="text-center text-xs text-slate-400">
                No prices shown online — we'll send a personalized quote.
              </p>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
