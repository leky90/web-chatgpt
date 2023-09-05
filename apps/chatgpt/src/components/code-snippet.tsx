import { ReactNode, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

type CodeSnippetProps = {
  language: string;
  code: string;
  children: ReactNode;
  className: string;
  inline: boolean;
};

const CodeSnippet = ({
  language,
  code,
  className,
  inline,
  children,
}: CodeSnippetProps) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(code);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  };

  return (
    <>
      {!inline && (
        <div className="flex justify-between">
          <strong className="text-yellow-400">{language}</strong>
          <button onClick={handleCopyClick}>
            {copySuccess ? 'Copied!' : 'Copy to clipboard'}
          </button>
        </div>
      )}
      {language && !inline ? (
        <SyntaxHighlighter language={language} showLineNumbers>
          {code}
        </SyntaxHighlighter>
      ) : (
        <code className={className}>{children}</code>
      )}
    </>
  );
};

export default CodeSnippet;
