import MarkdownLanding from "./shared/MarkdownLanding";
import { PAGE_META } from "../config/pages";
import content from "../../docs_auditoria_flonic/matriz_flonic.md?raw";

export default function Matriz() {
  return <MarkdownLanding pageId="matriz" {...PAGE_META.matriz} content={content} />;
}
