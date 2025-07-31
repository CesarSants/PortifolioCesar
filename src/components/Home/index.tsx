import Particles from '../../utils/Particle'
import topsombra from '../../assets/images/top-sombra-execao.png'
import AnimatedText from '../../utils/AnimatedText'
import { Container } from './styles'
import { useEffect } from 'react'

const Home = () => {
  return (
    <Container id="inicio" className="inicio">
      <div className="container-inicio">
        <div
          className="conteudo-inicio"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className="titulo-inicio">
            <h1 className="destaque-inicio">
              <img src={topsombra} alt="" />
            </h1>
          </div>
          <div
            className="paragrafo-inicio"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="1000"
          >
            <p>
              Desenvolvedor{' '}
              <span>
                <AnimatedText textArray={['Full-Stack', 'Criativo', 'Web']} />
              </span>
            </p>
            <p>Conectando design e tecnologia para dar vida às suas ideias.</p>
          </div>
          <a
            className="cta"
            href="https://wa.me/5519988481818"
            target="_blank"
            rel="noreferrer"
          >
            <span>Fale Comigo</span>
            <svg width="15px" height="10px" viewBox="0 0 13 10">
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </Container>
  )
}

export default Home
