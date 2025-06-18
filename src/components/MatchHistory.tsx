import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { staggerItem } from '@/lib/framer-animations';

interface ChampionCardProps {
  id: string;
  name: string;
  title: string;
  tags: string[];
}

const ChampionCard = ({ id, name, title, tags }: ChampionCardProps) => {
  return (
    <motion.div variants={staggerItem} className='hover-scale'>
      <Link
        to={`/champions/${id}`}
        className='glass-card block h-full overflow-hidden rounded-xl'
      >
        <div className='relative aspect-[3/4] overflow-hidden'>
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`}
            alt={name}
            className='h-full w-full transform object-cover object-center transition-transform duration-700 hover:scale-110'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent' />

          <div className='absolute right-0 bottom-0 left-0 p-4 text-white'>
            <div className='mb-2 flex flex-wrap gap-2'>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className='bg-lol-dark/70 inline-block rounded-md px-2 py-1 text-xs font-medium'
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className='text-xl font-bold'>{name}</h3>
            <p className='text-sm text-gray-300 italic'>{title}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ChampionCard;
