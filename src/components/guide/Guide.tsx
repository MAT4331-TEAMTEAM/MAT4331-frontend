import * as styles from "./Guide.styles";

interface GuideProps {
  text: string;
}

const Menu = ({ text }: GuideProps) => {
  return <styles.GuideContainer>{text}</styles.GuideContainer>;
};

export default Menu;
