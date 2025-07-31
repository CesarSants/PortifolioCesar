import HeadlineScroll from '../../utils/SlideTitle'
import { Container } from './styles'
import fundo from '../../assets/backGrounds/cinza-19.webp'
import { fonts } from '../../styles'
import face from '../../assets/images/fundo-tec-zoom-longe.png'
import fundoAbout from '../../assets/backGrounds/azul-2.jpg'
import imagemBootstrap from '../../assets/tec/bootstrap.png'
import imagemBootstrapDark from '../../assets/tec/bootstrap-dark.png'
import imagemCss from '../../assets/tec/css.png'
import imagemCssDark from '../../assets/tec/css-dark.png'
import imagemCypress from '../../assets/tec/cypress.png'
import imagemCypressDark from '../../assets/tec/cypress-dark.png'
import imagemFigma from '../../assets/tec/figma.png'
import imagemFigmaDark from '../../assets/tec/figma-dark.png'
import imagemGithub from '../../assets/tec/github.png'
import imagemGithubDark from '../../assets/tec/github-dark.png'
import imagemGrunt from '../../assets/tec/grunt.png'
import imagemGruntDark from '../../assets/tec/grunt-dark.png'
import imagemGulp from '../../assets/tec/gulp.png'
import imagemGulpDark from '../../assets/tec/gulp-dark.png'
import imagemHtml from '../../assets/tec/html.png'
import imagemHtmlDark from '../../assets/tec/html-dark.png'
import imagemJavascript from '../../assets/tec/javascript.png'
import imagemJavascriptDark from '../../assets/tec/javascript-dark.png'
import imagemJquery from '../../assets/tec/jquery.png'
import imagemJqueryDark from '../../assets/tec/jquery-dark.png'
import imagemLess from '../../assets/tec/less.png'
import imagemLessDark from '../../assets/tec/less-dark.png'
import imagemNext from '../../assets/tec/next.png'
import imagemNextDark from '../../assets/tec/next-dark.png'
import imagemNode from '../../assets/tec/node.png'
import imagemNodeDark from '../../assets/tec/node-dark.png'
import imagemReact from '../../assets/tec/react.png'
import imagemReactDark from '../../assets/tec/react-dark.png'
import imagemRedux from '../../assets/tec/redux.png'
import imagemReduxDark from '../../assets/tec/redux-dark.png'
import imagemSass from '../../assets/tec/sass.png'
import imagemSassDark from '../../assets/tec/sass-dark.png'
import imagemTypescript from '../../assets/tec/typescript.png'
import imagemTypescriptDark from '../../assets/tec/typescript-dark.png'
import imagemVite from '../../assets/tec/vite.png'
import imagemViteDark from '../../assets/tec/vite-dark.png'
import imagemVscode from '../../assets/tec/vscode.png'
import imagemVscodeDark from '../../assets/tec/vscode-dark.png'
import imagemVue from '../../assets/tec/vue.png'
import imagemVueDark from '../../assets/tec/vue-dark.png'

import imagemDocker from '../../assets/tec/docker.png'
import imagemGit from '../../assets/tec/git.png'
import imagemGradle from '../../assets/tec/gradle.png'
import imagemHibernate from '../../assets/tec/hibernate.png'
import imagemJava from '../../assets/tec/java.png'
import imagemKubernetes from '../../assets/tec/kubernetes.png'
import imagemMaven from '../../assets/tec/maven.png'
import imagemMongodb from '../../assets/tec/mongodb.png'
import imagemMysql from '../../assets/tec/mysql.png'
import imagemPayara from '../../assets/tec/payara.png'
import imagemPostgresql from '../../assets/tec/postgresql.webp'
import imagemPrimefaces from '../../assets/tec/primefaces.png'
import imagemSpringboot from '../../assets/tec/springboot.png'
import imagemTerraform from '../../assets/tec/terraform.png'
import imagemTomcat from '../../assets/tec/tomcat.png'
import imagemWildfly from '../../assets/tec/wildfly.png'
import imagemDockerDark from '../../assets/tec/docker-dark.png'
import imagemGitDark from '../../assets/tec/git-dark.png'
import imagemGradleDark from '../../assets/tec/gradle-dark.png'
import imagemHibernateDark from '../../assets/tec/hibernate-dark.png'
import imagemJavaDark from '../../assets/tec/java-dark.png'
import imagemKubernetesDark from '../../assets/tec/kubernetes-dark.png'
import imagemMavenDark from '../../assets/tec/maven-dark.png'
import imagemMongodbDark from '../../assets/tec/mongodb-dark.png'
import imagemMysqlDark from '../../assets/tec/mysql-dark.png'
import imagemPayaraDark from '../../assets/tec/payara-dark.png'
import imagemPostgresqlDark from '../../assets/tec/postgresql-dark.png'
import imagemPrimefacesDark from '../../assets/tec/primefaces-dark.png'
import imagemSpringbootDark from '../../assets/tec/springboot-dark.png'
import imagemTerraformDark from '../../assets/tec/terraform-dark.png'
import imagemTomcatDark from '../../assets/tec/tomcat-dark.png'
import imagemWildflyDark from '../../assets/tec/wildfly-dark.png'

