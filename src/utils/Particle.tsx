// import Particles from 'react-tsparticles'
// import { loadFull } from 'tsparticles'
// import React from 'react'
// import { Engine, tsParticles } from '@tsparticles/engine'

// function Particle() {
//   const particlesInit = async (main) => {
//     console.log(main)
//     await loadFull(main)
//   }
//   const particlesLoaded = (container) => {
//     console.log(container)
//   }
//   return (
//     <Particles
//       id="tsparticles"
//       init={particlesInit}
//       loaded={particlesLoaded}
//       params={{
//         particles: {
//           number: {
//             value: 130,
//             density: {
//               enable: false,
//               value_area: 800
//             }
//           },
//           color: {
//             value: '#ff09d4'
//           },
//           shape: {
//             type: 'image',
//             stroke: {
//               width: 1,
//               color: '#f71212'
//             },
//             polygon: {
//               nb_sides: 11
//             },
//             image: {
//               src: 'https://fake-api-khaki.vercel.app/img/globo.png',
//               width: 100,
//               height: 100
//             }
//           },
//           opacity: {
//             value: 0.3678528588564576,
//             random: false,
//             anim: {
//               enable: true,
//               speed: 0.6,
//               opacity_min: 0.0890955184954197,
//               sync: true
//             }
//           },
//           size: {
//             value: 8,
//             random: true,
//             anim: {
//               enable: false,
//               speed: 40,
//               size_min: 0.1,
//               sync: false
//             }
//           },
//           line_linked: {
//             enable: true,
//             distance: 200,
//             color: '#ffffff',
//             opacity: 0.13594562175129954,
//             width: 1.5993602558976416
//           },
//           move: {
//             enable: true,
//             speed: 1,
//             direction: 'none',
//             random: true,
//             straight: false,
//             out_mode: 'out',
//             bounce: false,
//             attract: {
//               enable: false,
//               rotateX: 7676.92922830868,
//               rotateY: 7916.833266693327
//             }
//           }
//         },
//         interactivity: {
//           detect_on: 'canvas',
//           events: {
//             onhover: {
//               enable: true,
//               mode: 'grab'
//             },
//             onclick: {
//               enable: true,
//               mode: 'bubble'
//             },
//             resize: true
//           },
//           modes: {
//             grab: {
//               distance: 194.39022217182483,
//               line_linked: {
//                 opacity: 0.8943589743589744
//               }
//             },
//             bubble: {
//               distance: 194.39022217182483,
//               size: 16.199185180985403,
//               duration: 0.890955184954197,
//               opacity: 0.1133942962668978,
//               speed: 3
//             },
//             repulse: {
//               distance: 200,
//               duration: 0.4
//             },
//             push: {
//               particles_nb: 4
//             },
//             remove: {
//               particles_nb: 2
//             }
//           }
//         },
//         retina_detect: true
//       }}
//     />
//   )
// }

// export default Particle

////////////////////////////////////////////////////////////////////////////////////////////////

//push

// import { useEffect, useMemo, useState } from 'react'
// import Particles, { initParticlesEngine } from '@tsparticles/react'
// import {
//   type Container,
//   type ISourceOptions,
//   MoveDirection,
//   OutMode
// } from '@tsparticles/engine'
// // import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// // import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
// import { loadSlim } from '@tsparticles/slim' // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// // import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

// const Particle = () => {
//   const [init, setInit] = useState(false)

//   // this should be run only once per application lifetime
//   useEffect(() => {
//     initParticlesEngine(async (engine) => {
//       // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
//       // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
//       // starting from v2 you can add only the features you need reducing the bundle size
//       //await loadAll(engine);
//       //await loadFull(engine);
//       await loadSlim(engine)
//       //await loadBasic(engine);
//     }).then(() => {
//       setInit(true)
//     })
//   }, [])

//   const particlesLoaded = async (container?: Container): Promise<void> => {
//     console.log(container)
//   }

