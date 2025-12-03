import { useEffect, useMemo, useState } from 'react';
import PortalSidebar from '@/components/portal/PortalSidebar';
import ConciergeButton from '@/components/portal/ConciergeButton';
import ExperienceCard from '@/components/portal/ExperienceCard';
import { mockExperiences, categories } from '@/data/mockExperiences';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Experiences = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('recommended');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Preload all experience images (non-video) when the page loads
  useEffect(() => {
    const urls = mockExperiences.flatMap((exp) => {
      const base = exp.image ? [exp.image] : [];
      const galleryImages = (exp.gallery || []).filter(
        (item) =>
          typeof item === 'string' &&
          item.trim().length > 0 &&
          !item.toLowerCase().endsWith('.mp4')
      );
      return [...base, ...galleryImages];
    });

    const uniqueUrls = Array.from(
      new Set(urls.filter((u): u is string => typeof u === 'string' && u.length > 0))
    );

    const links: HTMLLinkElement[] = [];
    uniqueUrls.forEach((url) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      document.head.appendChild(link);
      links.push(link);
    });

    return () => {
      links.forEach((link) => link.parentNode?.removeChild(link));
    };
  }, []);

  const filteredExperiences = useMemo(() => mockExperiences.filter((exp) => {
    const matchesCategory = selectedCategory === 'All' || exp.category === selectedCategory;
    return matchesCategory;
  }), [selectedCategory]);

  return (
    <div className="flex min-h-screen bg-portal-cream relative">
      <PortalSidebar isOpen={sidebarOpen} />
      {sidebarOpen && (
        <button
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}
      
      <main className="flex-1 p-4 md:p-6 transition-all duration-300 md:ml-10">
        <div className="md:hidden mb-4 flex items-center justify-between">
          <button
            aria-label="Open menu"
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md bg-portal-navy text-portal-cream"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-luxury text-4xl sm:text-5xl text-portal-navy mb-2 font-semibold leading-tight">
            All Experiences
          </h1>
          <p className="text-foreground/60 text-lg md:text-[24px] leading-relaxed">
            Explore our curated collection of exclusive Tuscan experiences
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4 sticky top-0 z-20 bg-portal-cream pb-4">
          {/* Category Filters */}
          <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className={
                  selectedCategory === category
                    ? 'bg-portal-navy text-[#FAF7F2] hover:bg-portal-navy/90 text-base font-medium rounded-full'
                    : 'border-portal-navy/20 text-portal-navy hover:bg-portal-navy/5 text-base font-medium bg-[#FAF7F2] rounded-full'
                }
              >
                {category}
              </Button>
            ))}
          </div>

        </div>

        {/* Results Count */}
        <p className="text-base text-foreground/90 mb-6">
          Showing {filteredExperiences.length} {filteredExperiences.length === 1 ? 'experience' : 'experiences'}
        </p>

        {/* Experience Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>

        {filteredExperiences.length === 0 && (
          <div className="text-center py-12">
            <p className="text-foreground/60">No experiences found matching your criteria.</p>
          </div>
        )}
      </main>

      <ConciergeButton />
    </div>
  );
};

export default Experiences;
