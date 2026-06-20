import MarkdownLanding from "./shared/MarkdownLanding";
import { PAGE_META } from "../config/pages";
import content from "../../docs_auditoria_flonic/activos_flonic.md?raw";

export default function Activos() {
  return <MarkdownLanding pageId="activos" {...PAGE_META.activos} content={content} />;
}