//   const options: ISourceOptions = useMemo(
//     () => ({
//       background: {
//         color: {
//           value: '#33092c'
//         }
//       },
//       fpsLimit: 120,
//       interactivity: {
//         events: {
//           onClick: {
//             enable: true,
//             mode: 'push'
//           },
//           onHover: {
//             enable: true,
//             mode: 'grab'
//           }
//         },
//         modes: {
//           push: {
//             quantity: 6
//           },
//           repulse: {
//             distance: 200,
//             duration: 0.4
//           },
//           grab: {
//             distance: 220
//           },
//           remove: {
//             quantity: 6
//           }
//         }
//       },
//       particles: {
//         color: {
//           value: '#610f53'
//         },
//         links: {
//           color: '#c548b0',
//           distance: 200,
//           enable: true,
//           opacity: 0.5,
//           width: 1
//         },
//         move: {
//           direction: MoveDirection.none,
//           enable: true,
//           outModes: {
//             default: OutMode.out
//           },
//           random: true,
//           speed: 3,
//           straight: false
//         },
//         number: {
//           value: 150,
//           density: {
//             enable: true,
//             area: 800
//           }
//         },
//         opacity: {
//           value: 0.5
//         },
//         shape: {
//           type: 'image', // Tipo imagem
//           options: {
//             image: [
//               {
//                 src: 'https://fake-api-khaki.vercel.app/img/globo.png', // Substitua por sua URL
//                 width: 100,
//                 height: 100
//               },
//               {
//                 src: 'https://fake-api-khaki.vercel.app/img/css.png', // Substitua por sua URL
//                 width: 100,
//                 height: 100
//               },
//               {
//                 src: 'https://fake-api-khaki.vercel.app/img/git.png', // Substitua por sua URL
//                 width: 100,
//                 height: 100
//               },
//               {
//                 src: 'https://fake-api-khaki.vercel.app/img/github.png', // Substitua por sua URL
//                 width: 100,
//                 height: 100
//               },
//               {
//                 src: 'https://fake-api-khaki.vercel.app/img/html.png', // Substitua por sua URL
//                 width: 100,
//                 height: 100
//               },
//               {
//                 src: 'https://fake-api-khaki.vercel.app/img/javascript.png', // Substitua por sua URL
//                 width: 100,
//                 height: 100
//               },
//               {
//                 src: 'https://fake-api-khaki.vercel.app/img/react.png', // Substitua por sua URL
//                 width: 100,
//                 height: 100
//               },
//               {
//                 src: 'https://fake-api-khaki.vercel.app/img/redux.png', // Substitua por sua URL
//                 width: 100,
//                 height: 100
//               },
//               {
//                 src: 'https://fake-api-khaki.vercel.app/img/td.png', // Substitua por sua URL
//                 width: 100,
//                 height: 100
//               },
//               {
//                 src: 'https://fake-api-khaki.vercel.app/img/vite.png', // Substitua por sua URL
//                 width: 100,
//                 height: 100
//               },
//               {
//                 src: 'https://fake-api-khaki.vercel.app/img/vscode.png', // Substitua por sua URL
//                 width: 100,
//                 height: 100
//               },
//               {
//                 src: 'https://fake-api-khaki.vercel.app/img/vue.png', // Substitua por sua URL
//                 width: 100,
//                 height: 100
//               }
//             ]
//           }
//         },
//         size: {
//           value: { min: 1, max: 12 }
//         }
//       },
//       detectRetina: true
//     }),
//     []
//   )

//   if (init) {
//     return (
//       <Particles
//         id="tsparticles"
//         particlesLoaded={particlesLoaded}
//         options={options}
//       />
//     )
//   }
//   return <></>
// }

// export default Particle

//////////////////////////////////////////////////////////////////////

//bubbles
import fundo from '../../assets/backGrounds/cinza-19.webp'
import { useEffect, useMemo, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { Opacity, tsParticles } from '@tsparticles/engine'
import { loadBubbleEffect } from '@tsparticles/effect-bubble'
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode
} from '@tsparticles/engine'
// import { loadAll } from '@tsparticles/all' // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
import { loadFull } from 'tsparticles' // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from '@tsparticles/slim' // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
import { FadeLoader } from 'react-spinners'
import { loadBasic } from '@tsparticles/basic' // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

