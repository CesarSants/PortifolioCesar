//original sem busca ou filtro

// import { useEffect, useState } from 'react'
// import { Container } from './styles'

// interface Repositorio {
//   id: number
//   name: string
//   language: string | null
//   html_url: string
//   created_at: string // Data de criação do repositório
//   last_commit: string | null
// }

// const Repositories = () => {
//   const [repos, setRepos] = useState<Repositorio[]>([])
//   const [estaCarregando, setEstaCarregando] = useState(true)

//   useEffect(() => {
//     setEstaCarregando(true)
//     fetch('https://api.github.com/users/CesarSants/repos')
//       .then((res) => res.json())
//       .then((resJson) => {
//         setTimeout(() => {
//           setEstaCarregando(false)
//           setRepos(resJson)
//           console.log(repos)
//         }, 1000)
//       })
//   }, [])

//   return (
//     <Container>
//       <h1>repositorios</h1>
//       {estaCarregando ? ( //era && sem o :
//         <h2>Carregando...</h2>
//       ) : (
//         <ul className="list">
//           {repos.map((repositorio) => (
//             <li className="listItem" key={repositorio.id}>
//               <div className="listItemName">
//                 <b>Nome:</b>
//                 {repositorio.name}
//               </div>
//               <div className="listItemLanguage">
//                 <b>Linguagem:</b>
//                 {repositorio.language}
//               </div>
//               <a
//                 className="listItemLink"
//                 target="_blank"
//                 href={repositorio.html_url}
//                 rel="noreferrer"
//               >
//                 Visitar no Github
//               </a>
//             </li>
//           ))}
//         </ul>
//       )}
//     </Container>
//   )
// }

// export default Repositories

//com filtro

// import { useEffect, useState } from 'react'
// import { Container } from './styles'

// interface Repositorio {
//   id: number
//   name: string
//   language: string | null
//   html_url: string
//   created_at: string
//   last_commit: string | null
// }

// const Repositories = () => {
//   const [repos, setRepos] = useState<Repositorio[]>([])
//   const [estaCarregando, setEstaCarregando] = useState(true)
//   const [sortOption, setSortOption] = useState<string>('alphabetical') // Estado para a ordenação

//   useEffect(() => {
//     const fetchRepos = async () => {
//       setEstaCarregando(true)

//       try {
//         // Busca inicial dos repositórios
//         const res = await fetch('https://api.github.com/users/CesarSants/repos')
//         const reposJson: Repositorio[] = await res.json()

//         // Busca dos últimos commits
//         const reposWithCommits = await Promise.all(
//           reposJson.map(async (repo) => {
//             try {
//               const commitsRes = await fetch(
//                 `https://api.github.com/repos/CesarSants/${repo.name}/commits`
//               )
//               const commitsJson = await commitsRes.json()

//               // Adiciona a data do último commit (primeiro item da lista de commits)
//               const lastCommitDate =
//                 commitsJson[0]?.commit?.author?.date || null
//               return { ...repo, last_commit: lastCommitDate }
//             } catch {
//               return { ...repo, last_commit: null }
//             }
//           })
//         )

//         setRepos(reposWithCommits)
//       } catch (error) {
//         console.error('Erro ao buscar repositórios:', error)
//       } finally {
//         setEstaCarregando(false)
//       }
//     }

//     fetchRepos()
//   }, [])

//   // Função de ordenação
//   const sortRepos = (repos: Repositorio[]) => {
//     return [...repos].sort((a, b) => {
//       switch (sortOption) {
//         case 'alphabetical':
//           return a.name.localeCompare(b.name)
//         case 'created_desc':
//           return (
//             new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//           )
//         case 'created_asc':
//           return (
//             new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
//           )
//         case 'last_commit_desc':
//           return (
//             new Date(b.last_commit || 0).getTime() -
//             new Date(a.last_commit || 0).getTime()
//           )
//         case 'last_commit_asc':
//           return (
//             new Date(a.last_commit || 0).getTime() -
//             new Date(b.last_commit || 0).getTime()
//           )
//         default:
//           return 0
//       }
//     })
//   }

