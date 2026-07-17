import { Play } from 'lucide-react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export default function ReelsThumbnail({ image, onClick, title }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative w-full rounded-2xl overflow-hidden cursor-pointer group shadow-lg border border-slate-800"
      style={{ aspectRatio: '9/16' }}
      role="button"
      tabIndex={0}
      aria-label={`Watch video: ${title}`}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      {/* Background Image */}
      {image ? (
        <img
          src={image}
          alt={title || 'Reel Thumbnail'}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-500">
          No Thumbnail
        </div>
      )}

      {/* Gradient Overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {/* Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors duration-300">
        <div className="w-14 h-14 rounded-full bg-orange-600/90 text-white flex items-center justify-center pl-1 backdrop-blur-sm shadow-[0_0_20px_rgba(234,88,12,0.5)] transform group-hover:scale-110 transition-transform duration-300">
          <Play size={24} fill="currentColor" />
        </div>
      </div>
      
      {/* Optional Title at the bottom */}
      {title && (
        <div className="absolute bottom-4 inset-x-4 text-white font-semibold text-sm drop-shadow-md truncate">
          {title}
        </div>
      )}
    </motion.div>
  );
}

ReelsThumbnail.propTypes = {
  image: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string
};
