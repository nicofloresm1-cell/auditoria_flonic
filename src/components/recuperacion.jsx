import MarkdownLanding from "./shared/MarkdownLanding";
import { PAGE_META } from "../config/pages";
import content from "../../docs_auditoria_flonic/recuperacion_flonic.md?raw";

export default function Recuperacion() {
  return <MarkdownLanding pageId="recuperacion" {...PAGE_META.recuperacion} content={content} />;
}
