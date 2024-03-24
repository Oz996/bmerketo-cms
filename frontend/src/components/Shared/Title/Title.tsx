import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";

interface props {
  children: string | ReactNode;
}
const Title = ({ children }: props) => {
  return (
    <Helmet>
      <title>{children}</title>
    </Helmet>
  );
};
export default Title;
