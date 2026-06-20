import {
  ClipboardList,
  Database,
  Grid3x3,
  LifeBuoy,
  MessageSquareText,
  Server,
  Shield,
  ShieldCheck,
  Terminal,
  Bug,
} from "lucide-react";

const ICONS = {
  resumen: ClipboardList,
  activos: Server,
  controles: ShieldCheck,
  inyeccionsql: Database,
  xss: Bug,
  comandos: Terminal,
  matriz: Grid3x3,
  recuperacion: LifeBuoy,
  prompts: MessageSquareText,
};

export default function PageIcon({ pageId, className = "h-6 w-6" }) {
  const Icon = ICONS[pageId] ?? Shield;
  return <Icon className={className} aria-hidden="true" />;
}