//   return (
//     <Container>
//       <h1>Repositórios</h1>
//       <label htmlFor="sort">Ordenar por:</label>
//       <select
//         id="sort"
//         value={sortOption}
//         onChange={(e) => setSortOption(e.target.value)}
//       >
//         <option value="alphabetical">Ordem Alfabética</option>
//         <option value="created_desc">
//           Data de Criação (Mais recente → Mais antigo)
//         </option>
//         <option value="created_asc">
//           Data de Criação (Mais antigo → Mais recente)
//         </option>
//         <option value="last_commit_desc">
//           Último Commit (Mais recente → Mais antigo)
//         </option>
//         <option value="last_commit_asc">
//           Último Commit (Mais antigo → Mais recente)
//         </option>
//       </select>
//       {estaCarregando ? (
//         <h2>Carregando...</h2>
//       ) : (
//         <ul className="list">
//           {sortRepos(repos).map((repositorio) => (
//             <li className="listItem" key={repositorio.id}>
//               <div className="listItemName">
//                 <b>Nome:</b> {repositorio.name}
//               </div>
//               <div className="listItemLanguage">
//                 <b>Linguagem:</b> {repositorio.language || 'Não especificada'}
//               </div>
//               <div className="listItemCreated">
//                 <b>Criado em:</b>{' '}
//                 {new Date(repositorio.created_at).toLocaleDateString()}
//               </div>
//               <div className="listItemLastCommit">
//                 <b>Último commit:</b>{' '}
//                 {repositorio.last_commit
//                   ? new Date(repositorio.last_commit).toLocaleDateString()
//                   : 'Não disponível'}
//               </div>
//               <a
//                 className="listItemLink"
//                 target="_blank"
//                 href={repositorio.html_url}
//                 rel="noreferrer"
//               >
//                 Visitar no Github
//               </a>
//             </li>
//           ))}
//         </ul>
//       )}
//     </Container>
//   )
// }

// export default Repositories

//com filtro e busca

// import { useEffect, useState } from 'react';
// import { Container } from './styles';

// interface Repositorio {
//   id: number;
//   name: string;
//   language: string | null;
//   html_url: string;
//   created_at: string;
//   last_commit: string | null;
// }

// const Repositories = () => {
//   const [repos, setRepos] = useState<Repositorio[]>([]);
//   const [filteredRepos, setFilteredRepos] = useState<Repositorio[]>([]);
//   const [estaCarregando, setEstaCarregando] = useState(true);
//   const [sortOption, setSortOption] = useState<string>('alphabetical'); // Estado para ordenação
//   const [searchQuery, setSearchQuery] = useState<string>(''); // Estado para busca

//   useEffect(() => {
//     const fetchRepos = async () => {
//       setEstaCarregando(true);

//       try {
//         // Busca inicial dos repositórios
//         const res = await fetch('https://api.github.com/users/CesarSants/repos');
//         const reposJson: Repositorio[] = await res.json();

//         // Busca dos últimos commits
//         const reposWithCommits = await Promise.all(
//           reposJson.map(async (repo) => {
//             try {
//               const commitsRes = await fetch(
//                 `https://api.github.com/repos/CesarSants/${repo.name}/commits`
//               );
//               const commitsJson = await commitsRes.json();

//               // Adiciona a data do último commit (primeiro item da lista de commits)
//               const lastCommitDate = commitsJson[0]?.commit?.author?.date || null;
//               return { ...repo, last_commit: lastCommitDate };
//             } catch {
//               return { ...repo, last_commit: null };
//             }
//           })
//         );

//         setRepos(reposWithCommits);
//         setFilteredRepos(reposWithCommits); // Inicializa os filtrados com todos os repositórios
//       } catch (error) {
//         console.error('Erro ao buscar repositórios:', error);
//       } finally {
//         setEstaCarregando(false);
//       }
//     };

//     fetchRepos();
//   }, []);

