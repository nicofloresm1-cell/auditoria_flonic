import MarkdownLanding from "./shared/MarkdownLanding";
import { PAGE_META } from "../config/pages";
import content from "../../docs_auditoria_flonic/controles_flonic.md?raw";

export default function Controles() {
  return <MarkdownLanding pageId="controles" {...PAGE_META.controles} content={content} />;
}
