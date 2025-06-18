import AnimatedBackground from "@/components/AnimatedBackground";
import SummonerSearch from "@/components/SummonerSearch";

const Index = () => {
  return (
    <>
      <AnimatedBackground />

      <main className='mx-auto max-w-7xl px-4 pt-32 pb-20'>
        <section className='mb-24 flex min-h-[60vh] items-center justify-center'>
          <SummonerSearch />
        </section>
      </main>

      <footer className='glass-card border-t border-white/10 py-8'>
        <div className='mx-auto max-w-7xl px-4 text-center'>
          <p className='text-muted-foreground text-sm'>
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
