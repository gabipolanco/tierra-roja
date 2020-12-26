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
        transform: rotate(-30deg);
        position: absolute;
        height: 125vw;
        width: 125vw;
        top: 19vw;
        left: -38vw;
        .left {
            display: flex;
            justify-content: flex-end;
            align-items: flex-start;
            position: relative;
            height: 150%;
            width: 40%;
            background-color: rgba(0,0,0, .4);
            &>div {
                display: flex;
                flex-direction: column;
                space-between: center;
                align-items: center;
                margin-top: 80%;
                margin-right: 10%;
                transform: rotate(30deg);
                h2, h3 {
                    display: block;
                    max-width: 200px;
                }
            }
            .social {
                width: 150px;
                display: flex;
                justify-content: space-evenly;
                margin-top: 50px;
                a {
                    color: white;
                    font-size: 24px;
                }
            }
        }
        .right {
            display: flex;
            width: 60%;
            height: 100%;
            .inner-rest {
                height: 40vh;
                width: 100%;
                margin: 2px 4px;
                background-color: rgba(0,0,0, .4);
            }
            .inner-rest2 {
                height: 40vh;
                width: 100%;
                margin: 2px 4px;
                background-color: rgba(0,0,0, .4);
            }
            .right-left {
                width: 40%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                height: 100%;
            }
            .right-right {
                width: 60%;
                display: flex;
                flex-direction: column;
                justify-content: center;
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
                h3{
                    transform: rotate(30deg);
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
    padding: 80px;
    background-color: rgba(255,255,255);
    text-align: justify;
    transition: all .4s ease;
    overflow-y: scroll;
}
.bio img {
    height: 50%;
    width: 30%;
    object-fit: scale-down;
    margin: 70px 40px 0 0;
}
.arte {
    .art-container {
        width: 100%;
        .border {
            padding: 60px;
            max-height: 480px;
            box-shadow: 0 0 3px black;
        }
        .img-container {
            position: relative;
            max-height: 360px;
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
            top: 40vh;
            left: 30px;
            font-size: 30px;
            color: #f0f0f0;
            cursor: pointer;
            z-index: 15;
            display: block;
            height: 30px;
            width: 20px;
        }
        .arrow-right {
            position: absolute;
            top: 40vh;
            right: 30px;
            font-size: 30px;
            color: #f0f0f0;
            cursor: pointer;
            z-index: 15;
            display: block;
            height: 30px;
            width: 20px;
        }
        .info {
            text-align: right;
            padding: 30px;
            line-height: 10px;
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
    right: 100px;
    top: 100px;
    cursor: pointer;
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
    }
}
`