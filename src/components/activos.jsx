import React from "react";
import ReactMarkdown from "react-markdown";
import content from "../../docs_auditoria_flonic/activos.md?raw";

export default function Activos() {
	return (
		<section className="p-6 bg-white rounded-lg shadow-sm dark:bg-slate-800 text-left">
			<h2 className="text-xl font-semibold mb-2">Activos</h2>
			<div className="prose dark:prose-invert max-w-none">
				<ReactMarkdown>{content}</ReactMarkdown>
			</div>
		</section>
	);
}
