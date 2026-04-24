"use client";

interface VcMemoProps {
  memo: {
    summary: string;
    whatWorks: string[];
    whatBreaksThePitch: string[];
  };
}

export default function VcMemo({ memo }: VcMemoProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold">VC-Style Memo</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
      </div>

      <p className="leading-relaxed text-white/70">{memo.summary}</p>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-5">
          <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-green-400">
            <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
            What Works
          </h3>
          <ul className="space-y-2">
            {memo.whatWorks.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-white/70">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500/60" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
          <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-red-400">
            <span className="inline-block h-2 w-2 rounded-full bg-red-400" />
            What Breaks the Pitch
          </h3>
          <ul className="space-y-2">
            {memo.whatBreaksThePitch.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-white/70">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500/60" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