const Particle = () => {
  const [init, setInit] = useState(false)

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      // await loadAll(engine)
      await loadFull(engine)
      await loadSlim(engine)
      await loadBubbleEffect(tsParticles)
      await loadBasic(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container)
  }

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        // image: 'url(https://fake-api-khaki.vercel.app/img/css.png)', // Ajuste aqui se necessário
        // position: 'center',
        // repeat: 'no-repeat',
        // size: 'cover',
        color: {
          value: '#21051c'
          // value: '#ded1f5'
          // value: '#3e79f7'
          // value: '#33092c5'
          // value: '#33092c'original
        },
        opacity: 0.7
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: 'bubble'
          },
          onHover: {
            enable: true,
            mode: 'grab'
          }
        },
        modes: {
          bubble: {
            distance: 200,
            duration: 2,
            size: 40,
            opacity: 0.6,
            speed: 3,
            // mix: false,
            // effectClose: true,
            // pauseOnStop: true,
            anim: {
              enable: true,
              speed: 10, // Aumenta a suavidade da diminuição
              size: 8, // Ajusta a suavidade no tamanho
              opacity: 0.4 // Ajusta a suavidade da opacidade
              // sync: true
            }
          },
          push: {
            quantity: 6
          },
          repulse: {
            distance: 200,
            duration: 0.4
          },
          grab: {
            distance: 220,
            links: {
              opacity: 1
            }
          },
          remove: {
            quantity: 6
          }
        }
      },
      particles: {
        color: {
          value: '#610f53'
        },
        links: {
          color: '#d32323',
          distance: 200,
          enable: true,
          opacity: 0.6,
          width: 1.6
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out
          },
          random: true,
          speed: 2,
          straight: false
        },
        number: {
          value: 150,
          density: {
            enable: true,
            area: 800
          }
        },
        opacity: {
          value: 0.5
        },
        shape: {
          type: 'image',
          options: {
            image: [
              {
                src: 'https://fake-api-khaki.vercel.app/img/css.png',
                width: 920,
                height: 1129,
                size: 'contain'
              },
              {
                src: 'https://fake-api-khaki.vercel.app/img/git.png',
                width: 360,
                height: 360,
                size: 'contain'
              },
              {
                src: 'https://fake-api-khaki.vercel.app/img/github.png',
                width: 900,
                height: 930,
                size: 'contain'
              },
              {
                src: 'https://fake-api-khaki.vercel.app/img/html.png',
                width: 1200,
                height: 1200,
                size: 'contain'
              },
              {
                src: 'https://fake-api-khaki.vercel.app/img/javascript.png',
                width: 980,
                height: 980,
                size: 'contain'
              },
              {
                src: 'https://fake-api-khaki.vercel.app/img/react.png',
                width: 500,
                height: 500,
                size: 'contain'
              },
              {
                src: 'https://fake-api-khaki.vercel.app/img/redux.png',
                width: 920,
                height: 920,
                size: 'contain'
              },
              {
                src: 'https://fake-api-khaki.vercel.app/img/td.png',
                width: 512,
                height: 512,
                size: 'contain'
              },
              {
                src: 'https://fake-api-khaki.vercel.app/img/vite.png',
                width: 1280,
                height: 720,
                size: 'contain'
              },
              {
                src: 'https://fake-api-khaki.vercel.app/img/vue.png',
                width: 920,
                height: 920,
                size: 'contain'
              },
              {
                src: 'https://fake-api-khaki.vercel.app/img/docker.png',
                width: 441,
                height: 267,
                size: 'contain'
              },
              {
                src: 'https://fake-api-khaki.vercel.app/img/java.png',
                width: 278,
                height: 440,
                size: 'contain'
              },
              {
                src: 'https://fake-api-khaki.vercel.app/img/kubernetes.png',
                width: 282,
                height: 272,
                size: 'contain'
              },
              {
                src: 'https://fake-api-khaki.vercel.app/img/mongodb.png',
                width: 205,
                height: 401,
                size: 'contain'
              },
              {
                src: 'https://fake-api-khaki.vercel.app/img/node.png',
                width: 631,
                height: 885,
                size: 'contain'
              },
              {
                src: 'https://fake-api-khaki.vercel.app/img/postgresql.png',
                width: 413,
                height: 419,
                size: 'contain'
              },
              {
                src: 'https://fake-api-khaki.vercel.app/img/primefaces.png',
                width: 373,
                height: 390,
                size: 'contain'
              },
              {
                src: 'https://fake-api-khaki.vercel.app/img/java.png',
                width: 278,
                height: 440,
                size: 'contain'
              }
            ]
          }
        },
        size: {
          value: { min: 1, max: 12 }
        }
      },
      detectRetina: true
    }),
    []
  )

  if (init) {
    return (
      <div className="particlesContainer">
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
        />
      </div>
    )
  }
  return <></>
}

export default Particle

////////////////////////////////////////////////////////////////////////////////

