import Link from "next/link";

const serviceTypes = [
  { href: "/services/therapy", label: "Therapy", sanskrit: "चिकित्सा" },
  { href: "/services/opd", label: "OPD" },
  { href: "/services/exercises", label: "Exercises" },
];

export default function ServicesIndexPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 bg-[#f2ead9] px-6">
      <h1 className="text-sm uppercase tracking-[0.4em] text-neutral-500">
        Our Services
      </h1>
      <div className="grid gap-8 sm:grid-cols-3">
        {serviceTypes.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group flex flex-col items-center gap-4 rounded-2xl border border-neutral-800/20 px-10 py-14 transition hover:border-neutral-800"
          >
            <span className="text-lg uppercase tracking-[0.2em]">
              {s.label}
            </span>
            {s.sanskrit && (
              <span className="text-sm text-neutral-500">{s.sanskrit}</span>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}
