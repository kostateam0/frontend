import AnimatedBackground from "@/components/AnimatedBackground";
import SummonerSearch from "@/components/SummonerSearch";

const Index = () => {
  return (
    <>
      <AnimatedBackground />

      <main className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <section className="min-h-[60vh] flex items-center justify-center mb-24">
          <SummonerSearch />
        </section>
      </main>

      <footer className="glass-card py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            LoL API Guru is not endorsed by Riot Games and does not reflect the
            views or opinions of Riot Games or anyone officially involved in
            producing or managing League of Legends.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Index;