// // () => ({
//   background: {
//     color: {
//       value: '#33092c'
//     }
//   },
//   fpsLimit: 120,
//   interactivity: {
//     events: {
//       onClick: {
//         enable: true,
//         mode: 'push'
//       },
//       onHover: {
//         enable: true,
//         mode: 'grab'
//       }
//     },
//     modes: {
//       push: {
//         quantity: 4
//       },
//       repulse: {
//         distance: 200,
//         duration: 0.4
//       },
//       grab: {
//         distance: 220
//       }
//     }
//   },
//   particles: {
//     color: {
//       value: '#610f53'
//     },
//     links: {
//       color: '#c548b0',
//       distance: 200,
//       enable: true,
//       opacity: 0.5,
//       width: 1
//     },
//     move: {
//       direction: MoveDirection.none,
//       enable: true,
//       outModes: {
//         default: OutMode.out
//       },
//       random: true,
//       speed: 3,
//       straight: false
//     },
//     number: {
//       density: {
//         enable: true
//       },
//       value: 150
//     },
//     opacity: {
//       value: 0.5
//     },
//     shape: {
//       type: 'polygon'
//     },
//     size: {
//       value: { min: 1, max: 8 }
//     }
//   },
//   detectRetina: true
// }),
// []
// )
///////////////////////////////////////////////////////////////////////

// import { useEffect, useMemo, useState } from 'react'
// import Particles, { initParticlesEngine } from '@tsparticles/react'
// import { mix, tsParticles } from '@tsparticles/engine'
// import { loadBubbleEffect } from '@tsparticles/effect-bubble'
// import {
//   type Container,
//   type ISourceOptions,
//   MoveDirection,
//   OutMode
// } from '@tsparticles/engine'
// import { loadSlim } from '@tsparticles/slim'

// const Particle = () => {
//   const [init, setInit] = useState(false)

//   // Inicializa o tsParticles engine
//   useEffect(() => {
//     initParticlesEngine(async (engine) => {
//       await loadSlim(engine)
//       await loadBubbleEffect(tsParticles)
//     }).then(() => {
//       setInit(true)
//     })
//   }, [])

//   const particlesLoaded = async (container?: Container): Promise<void> => {
//     console.log(container)
//   }

//   const options: ISourceOptions = useMemo(
//     () => ({
//       background: {
//         color: {
//           value: '#33092c'
//         }
//       },
//       particles: {
//         number: {
//           value: 130,
//           density: {
//             enable: false,
//             value_area: 8000
//           }
//         },
//         color: {
//           value: '#ff09d4'
//         },
//         shape: {
//           type: 'polygon',
//           stroke: {
//             width: 1,
//             color: '#f71212'
//           },
//           polygon: {
//             nb_sides: 6
//           },
//           image: {
//             src: 'https://fake-api-khaki.vercel.app/img/globo.png',
//             width: 100,
//             height: 100
//           }
//         },
//         opacity: {
//           value: 0.37,
//           random: false,
//           anim: {
//             enable: true,
//             speed: 0.6,
//             opacity_min: 0.09,
//             sync: true
//           }
//         },
//         size: {
//           value: { min: 1, max: 8 },
//           random: true,
//           anim: {
//             enable: true,
//             speed: 40,
//             sync: true
//           }
//         },
//         links: {
//           enable: true,
//           distance: 200,
//           color: '#d32323',
//           opacity: 0.14,
//           width: 1.6
//         },
//         move: {
//           enable: true,
//           speed: 3,
//           direction: MoveDirection.none,
//           random: true,
//           straight: false,
//           outModes: {
//             default: OutMode.out
//           },
//           bounce: true,
//           attract: {
//             enable: false,
//             rotateX: 7677,
//             rotateY: 7917
//           }
//         }
//       },
//       interactivity: {
//         detectsOn: 'canvas',
//         events: {
//           onHover: {
//             enable: true,
//             mode: 'grab'
//           },
//           onClick: {
//             enable: true,
//             mode: 'bubble'
//           },
//           resize: {
//             enable: true // Ajustado para seguir o tipo correto
//           }
//         },
//         modes: {
//           grab: {
//             distance: 195,
//             links: {
//               opacity: 1
//             }
//           },
//           bubble: {
//             distance: 195,
//             size: 16.2,
//             duration: 0.35,
//             opacity: 0.11,
//             speed: 3,
//             mix: true,
//             sync: true,
//             smooth: 10,
//             stop: true
//           },
//           repulse: {
//             distance: 200,
//             duration: 0.4
//           },
//           push: {
//             quantity: 4
//           },
//           remove: {
//             quantity: 2
//           }
//         }
//       },
//       detectRetina: true
//     }),
//     []
//   )

//   if (init) {
//     return (
//       <Particles
//         id="tsparticles"
//         particlesLoaded={particlesLoaded}
//         options={options}
//       />
//     )
//   }
//   return <></>
// }

// export default Particle
