import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import img1 from '../assets/img1.jpeg';
import img2 from '../assets/img2.jpeg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import img5 from '../assets/img5.jpg';
import img6 from '../assets/img6.jpeg';
import img7 from '../assets/img7.jpg';
import img8 from '../assets/img8.jpeg';
import img9 from '../assets/img9.jpeg';
import img10 from '../assets/img10.jpg';

const Gallery = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];
    const [itemsToShow, setItemsToShow] = useState(5);

    useEffect(() => {
        const updateItemsToShow = () => {
            if (window.innerWidth < 640) setItemsToShow(2);
            else if (window.innerWidth < 768) setItemsToShow(3);
            else if (window.innerWidth < 1024) setItemsToShow(4);
            else setItemsToShow(5);
        };
        updateItemsToShow();
        window.addEventListener('resize', updateItemsToShow);
        return () => window.removeEventListener('resize', updateItemsToShow);
    }, []);

    const nextSlide = () => {
        if (currentIndex < images.length - itemsToShow) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (selectedImageIndex === null) return;
            if (e.key === 'ArrowLeft') {
                setSelectedImageIndex(prev => prev > 0 ? prev - 1 : prev);
            } else if (e.key === 'ArrowRight') {
                setSelectedImageIndex(prev => prev < images.length - 1 ? prev + 1 : prev);
            } else if (e.key === 'Escape') {
                setSelectedImageIndex(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImageIndex, images.length]);

    useEffect(() => {
        if (selectedImageIndex !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedImageIndex]);

    return (
        <div className="bento-card p-4 col-span-1 md:col-span-6 space-y-2 group animate-fade-in animation-delay-600  bg-white dark:bg-[#0b0d0e]">
            <h2 className="text-lg font-bold">Gallery</h2>
            <div className="relative">
                <div className="relative overflow-hidden w-full">
                    <div 
                        className="flex gap-2 transition-transform duration-500 ease-in-out w-full" 
                        style={{ transform: `translateX(calc(-${currentIndex} * ((100% + 8px) / ${itemsToShow})))` }}
                    > 
                        {images.map((img, index) => (
                            <div 
                                key={index}
                                onClick={() => setSelectedImageIndex(index)}
                                className="relative flex-shrink-0 bg-transparent overflow-hidden transition-all duration-200 group/image cursor-pointer aspect-square hover:opacity-80"
                                style={{ width: `calc((100% - ${8 * (itemsToShow - 1)}px) / ${itemsToShow})` }}
                            >
                                <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>

                <button 
                    onClick={prevSlide}
                    disabled={currentIndex === 0} 
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-12 flex items-center justify-center bg-black/90 text-white hover:bg-black transition-all duration-200 disabled:opacity-0 disabled:pointer-events-none" 
                    aria-label="Previous image"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>
                
                <button 
                    onClick={nextSlide}
                    disabled={currentIndex >= images.length - itemsToShow}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-12 flex items-center justify-center bg-black/90 text-white hover:bg-black transition-all duration-200 disabled:opacity-0 disabled:pointer-events-none"
                    aria-label="Next image"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>

            {selectedImageIndex !== null && createPortal(
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1a1a1a]"
                    onClick={() => setSelectedImageIndex(null)}
                >
                   
                    <div className="absolute top-4 left-4 bg-black/40 text-white/90 px-4 py-2 text-sm font-medium">
                        {selectedImageIndex + 1} / {images.length}
                    </div>

                    <button 
                        onClick={() => setSelectedImageIndex(null)}
                        className="absolute top-4 right-4 bg-black/40 text-white/70 hover:text-white p-2 transition-colors"
                        aria-label="Close modal"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>

                    {selectedImageIndex > 0 && (
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImageIndex(selectedImageIndex - 1);
                            }}
                            className="absolute left-4 bg-black/40 text-white/70 hover:text-white p-3 lg:p-4 transition-colors"
                            aria-label="Previous fullscreen image"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                            </svg>
                        </button>
                    )}

                    {selectedImageIndex < images.length - 1 && (
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImageIndex(selectedImageIndex + 1);
                            }}
                            className="absolute right-4 bg-black/40 text-white/70 hover:text-white p-3 lg:p-4 transition-colors"
                            aria-label="Next fullscreen image"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </button>
                    )}

                    <div 
                        className="relative max-w-5xl max-h-[85vh] flex items-center justify-center p-4 lg:p-12"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img 
                            src={images[selectedImageIndex]} 
                            alt={`Expanded view ${selectedImageIndex + 1}`} 
                            className="max-w-full max-h-[85vh] object-contain shadow-2xl" 
                        />
                    </div>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 text-white/70 px-4 py-2 text-xs font-medium">
                        Use arrow keys to navigate • ESC to close
                    </div>
                </div>,
                document.body
            )}
        </div>
    )

}
export default Gallery;