//   // Função de ordenação
//   const sortRepos = (repos: Repositorio[]) => {
//     return [...repos].sort((a, b) => {
//       switch (sortOption) {
//         case 'alphabetical':
//           return a.name.localeCompare(b.name);
//         case 'created_desc':
//           return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
//         case 'created_asc':
//           return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
//         case 'last_commit_desc':
//           return (
//             new Date(b.last_commit || 0).getTime() - new Date(a.last_commit || 0).getTime()
//           );
//         case 'last_commit_asc':
//           return (
//             new Date(a.last_commit || 0).getTime() - new Date(b.last_commit || 0).getTime()
//           );
//         default:
//           return 0;
//       }
//     });
//   };

//   // Função para buscar e filtrar repositórios em tempo real
//   const filterRepos = (query: string) => {
//     const lowerCaseQuery = query.toLowerCase();
//     const filtered = repos.filter((repo) => {
//       const createdAt = new Date(repo.created_at).toLocaleDateString().toLowerCase();
//       const lastCommit = repo.last_commit
//         ? new Date(repo.last_commit).toLocaleDateString().toLowerCase()
//         : '';
//       return (
//         repo.name.toLowerCase().includes(lowerCaseQuery) || // Busca no nome
//         (repo.language && repo.language.toLowerCase().includes(lowerCaseQuery)) || // Busca na linguagem
//         createdAt.includes(lowerCaseQuery) || // Busca na data de criação
//         lastCommit.includes(lowerCaseQuery) // Busca na data do último commit
//       );
//     });
//     setFilteredRepos(filtered);
//   };

//   useEffect(() => {
//     filterRepos(searchQuery); // Refaz o filtro sempre que o valor da busca ou a lista mudar
//   }, [searchQuery, repos]);

//   return (
//     <Container>
//       <h1>Repositórios</h1>

//       {/* Campo de busca */}
//       <input
//         type="text"
//         placeholder="Buscar repositórios..."
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//       />

//       {/* Ordenação */}
//       <label htmlFor="sort">Ordenar por:</label>
//       <select
//         id="sort"
//         value={sortOption}
//         onChange={(e) => setSortOption(e.target.value)}
//       >
//         <option value="alphabetical">Ordem Alfabética</option>
//         <option value="created_desc">Data de Criação (Mais recente → Mais antigo)</option>
//         <option value="created_asc">Data de Criação (Mais antigo → Mais recente)</option>
//         <option value="last_commit_desc">Último Commit (Mais recente → Mais antigo)</option>
//         <option value="last_commit_asc">Último Commit (Mais antigo → Mais recente)</option>
//       </select>

//       {/* Lista de repositórios */}
//       {estaCarregando ? (
//         <h2>Carregando...</h2>
//       ) : (
//         <ul className="list">
//           {sortRepos(filteredRepos).map((repositorio) => (
//             <li className="listItem" key={repositorio.id}>
//               <div className="listItemName">
//                 <b>Nome:</b> {repositorio.name}
//               </div>
//               <div className="listItemLanguage">
//                 <b>Linguagem:</b> {repositorio.language || 'Não especificada'}
//               </div>
//               <div className="listItemCreated">
//                 <b>Criado em:</b> {new Date(repositorio.created_at).toLocaleDateString()}
//               </div>
//               <div className="listItemLastCommit">
//                 <b>Último commit:</b>{' '}
//                 {repositorio.last_commit
//                   ? new Date(repositorio.last_commit).toLocaleDateString()
//                   : 'Não disponível'}
//               </div>
//               <a
//                 className="listItemLink"
//                 target="_blank"
//                 href={repositorio.html_url}
//                 rel="noreferrer"
//               >
//                 Visitar no Github
//               </a>
//             </li>
//           ))}
//         </ul>
//       )}
//     </Container>
//   );
// };

// export default Repositories;

//com filtro e autenticação por token

// import { useEffect, useState } from 'react'
// import { Container } from './styles'

