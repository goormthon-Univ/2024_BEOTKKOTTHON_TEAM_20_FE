import React, { useEffect, useState } from "react";
import {
    Div,
    Navigation,
    Logo,
    Nav,
    InputQ,
    AnimationDiv,
    SIcon,
    StyledLink,
} from "../styles/NavBarStyled";
import MainLogo from "../image/Qtudy_logo_2.png";
import SearchIcon from "../image/SearchIcon.png";
import qudyImg from "../image/Qtudy_char.png";
import axios from "axios";
import mypageIcon from "../image/mypageIcon.png";
import logoutIcon from "../image/logoutIcon.png";
import DownArrow from "../image/DownArrow.png";
import UpArrow from "../image/UpArrow.png";
import { Link } from "react-router-dom";
import Search from "./Search";

interface MyPageProps {
    name: string;
    email: string;
    profileImageUrl: string;
}

const NavBar = ({ onSearchWordChange }: { onSearchWordChange: Function }) => {
    // const NavBar = () => {
    const [data, setData] = useState<MyPageProps>();
    const [searchWord, setSearchWord] = useState("");
    const [viewOption, setViewOption] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchWord(event.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // 입력 필드에서 Enter 키를 누르면 검색 실행
        if (event.key === "Enter") {
            search();
        }
    };

    const search = () => {
        // 검색어 변경 시 부모 컴포넌트로 전달
        // onSearchWordChange(searchWord);
    };

    //     const animationHandler = () => {
    //     setViewOption((prevViewOption) => !prevViewOption); // 이전 상태의 반대값으로 업데이트
    // };

    const isLogin = window.localStorage.getItem("accessToken");

    const getData = async () => {
        try {
            const response = await axios.get(
                "https://port-0-qtudy-qxz2elttj8wkd.sel5.cloudtype.app/my",
                {
                    headers: {
                        Authorization:
                            window.localStorage.getItem("accessToken"),
                    },
                }
            );
            // console.log(response.data);

            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    const animationHandler = () => {
        setViewOption((prevViewOption) => !prevViewOption); // 이전 상태의 반대값으로 업데이트
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Navigation>
            <div className="navBox">
                <a href="/">
                    <Logo src={MainLogo} alt="mainlogo" />
                </a>
                <Div>
                    <Nav href="/postBoard">스터디 포스팅</Nav>
                    <Nav href="/aiQuiz">AI 퀴즈</Nav>
                    {/* <div className="searchBar">
                        <SIcon src={SearchIcon}></SIcon>
                        <input
                            placeholder="검색어를 입력하세요"
                            value={searchWord}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                        ></input>
                        
                    </div> */}
                    <Search />
                </Div>
            </div>
            <div className="userBox">
                {isLogin ? (
                    <>
                        <div className="infoo">
                            <div className="userProfileImg">
                                {data?.profileImageUrl ? (
                                    <img
                                        src={data.profileImageUrl}
                                        alt="default"
                                        className="profileImg"
                                    />
                                ) : (
                                    <img
                                        src={qudyImg}
                                        alt="default"
                                        className="qudyImg"
                                    />
                                )}
                            </div>
                            <div className="userName">
                                {data && data.name} 님
                            </div>
                            <img
                                className="arrow"
                                src={viewOption ? UpArrow : DownArrow}
                                onClick={animationHandler}
                                alt="icon"
                            />
                        </div>
                        <div>
                            {viewOption && (
                                <>
                                    {isLogin ? (
                                        <>
                                            <AnimationDiv>
                                                <StyledLink to="/mypage">
                                                    <img
                                                        src={mypageIcon}
                                                        alt="icon"
                                                    />
                                                    <p>마이페이지</p>
                                                </StyledLink>
                                                <StyledLink to="/logout">
                                                    <img
                                                        src={logoutIcon}
                                                        alt="icon"
                                                    />
                                                    <p>로그아웃</p>
                                                </StyledLink>
                                            </AnimationDiv>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </>
                            )}
                        </div>
                    </>
                ) : (
                    <Nav href="/login">로그인</Nav>
                )}
            </div>
        </Navigation>
    );
};

export default NavBar;
