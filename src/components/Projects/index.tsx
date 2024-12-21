import { useEffect, useRef, useState } from 'react'
import HeadlineScroll from '../../utils/SlideTitle'
import { Container } from './styles'
import fundo from '../../assets/backGrounds/cinza-11.jpg'
import Slider, { Settings } from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import foto2 from '../../assets/images/starwars3.png'
import foto1 from '../../assets/images/starwars1.png'
import { useGetToolsQuery, useGetWebsitesQuery } from '../../services/api'

// type Props = {
//   projects: Projeto[]
// }

// const Projects: React.FC<Props> = ({ projects }) => {
const Projects: React.FC = () => {
  const [menu, setMenu] = useState('site')
  const [activeButton, setActiveButton] = useState('site')
  const contentWrapperRef = useRef<HTMLDivElement>(null)
  const [imageWidth, setImageWidth] = useState('390px')

  const [isVisible, setIsVisible] = useState(true)

  // const [isFading, setIsFading] = useState(false)
  // const [isAnimating, setIsAnimating] = useState(false)
  // const [showSlider, setShowSlider] = useState(true)
  // const [imageWidth, setImageWidth] = useState<SliderState['imageWidth']>(390)
  // const sliderRef = useRef<Slider>(null)

  const { data: tool, isLoading: isLoadingTool } = useGetToolsQuery()
  const { data: web, isLoading: isLoadingWeb } = useGetWebsitesQuery()

  const handleButtonClick = (menuName: 'site' | 'tools') => {
    setMenu(menuName)
    setActiveButton(menuName)
    // if (contentWrapperRef.current) {
    //   contentWrapperRef.current.scrollIntoView({ behavior: 'smooth' })
    // }
    if (contentWrapperRef.current) {
      const element = contentWrapperRef.current.getBoundingClientRect()
      const scrollPosition = window.scrollY + element.top + 60
      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      })
    }
  }

  const RightArrowSVG = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      style={{ width: '30px', height: '30px' }}
      xmlSpace="preserve"
    >
      <path
        transform="rotate(-134.999 202.842 133.82)"
        style={{ fill: '#a5f2e5' }}
        d="M117.018 70.117h171.645v127.404H117.018z"
      />
      <path d="M439.573 247.56 195.42 3.408a11.631 11.631 0 0 0-16.454 0L72.427 109.947c-4.544 4.544-4.544 11.911 0 16.453l129.6 129.6-129.6 129.6a11.635 11.635 0 0 0 0 16.452l106.539 106.539a11.596 11.596 0 0 0 8.228 3.408c2.977 0 5.955-1.135 8.228-3.408l59.582-59.581c4.544-4.544 4.544-11.909 0-16.453-4.544-4.542-11.909-4.544-16.453 0l-51.356 51.355-90.085-90.084 227.699-227.699 90.085 90.085-117.393 117.392c-4.544 4.544-4.544 11.911 0 16.453 4.544 4.544 11.909 4.542 16.454 0l125.62-125.618a11.635 11.635 0 0 0 3.407-8.226c0-.07-.009-.137-.011-.206a11.594 11.594 0 0 0-3.398-8.449zM187.194 28.087l121.374 121.374-90.086 90.085L97.107 118.174l90.087-90.087z" />
      <path
        style={{ fill: '#62d9c7' }}
        d="m297.499 373.606 117.393-117.392-90.085-90.085-227.7 227.697 90.085 90.085 51.356-51.355c4.542-4.544 11.909-4.544 16.453 0l42.498-42.498c-4.543-4.542-4.543-11.909 0-16.452z"
      />
    </svg>
  )

  const LeftArrowSVG = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      style={{ width: '30px', height: '30px', transform: 'rotate(180deg)' }}
      xmlSpace="preserve"
    >
      <path
        transform="rotate(-134.999 202.842 133.82)"
        style={{ fill: '#a5f2e5' }}
        // style={{ fill: '#d189f3' }}
        d="M117.018 70.117h171.645v127.404H117.018z"
      />
      <path d="M439.573 247.56 195.42 3.408a11.631 11.631 0 0 0-16.454 0L72.427 109.947c-4.544 4.544-4.544 11.911 0 16.453l129.6 129.6-129.6 129.6a11.635 11.635 0 0 0 0 16.452l106.539 106.539a11.596 11.596 0 0 0 8.228 3.408c2.977 0 5.955-1.135 8.228-3.408l59.582-59.581c4.544-4.544 4.544-11.909 0-16.453-4.544-4.542-11.909-4.544-16.453 0l-51.356 51.355-90.085-90.084 227.699-227.699 90.085 90.085-117.393 117.392c-4.544 4.544-4.544 11.911 0 16.453 4.544 4.544 11.909 4.542 16.454 0l125.62-125.618a11.635 11.635 0 0 0 3.407-8.226c0-.07-.009-.137-.011-.206a11.594 11.594 0 0 0-3.398-8.449zM187.194 28.087l121.374 121.374-90.086 90.085L97.107 118.174l90.087-90.087z" />
      <path
        style={{ fill: '#62d9c7' }}
        // style={{ fill: '#89209e' }}
        d="m297.499 373.606 117.393-117.392-90.085-90.085-227.7 227.697 90.085 90.085 51.356-51.355c4.542-4.544 11.909-4.544 16.453 0l42.498-42.498c-4.543-4.542-4.543-11.909 0-16.452z"
      />
    </svg>
  )

  const CustomPrevArrow = ({ onClick }: { onClick?: () => void }) => (
    <button
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        position: 'absolute',
        left: '-33px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 2,
        padding: 10
      }}
      aria-label="Previous Slide"
    >
      <LeftArrowSVG />
    </button>
  )

  const CustomNextArrow = ({ onClick }: { onClick?: () => void }) => (
    <button
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        position: 'absolute',
        right: '-33px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 2,
        padding: 10
      }}
      aria-label="Next Slide"
    >
      <RightArrowSVG />
    </button>
  )

  const [settings, setSettings] = useState<Settings>({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    useCSS: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 867, // Tela com largura de até 867px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  })

  // const settingsImg: Settings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   useCSS: true,
  //   arrows: true,
  //   prevArrow: <CustomPrevArrow />,
  //   nextArrow: <CustomNextArrow />
  // }

  const settingsImg = (imageCount: number): Settings => {
    return {
      dots: false,
      infinite: imageCount > 1,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      useCSS: true,
      arrows: imageCount > 1,
      prevArrow: imageCount > 1 ? <CustomPrevArrow /> : undefined,
      nextArrow: imageCount > 1 ? <CustomNextArrow /> : undefined
    }
  }

  //original sem fade
  const handleToggleSlidesButtonClick = () => {
    setSettings((prevSettings) => {
      const newSettings = { ...prevSettings }

      if (newSettings.slidesToShow === 2) {
        newSettings.slidesToShow = 1
        newSettings.slidesToScroll = 1
        setImageWidth('590px')
      } else {
        newSettings.slidesToShow = 2
        newSettings.slidesToScroll = 2
        setImageWidth('390px')
      }

      return newSettings
    })
  }

  //fade na volta com problemas
  // const handleToggleSlidesButtonClick = () => {
  //   setIsFading(true)

  //   setTimeout(() => {
  //     setSettings((prevSettings) => {
  //       const newSettings = { ...prevSettings }

  //       if (newSettings.slidesToShow === 2) {
  //         newSettings.slidesToShow = 1
  //         newSettings.slidesToScroll = 1
  //         setImageWidth('590px')
  //       } else {
  //         newSettings.slidesToShow = 2
  //         newSettings.slidesToScroll = 2
  //         setImageWidth('390px')
  //       }

  //       return newSettings
  //     })

  //
  //     setTimeout(() => setIsFading(false), 300)
  //   }, 300)
  // }

  return (
    <Container id="projetos">
      <HeadlineScroll content="projetos" height="25%" />
      <div className="content-wrapper" ref={contentWrapperRef}>
        <aside
          className="aside"
          data-aos="fade-right"
          data-aos-duration="3000"
          data-aos-delay="200"
        >
          <nav className="nav-tipos">
            <ul>
              <li>
                <button
                  className={activeButton === 'site' ? 'isActive' : ''}
                  onClick={() => handleButtonClick('site')}
                >
                  Websites
                </button>
              </li>
              <li>
                <button
                  className={activeButton === 'tools' ? 'isActive' : ''}
                  onClick={() => handleButtonClick('tools')}
                >
                  Ferramentas
                </button>
              </li>
            </ul>
          </nav>
        </aside>
        <div
          className="content"
          data-aos="fade-up"
          data-aos-delay="300"
          data-aos-duration="1000"
        >
          <nav className="nav-tipos nav-tipos2">
            <ul>
              <li>
                <button
                  className={activeButton === 'site' ? 'isActive' : ''}
                  onClick={() => handleButtonClick('site')}
                >
                  Websites
                </button>
              </li>
              <li>
                <button
                  className={activeButton === 'tools' ? 'isActive' : ''}
                  onClick={() => handleButtonClick('tools')}
                >
                  Ferramentas
                </button>
              </li>
            </ul>
          </nav>
          <div className="background">
            <img src={fundo} alt="" />
          </div>
          <div className="contentEncaps">
            {menu === 'site' && (
              <div
                className="contentPrincipal1"
                data-aos="fade-up"
                data-aos-delay="400"
                data-aos-duration="1000"
              >
                {/* <div
              //   className={`slider-wrapper contentPrincipal1 ${
              //     isFading ? 'fade-out' : 'fade-in'
              //   }`}
              //   style={{
              //     transition: 'opacity 0.3s ease-in-out',
              //     position: 'relative'
              //   }}
              //   data-aos="fade-up"
              //   data-aos-delay="400"
              //   data-aos-duration="1000"
              // >
                {/* <Slider className="slider" ref={sliderRef} {...settings}> */}
                <Slider className="slider" {...settings}>
                  {web?.map((project) => (
                    <div
                      className="cardContainer cardContainer1"
                      key={project.id}
                    >
                      <div
                        className="card"
                        data-aos="fade-up"
                        data-aos-delay="400"
                        data-aos-duration="1000"
                      >
                        <div
                          className="sliderImgContainer"
                          onMouseDown={(e: React.MouseEvent) =>
                            e.stopPropagation()
                          }
                          onTouchStart={(e: React.TouchEvent) =>
                            e.stopPropagation()
                          }
                        >
                          <Slider
                            className="slider2"
                            {...settingsImg(project.gallery.length)}
                          >
                            {project.gallery.map((image, index) => (
                              <div className="imgContainer" key={index}>
                                <img
                                  src={image.url}
                                  alt={`Imagem ${index + 1} do projeto ${
                                    project.id
                                  }`}
                                  style={{ maxWidth: imageWidth }}
                                />
                              </div>
                            ))}
                          </Slider>
                        </div>
                        <p>{project.descricao}</p>
                        <a
                          href={project.link}
                          target="_blank"
                          className="cta"
                          rel="noreferrer"
                        >
                          <span>Visite o Site</span>
                          <svg width="15px" height="10px" viewBox="0 0 13 10">
                            <path d="M1,5 L11,5"></path>
                            <polyline points="8 1 12 5 8 9"></polyline>
                          </svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            )}
            {menu === 'tools' && (
              <div
                className="contentPrincipal1"
                data-aos="fade-up"
                data-aos-delay="400"
                data-aos-duration="1000"
              >
                <Slider className="slider" {...settings}>
                  {tool?.map((project) => (
                    <div
                      className="cardContainer cardContainer1"
                      key={project.id}
                    >
                      <div
                        className="card"
                        data-aos="fade-up"
                        data-aos-delay="400"
                        data-aos-duration="1000"
                      >
                        <div
                          className="sliderImgContainer"
                          onMouseDown={(e: React.MouseEvent) =>
                            e.stopPropagation()
                          }
                          onTouchStart={(e: React.TouchEvent) =>
                            e.stopPropagation()
                          }
                        >
                          <Slider
                            className="slider2"
                            // {...{
                            //   ...settingsImg,
                            //   infinite: project.gallery.length > 1
                            // }}
                            {...settingsImg(project.gallery.length)}
                          >
                            {project.gallery.map((image, index) => (
                              <div className="imgContainer" key={index}>
                                <img
                                  src={image.url}
                                  alt={`Imagem ${index + 1} do projeto ${
                                    project.id
                                  }`}
                                  style={{ maxWidth: imageWidth }}
                                />
                              </div>
                            ))}
                          </Slider>
                        </div>
                        <p>{project.descricao}</p>
                        <a
                          href={project.link}
                          target="_blank"
                          className="cta"
                          rel="noreferrer"
                        >
                          <span>Visite o Site</span>
                          <svg width="15px" height="10px" viewBox="0 0 13 10">
                            <path d="M1,5 L11,5"></path>
                            <polyline points="8 1 12 5 8 9"></polyline>
                          </svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            )}
          </div>
          <button
            className="toggleSlidesButton"
            type="button"
            onClick={handleToggleSlidesButtonClick}
          >
            {settings.slidesToShow === 2 ? '1' : '2'}
          </button>
        </div>
      </div>
    </Container>
  )
}

export default Projects
