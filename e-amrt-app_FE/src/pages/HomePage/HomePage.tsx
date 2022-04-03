import React from 'react'
import CarouselImageSlider from '../../components/CarouselImageSlider/CarouselImageSlider'
import HomePageTheme from '../../components/HomePageTheme/HomePageTheme'
import PerfumeCardsSlider from '../../components/PerfumeCardSlider/PerfumeCardsSlider'
import ScrollButton from '../../components/ScrollButton/ScrollButton'
import SliderBrands from '../../components/SliderBrands/SliderBrands'

function HomePage() {
    return (
        <div>
            <ScrollButton />
            <CarouselImageSlider />
            <SliderBrands />
            <HomePageTheme />
            <PerfumeCardsSlider />
        </div>
    )
}

export default HomePage