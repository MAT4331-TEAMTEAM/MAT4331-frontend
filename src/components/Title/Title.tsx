import * as styles from "./Title.styles";

interface TitleProps {
  title: string;
}

const Title = ({ title }: TitleProps) => {
  return <styles.TitleContainer>{title}</styles.TitleContainer>;
};

export default Title;
