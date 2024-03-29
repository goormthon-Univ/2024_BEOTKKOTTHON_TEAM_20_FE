import styled from "styled-components";
import theme from "./theme";
import { Link } from "react-router-dom";

export const Container = styled.div`
    width: 85vw;
    height: 90vh;
    background-color: ${theme.colors.line2};

    position: fixed;
    top: 10vh;
    left: 15vw;

    display: flex;
    justify-content: center;
    align-items: center;

    p {
        margin: 0;
    }

    .contentBox {
        width: 40vw;
        height: 80vh;
        padding: 0 5vw;

        border-radius: 15px;

        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;

        background-color: white;
    }

    .profileBox {
        width: 40vw;
        padding: 5vh 0;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        border-bottom: 1px solid ${theme.colors.line1};
    }

    .profile_img {
        width: 10rem;
        height: 10rem;

        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: 50%;

        box-shadow: 0px 1px 20px 0px rgba(0, 0, 0, 0.1);

        background-color: ${theme.colors.line2};
    }

    .profileImg {
        width: 10rem;
        height: 10rem;
        border-radius: 50%;
    }

    .qudyImg {
        width: 5rem;
    }

    .username {
        font-size: 32px;
        font-weight: bold;
        color: ${theme.colors.font1};
    }

    .email {
        margin-top: 1vh;
        font-size: 20px;
        color: ${theme.colors.font2};
    }

    .interestBox {
        width: 40vw;
        height: 35vh;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }

    .interestTitle {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .userTitle {
        font-size: 24px;
        margin-right: 3vw;
        color: ${theme.colors.font1};
    }

    .linkToInterest {
        display: flex;
        justify-content: center;
        align-content: center;
    }

    .linkToInterest > img {
        width: 1rem;
        margin-left: 0.3rem;
    }

    .linkTitle {
        font-size: 14px;
        color: ${theme.colors.font3};
    }

    .interests {
        width: 40vw;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }

    .interest {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .interest_icon {
        width: 120px;
        height: 120px;
        border-radius: 50%;

        display: flex;
        justify-content: center;
        align-items: center;

        background-color: ${theme.colors.line2};
    }

    .interesIconImg {
        width: 4rem;
    }

    .interest_text {
        margin-top: 3vh;
        font-size: 16px;
        color: ${theme.colors.font3};
    }
`;

export const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none;
    }
`;
