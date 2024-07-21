import React from 'react'
import Slider from "../components/Slider"
import TopCategories from '../components/TopCategory'
import CallSection from "../components/CallSection"
import FeaturedProduct from '../components/FeaturedProduct'


const Home = () => {
  return (
    <div>
      <Slider/>
      <TopCategories/>
      <FeaturedProduct/>
      <CallSection/>
    </div>
  )
}

export default Home
