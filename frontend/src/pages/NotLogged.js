import React from 'react'
import styled from 'styled-components'

const PageStyled = styled.div`
height: 100vh;
width: 100vw;
overflow: hidden;
position: absolute;
background-image: url("https://res.cloudinary.com/tomiscattini/image/upload/v1607960585/tierra-roja/Imagenes%20pagina/lapacho_quqt8x.jpg");
background-position: center center;
background-size: 80%;
background-repeat: no-repeat;
&>div {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    height: 100%;
    width: 100%;
}
&>div h2 {
    font-family: ${props => props.theme.font.primary};
    font-size: 20vh;
}
`

const NotLogged = () => {
    return (
        <PageStyled className="page">
            <div className="animate__animated animate__bounceInLeft">
                <div>
                    <h2>Logueate!</h2>
                </div>
            </div>
        </PageStyled>
    )
}

export default NotLogged
