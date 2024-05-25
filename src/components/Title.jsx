import { Helmet } from "react-helmet-async";

const Title = ({ children }) => {
  return (
    <Helmet>
      <title>{children} | Recipe Vault</title>
    </Helmet>
  );
};

export default Title;
