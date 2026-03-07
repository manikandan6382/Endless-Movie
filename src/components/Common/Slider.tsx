import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, Mousewheel } from 'swiper/modules'
import { useEffect, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Swiper as SwiperType } from 'swiper';

interface SliderProps {
  children: ReactNode[];
  title?: string;
  showNavigation?: boolean;
  showPagination?: boolean;
  autoplay?: boolean;
  slidesPerView?: {
    mobile?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
    xxxl?: number;
  }
  spaceBetween?: number;
  arrowClassName?: string;
}

const Slider = ({
  children,
  title,
  showNavigation = true,
  showPagination = false,
  autoplay = false,
  slidesPerView = {},
  spaceBetween = 16,
  arrowClassName = '',
}: SliderProps) => {

  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const modules = [];
  if (showNavigation) modules.push(Navigation);
  if (showPagination) modules.push(Pagination);
  if (autoplay) modules.push(Autoplay);
  modules.push(Mousewheel);
  const handlePrev = () => {
    swiperInstance?.slidePrev()
  }
  const handleNext = () => {
    swiperInstance?.slideNext()
  }

  const getSlides = (breakpoint: 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl') => {
    const order = ['mobile', 'md', 'lg', 'xl', 'xxl', 'xxxl'];
    const index = order.indexOf(breakpoint);

    // Check from current breakpoint down to mobile
    for (let i = index; i >= 0; i--) {
      const key = order[i] as keyof typeof slidesPerView;
      if (slidesPerView[key] !== undefined) {
        return slidesPerView[key];
      }
    }

    return 2;
  };
  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.update();  // Force Swiper to recalculate
      setTimeout(() => {
        setIsBeginning(swiperInstance.isBeginning);
        setIsEnd(swiperInstance.isEnd);
      }, 0);
    }
  }, [children.length, swiperInstance]);
  return (
    <section className="max-w-[98%] mx-auto relative z-1 w-full overflow-x-clip">
      <div className="py-7 px-5">
        {title && <h2 className="text-white text-[25px] font-bold mb-6">{title}</h2>}
        {/* Custom Previous Arrow */}
        {showNavigation && (
          <button
            onClick={handlePrev}
            className={`ms-2 absolute left-0 px-0 top-1/2 mt-3 -translate-y-1/2 z-10 bg-black/70 text-white p-0 rounded-full hover:bg-black/90 h-30 cursor-pointer hover:scale-[1.1] duration-800 transition ${isBeginning ? 'opacity-0 cursor-not-allowed hover:scale-100 -translate-full' : ''} ${arrowClassName}`}
          >
            <ChevronLeft className="size-6" />
          </button>
        )}
        <Swiper
          modules={modules}
          spaceBetween={spaceBetween}
          slidesPerView={slidesPerView.mobile ?? 2}
          onSwiper={(swiper) => {
            setSwiperInstance(swiper);
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          grabCursor={true}
          freeMode={true}
          mousewheel={{
            forceToAxis: true,
            sensitivity: 1,
          }}
          pagination={showPagination ? { clickable: true } : false}
          autoplay={autoplay ? { delay: 3000, disableOnInteraction: false } : false}
          breakpoints={{
            640: { slidesPerView: getSlides('md') },
            1024: { slidesPerView: getSlides('lg') },
            1200: { slidesPerView: getSlides('xl') },
            1400: { slidesPerView: getSlides('xxl') },
            1600: { slidesPerView: getSlides('xxxl') },
          }}
        >
          {children.map((child, index) => (
            <SwiperSlide key={index}>{child}</SwiperSlide>
          ))}
        </Swiper>
        {/* Custom Next Arrow */}
        {showNavigation && (
          <button
            onClick={handleNext}
            className={`me-2 absolute px-0 right-0 top-1/2 mt-3 -translate-y-1/2 z-10 bg-black/70 text-white p-0 rounded-full hover:bg-black/90 h-30 cursor-pointer hover:scale-[1.1] duration-800 transition ${isEnd ? 'opacity-0 cursor-not-allowed hover:scale-100 translate-full' : ''} ${arrowClassName}`}
          >
            <ChevronRight className="size-6" />
          </button>
        )}
      </div>
    </section>
  )

}
export default Slider