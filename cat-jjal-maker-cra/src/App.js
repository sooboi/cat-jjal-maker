import React from "react";
import Title from "./components/Title";
import styled from "styled-components";

const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://cataas.com";
  const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};

const Form = ({ updateMainCat }) => {
  const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);
  const [value, setValue] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  function handleInputChange(e) {
    const userValue = e.target.value;
    setErrorMessage("");
    if (includesHangul(userValue)) {
      setErrorMessage("한글은 입력할 수 없습니다.");
    }
    setValue(userValue.toUpperCase());
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    setErrorMessage("");

    if (value === "") {
      setErrorMessage("빈 값으로 만들 수 없습니다.");
      return;
    }
    updateMainCat(value);
  }

  return (
    <FormBox onSubmit={handleFormSubmit}>
      <Input
        type="text"
        name="name"
        placeholder="영어 대사를 입력하시오."
        value={value}
        onChange={handleInputChange}
      />
      <MakeBtn type="submit">생성</MakeBtn>
      <Alert>{errorMessage}</Alert>
    </FormBox>
  );
};

function CatItem(props) {
  return (
    <List>
      <img src={props.img} style={{ width: "150px" }} />
    </List>
  );
}

function Favorites({ favorites }) {
  if (favorites.length === 0) {
    return (
      <FavoritesList>
        사진 위 하트를 눌러 고양이 사진을 저장하시라구욘 😾
      </FavoritesList>
    );
  }

  return (
    <Ul className="favorites">
      {favorites.map((cat) => (
        <CatItem img={cat} key={cat} />
      ))}
    </Ul>
  );
}

const MainCard = ({ img, onHeartClick, alreadyFavorite }) => {
  const heartIcon = alreadyFavorite ? "💖" : "🤍";

  return (
    <Main className="main-card">
      <img src={img} alt="고양이" width="400" />
      <Likebutton onClick={onHeartClick}>{heartIcon}</Likebutton>
    </Main>
  );
};

const App = () => {
  const CAT1 = "https://cataas.com/cat/60b73094e04e18001194a309/says/react";
  const CAT2 = "https://cataas.com//cat/5e9970351b7a400011744233/says/inflearn";
  const CAT3 =
    "https://cataas.com/cat/595f280b557291a9750ebf65/says/JavaScript";

  const [counter, setCounter] = React.useState(() => {
    return jsonLocalStorage.getItem("counter");
  });

  const [favorites, setFavorites] = React.useState(() => {
    return jsonLocalStorage.getItem("favorites") || [];
  });

  const [mainCat, setMainCat] = React.useState(CAT1);

  const alreadyFavorite = favorites.includes(mainCat);

  async function setInitialCat() {
    const newCat = await fetchCat("First cat");
    setMainCat(newCat);
  }

  React.useEffect(() => {
    setInitialCat();
  }, []);

  async function updateMainCat(value) {
    const newCat = await fetchCat(value);

    setMainCat(newCat);

    setCounter((prev) => {
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem("counter", nextCounter);
      return nextCounter;
    });
  }

  function handleHeartClick() {
    const nextFavorites = [...favorites, mainCat];
    setFavorites(nextFavorites);
    jsonLocalStorage.setItem("favorites", nextFavorites);
  }

  const counterTitle = counter === null ? "" : counter + "번째";

  return (
    <Wrapper>
      <Title>{counterTitle} 수냥이 랜덤짤</Title>
      <Form updateMainCat={updateMainCat} />
      <MainCard
        img={mainCat}
        onHeartClick={handleHeartClick}
        alreadyFavorite={alreadyFavorite}
      />
      <Favorites favorites={favorites} />
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  background-color: black;
  padding: 20px;
`;

const FormBox = styled.form`
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const Input = styled.input`
  width: 320px;
  height: 25px;
  &::placeholder {
    font-family: "BMJUA";
    text-align: center;
  }
`;

const MakeBtn = styled.button`
  font-family: "BMJUA";
  width: 50px;
  height: 30px;
  border: none;
  background-color: yellow;
  border-radius: 8px;
  margin-left: 5px;
  transition: all 0.5s;
  &:hover {
    background-color: orange;
    transition: all 0.2s;
  }
`;

const Alert = styled.p`
  color: yellowgreen;
`;

const FavoritesList = styled.div`
  font-family: "BMJUA";
  padding: 20px;
  color: white;
`;

const Ul = styled.ul`
  display: flex;
  list-style: none;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
`;

const List = styled.li``;

const Likebutton = styled.button`
  position: relative;
  left: -45px;
  bottom: 15px;
`;

const Main = styled.div``;
