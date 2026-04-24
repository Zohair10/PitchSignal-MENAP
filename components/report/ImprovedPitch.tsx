"use client";

interface ImprovedPitchProps {
  pitch: {
    oneLiner: string;
    elevatorPitch: string;
  };
}

export default function ImprovedPitch({ pitch }: ImprovedPitchProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold">Improved Pitch</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
      </div>

      <div className="rounded-xl bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 p-px">
        <div className="rounded-[calc(theme(borderRadius.xl)-1px)] bg-[#0a0e1a] p-6">
          <p className="mb-2 text-xs font-medium tracking-wider text-purple-400 uppercase">
            One-Liner
          </p>
          <p className="text-lg font-semibold leading-relaxed text-white">
            &ldquo;{pitch.oneLiner}&rdquo;
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <p className="mb-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">
          Elevator Pitch
        </p>
        <p className="leading-relaxed text-white/80">{pitch.elevatorPitch}</p>
      </div>
    </section>
  );
}
