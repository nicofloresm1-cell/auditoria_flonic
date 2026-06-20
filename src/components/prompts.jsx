import MarkdownLanding from "./shared/MarkdownLanding";
import { PAGE_META } from "../config/pages";
import content from "../../docs_auditoria_flonic/prompts_flonic.md?raw";

export default function Prompts() {
  return <MarkdownLanding pageId="prompts" {...PAGE_META.prompts} content={content} />;
}
