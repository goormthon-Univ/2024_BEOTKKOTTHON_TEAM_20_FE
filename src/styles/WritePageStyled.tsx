import styled from "styled-components";

export const BackG = styled.div`
    background-color:#e9e9e9;
    display:flex;
    justify-content:center;
    width:100%;
    height:2000px;

`;
export const WBoard = styled.div`
    width:70%;
    height:1500px;
    margin-top:170px;
    background-color:white;
    justify-content:center;
    align-items:center;
    display:flex;
`;
export const WFrame = styled.div`
    width:90%;
    height:1400px;
    position:relative;
`;
export const HeadOpt = styled.div`
    display:flex;
    flex-direction:row;
    height:40px;
    justify-content:space-between;
    margin-bottom:80px;
`;
export const Opt1 = styled.div`
    font-size:20px;
    font-weight:600;
`;
export const Selector=styled.select`
    width:280px;
    height:40px;
    margin-left:20px;
`;
export const TagInput=styled.input`
    width:280px;
    height:35px;
    margin-left:20px;
    padding-left:5px;
`;
export const SummaryB = styled.button`
    width:200px;
    color:white;
    background-color:purple;
    font-size:large;
    border-radius:5px;
`;
export const Title =styled.textarea`
border:none;
resize:none;
&:focus{
    outline:none;
}
font-size:40px;
font-weight:600;
    width:99%;
    height:4%;
`;
export const Content = styled.textarea`
    font-size:20px;
    width:99%;
    height:80%;
    border:none;
    resize:none;
    &:focus{
        outline:none;
    }
    margin-top:20px;
`;
export const Count =styled.div`
position:absolute;
right:0;
bottom:0;
`;