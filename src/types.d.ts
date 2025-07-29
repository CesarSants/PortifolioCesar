declare interface GalleryItem {
  url: string
}

declare type Projeto = {
  id: number
  categoria: string
  descricao: string
  nome: string
  link: string
  gallery: GalleryItem[]
}

// import { useEffect, useRef, useState } from 'react'
// import HeadlineScroll from '../../utils/SlideTitle'
// import { Container } from './styles'
// import fundo from '../../assets/backGrounds/cinza-11.jpg'
// import Slider, { Settings } from 'react-slick'
// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'
// import foto2 from '../../assets/images/starwars3.png'
// import foto1 from '../../assets/images/starwars1.png'
// import { useGetToolsQuery, useGetWebsitesQuery } from '../../services/api'

// type Props = {
//   projects: Projeto[]
// }

// const Projects: React.FC<Props> = ({ projects }) => {
//   const [menu, setMenu] = useState('site')
//   const [activeButton, setActiveButton] = useState('site')
//   const contentWrapperRef = useRef<HTMLDivElement>(null)
//   const [imageWidth, setImageWidth] = useState('390px')

//   const [isVisible, setIsVisible] = useState(true)

//   const { data: tool, isLoading: isLoadingTool } = useGetToolsQuery()
//   const { data: web, isLoading: isLoadingWeb } = useGetWebsitesQuery()

//   const handleButtonClick = (menuName: 'site' | 'tools') => {
//     setMenu(menuName)
//     setActiveButton(menuName)

//     if (contentWrapperRef.current) {
//       const element = contentWrapperRef.current.getBoundingClientRect()
//       const scrollPosition = window.scrollY + element.top + 60
//       window.scrollTo({
//         top: scrollPosition,
//         behavior: 'smooth'
//       })
//     }
//   }

//   const [settings, setSettings] = useState<Settings>({
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 2,
//     slidesToScroll: 2,
//     useCSS: true,
//     arrows: false
//   })

//   const settingsImg: Settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     useCSS: true,
//     arrows: true,
//   }

//   const handleToggleSlidesButtonClick = () => {
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
//   }

//   return (
//     <Container>
//       <HeadlineScroll content="projetos" height="25%" />
//       <div className="content-wrapper" ref={contentWrapperRef}>
//         <aside
//           className="aside"
//           data-aos="fade-right"
//           data-aos-duration="3000"
//           data-aos-delay="200"
//         >
//           <nav className="nav-tipos">
//             <ul>
//               <li>
//                 <button
//                   className={activeButton === 'site' ? 'isActive' : ''}
//                   onClick={() => handleButtonClick('site')}
//                 >
//                   Websites
//                 </button>
//               </li>
//               <li>
//                 <button
//                   className={activeButton === 'tools' ? 'isActive' : ''}
//                   onClick={() => handleButtonClick('tools')}
//                 >
//                   Ferramentas
//                 </button>
//               </li>
//             </ul>
//           </nav>
//         </aside>
//         <div
//           className="content"
//           data-aos="fade-up"
//           data-aos-delay="300"
//           data-aos-duration="1000"
//         >
//           <div className="background">
//             <img src={fundo} alt="" />
//           </div>
//           <div className="contentEncaps">
//             {menu === 'site' && (
//               <div
//                 className="contentPrincipal1"
//                 data-aos="fade-up"
//                 data-aos-delay="400"
//                 data-aos-duration="1000"
//               >
//                 <Slider className="slider" {...settings}>
//                   {web?.map((project) => (
//                     <div
//                       className="cardContainer cardContainer1"
//                       key={project.id}
//                     >
//                       <div
//                         className="card"
//                         data-aos="fade-up"
//                         data-aos-delay="400"
//                         data-aos-duration="1000"
//                       >
//                         <div
//                           className="sliderImgContainer"
//                           onMouseDown={(e: React.MouseEvent) =>
//                             e.stopPropagation()
//                           }
//                           onTouchStart={(e: React.TouchEvent) =>
//                             e.stopPropagation()
//                           }
//                         >
//                           <Slider className="slider2" {...settingsImg}>
//                             <div className="imgContainer">
//                               <img
//                                 src={project.gallery}
//                                 alt=""
//                                 style={{ maxWidth: imageWidth }}
//                               />
//                             </div>
//                           </Slider>
//                         </div>
//                         <p>{project.descricao}</p>
//                         <a href={project.link} className="cta">
//                           <span>Visite o Site</span>
//                           <svg width="15px" height="10px" viewBox="0 0 13 10">
//                             <path d="M1,5 L11,5"></path>
//                             <polyline points="8 1 12 5 8 9"></polyline>
//                           </svg>
//                         </a>
//                       </div>
//                     </div>
//                   ))}
//                 </Slider>
//               </div>
//             )}
//             {menu === 'tools' && (
//               <div className="contentPrincipal2">ola mundo 2</div>
//             )}
//           </div>
//         </div>
//       </div>
//     </Container>
//   )
// }

// export default Projects

// Definições para visualViewport API
interface VisualViewport extends EventTarget {
  readonly height: number
  readonly width: number
  readonly scale: number
  readonly offsetLeft: number
  readonly offsetTop: number
  readonly pageLeft: number
  readonly pageTop: number
  onresize: ((this: VisualViewport, ev: Event) => any) | null
  onscroll: ((this: VisualViewport, ev: Event) => any) | null
}

interface Window {
  visualViewport: VisualViewport | null
}

// Definições para CSS.supports
interface CSS {
  supports(property: string, value?: string): boolean
}

declare global {
  const CSS: CSS
}