// interface Repositorio {
//   id: number
//   name: string
//   language: string | null
//   html_url: string
//   created_at: string
//   last_commit: string | null
// }

// const Repositories = () => {
//   const [repos, setRepos] = useState<Repositorio[]>([])
//   const [estaCarregando, setEstaCarregando] = useState(true)
//   const [sortOption, setSortOption] = useState<string>('alphabetical') // Estado para a ordenação

//   // Seu token do GitHub. Substitua pelo seu token pessoal.
//   const GITHUB_TOKEN = ''

//   useEffect(() => {
//     const fetchRepos = async () => {
//       setEstaCarregando(true)

//       try {
//         // Busca inicial dos repositórios
//         const res = await fetch(
//           'https://api.github.com/users/CesarSants/repos',
//           {
//             headers: {
//               Authorization: `token ${GITHUB_TOKEN}`
//             }
//           }
//         )
//         const reposJson: Repositorio[] = await res.json()

//         // Busca dos últimos commits
//         const reposWithCommits = await Promise.all(
//           reposJson.map(async (repo) => {
//             try {
//               const commitsRes = await fetch(
//                 `https://api.github.com/repos/CesarSants/${repo.name}/commits`,
//                 {
//                   headers: {
//                     Authorization: `token ${GITHUB_TOKEN}`
//                   }
//                 }
//               )
//               const commitsJson = await commitsRes.json()

//               // Adiciona a data do último commit (primeiro item da lista de commits)
//               const lastCommitDate =
//                 commitsJson[0]?.commit?.author?.date || null
//               return { ...repo, last_commit: lastCommitDate }
//             } catch {
//               return { ...repo, last_commit: null }
//             }
//           })
//         )

//         setRepos(reposWithCommits)
//       } catch (error) {
//         console.error('Erro ao buscar repositórios:', error)
//       } finally {
//         setEstaCarregando(false)
//       }
//     }

//     fetchRepos()
//   }, [])

//   // Função de ordenação
//   const sortRepos = (repos: Repositorio[]) => {
//     return [...repos].sort((a, b) => {
//       switch (sortOption) {
//         case 'alphabetical':
//           return a.name.localeCompare(b.name)
//         case 'created_desc':
//           return (
//             new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//           )
//         case 'created_asc':
//           return (
//             new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
//           )
//         case 'last_commit_desc':
//           return (
//             new Date(b.last_commit || 0).getTime() -
//             new Date(a.last_commit || 0).getTime()
//           )
//         case 'last_commit_asc':
//           return (
//             new Date(a.last_commit || 0).getTime() -
//             new Date(b.last_commit || 0).getTime()
//           )
//         default:
//           return 0
//       }
//     })
//   }

//   return (
//     <Container>
//       <h1>Repositórios</h1>
//       <label htmlFor="sort">Ordenar por:</label>
//       <select
//         id="sort"
//         value={sortOption}
//         onChange={(e) => setSortOption(e.target.value)}
//       >
//         <option value="alphabetical">Ordem Alfabética</option>
//         <option value="created_desc">
//           Data de Criação (Mais recente → Mais antigo)
//         </option>
//         <option value="created_asc">
//           Data de Criação (Mais antigo → Mais recente)
//         </option>
//         <option value="last_commit_desc">
//           Último Commit (Mais recente → Mais antigo)
//         </option>
//         <option value="last_commit_asc">
//           Último Commit (Mais antigo → Mais recente)
//         </option>
//       </select>
//       {estaCarregando ? (
//         <h2>Carregando...</h2>
//       ) : (
//         <ul className="list">
//           {sortRepos(repos).map((repositorio) => (
//             <li className="listItem" key={repositorio.id}>
//               <div className="listItemName">
//                 <b>Nome:</b> {repositorio.name}
//               </div>
//               <div className="listItemLanguage">
//                 <b>Linguagem:</b> {repositorio.language || 'Não especificada'}
//               </div>
//               <div className="listItemCreated">
//                 <b>Criado em:</b>{' '}
//                 {new Date(repositorio.created_at).toLocaleDateString()}
//               </div>
//               <div className="listItemLastCommit">
//                 <b>Último commit:</b>{' '}
//                 {repositorio.last_commit
//                   ? new Date(repositorio.last_commit).toLocaleDateString()
//                   : 'Não disponível'}
//               </div>
//               <a
//                 className="listItemLink"
//                 target="_blank"
//                 href={repositorio.html_url}
//                 rel="noreferrer"
//               >
//                 Visitar no Github
//               </a>
//             </li>
//           ))}
//         </ul>
//       )}
//     </Container>
//   )
// }

