import React, { useEffect, useState } from "react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Container, StyledLink } from "../styles/MainPage2Styled";
import NavBar from "../components/NavBar";
import PreferBoard from "../components/PreferBoard";
import Banner1 from "../image/banner1_ver2.png";
import Banner2 from "../image/banner2_ver2.png";
import GoQuiz from "../image/GoQuiz.png";
import GoPost from "../image/GoPost.png";
import GoNote from "../image/GoNote.png";
import MainLogo from "../image/Qtudy_logo_2.png";
import { Link, useNavigate } from "react-router-dom";
import { MoreButton, BoxWrap } from "../styles/PreferBoardStyled";
import Trend1 from "../image/Trend1.png";
import Trend2 from "../image/Trend2.png";
import Trend3 from "../image/Trend3.png";
import linkIcon from "../image/linkIcon.png";
import axios from "axios";
import { MyPostProps } from "../components/MyPostProps";
import PostCard from "../components/PostCard";
import DownArrow from "../image/DownArrow.png";
import UpArrow from "../image/UpArrow.png";

const MainPage2 = () => {
    const navigate = useNavigate();
    const [interestPosts, setInterestPosts] = useState<MyPostProps[]>([]);
    const [visiblePosts, setVisiblePosts] = useState(6);
    const [isExpanded, setIsExpanded] = useState(false);
    const [postList, setPostList] = useState<MyPostProps[]>([]);

    const goToPostBoardPage = (searchWord: string) => {
        navigate(`/postBoard?search=${searchWord}`);
    };
    const [topPosts, setTopPosts] = useState<{ name: string; count: number }[]>(
        []
    );

    useEffect(() => {
        const fetchTrend = async () => {
            try {
                const response = await axios.get(
                    `https://port-0-qtudy-qxz2elttj8wkd.sel5.cloudtype.app/tag/top3`
                );
                setTopPosts(response.data.tagList);
                console.log(response.data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log("error fetching :", error.response);
                }
            }
        };
        fetchTrend();
    }, []);

    useEffect(() => {
        const fetchInterest = async () => {
            try {
                const response = await axios.get(
                    `https://port-0-qtudy-qxz2elttj8wkd.sel5.cloudtype.app/my/interests`,
                    {
                        headers: {
                            Authorization:
                                window.localStorage.getItem("accessToken"),
                        },
                    }
                );

                console.log(response.data);
                const interestCategories = response.data.interests;
                fetchInterestPosts(interestCategories);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log("error fetching:", error.response);
                }
            }
        };

        const fetchInterestPosts = async (interestCategories: number[]) => {
            try {
                // categoryId들을 파라미터로 사용하여 쿼리스트링을 생성
                const queryString = interestCategories
                    .map((categoryId) => `category=${categoryId}`)
                    .join("&");
                const response = await axios.get(
                    `https://port-0-qtudy-qxz2elttj8wkd.sel5.cloudtype.app/posts/category-list?${queryString}`
                );
                const posts = response.data.postList;
                setInterestPosts(posts);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log("error fetching:", error.response);
                }
            }
        };

        fetchInterest();
    }, []);

    const MoreViewHandler = () => {
        if (isExpanded) {
            setVisiblePosts(6);
        } else {
            setVisiblePosts((prev) => prev + 6);
        }
        setIsExpanded((prev) => !prev); // 버튼 클릭 시 "더보기" 상태와 "접기" 상태를 토글
    };

    const handleSearchWordChange = (searchWord: string) => {
        navigate(`/postBoard?searchWord=${searchWord}`);
    };

    // const goToQuiz = (event: React.MouseEvent<HTMLDivElement>) => {

    // };

    return (
        <Container>
            <NavBar onSearchWordChange={handleSearchWordChange} />
            <div className="contentBox">
                <div className="bannerBox">
                    <div>
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={0}
                            slidesPerView={1}
                            autoplay={{
                                delay: 3000,
                            }}
                            // navigation
                            pagination={{ clickable: true }}
                            // scrollbar={{ draggable: true }}
                            loop={true}
                        >
                            <SwiperSlide>
                                <img
                                    src={Banner1}
                                    alt="banner"
                                    className="bannerImg"
                                ></img>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img
                                    src={Banner2}
                                    alt="banner"
                                    className="bannerImg"
                                ></img>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
                <div className="trendBox">
                    <p className="boxTitle">요즘 뜨는 트렌드 TOP 3</p>
                    <div className="trends">
                        <div className="trends">
                            {/* 첫 번째 트렌드 요소 */}
                            {topPosts[0] && (
                                <div className="trend">
                                    <div className="trendImg">
                                        <img src={Trend1} alt="top3" />
                                    </div>
                                    <div className="trendText">
                                        <p className="top">
                                            # {topPosts[0].name}
                                        </p>
                                        <div className="goToQuiz">
                                            <StyledLink
                                                to={"/quiz"}
                                                state={{
                                                    tagName: topPosts[0].name,
                                                }}
                                            >
                                                퀴즈 풀러 가기
                                            </StyledLink>
                                            <div className="goIcon">
                                                <img
                                                    src={linkIcon}
                                                    alt="topQuiz"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 두 번째 트렌드 요소 */}
                            {topPosts[1] && (
                                <div className="trend">
                                    <div className="trendImg">
                                        <img src={Trend2} alt="top3" />
                                    </div>
                                    <div className="trendText">
                                        <p className="top">
                                            # {topPosts[1].name}
                                        </p>
                                        <div className="goToQuiz">
                                            <StyledLink
                                                to={"/quiz"}
                                                state={{
                                                    tagName: topPosts[1].name,
                                                }}
                                            >
                                                퀴즈 풀러 가기
                                            </StyledLink>
                                            <div className="goIcon">
                                                <img
                                                    src={linkIcon}
                                                    alt="topQuiz"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 세 번째 트렌드 요소 */}
                            {topPosts[2] && (
                                <div className="trend">
                                    <div className="trendImg">
                                        <img src={Trend3} alt="top3" />
                                    </div>
                                    <div className="trendText">
                                        <p className="top">
                                            # {topPosts[2].name}
                                        </p>
                                        <div className="goToQuiz">
                                            <StyledLink
                                                to={"/quiz"}
                                                state={{
                                                    tagName: topPosts[2].name,
                                                }}
                                            >
                                                퀴즈 풀러 가기
                                            </StyledLink>
                                            <div className="goIcon">
                                                <img
                                                    src={linkIcon}
                                                    alt="topQuiz"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="linkImgBox">
                    <Link to="/aiQuiz">
                        <img
                            src={GoQuiz}
                            alt="linkImg"
                            className="linkImg"
                        ></img>
                    </Link>
                    <Link to="/write">
                        <img
                            src={GoPost}
                            alt="linkImg"
                            className="linkImg"
                        ></img>
                    </Link>
                    <Link to="/myMistakeNotebook">
                        <img
                            src={GoNote}
                            alt="linkImg"
                            className="linkImg"
                        ></img>
                    </Link>
                </div>
                {/* 로그인을 하면 preferboard 로그인 안하면 totalboard */}
                <PreferBoard />
            </div>
            <div className="footerBox">
                <div className="footer_inner">
                    <img src={MainLogo} alt="logo"></img>
                    <p className="copyright">
                        Copyright ⓒ Qtudy. All rights reserved.
                    </p>
                </div>
                <div className="footer_inner">
                    <p className="footer">Instagram | @q_qtudy</p>
                    <p className="footer">구름톤 유니브 2기</p>
                </div>
            </div>
        </Container>
    );
};
export default MainPage2;
