import React, { useState, useEffect, ChangeEvent } from "react";
import { Container } from "../styles/Comment2Styled";
import axios from "axios";
import { Comment } from "../components/comment";
import { Pagination } from "@mui/material";
import qudyImg from "../image/Qtudy_char.png";

interface CommentBoardProps {
    postId: string | undefined;
}

const Comment2: React.FC<CommentBoardProps> = ({ postId }) => {
    const [editCommentId, setEditCommentId] = useState<string | null>(null); // 수정할 댓글의 ID를 저장하는 상태
    const [editCommentContent, setEditCommentContent] = useState(""); // 수정한 댓글의 내용을 저장하는 상태
    const [inputComment, setInputComment] = useState("");
    const [commentList, setCommentList] = useState<Comment[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [token, setToken] = useState<string | null>(null);
    const isLoggedIn = token !== null; // 토큰이 있는 경우 로그인된 상태로 간주
    const [loginName, setLoginName] = useState();
    const [loginProfile, setLoginProfile] = useState();

    useEffect(() => {
        // 로컬 스토리지에서 토큰 가져오기
        const storedToken = window.localStorage.getItem("accessToken");
        if (storedToken) {
            setToken(storedToken);
        }
        getUser();
    }, []);

    useEffect(() => {
        const scrollToTop = () => {
            window.scrollTo(0, 0); // 페이지의 가장 상단으로 스크롤 이동
        };
        scrollToTop();
    }, []);

    const handlePageChange = async (
        event: React.ChangeEvent<unknown>,
        page: number
    ) => {
        try {
            const response = await axios.get(
                `https://port-0-qtudy-qxz2elttj8wkd.sel5.cloudtype.app/posts/comments/all?postId=${postId}`,
                {
                    params: { page },
                    headers: {
                        Authorization:
                            window.localStorage.getItem("accessToken"),
                    },
                }
            );

            setCommentList(response.data.commentList);
            if (Array.isArray(response.data)) {
            } else {
                console.log("API 응답 데이터가 배열이 아닙니다.");
            }
            console.log(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("error fetching :", error.response);
            }
        }
    };

    useEffect(() => {
        if (postId) {
            fetchComments();
        }
    }, [postId]);

    // 댓글 조회
    const fetchComments = async () => {
        try {
            const response = await axios.get(
                `https://port-0-qtudy-qxz2elttj8wkd.sel5.cloudtype.app/posts/comments/all?postId=${postId}`,
                {
                    params: { page: 0 },
                }
            );
            setCommentList(response.data.commentList);
            setTotalPages(response.data.totalPages);

            response.data.commentList.forEach((comment: Comment) => {
                console.log(comment.profileImageUrl);
            });
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    // 댓글 삭제
    const handleDeleteComment = async (commentId: string) => {
        try {
            await axios.delete(
                `https://port-0-qtudy-qxz2elttj8wkd.sel5.cloudtype.app/posts/comments?postId=${postId}&commentId=${commentId}`,
                {
                    headers: {
                        Authorization:
                            window.localStorage.getItem("accessToken"),
                    },
                }
            );
            // 삭제 후 댓글 목록 갱신
            fetchComments();
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    // 댓글 수정
    const handleUpdateComment = async (commentId: string) => {
        try {
            await axios.patch(
                `https://port-0-qtudy-qxz2elttj8wkd.sel5.cloudtype.app/posts/comments?postId=${postId}&commentId=${commentId}`,
                { content: editCommentContent }
            );
            // 수정 후 댓글 목록 갱신
            fetchComments();
            // 수정 상태 초기화
            setEditCommentId(null);
            setEditCommentContent("");
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    };

    const handleEditComment = (commentId: string, content: string) => {
        // 수정할 댓글의 ID와 내용을 상태에 저장
        setEditCommentId(commentId);
        setEditCommentContent(content);
    };

    const getUser = async () => {
        try {
            // 로그인한 사용자의 정보 및 프로필 이미지 가져오기
            const userProfileResponse = await axios.get(
                `https://port-0-qtudy-qxz2elttj8wkd.sel5.cloudtype.app/my`,
                {
                    headers: {
                        Authorization:
                            window.localStorage.getItem("accessToken"),
                    },
                }
            );
            // const { name, profileImageUrl } = userProfileResponse.data;
            setLoginName(userProfileResponse.data.name);
            console.log(userProfileResponse.data.profileImageUrl);
            setLoginProfile(userProfileResponse.data.profileImageUrl);
        } catch (error) {
            console.error("Error sending comment:", error);
        }
    };

    // 댓글 등록
    const SendCommentHandler = async () => {
        // console.log("테스트");
        try {
            // 로그인한 사용자의 정보 및 프로필 이미지 가져오기
            const userProfileResponse = await axios.get(
                `https://port-0-qtudy-qxz2elttj8wkd.sel5.cloudtype.app/my`,
                {
                    headers: {
                        Authorization:
                            window.localStorage.getItem("accessToken"),
                    },
                }
            );
            // const { name, profileImageUrl } = userProfileResponse.data;
            setLoginName(userProfileResponse.data.name);
            console.log(userProfileResponse.data.profileImageUrl);
            setLoginProfile(userProfileResponse.data.profileImageUrl);
            const response = await axios.post(
                `https://port-0-qtudy-qxz2elttj8wkd.sel5.cloudtype.app/posts/comments?postId=${postId}`,
                { content: inputComment },
                {
                    headers: {
                        Authorization:
                            window.localStorage.getItem("accessToken"),
                    },
                }
            );
            console.log(response.data);
            fetchComments();
            setInputComment("");
        } catch (error) {
            console.error("Error sending comment:", error);
        }
    };

    const onInputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputComment(e.target.value);
    };

    return (
        <Container>
            <div className="commentBox">
                <p className="commentTitle">댓글</p>
                {/* 댓글 하나 입니다  */}
                {commentList.map((comment) => (
                    <div className="comment" key={comment.commentId}>
                        <div className="commentHeader">
                            <div className="userBox">
                                {comment.profileImageUrl === null ? (
                                    <img
                                        className="userProfileImg"
                                        src={qudyImg}
                                        alt="qudy"
                                    />
                                ) : (
                                    <img
                                        className="userProfileImg"
                                        src={comment.profileImageUrl}
                                        alt="profile"
                                    ></img>
                                )}
                                <p className="userName">{comment.name}</p>
                            </div>
                            {comment.name === loginName &&
                            comment.profileImageUrl === loginProfile ? (
                                <div className="commentBtnBox">
                                    <p
                                        className="commentDelBtn"
                                        onClick={() =>
                                            handleDeleteComment(
                                                comment.commentId.toString()
                                            )
                                        }
                                    >
                                        삭제
                                    </p>
                                </div>
                            ) : null}
                        </div>
                        <div className="commentBody">
                            <p className="commentText">{comment.content}</p>
                            <p className="commentDate">
                                {comment.createdAt.slice(0, 10)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Pagination count={totalPages} onChange={handlePageChange} />
            </div>
            <div className="postCommentBox">
                <div className="postCommentBoxHeader">
                    <img
                        className="userProfileImg"
                        src={loginProfile}
                        alt="img"
                    />
                    <p className="userName">{loginName}</p>
                </div>
                <textarea
                    className="postComment"
                    placeholder="댓글을 남겨보세요"
                    value={inputComment}
                    onChange={onInputHandler}
                ></textarea>
                <div className="commentSubmitBtnBox">
                    <div
                        className="commentSubmitBtn"
                        onClick={SendCommentHandler}
                    >
                        등록
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Comment2;
