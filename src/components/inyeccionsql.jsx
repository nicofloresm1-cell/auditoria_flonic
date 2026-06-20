import MarkdownLanding from "./shared/MarkdownLanding";
import { PAGE_META } from "../config/pages";
import content from "../../docs_auditoria_flonic/inyeccionsql_flonic.md?raw";

export default function InyeccionSQL() {
  return <MarkdownLanding pageId="inyeccionsql" {...PAGE_META.inyeccionsql} content={content} />;
}
