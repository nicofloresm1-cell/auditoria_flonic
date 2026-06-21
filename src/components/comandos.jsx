import MarkdownLanding from "./shared/MarkdownLanding";
import { PAGE_META } from "../config/pages";
import content from "../../docs_auditoria_flonic/comandos_flonic.md?raw";
import comandoImg from "../../docs_auditoria_flonic/img_flonic/comandos_flonic.png";

const renderedContent = content.replace(
  "img_flonic/comandos_flonic.png",
  comandoImg
);

export default function Comandos() {
  return <MarkdownLanding pageId="comandos" {...PAGE_META.comandos} content={renderedContent} />;
}