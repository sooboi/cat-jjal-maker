import styled from "styled-components";

const Title = (props) => {
  return <TitleText>{props.children}</TitleText>;
};

export default Title;

const TitleText = styled.div`
  font-family: "BMJUA";
  font-size: 50px;
  font-weight: 600;
  margin-bottom: 20px;
  padding: 10px;
  background-color: black;
  color: white;
`;
