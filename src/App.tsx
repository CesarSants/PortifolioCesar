// import React from 'react'
import { useEffect, useState } from 'react'
import { Container, GlobalCss } from './styles'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Header from './components/Header'
import Home from './components/Home'
import About from './components/About'
import Particles from './utils/Particle'
import Projects from './components/Projects'
import { Provider } from 'react-redux'
import { store } from './store'
import Repositories from './components/Repositories'
import Navigation from './components/Navigation'
import Contact from './components/Contact'
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom'
import ScrollOnLoad from './utils/ScrollOnLoad'
import TouchScrollController from './utils/TouchScrollController'

const App = () => {
  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* <ScrollOnLoad /> */}
        <GlobalCss />
        <Particles />
        <TouchScrollController>
          <Header />
          <Navigation />
          <Container>
            <Home />
            <About />
            <Projects />
            <Repositories />
            <Contact />
          </Container>
        </TouchScrollController>
      </BrowserRouter>
    </Provider>
  )
}

export default App
