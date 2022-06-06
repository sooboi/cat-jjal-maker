import styled from "styled-components";

const Title = (props) => {
  return <TitleText>{props.children}</TitleText>;
};

export default Title;

const TitleText = styled.div`
  font-size: 50px;
  font-weight: 600;
`;
