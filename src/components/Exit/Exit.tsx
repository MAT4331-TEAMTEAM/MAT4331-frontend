import * as styles from "./Exit.styles";

interface ExitProps {
  exitChatting: () => void;
}

const Exit = ({ exitChatting }: ExitProps) => {
  return <styles.ExitButton src="/images/exit.png" onClick={exitChatting} />;
};

export default Exit;
