import { SeasonalExperience } from '@/data/mockSeasonal';
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SeasonalCardProps {
  experience: SeasonalExperience;
}

const SeasonalCard = ({ experience }: SeasonalCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const liked = JSON.parse(localStorage.getItem('ttl_liked_seasonal') || '[]');
    setIsLiked(liked.includes(experience.id));
  }, [experience.id]);

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    const liked = JSON.parse(localStorage.getItem('ttl_liked_seasonal') || '[]');
    
    if (isLiked) {
      const updated = liked.filter((id: string) => id !== experience.id);
      localStorage.setItem('ttl_liked_seasonal', JSON.stringify(updated));
      setIsLiked(false);
    } else {
      liked.push(experience.id);
      localStorage.setItem('ttl_liked_seasonal', JSON.stringify(liked));
      setIsLiked(true);
    }
  };

  return (
    <Link to={`/portal/seasonal/${experience.id}`} className="block">
      <div 
        className="group relative bg-[#FAF7F2] border border-portal-navy/10 overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer rounded-lg"
      >
        {/* Image */}
        <div className="relative h-64 overflow-hidden rounded-t-lg">
          <img
            src={experience.image}
            alt={experience.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-lg"
          />
          
          {/* Like Button */}
          <button
            onClick={toggleLike}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors rounded-full"
          >
            <Heart
              className={`w-5 h-5 ${isLiked ? 'fill-portal-navy text-portal-navy' : 'text-portal-navy'}`}
            />
          </button>
          
          {/* Season Tag */}
          <div className="absolute bottom-4 left-4">
            <span className="inline-block px-3.5 py-1.5 bg-white/90 backdrop-blur-sm text-portal-navy text-base font-medium rounded-full border border-gray-200 shadow-sm">
              {experience.season}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-luxury text-3xl text-portal-navy mb-3 transition-colors">
            {experience.title}
          </h3>
          <p className="text-lg text-portal-navy/80 line-clamp-2">
            {experience.description}
          </p>

          {/* Details */}
          <div className="mt-4 pt-4 border-t border-portal-navy/20 flex items-center justify-between text-base text-portal-navy/70">
            <span>{experience.duration}</span>
            <span>{experience.location.split(',')[0]}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SeasonalCard;
