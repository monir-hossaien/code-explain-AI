
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const Explanation = ({ formState }) => {
    const [copied, setCopied] = useState(false);
    const { language, data } = formState || {};

    const handleCopy = async () => {
        if (!data) return;
        try {
            await navigator.clipboard.writeText(data);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <div className="w-full px-4 md:px-5 py-3 rounded-md border border-gray-200 mt-6 bg-gray-50 overflow-x-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 text-xs text-gray-700 gap-2 sm:gap-0">
                <div className="font-medium capitalize">{language}</div>
                <button
                    onClick={handleCopy}
                    type="button"
                    className="flex gap-2 items-center px-3 py-1 text-xs font-medium rounded-md bg-gray-200 hover:bg-gray-300 active:scale-[.98] transition self-start sm:self-auto"
                >
                    {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                    {copied ? "Copied" : "Copy"}
                </button>
            </div>

            {/* Markdown with syntax highlighting */}
            <div className="prose prose-sm max-w-full overflow-x-auto">
                <Markdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        code({ inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || "");
                            if (!inline && match) {
                                return (
                                    <SyntaxHighlighter
                                        style={oneDark}
                                        language={match[1]}
                                        PreTag="div"
                                        className="rounded-md text-sm sm:text-base overflow-x-auto"
                                        {...props}
                                    >
                                        {String(children).replace(/\n$/, "")}
                                    </SyntaxHighlighter>
                                );
                            }
                            return (
                                <code className="px-1 py-0.5 bg-gray-200 text-red-600 rounded text-xs sm:text-sm" {...props}>
                                    {children}
                                </code>
                            );
                        },
                    }}
                >
                    {data || ""}
                </Markdown>
            </div>
        </div>
    );
};

export default Explanation;
