import MarkdownLanding from "./shared/MarkdownLanding";
import { PAGE_META } from "../config/pages";
import content from "../../docs_auditoria_flonic/xss_flonic.md?raw";
import xssImg from "../../docs_auditoria_flonic/img_flonic/xss_flonic.png";

const renderedContent = content.replace(
  "img_flonic/xss_flonic.png",
  xssImg
);

export default function XSS() {
  return <MarkdownLanding pageId="xss" {...PAGE_META.xss} content={renderedContent} />;
}