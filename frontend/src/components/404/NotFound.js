import React from 'react';
import styled from 'styled-components'

const PageStyled = styled.div`
height: 100vh;
width: 100vw;
overflow: hidden;
position: absolute;
background-image: url("https://res.cloudinary.com/tomiscattini/image/upload/v1607637154/tierra-roja/Imagenes%20pagina/lapacho_ncvt5q.jpg");
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
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20vh;
}
`

function NotFound() {
  return (
    <PageStyled className="page">
            <div className="animate__animated animate__bounceInLeft">
                <div>
                    <h2>Ups! Esta página al parecer no existe</h2>
                </div>
            </div>
        </PageStyled>
  );
}

export default NotFound;