// export default Repositories

// import { useEffect, useState } from 'react'
// import { Container, ContentWrapper } from './styles'
// import HeadlineScroll from '../../utils/SlideTitle'
// import fundo from '../../assets/backGrounds/cinza-11.jpg'

// interface Repositorio {
//   id: number
//   name: string
//   language: string | null
//   html_url: string
//   created_at: string
//   last_commit: string | null
// }

// const Repositories = () => {
//   const [repos, setRepos] = useState<Repositorio[]>([])
//   const [filteredRepos, setFilteredRepos] = useState<Repositorio[]>([])
//   const [estaCarregando, setEstaCarregando] = useState(true)
//   const [sortOption, setSortOption] = useState<string>('alphabetical') // Estado para a ordenação
//   const [searchQuery, setSearchQuery] = useState<string>('')

//   // Seu token do GitHub. Substitua pelo seu token pessoal.
//   const GITHUB_TOKEN = ''

//   useEffect(() => {
//     const fetchRepos = async () => {
//       setEstaCarregando(true)

//       try {
//         // Busca inicial dos repositórios
//         const res = await fetch(
//           'https://api.github.com/users/CesarSants/repos',
//           {
//             headers: {
//               Authorization: `token ${GITHUB_TOKEN}`
//             }
//           }
//         )
//         const reposJson: Repositorio[] = await res.json()

//         // Busca dos últimos commits
//         const reposWithCommits = await Promise.all(
//           reposJson.map(async (repo) => {
//             try {
//               const commitsRes = await fetch(
//                 `https://api.github.com/repos/CesarSants/${repo.name}/commits`,
//                 {
//                   headers: {
//                     Authorization: `token ${GITHUB_TOKEN}`
//                   }
//                 }
//               )
//               const commitsJson = await commitsRes.json()

//               // Adiciona a data do último commit (primeiro item da lista de commits)
//               const lastCommitDate =
//                 commitsJson[0]?.commit?.author?.date || null
//               return { ...repo, last_commit: lastCommitDate }
//             } catch {
//               return { ...repo, last_commit: null }
//             }
//           })
//         )

//         setRepos(reposWithCommits)
//         setFilteredRepos(reposWithCommits)
//       } catch (error) {
//         console.error('Erro ao buscar repositórios:', error)
//       } finally {
//         setEstaCarregando(false)
//       }
//     }

//     fetchRepos()
//   }, [])

//   // Função de ordenação
//   const sortRepos = (repos: Repositorio[]) => {
//     return [...repos].sort((a, b) => {
//       switch (sortOption) {
//         case 'alphabetical':
//           return a.name.localeCompare(b.name)
//         case 'created_desc':
//           return (
//             new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//           )
//         case 'created_asc':
//           return (
//             new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
//           )
//         case 'last_commit_desc':
//           return (
//             new Date(b.last_commit || 0).getTime() -
//             new Date(a.last_commit || 0).getTime()
//           )
//         case 'last_commit_asc':
//           return (
//             new Date(a.last_commit || 0).getTime() -
//             new Date(b.last_commit || 0).getTime()
//           )
//         default:
//           return 0
//       }
//     })
//   }

