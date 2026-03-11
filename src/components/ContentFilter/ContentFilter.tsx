import { useEffect, useState, type ReactNode } from 'react';
import axios from '../../helpers/axios';
import type { Movie } from '../../types/movie';
import { getCurrentMonthStart } from '../../helpers/requests';
import Cards from '../Common/Cards';
import { TrendingUp, Flame, Star, Plus } from 'lucide-react';
import SkeletonSlider from '../Common/Skeleton/SkeletonSlider';
import { getItem, setItem } from '../../helpers/storage';
interface ContentFilterProps {
    contentType: 'all' | 'movie' | 'tv';
}


type TabType = 'trending' | 'popular' | 'premieres' | 'recent';
const ContentFilters = ({ contentType }: ContentFilterProps) => {
    const [activeTab, setActiveTab] = useState<TabType>(() => {
        return getItem(`activeTab_${contentType}`, 'trending');
    });
    const [content, setContent] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setItem(`activeTab_${contentType}`, activeTab);
        const endPoints: Record<TabType, string> = {
            trending: contentType === 'all' ? '/trending/all/week' : `/trending/${contentType}/week`,
            popular: contentType === 'all' ? '/trending/all/day' : `/${contentType}/popular`,
            premieres: contentType === 'movie' ? '/movie/upcoming' : '/tv/on_the_air',
            recent: contentType === 'movie'
                ? `/discover/movie?primary_release_date.gte=${getCurrentMonthStart()}` :
                `/discover/tv?first_air_date.gte=${getCurrentMonthStart()}`
        }
        const fetchContent = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(endPoints[activeTab]);
                const moviesWithPoster = response.data.results.filter(
                    (movie: Movie) => movie.poster_path
                );
                setContent(moviesWithPoster.slice(0, 25));
            } catch (error) {
                console.error('Failed to fetch content:', error);
                setError('Failed to load content. Please try again.');
            } finally {
                setLoading(false);
            }
        }
        fetchContent()
    }, [activeTab, contentType])

    const tabs: { id: TabType; label: string, icon: ReactNode }[] = [
        { id: 'trending', label: 'Trends Now', icon: <TrendingUp className="size-5 mt-1" /> },
        { id: 'popular', label: 'Popular', icon: <Flame className="size-5 fill-white stroke-white" /> },
        { id: 'premieres', label: 'Premieres', icon: <Star className="size-5 fill-white stroke-white" /> },
        { id: 'recent', label: 'Recently Added', icon: <Plus className="size-5" /> }
    ]


    return (
        <div className="">
            <div className="flex gap-5 justify-between max-w-[90%] mx-auto pb-3 pt-10">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex gap-2 items-center cursor-pointer text-white transition-all duration-300 font-bold text-sm ${activeTab === tab.id
                            ? ' text-white scale-150 '
                            : 'opacity-50'
                            }`}
                    >   {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            {error && (
                <div className="bg-red-600/20 border border-red-600 text-white rounded-lg p-4 mx-auto max-w-2xl my-8">
                    <p className="font-medium">{error}</p>
                </div>
            )}

            {
                loading ? (
                    <SkeletonSlider count={7} isTitle={false} />
                ) : (
                    <div className="">
                        <Cards
                            title=''
                            movies={content}
                            type={contentType}
                            breakPoints={{ mobile: 3, md: 4, lg: 5, xl: 6, xxl: 7 }}
                            arrowClassName='top-2/5!'
                        />
                    </div>
                )
            }
        </div>
    )
}
export default ContentFilters