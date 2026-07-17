import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

export default function VideoModal({ isOpen, onClose, videoUrl }) {
  const [blobUrl, setBlobUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let currentBlobUrl = null;

    const fetchVideo = async () => {
      if (!videoUrl) return;
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(videoUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        const blob = await response.blob();
        currentBlobUrl = URL.createObjectURL(blob);
        setBlobUrl(currentBlobUrl);
      } catch (err) {
        console.error('Error fetching video:', err);
        setError('Failed to load video. It might be due to CORS policy or an invalid URL.');
        // Fallback for demo purposes if CORS fails
        setBlobUrl(videoUrl);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchVideo();
    } else {
      setBlobUrl(null);
      setError(null);
    }

    return () => {
      if (currentBlobUrl && currentBlobUrl.startsWith('blob:')) {
        URL.revokeObjectURL(currentBlobUrl);
      }
    };
  }, [isOpen, videoUrl]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-[400px] h-[80vh] max-h-[800px] bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col items-center justify-center"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-orange-600 transition-colors backdrop-blur-md"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {isLoading ? (
            <div className="flex flex-col items-center text-orange-500">
              <Loader2 className="animate-spin mb-4" size={32} />
              <span className="text-sm font-semibold">Loading securely...</span>
            </div>
          ) : error && blobUrl === videoUrl ? (
             // Render fallback
            <video
              src={blobUrl}
              className="w-full h-full object-contain"
              autoPlay
              controls
              controlsList="nodownload"
              onContextMenu={(e) => e.preventDefault()}
            />
          ) : (
            blobUrl && (
              <video
                src={blobUrl}
                className="w-full h-full object-contain"
                autoPlay
                controls
                controlsList="nodownload"
                onContextMenu={(e) => e.preventDefault()}
                disablePictureInPicture
              />
            )
          )}
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}

VideoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  videoUrl: PropTypes.string
};
