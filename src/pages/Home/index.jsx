import React from 'react'
import Footer from '../../components/Footer'
import mascottoCute from '../../assets/images/mascotteCute.png'
import {
    FirstContentContainer,
    FirstDiagonalBox,
    Container,
    Slogan,
    SecondDiagonalBox,
    SecondContentContainer,
    DiagonalBoxContainr,
    MiddleContents,
    LastContainer,
    JoinApandoContainer,
    AuthButtonContainer,
    MascotteCute,
} from './HomeStyle'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import BackgroundAnimation from '../../components/BackgroundAnimation'
import Header from '../../components/Header'

function Home() {
    const navigate = useNavigate()
    return (
        <>
            <BackgroundAnimation sakura={true}>
                <Header authLinks={true} />
            </BackgroundAnimation>
            <Container>
                <DiagonalBoxContainr>
                    <FirstDiagonalBox>
                        <FirstContentContainer>
                            <Slogan>
                                La plateforme de communication faite pour les
                                étudiants, par des étudiants.
                            </Slogan>
                        </FirstContentContainer>
                    </FirstDiagonalBox>
                    <MiddleContents>
                        <SecondContentContainer>
                            <Slogan
                                style={{ maxWidth: '50em', marginTop: '10em' }}
                            >
                                Créez des serveurs pour retrouver vos camarades{' '}
                                &amp; Organisez des groupes de discussion tout
                                en gardant le contrôle.
                            </Slogan>
                        </SecondContentContainer>
                    </MiddleContents>
                    <SecondDiagonalBox>
                        <SecondContentContainer>
                            <Slogan>
                                Retrouvez vos fonctionnalités préférées :
                                Markdown, Latex... sont au rendez-vous.
                            </Slogan>
                        </SecondContentContainer>
                    </SecondDiagonalBox>
                    <LastContainer>
                        <JoinApandoContainer>
                            <Slogan>
                                Il est temps !
                                <AuthButtonContainer>
                                    <Button
                                        variant="outlined"
                                        onClick={() => navigate('/login')}
                                        size="large"
                                    >
                                        Se connecter
                                    </Button>
                                    <Button
                                        size="large"
                                        variant="contained"
                                        onClick={() => navigate('/signup')}
                                    >
                                        S'inscrire
                                    </Button>
                                </AuthButtonContainer>
                            </Slogan>
                            <MascotteCute
                                src={mascottoCute}
                                alt="La mascotte"
                            />
                        </JoinApandoContainer>
                    </LastContainer>
                    <Footer />
                </DiagonalBoxContainr>
            </Container>
            {/* <WaveHome /> */}
        </>
    )
}

export default Home

/* <div>
        <HomePage>
            <h1
                style={{
                    color: theme.font_color,
                    paddingTop: '30px',
                    textAlign: 'center',
                }}
            >
                Ouverture de la beta fermée
            </h1>
            <FirstDiagonalBox>
                <h2>Le début d'une longue aventure</h2>
                <p>
                    Bienvenue dans la beta fermée du projet de
                    plateforme de communication, ayant comme nom
                    Apando.
                </p>
                <p>
                    Apando est un projet ayant vu le jour en
                    septembre 2021 afin de pallier au nom respect du
                    RGPD de certaines applications de discussion. Il
                    s'avère qu'au moment de cette beta, les critères
                    du RGPD ne sont pas tous respectés et que y
                    participer signifie le consentement de
                    l'utilisateur quant à l'utilisation des données
                    qu'il y a entré. Cela dit, aucune donnée
                    personnelle n'est volée à l'utilisateur, n'est
                    divulgué ou n'est vendu à d'autres tiers.
                </p>
                <p>
                    Suite à l'ouverture de la beta fermée, des bugs
                    peuvent avoir lieu. Si vous en détectez, les
                    signaler permettra l'amélioration du site et la
                    possibilité de vous offrir une meilleure
                    expérience avec nous. Vous pouvez signaler tout
                    bug par{' '}
                    <a href="https://github.com/Taliayaya/Project-Plateforme/issues">
                        l'ouverture d'un ticket sur GitHub
                    </a>
                    . En indiquant le bug, ce qu'il fait, et comme
                    il a été produit.
                </p>
                <p>
                    L'équipe Apando vous remercie de votre attention
                </p>
            </FirstDiagonalBox>
            <FirstDiagonalBox>
                <h2>Rejoignez vos amis !</h2>
                <p>
                    Vos camarades vous attendent ! Rejoignez-les sur
                    leurs serveurs ou créez le vôtre en un temps
                    record, pour ne plus jamais être séparé.
                </p>
            </FirstDiagonalBox>
            <FirstDiagonalBox>
                <h2>Envoyez des messages construits ! </h2>
                <p>
                    Grâce à la technologie du Markdown, envoyez-vos
                    <strong> meilleurs messages</strong> de
                    <em> mille façons</em> pour enfin vous exprimer
                    comme vous l'aviez réellement souhaité.
                </p>

                <ReactMarkdown
                    children={`Grâce à la technologie Katex et Latex, vous pouvez écrire les formules les plus compliquées que vous connaissez
                ou encore la sublime identité d'Euler, ou tout simplement quelque chose d'aléatoire comme ceci : $C_L$ = $x^2 + y^2 - z^2$.
                fini les recherches google ou des formules illisibles comme (a+b)^2/(c+d), $\\frac{(a+b)^2}{c+d}$ restera à jamais supérieur !`}
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                />
            </FirstDiagonalBox>
            <FirstDiagonalBox>
                <h2>Convaincu ? Rejoignez la beta !</h2>
                <p>
                    Vous y êtes presque, si toutes ces
                    fonctionnalités et le futur de ce site vous fait
                    rêver, n'hésitez pas à aller le voir de vos
                    propres yeux !! C'est très simple :
                </p>
                <p>
                    <StyleLink to="/signup">
                        Créez vous un compte
                    </StyleLink>
                </p>
                <p>
                    <StyleLink to="/join">
                        Rejoignez le serveur beta
                    </StyleLink>{' '}
                    <br />
                    Il a pour nom <strong>beta</strong> et pour code{' '}
                    <strong>beta</strong>
                </p>
            </FirstDiagonalBox>
        </HomePage>
    </div> */