//   const filterRepos = (query: string) => {
//     const lowerCaseQuery = query.toLowerCase()
//     const filtered = repos.filter((repo) => {
//       const createdAt = new Date(repo.created_at)
//         .toLocaleDateString()
//         .toLowerCase()
//       const lastCommit = repo.last_commit
//         ? new Date(repo.last_commit).toLocaleDateString().toLowerCase()
//         : ''
//       return (
//         repo.name.toLowerCase().includes(lowerCaseQuery) || // Busca no nome
//         (repo.language &&
//           repo.language.toLowerCase().includes(lowerCaseQuery)) || // Busca na linguagem
//         createdAt.includes(lowerCaseQuery) || // Busca na data de criação
//         lastCommit.includes(lowerCaseQuery) // Busca na data do último commit
//       )
//     })
//     setFilteredRepos(filtered)
//   }

//   useEffect(() => {
//     filterRepos(searchQuery) // Refaz o filtro sempre que o valor da busca ou a lista mudar
//   }, [searchQuery, repos])

//   return (
//     <Container>
//       <HeadlineScroll content="Repositórios" height="5%" />

//       <ContentWrapper>
//         <div className="contentContainer">
//           <div className="background">
//             <img src={fundo} alt="" />
//           </div>
//           <div className="content">
//             <div className="menu">
//               <input
//                 type="text"
//                 placeholder="Buscar repositórios..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <div className="selectContainer">
//                 <label htmlFor="sort">Ordenar por:</label>
//                 <select
//                   id="sort"
//                   value={sortOption}
//                   onChange={(e) => setSortOption(e.target.value)}
//                 >
//                   <option value="alphabetical">Ordem Alfabética</option>
//                   <option value="created_desc">
//                     Data de Criação (Mais recente → Mais antigo)
//                   </option>
//                   <option value="created_asc">
//                     Data de Criação (Mais antigo → Mais recente)
//                   </option>
//                   <option value="last_commit_desc">
//                     Último Commit (Mais recente → Mais antigo)
//                   </option>
//                   <option value="last_commit_asc">
//                     Último Commit (Mais antigo → Mais recente)
//                   </option>
//                 </select>
//               </div>
//             </div>
//             <div className="cardContainer">
//               {estaCarregando ? (
//                 <h2>Carregando...</h2>
//               ) : (
//                 <ul className="list">
//                   {sortRepos(filteredRepos).map((repositorio) => (
//                     <li className="listItem" key={repositorio.id}>
//                       <div className="card">
//                         <span className="resultado">
//                           Total de repositórios: {filteredRepos.length}
//                         </span>
//                         <div className="listItemName">
//                           <b>Nome:</b> {repositorio.name}
//                         </div>
//                         <div className="cardInfos">
//                           <div className="contCard1">
//                             <div className="listItemCreated">
//                               <b>Criado em:</b>{' '}
//                               {new Date(
//                                 repositorio.created_at
//                               ).toLocaleDateString()}
//                             </div>
//                             <div className="listItemLastCommit">
//                               <b>Último commit:</b>{' '}
//                               {repositorio.last_commit
//                                 ? new Date(
//                                     repositorio.last_commit
//                                   ).toLocaleDateString()
//                                 : 'Não disponível'}
//                             </div>
//                           </div>
//                           <div className="contCard2">
//                             <div className="listItemLanguage">
//                               <b>Linguagem:</b>{' '}
//                               {repositorio.language || 'Não especificada'}
//                             </div>
//                           </div>
//                         </div>
//                         <a
//                           className="listItemLink"
//                           target="_blank"
//                           href={repositorio.html_url}
//                           rel="noreferrer"
//                         >
//                           Visitar no Github
//                         </a>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           </div>
//         </div>
//       </ContentWrapper>
//     </Container>
//   )
// }

// export default Repositories

import { useEffect, useState } from 'react'
import { Container, ContentWrapper } from './styles'
import HeadlineScroll from '../../utils/SlideTitle'
import fundo from '../../assets/backGrounds/cinza-11.jpg'
import fundo2 from '../../assets/backGrounds/roxo-1.jpg'
import imageBootstrap from '../../assets/tec/bootstrap.png'
import imageHtml from '../../assets/tec/html.png'
import imageJavascript from '../../assets/tec/javascript.png'
import imageCss from '../../assets/tec/css.png'
import imageScss from '../../assets/tec/sass.png'
import imageReact from '../../assets/tec/react.png'
import imageTypeScript from '../../assets/tec/typescript.png'
import imageVue from '../../assets/tec/vue.png'
import imagemJava from '../../assets/tec/java.png'

