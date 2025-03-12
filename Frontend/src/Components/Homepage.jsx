import React from 'react'
import { Images } from '../assets/assets'
import Navigation from './HomePageComponents/Navigation'
import HeaderContact from './HomePageComponents/HeaderContact'
import HomePageProducts from './HomePageComponents/HomePageProducts'
import HomeCarousel from './HomePageComponents/HomeCarousel'


const Homepage = () => {
  return (
    <div>
      <HomeCarousel/>
      <HomePageProducts/>
    </div>
  )
}

export default Homepage