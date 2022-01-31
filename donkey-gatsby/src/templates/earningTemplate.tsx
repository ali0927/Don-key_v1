import { Earning } from "components/Earning/Earning";
import { PageProps } from "gatsby";

export default function _Earning(props: PageProps<any, { id: string }>) {
  return <Earning id={props.pageContext.id} />;
}
