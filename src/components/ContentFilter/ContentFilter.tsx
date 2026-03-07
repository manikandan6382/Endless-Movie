import { useEffect, useState } from 'react';
import axios from '../../helpers/axios';
import type { Movie } from '../../Pages/MovieDetails/MovieDetails';
import { getCurrentMonthStart } from '../../helpers/requests';
import Cards from '../Common/Cards';
interface ContentFilterProps {
    contentType: 'all' | 'movie' | 'tv';
}


type TabType = 'trending' | 'popular' | 'premieres' | 'recent' ;
const ContentFilters = ({ contentType }: ContentFilterProps) => {
    const [activeTab, setActiveTab] = useState<TabType>('trending');
    const [content, setContent] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const endPoints:Record<TabType, string> = {
            trending: contentType === 'all' ? '/trending/all/week' : `/trending/${contentType}/week`,
            popular: contentType === 'all' ? '/trending/all/day' : `/${contentType}/popular`,
            premieres: contentType === 'movie' ? '/movie/upcoming' : '/tv/on_the_air',
            recent: contentType === 'movie'
                ? `/discover/movie?primary_release_date.gte=${getCurrentMonthStart()}` :
                `/discover/tv?first_air_date.gte=${getCurrentMonthStart()}`
        }
        const fetchContent = async () => {
            setLoading(true);
            const response = await axios.get(endPoints[activeTab]);
            setContent(response.data.results.slice(0, 25));
            setLoading(false)
        }
        fetchContent()
    }, [activeTab, contentType])

    const tabs: { id: TabType; label: string }[] = [
        { id: 'trending', label: 'Trending Now' },
        { id: 'popular', label: 'Popular' },
        { id: 'premieres', label: 'Premieres' },
        { id: 'recent', label: 'Recently Added' }
    ]


    return (
        <div className="">
            <div className="">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`${activeTab === tab.id
                            ? 'bg-netflix-red text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {
                loading ? (
                    <div className="">Loading...</div>
                ) : (
                    <div className="">
                        <Cards
                            title=''
                            movies={content}
                            type={contentType}
                            breakPoints={{ mobile: 3, md: 4, lg: 5, xl: 6, xxl: 7 }}
                        />
                    </div>
                )
            }
        </div>
    )
}
export default ContentFilters