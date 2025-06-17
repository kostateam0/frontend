import { motion } from "framer-motion";
import {
  fadeIn,
  slideUp,
  staggerContainer,
  staggerItem,
} from "@/lib/framer-animations";
import { Summoner, ChampionMastery } from "@/types/lol";
import { Separator } from "@/components/ui/separator";

interface SummonerProfileProps {
  summoner: Summoner;
  championMasteries?: ChampionMastery[];
}

const SummonerProfile = ({
  summoner,
  championMasteries = [],
}: SummonerProfileProps) => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <motion.div variants={fadeIn} className="relative">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden border-2 border-white/20">
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/profileicon/${summoner.profileIconId}.png`}
                  alt={`${summoner.name}'s profile`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-lol-blue/90 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-medium border-2 border-white/20">
                {summoner.summonerLevel}
              </div>
            </motion.div>

            <div className="flex-1 text-center sm:text-left">
              <motion.span
                variants={staggerItem}
                className="inline-block px-3 py-1 mb-2 text-xs font-medium text-lol-blue bg-lol-blue/10 rounded-full"
              >
                SUMMONER PROFILE
              </motion.span>

              <motion.h1
                variants={staggerItem}
                className="text-3xl sm:text-4xl font-bold mb-2"
              >
                {summoner.name}
              </motion.h1>

              <motion.div
                variants={staggerItem}
                className="text-sm text-muted-foreground mb-4"
              >
                Level {summoner.summonerLevel} • Last updated{" "}
                {new Date(summoner.revisionDate).toLocaleDateString()}
              </motion.div>

              <Separator className="my-4" />

              <motion.div
                variants={staggerItem}
                className="flex flex-wrap justify-center sm:justify-start gap-4"
              >
                <div className="text-center">
                  <p className="text-xl font-medium">--</p>
                  <p className="text-xs text-muted-foreground">Win Rate</p>
                </div>

                <div className="text-center">
                  <p className="text-xl font-medium">--</p>
                  <p className="text-xs text-muted-foreground">Rank</p>
                </div>

                <div className="text-center">
                  <p className="text-xl font-medium">--</p>
                  <p className="text-xs text-muted-foreground">LP</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {championMasteries && championMasteries.length > 0 && (
        <motion.div variants={slideUp} className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Champion Masteries</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {championMasteries.slice(0, 5).map((mastery) => (
              <div
                key={mastery.championId}
                className="glass-card rounded-xl overflow-hidden text-center p-4"
              >
                <div className="relative mx-auto w-16 h-16 mb-3">
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/champion/${mastery.championId}.png`}
                    alt={`Champion ${mastery.championId}`}
                    className="w-full h-full rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-lol-gold text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium border-2 border-white/20">
                    {mastery.championLevel}
                  </div>
                </div>
                <p className="text-sm font-medium truncate">
                  Champion {mastery.championId}
                </p>
                <p className="text-xs text-muted-foreground">
                  {mastery.championPoints.toLocaleString()} pts
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SummonerProfile;
