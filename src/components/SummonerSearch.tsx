import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import {
  fadeIn,
  slideUp,
  staggerContainer,
  staggerItem,
} from "@/lib/framer-animations";

const regions = [
  { value: "na1", label: "North America" },
  { value: "euw1", label: "EU West" },
  { value: "eun1", label: "EU Nordic & East" },
  { value: "kr", label: "Korea" },
  { value: "jp1", label: "Japan" },
  { value: "br1", label: "Brazil" },
  { value: "la1", label: "LAN" },
  { value: "la2", label: "LAS" },
  { value: "oc1", label: "Oceania" },
  { value: "tr1", label: "Turkey" },
  { value: "ru", label: "Russia" },
];

const SummonerSearch = () => {
  const [summonerName, setSummonerName] = useState("");
  const [region, setRegion] = useState("na1");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (summonerName.trim()) {
      navigate(`/summoner/${region}/${summonerName}`);
    }
  };

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto text-center"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.span
        className="inline-block px-3 py-1 mb-4 text-xs font-medium text-lol-blue bg-lol-blue/10 rounded-full"
        variants={staggerItem}
      >
        LEAGUE OF LEGENDS STATS
      </motion.span>

      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
        variants={staggerItem}
      >
        Elevate your League experience
      </motion.h1>

      <motion.p
        className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto"
        variants={staggerItem}
      >
        Search for any summoner to get detailed insights, match history, and
        champion performance stats with our beautiful, minimalist interface.
      </motion.p>

      <motion.form
        onSubmit={handleSubmit}
        className="relative glass-card rounded-xl p-1 max-w-xl mx-auto overflow-hidden"
        variants={fadeIn}
      >
        <div className="flex flex-col sm:flex-row">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Enter summoner name..."
              value={summonerName}
              onChange={(e) => setSummonerName(e.target.value)}
              className="w-full py-4 pl-4 pr-12 bg-transparent border-0 text-base focus:outline-none focus:ring-0"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          </div>

          <div className="flex sm:flex-row flex-col">
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="py-4 px-4 bg-transparent border-0 border-t sm:border-t-0 sm:border-l border-border text-sm focus:outline-none focus:ring-0"
            >
              {regions.map((region) => (
                <option key={region.value} value={region.value}>
                  {region.label}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="bg-lol-blue hover:bg-lol-blue/90 text-white font-medium py-4 px-6 sm:px-8 transition-colors focus:outline-none"
            >
              Search
            </button>
          </div>
        </div>
      </motion.form>

      <motion.div
        className="mt-6 text-sm text-muted-foreground"
        variants={slideUp}
      >
        Try searching for{" "}
        <button
          onClick={() => {
            setSummonerName("Faker");
            setRegion("kr");
          }}
          className="text-lol-blue hover:underline focus:outline-none"
        >
          Faker
        </button>
        ,{" "}
        <button
          onClick={() => {
            setSummonerName("Bjergsen");
            setRegion("na1");
          }}
          className="text-lol-blue hover:underline focus:outline-none"
        >
          Bjergsen
        </button>
        , or{" "}
        <button
          onClick={() => {
            setSummonerName("Rekkles");
            setRegion("euw1");
          }}
          className="text-lol-blue hover:underline focus:outline-none"
        >
          Rekkles
        </button>
      </motion.div>
    </motion.div>
  );
};

export default SummonerSearch;
