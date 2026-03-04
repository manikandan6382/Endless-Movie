import React from 'react'
import Nav from '../../components/Nav/Nav'
import Banner from '../../components/Banner/Banner'

const HomeScreen = ()=>{

    return(
        <div className={`bg-netflix-dark-gray`}>
            <Nav />
            <Banner/>
        </div>
    )
}

export default HomeScreen; 