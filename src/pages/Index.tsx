import { motion } from "framer-motion";
import { fadeIn, staggerContainer, staggerItem } from "@/lib/framer-animations";
import AnimatedBackground from "@/components/AnimatedBackground";
import SummonerSearch from "@/components/SummonerSearch";
import Navbar from "@/components/Navbar";
import ChampionCard from "@/components/ChampionCard";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Sample champion data for the homepage
const featuredChampions = [
  {
    id: "Ahri",
    name: "Ahri",
    title: "the Nine-Tailed Fox",
    tags: ["Mage", "Assassin"],
  },
  {
    id: "Yasuo",
    name: "Yasuo",
    title: "the Unforgiven",
    tags: ["Fighter", "Assassin"],
  },
  {
    id: "Jinx",
    name: "Jinx",
    title: "the Loose Cannon",
    tags: ["Marksman"],
  },
  {
    id: "Thresh",
    name: "Thresh",
    title: "the Chain Warden",
    tags: ["Support", "Fighter"],
  },
];

const features = [
  {
    title: "Summoner Stats",
    description:
      "Get detailed statistics for any summoner, including win rates, most played champions, and ranked information.",
    icon: "👤",
  },
  {
    title: "Match History",
    description:
      "View recent matches with comprehensive data on performance, builds, and team compositions.",
    icon: "🎮",
  },
  {
    title: "Champion Analysis",
    description:
      "Explore champion-specific statistics, optimal builds, and performance metrics.",
    icon: "📊",
  },
];

const Index = () => {
  return (
    <>
      <AnimatedBackground />
      <Navbar />

      <main className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <section className="min-h-[60vh] flex items-center justify-center mb-24">
          <SummonerSearch />
        </section>

        <section className="mb-24">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <motion.span
              variants={staggerItem}
              className="inline-block px-3 py-1 mb-4 text-xs font-medium text-lol-blue bg-lol-blue/10 rounded-full"
            >
              FEATURED CHAMPIONS
            </motion.span>

            <motion.h2
              variants={staggerItem}
              className="text-3xl sm:text-4xl font-bold mb-6"
            >
              Popular Champions
            </motion.h2>

            <motion.p
              variants={staggerItem}
              className="text-lg text-muted-foreground max-w-xl mx-auto"
            >
              Explore detailed statistics and information about your favorite
              League of Legends champions.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8"
          >
            {featuredChampions.map((champion) => (
              <ChampionCard key={champion.id} {...champion} />
            ))}
          </motion.div>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              to="/champions"
              className="inline-flex items-center gap-2 text-lol-blue hover:underline text-sm font-medium"
            >
              View all champions <ArrowRight size={16} />
            </Link>
          </motion.div>
        </section>

        <section>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <motion.span
              variants={staggerItem}
              className="inline-block px-3 py-1 mb-4 text-xs font-medium text-lol-blue bg-lol-blue/10 rounded-full"
            >
              FEATURES
            </motion.span>

            <motion.h2
              variants={staggerItem}
              className="text-3xl sm:text-4xl font-bold mb-6"
            >
              Why Use LoL API Guru
            </motion.h2>

            <motion.p
              variants={staggerItem}
              className="text-lg text-muted-foreground max-w-xl mx-auto"
            >
              Our platform provides comprehensive tools for League of Legends
              players to improve their gameplay and track their progress.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="glass-card rounded-xl p-6 hover-scale"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-lol-blue/10 text-lol-blue mb-4">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
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
