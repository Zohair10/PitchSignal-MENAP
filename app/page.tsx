import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            PitchSignal MENAP
          </span>
          <Link
            href="/evaluate"
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Check Investor Readiness
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-3xl text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Know why investors may say{" "}
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              no
            </span>{" "}
            before you pitch.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            PitchSignal MENAP reviews your startup like a Pakistan/MENAP
            investor and gives you the objections, risks, and fixes before your
            fundraising conversation.
          </p>
          <Link
            href="/evaluate"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Check Investor Readiness
          </Link>
        </div>
      </section>

      {/* Problem */}
      <section className="px-6 py-16 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">The Problem</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Generic pitch tools give you a score. They don&apos;t tell you what a
            Pakistan or MENAP investor will actually challenge. Founders walk
            into meetings unprepared for the real objections.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Share Your Pitch",
                desc: "Paste your pitch text or upload a PDF. Tell us about your startup.",
              },
              {
                step: "2",
                title: "AI Review Pipeline",
                desc: "Our LangChain pipeline analyzes your story, traction, and regional market fit.",
              },
              {
                step: "3",
                title: "Get Objections",
                desc: "See the exact reasons a MENAP investor may reject you — and how to fix each one.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-3"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-lg font-bold mx-auto">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why MENAP */}
      <section className="px-6 py-16 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">
            Why MENAP-Specific?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Pakistan and MENAP investors evaluate startups differently. They
            care about capital efficiency, regulatory awareness, distribution
            strategy, and verified traction — not just TAM. PitchSignal uses a
            researched regional knowledge pack to generate objections that
            actually match what local investors ask.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Ready to see your blind spots?
          </h2>
          <Link
            href="/evaluate"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Check Investor Readiness Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-6">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-500">
          PitchSignal MENAP — Built for Pakistan/MENAP founders. Not financial
          or legal advice.
        </div>
      </footer>
    </div>
  );
}
