import styled from 'styled-components'

export default styled.div`
    display: flex;
    position: relative;
    height: 95vh;
    width: 100vw;
    overflow: hidden;

    h2, h3 {
        color: white;
        font-weight: bold;
        text-transform: uppercase;
    }

    .cover-image {
        position: absolute;
        top: 0;
        left: calc(50vw - 82vh);
        height: 100%;
        opacity: .9;
    }
    .back {
        position: fixed;
        top: 70px;
        left: 70px;
        color: white;
        z-index: 10;
        i {
            margin-right: 10px;
        }
    }
    .edit {
        position: fixed;
        color: white;
        font-size: 20px;
        top: 100px;
        left: 100px;
        cursor: pointer;
        z-index: 10;
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        width: 100vw;
        .left {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            height: 50%;
            width: 100%;
            background-color: rgba(0,0,0, .4);
            &>div {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                h2, h3 {
                    display: block;
                    max-width: 300px;
                }
            }
            .social {
                width: 150px;
                display: flex;
                justify-content: space-evenly;
                margin-top: 20px;
                a {
                    color: white;
                    font-size: 24px;
                }
            }
        }
        .right {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 60%;
            .inner-rest {
                display: none;
            }
            .inner-rest2 {
               display: none;
            }
            .right-left {
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                height: 75%;
            }
            .right-right {
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                height: 25%;
            }
            .inner-btn {
                z-index: 10;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 40vh;
                width: 100%;
                margin: 2px 4px;
                background-color: rgba(0,0,0, .4);
                transition: all .4s ease;
                &:hover {
                    transform: scale(.95);
                    cursor: pointer;
                }
            }
        }
    }

.bio, .arte, .courses, .store {
    position: absolute;
    display: flex;
    right: 0;
    width: 100vw;
    height: 100%;
    padding: 80px 30px 80px 80px;
    background-color: rgba(255,255,255);
    text-align: justify;
    transition: all .4s ease;
    overflow-y: scroll;
    z-index: 20;
}
.bio {
    display: flex;
    flex-wrap: wrap;
    img {
        height: 30%;
        width: 100%;
        object-fit: scale-down;
    }
}
.arte {
    .art-container {
        position: relative;
        width: 90%;
        margin-left: 5%;
        .border {
            padding: 30px;
            max-height: 380px;
            box-shadow: 0 0 3px black;
        }
        .img-container {
            position: relative;
            max-height: 318px;
            overflow: hidden;
            img {
                transition: all .6s ease;
                width: 100%;
                height: auto;
                &:hover {
                    transform: scale(1.05);
                }
            }
        }
        .arrow-left {
            position: absolute;
            top: 10vh;
            left: -30px;
            font-size: 20px;
            color: black;
            cursor: pointer;
            z-index: 15;
            display: block;
            height: 30px;
            width: 20px;
        }
        .arrow-right {
            position: absolute;
            top: 10vh;
            right: -30px;
            font-size: 20px;
            color: black;
            cursor: pointer;
            z-index: 15;
            display: block;
            height: 30px;
            width: 20px;
        }
        .info {
            text-align: right;
            padding: 30px;
            font-size: 14px;
            font-weight: bold;
            color: black;
        }
    }
}

.store {
    .border {
        padding: 20px;
        max-height: 480px;
        max-width: 340px;
        box-shadow: 0 0 3px black;
    }
    .img-container2 {
        position: relative;
        overflow: hidden;
    }
}

.course-container {
    width: 100%;
}
.close{
    position: fixed;
    right: 60px;
    top: 80px;
    cursor: pointer;
    color: black;
    font-family: ${props => props.theme.font.primary};
    font-size: 18px;
    text-align: center;
}
@media ${props => props.theme.device.lgPhone} {
    .arte {
        .art-container {
            .arrow-left {
                top: 20vh;
            }
            .arrow-right {
                top: 20vh;
            }
        }
    }
} 
@media ${props => props.theme.device.tablet} { 
    .wrapper {
        flex-direction: row;
        transform: rotate(-30deg);
        transform-origin: top left;
        position: absolute;
        height: 125vw;
        width: 125vw;
        top: 19vw;
        left: -38vw;
        .left {
            justify-content: flex-end;
            align-items: flex-start;
            height: 150%;
            width: 40%;
            &>div {
                margin-top: 80%;
                margin-right: 10%;
                transform: rotate(30deg);
                h2, h3 {
                    max-width: 200px;
                }
            }
        }
        .right {
            flex-direction: row;
            width: 60%;
            height: 100%;
            .inner-rest {
                display: block;
                height: 40vh;
                width: 100%;
                margin: 2px 4px;
                background-color: rgba(0,0,0, .4);
            }
            .inner-rest2 {
                display: block;
                height: 40vh;
                width: 100%;
                margin: 2px 4px;
                background-color: rgba(0,0,0, .4);
            }
            .right-left {
                width: 40%;
                height: 100%;
            }
            .right-right {
                width: 60%;
                height: 100%;
                padding-left: 4px;
                .inner-rest {
                    margin-top: 20vh;
                    height: 70vh;
                }
                .inner-btn {
                    padding-right: 160px;
                }
            }
            .inner-btn {
                h3{
                    transform: rotate(30deg);
                }
            }
        }
    }
    .bio {
        img {
            height: 50%;
            width: 30%;
            margin: 70px 40px 0 0;
        }
        .content {
            width: 60%;
        }
    }
    .arte {
        .art-container {
            .border {
                max-height: 480px;
                padding: 60px;
            }
            .img-container {
                max-height: 360px;
            }
            .arrow-left {
                top: 30vh;
                left: -30px;
                font-size: 30px;
            }
            .arrow-right {
                top: 30vh;
                right: -30px;
                font-size: 30px;
            }
        }
    }
}
@media ${props => props.theme.device.laptop} {
    .cover-image {
        height: auto;
        width: 100%;
        left: 0;
    }
    .wrapper {
        transform: rotate(-30deg);
        position: absolute;
        height: 100vw;
        width: 120vw;
        top: 12vw;
        left: -30vw;
        .left {
            height: 100%;
            width: 40%;
            &>div {
                margin-top: 60%;
                margin-right: 18%;
                h2, h3 {
                    max-width: 270px;
                }
            }
        }
        .right {
            width: 60%;
            .right-right {
                .inner-btn {
                    padding: 0;
                }
            }
        }
    }
    .bio, .arte, .courses, .store {
        width: 70vw;
        padding: 80px;
    }
    .arte {
        .art-container {
            margin-left: 0;
            width: 100%;
            .info {
                line-height: 10px;
            }
        }
    }
    .close {
        right: 100px;
    }
}
`