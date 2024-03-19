import React, { useEffect, useState } from "react";
import { Container, StyledLink } from "../styles/AiQuizPageStyled";
import NavBar from "../components/NavBar";
import axios from "axios";
import { categories } from "../components/category";

interface Data {
    code: string;
    message: string;
    answerList: string;
    quizIdList: any;
    quizList: any;
}

const AiQuizPage = () => {
    const [selectCategory, setSelectCategory] = useState<string | undefined>();
    const [data, setData] = useState<Data[]>([]);

    const getData = async () => {
        console.log("요청");
        try {
            const response = await axios.get(
                "https://port-0-qtudy-qxz2elttj8wkd.sel5.cloudtype.app/quiz/tag-quiz",
                {
                    params: { tagName: "AI" },
                }
            );

            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSelectCategory = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectCategory(event.target.value);
    };

    // div에 onClick을 했으니 HTMLDivElement로 타입을 정의한다.
    const createQuiz = (event: React.MouseEvent<HTMLDivElement>) => {
        // console.log(selectCategory);
        getData();
        console.log("클릭해서 요청 보냄");
    };

    // useEffect(() => {
    //     // getData();
    // }, []);

    return (
        <>
            <NavBar />
            <Container>
                <div className="titleBox">
                    <p className="title">AI Quiz 트렌디하게 공부하기</p>
                    <p className="subTitle">
                        퀴즈는 4지선다의 객관식 10문제로 이루어져 있습니다.
                    </p>
                </div>
                <div className="quizSetting">
                    <select onChange={handleSelectCategory}>
                        {categories.map((category) => (
                            <option
                                key={category.categoryId}
                                value={category.categoryId}
                            >
                                {category.category}
                            </option>
                        ))}
                    </select>
                    <select>
                        <option value="hashtag">#react</option>
                        <option value="hashtag">#typescript</option>
                        <option value="hashtag">#javascript</option>
                        <option value="hashtag">#html/css</option>
                    </select>
                </div>
                <StyledLink to="/quiz">
                    <div className="quizStartBtn">
                        <div className="btn" onClick={createQuiz}>
                            퀴즈 생성하기
                        </div>
                    </div>
                </StyledLink>
            </Container>
        </>
    );
};
export default AiQuizPage;
