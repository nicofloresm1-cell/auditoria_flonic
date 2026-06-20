import MarkdownLanding from "./shared/MarkdownLanding";
import { PAGE_META } from "../config/pages";
import content from "../../docs_auditoria_flonic/xss_flonic.md?raw";

export default function XSS() {
  return <MarkdownLanding pageId="xss" {...PAGE_META.xss} content={content} />;
}
