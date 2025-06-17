import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { staggerItem } from "@/lib/framer-animations";

interface ChampionCardProps {
  id: string;
  name: string;
  title: string;
  tags: string[];
}

const ChampionCard = ({ id, name, title, tags }: ChampionCardProps) => {
  return (
    <motion.div variants={staggerItem} className="hover-scale">
      <Link
        to={`/champions/${id}`}
        className="glass-card rounded-xl overflow-hidden block h-full"
      >
        <div className="aspect-[3/4] relative overflow-hidden">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`}
            alt={name}
            className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-2 py-1 text-xs font-medium bg-lol-dark/70 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-sm text-gray-300 italic">{title}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ChampionCard;
