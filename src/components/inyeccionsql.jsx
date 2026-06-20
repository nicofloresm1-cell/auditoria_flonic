import MarkdownLanding from "./shared/MarkdownLanding";
import { PAGE_META } from "../config/pages";
import content from "../../docs_auditoria_flonic/inyeccionsql_flonic.md?raw";
import sqliImg from "../../docs_auditoria_flonic/img_flonic/sqli_flonic.png";


const renderedContent = content.replace(
  "img_flonic/sqli_flonic.png",
  sqliImg
);

export default function InyeccionSQL() {
  return <MarkdownLanding pageId="inyeccionsql" {...PAGE_META.inyeccionsql} content={renderedContent} />;
}