const About = () => {
  return (
    <Container className="sobre" id="sobre">
      <div className="background">
        <img src={fundo} alt="" />
      </div>
      <div className="container1">
        <div className="cont">
          <HeadlineScroll content="sobre" height="15%" />
        </div>
        <div
          className="aboutContainer"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="300"
        >
          <div
            className="resume resume1"
            data-aos="fade-right"
            data-aos-duration="2000"
            data-aos-delay="300"
          >
            <div className="backgroundResume">
              <img src={fundoAbout} alt="" />
            </div>
            <div className="textContainer">
              <p>
                Seja bem vindo(a) ao meu Portifólio! Me chamo Cesar, muito
                prazer!
                <br />
                Sou um profissional em transição de carreira para a área de
                tecnologia. Desenvolvedor full-stack Java em formação pela EBAC
                – Escola Britânica de Artes Criativas e Tecnologia.
                <br />
                <br />
                Tenho um perfil organizado e meticuloso, gosto de que as coisas
                sejam feitas da maneira certa, sem atalhos. Sou determinado e
                foco em atingir meus objetivos. Acredito que o respeito é
                fundamental para uma boa convivência no ambiente de trabalho e
                sempre busco manter boas relações com todos. Sou também muito
                comunicativo e me adapto facilmente a novos grupos, fazendo
                amizades rapidamente.
                <br />
                <br />
                Em termos de experiências e realizações, tive a oportunidade de
                viver um intercâmbio de um ano na Austrália, onde aprendi inglês
                e adquiri uma vivência internacional valiosa. Ao retornar ao
                Brasil, assumi a responsabilidade do setor financeiro de uma
                empresa, o que me proporcionou grandes aprendizados sobre gestão
                financeira e liderança de equipe.
              </p>
            </div>
          </div>
          <div
            className="complemento-sobre"
            data-aos="fade-left"
            data-aos-duration="2000"
            data-aos-delay="300"
          >
            <div className="container-svg">
              <svg width="600" height="600" viewBox="0 0 300 300">
                <defs>
                  <path
                    id="text-circle"
                    d="M 150,150 m -100,0 a 100,100 0 1,1 200,0 a 100,100 0 1,1 -200,0"
                  />
                </defs>
                <style>
                  {`
          @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@100;200;300;400;500;600;700&display=swap');

          .work-sans-font {
            font-family: 'Work Sans', sans-serif;
            font-weight: bold
          }
        `}
                </style>
                <text
                  fill="#c4acf0"
                  fontSize="29"
                  className="work-sans-font"
                  textAnchor="middle"
                >
                  <textPath href="#text-circle" startOffset="50%">
                    Full-Stack ✧—·—✧ Web Developer ✧—·—✧
                  </textPath>
                </text>
                <circle
                  cx="150"
                  cy="150"
                  r="100"
                  fill="none"
                  stroke="transparent"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="svg-image">
              <img src={face} alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="container2">
        <div id="resume2" />
        <h3 data-aos="fade-up" data-aos-duration="2000" data-aos-delay="300">
          Habilidades
        </h3>
        <div
          className="aboutContainer aboutContainer2"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="300"
        >
          <div
            className="resume resume2"
            data-aos="fade-right"
            data-aos-duration="2000"
            data-aos-delay="300"
          >
            <div className="backgroundResume">
              <img src={fundoAbout} alt="" />
            </div>
            <div className="textContainer">
              <p>
                Sou desenvolvedor Full Stack com proficiência em front-end
                utilizando JavaScript, HTML, CSS, jQuery, Bootstrap, SASS e
                LESS, Gulp, Grunt, requisições de API Ajax e Fetch; TypeScript,
                Vue.js, React, Redux, Next.js; testing com React Testing Library
                e Cypress.
                <br />
                <br />
                No back-end, trabalho com Java, Spring Boot, Hibernate, JSP e
                PrimeFaces, desenvolvendo APIs REST e utilizando ferramentas
                como Maven, Gradle e Git para build, versionamento e pipelines
                CI/CD. Tenho experiência com servidores de aplicação como
                Tomcat, JBoss/WildFly e Payara.
                <br />
                Trabalho com bancos de dados SQL (PostgreSQL, MySQL) e NoSQL
                (MongoDB).
                <br />
                <br />
                Para infraestrutura e deploy, utilizo Docker para empacotamento
                de projetos e otimização de serviços com imagens prontas.
                Realizo deploy em máquinas virtuais na AWS e Oracle Cloud, com
                automação via Terraform e orquestração usando Kubernetes.
                <br />
                <br />
                Desenvolvo interfaces web responsivas e sistemas completos,
                desde a criação de componentes interativos no front-end até APIs
                robustas e integração com banco de dados no back-end.
                <br />
                <br />
                Cada projeto me desafia a aplicar novos conhecimentos em ambas
                as frentes de desenvolvimento, proporcionando grande satisfação
                em ver soluções completas funcionando na prática.
                <br />
                <br />
                Estou sempre em busca de novos desafios e oportunidades para
                continuar crescendo como desenvolvedor Full Stack.
              </p>
            </div>
          </div>
          <div
            className="complemento-sobre"
            data-aos="fade-left"
            data-aos-duration="2000"
            data-aos-delay="300"
          >
            <div className="containerTec">
              <div className="tec">
                {[
                  {
                    normal: imagemBootstrap,
                    dark: imagemBootstrapDark
                  },
                  {
                    normal: imagemCss,
                    dark: imagemCssDark
                  },
                  {
                    normal: imagemCypress,
                    dark: imagemCypressDark
                  },
                  {
                    normal: imagemFigma,
                    dark: imagemFigmaDark
                  },
                  {
                    normal: imagemGithub,
                    dark: imagemGithubDark
                  },
                  {
                    normal: imagemGrunt,
                    dark: imagemGruntDark
                  },
                  {
                    normal: imagemGulp,
                    dark: imagemGulpDark
                  },
                  {
                    normal: imagemHtml,
                    dark: imagemHtmlDark
                  },
                  {
                    normal: imagemJavascript,
                    dark: imagemJavascriptDark
                  },
                  {
                    normal: imagemJquery,
                    dark: imagemJqueryDark
                  },
                  {
                    normal: imagemLess,
                    dark: imagemLessDark
                  },
                  {
                    normal: imagemNext,
                    dark: imagemNextDark
                  },
                  {
                    normal: imagemNode,
                    dark: imagemNodeDark
                  },
                  {
                    normal: imagemReact,
                    dark: imagemReactDark
                  },
                  {
                    normal: imagemRedux,
                    dark: imagemReduxDark
                  },
                  {
                    normal: imagemSass,
                    dark: imagemSassDark
                  },
                  {
                    normal: imagemTypescript,
                    dark: imagemTypescriptDark
                  },
                  {
                    normal: imagemVite,
                    dark: imagemViteDark
                  },
                  {
                    normal: imagemVscode,
                    dark: imagemVscodeDark
                  },
                  {
                    normal: imagemVue,
                    dark: imagemVueDark
                  },
                  {
                    normal: imagemDocker,
                    dark: imagemDockerDark
                  },
                  {
                    normal: imagemGit,
                    dark: imagemGitDark
                  },
                  {
                    normal: imagemGradle,
                    dark: imagemGradleDark
                  },
                  {
                    normal: imagemHibernate,
                    dark: imagemHibernateDark
                  },
                  {
                    normal: imagemJava,
                    dark: imagemJavaDark
                  },
                  {
                    normal: imagemKubernetes,
                    dark: imagemKubernetesDark
                  },
                  {
                    normal: imagemMaven,
                    dark: imagemMavenDark
                  },
                  {
                    normal: imagemMongodb,
                    dark: imagemMongodbDark
                  },
                  {
                    normal: imagemMysql,
                    dark: imagemMysqlDark
                  },
                  {
                    normal: imagemPayara,
                    dark: imagemPayaraDark
                  },
                  {
                    normal: imagemPostgresql,
                    dark: imagemPostgresqlDark
                  },
                  {
                    normal: imagemPrimefaces,
                    dark: imagemPrimefacesDark
                  },
                  {
                    normal: imagemSpringboot,
                    dark: imagemSpringbootDark
                  },
                  {
                    normal: imagemTerraform,
                    dark: imagemTerraformDark
                  },
                  {
                    normal: imagemWildfly,
                    dark: imagemWildflyDark
                  }
                ].map((image, index) => (
                  <div
                    className="grid-item"
                    key={index}
                    data-aos="fade-up"
                    // data-aos-duration="1000"
                    // data-aos-delay={(index + 1) * 50}
                  >
                    <img src={image.dark} alt="" className="dark" />
                    <img src={image.normal} alt="" className="normal" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default About
