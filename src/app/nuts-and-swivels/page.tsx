import { NutsAndSwivelsGrid } from "@/components/nuts-and-swivels/NutsAndSwivelsGrid";
import catalog from "@/data/nuts-and-swivels-catalog.json";
import type { NutsAndSwivelsFamily } from "@/types/nuts-and-swivels";

const families = catalog.nutsAndSwivelsFamilies as NutsAndSwivelsFamily[];

export default function NutsAndSwivelsPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-navy py-12">
        <div className="max-w-310 mx-auto px-6">
          <h1 className="font-heading font-extrabold text-white text-3xl md:text-4xl mb-3">
            Nuts &amp; Swivels
          </h1>
          <p className="text-white/60 text-base max-w-2xl">
            Meter swivels, accessories, meter bars, and custom assemblies.
            Configure your part number online and add it to your quote.
          </p>
        </div>
      </div>

      <NutsAndSwivelsGrid families={families} />
    </>
  );
}
