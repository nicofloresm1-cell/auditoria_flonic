import MarkdownLanding from "./shared/MarkdownLanding";
import { PAGE_META } from "../config/pages";
import content from "../../docs_auditoria_flonic/resumen_flonic.md?raw";

export default function Resumen() {
  return <MarkdownLanding pageId="resumen" {...PAGE_META.resumen} content={content} />;
}