const languageImages: Record<string, string> = {
  html: imageHtml,
  css: imageCss,
  javascript: imageJavascript,
  scss: imageScss,
  sass: imageScss,
  typescript: imageTypeScript,
  react: imageReact,
  vue: imageVue,
  bootstrap: imageBootstrap,
  java: imagemJava
}

interface Repositorio {
  id: number
  name: string
  language: string | null
  html_url: string
  created_at: string
  last_commit: string | null
}

const Repositories = () => {
  const [repos, setRepos] = useState<Repositorio[]>([])
  const [filteredRepos, setFilteredRepos] = useState<Repositorio[]>([])
  const [estaCarregando, setEstaCarregando] = useState(true)
  const [sortOption, setSortOption] = useState<string>('alphabetical')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

  useEffect(() => {
    const fetchRepos = async () => {
      setEstaCarregando(true)
      let allRepos: Repositorio[] = []
      let url: string | null =
        'https://api.github.com/users/CesarSants/repos?per_page=100'

      try {
        while (url) {
          const res: Response = await fetch(url, {
            // headers: {
            //   Authorization: `token ${GITHUB_TOKEN}`
            // }
          })

          if (!res.ok) {
            throw new Error(`Erro na requisição: ${res.status}`)
          }

          const reposJson: Repositorio[] = await res.json()
          allRepos = [...allRepos, ...reposJson]

          // Verifica o cabeçalho 'Link' para encontrar a próxima página
          const linkHeader: string | null = res.headers.get('Link')
          const nextLink: string | undefined = linkHeader
            ?.split(',')
            .find((link: string) => link.includes('rel="next"'))
          url = nextLink
            ? nextLink.split(';')[0].trim().slice(1, -1) // Extrai a URL entre os sinais de < e >
            : null
        }

        const reposWithCommits = await Promise.all(
          allRepos.map(async (repo) => {
            try {
              const commitsRes: Response = await fetch(
                `https://api.github.com/repos/CesarSants/${repo.name}/commits`,
                {
                  // headers: {
                  //   Authorization: `token ${GITHUB_TOKEN}`
                  // }
                }
              )
              const commitsJson = await commitsRes.json()

              const lastCommitDate =
                commitsJson[0]?.commit?.author?.date || null
              return { ...repo, last_commit: lastCommitDate }
            } catch {
              return { ...repo, last_commit: null }
            }
          })
        )

        setRepos(reposWithCommits)
        setFilteredRepos(reposWithCommits)
      } catch (error) {
        console.error('Erro ao buscar repositórios:', error)
      } finally {
        setEstaCarregando(false)
      }
    }

    fetchRepos()
  }, [])

  // Função de ordenação
  const sortRepos = (repos: Repositorio[]) => {
    return [...repos].sort((a, b) => {
      switch (sortOption) {
        case 'alphabetical':
          return a.name.localeCompare(b.name)
        case 'created_desc':
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          )
        case 'created_asc':
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          )
        case 'last_commit_desc':
          return (
            new Date(b.last_commit || 0).getTime() -
            new Date(a.last_commit || 0).getTime()
          )
        case 'last_commit_asc':
          return (
            new Date(a.last_commit || 0).getTime() -
            new Date(b.last_commit || 0).getTime()
          )
        default:
          return 0
      }
    })
  }

  const filterRepos = (query: string) => {
    const lowerCaseQuery = query.toLowerCase()
    const filtered = repos.filter((repo) => {
      const createdAt = new Date(repo.created_at)
        .toLocaleDateString()
        .toLowerCase()
      const lastCommit = repo.last_commit
        ? new Date(repo.last_commit).toLocaleDateString().toLowerCase()
        : ''
      return (
        repo.name.toLowerCase().includes(lowerCaseQuery) || // Busca no nome
        (repo.language &&
          repo.language.toLowerCase().includes(lowerCaseQuery)) || // Busca na linguagem
        createdAt.includes(lowerCaseQuery) || // Busca na data de criação
        lastCommit.includes(lowerCaseQuery) // Busca na data do último commit
      )
    })
    setFilteredRepos(filtered)
  }

  useEffect(() => {
    filterRepos(searchQuery) // Refaz o filtro sempre que o valor da busca ou a lista mudar
  }, [searchQuery, repos])

  const getLanguageImage = (language: string | null): string | undefined => {
    if (!language) return undefined
    const normalizedLang = language.toLowerCase()
    return languageImages[normalizedLang]
  }

  return (
    <Container id="repositorios">
      <HeadlineScroll content="Repositórios" height="5%" />

      <ContentWrapper>
        <div
          className="contentContainer"
          data-aos="fade-up"
          data-aos-delay="400"
          data-aos-duration="1000"
        >
          <div className="background">
            <img src={fundo} alt="" />
          </div>
          <div className="content">
            <div className="menuContainer">
              <div className="menu">
                <input
                  type="text"
                  placeholder="Buscar repositórios..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="resultado">
                  <p>Total de repositórios: {filteredRepos.length}</p>
                </span>

                <div className="selectContainer">
                  <label htmlFor="sort">Ordenar por:</label>
                  <select
                    id="sort"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="alphabetical">Ordem Alfabética</option>
                    <option value="created_desc">
                      Data de Criação (Mais recente → Mais antigo)
                    </option>
                    <option value="created_asc">
                      Data de Criação (Mais antigo → Mais recente)
                    </option>
                    <option value="last_commit_desc">
                      Último Commit (Mais recente → Mais antigo)
                    </option>
                    <option value="last_commit_asc">
                      Último Commit (Mais antigo → Mais recente)
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div className="cardContainer2">
              {estaCarregando ? (
                <h2>Carregando...</h2>
              ) : (
                <ul
                  className="list"
                  data-aos="fade-up"
                  data-aos-delay="400"
                  data-aos-duration="1000"
                >
                  {sortRepos(filteredRepos).map((repositorio) => (
                    <li className="listItem" key={repositorio.id}>
                      <div className="card">
                        <div className="background">
                          <img src={fundo2} alt="" />
                        </div>
                        <div className="listItemName">
                          <b>Nome:</b> {repositorio.name}
                        </div>
                        <div className="cardInfos">
                          <div className="contCard1">
                            <div className="listItemCreated infos">
                              <b>Criado em:</b>
                              <span>
                                {new Date(
                                  repositorio.created_at
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="listItemLastCommit infos">
                              <b>Último commit:</b>
                              <span>
                                {repositorio.last_commit
                                  ? new Date(
                                      repositorio.last_commit
                                    ).toLocaleDateString()
                                  : 'Não disponível'}
                              </span>
                            </div>
                          </div>
                          <div className="contCard2">
                            <div className="listItemLanguage infos">
                              <b>Linguagem:</b>
                              {/* <span>
                                {repositorio.language || 'Não especificada'}
                              </span> */}

                              <span>
                                {getLanguageImage(repositorio.language) ? (
                                  <img
                                    src={getLanguageImage(repositorio.language)}
                                    alt={repositorio.language || 'Imagem'}
                                  />
                                ) : (
                                  'Não especificada'
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <a
                          href={repositorio.html_url}
                          target="_blank"
                          className="cta"
                          rel="noreferrer"
                        >
                          <span>Visite o Repositório</span>
                          <svg width="15px" height="10px" viewBox="0 0 13 10">
                            <path d="M1,5 L11,5"></path>
                            <polyline points="8 1 12 5 8 9"></polyline>
                          </svg>
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </ContentWrapper>
    </Container>
  )
}

export default Repositories
