import { motion } from "framer-motion";
import { fadeIn, staggerContainer, staggerItem } from "@/lib/framer-animations";

import { Separator } from "@/components/ui/separator";

interface User {
  name: string;
  profileIconId: number;
  summonerLevel: number;
  revisionDate: number;
}

interface SummonerProfileProps {
  summoner: User;
  summonerName: string;
  tag: string;
}

const SummonerProfile = ({
  summoner,
  summonerName,
  tag,
}: SummonerProfileProps) => {
  if (!summoner) return <div>소환사 정보가 없습니다.</div>;
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
                  src={`https://ddragon.leagueoflegends.com/cdn/15.11.1/img/profileicon/${summoner.profileIconId}.png`}
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
                {summonerName}#{tag}
              </motion.span>

              <motion.h1
                variants={staggerItem}
                className="text-3xl sm:text-4xl font-bold mb-2"
              >
                {summonerName}#{tag}
              </motion.h1>

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
    </motion.div>
  );
};

export default SummonerProfile;
