import { PropsWithChildren } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import CodeSnippet from './code-snippet';
import dayjs from 'dayjs';
import { ChatMessageEntity } from '../rxdb/chat-message.schema';

type ChatMessageProps = ChatMessageEntity & {
  avatar?: string;
} & PropsWithChildren;

export function ChatMessage({
  message,
  role,
  name,
  avatar,
  time,
}: ChatMessageProps) {
  const textAlign = role === 'user' ? 'text-right' : 'text-left';
  const boxAlign = role === 'user' ? 'justify-end' : 'justify-start';
  const itemAlign = role === 'user' ? 'self-end' : 'self-start';
  const color = role === 'user' ? 'bg-primary' : 'bg-neutral_smoke';

  return (
    <div className={`flex ${boxAlign}`}>
      <div className="flex max-w-[85%] flex-col break-words">
        <small className={`${itemAlign} flex items-center gap-2`}>
          <strong>{name}</strong>{' '}
          {role === 'user' && avatar && (
            <img
              alt="avatar"
              src={avatar}
              className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
            />
          )}
        </small>

        <div
          className={`prose relative my-1 max-w-full rounded px-4 py-2 text-gray-700 shadow ${itemAlign} ${color}`}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            linkTarget={'_blank'}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                const code = String(children).replace(/\n$/, '');
                return (
                  <CodeSnippet
                    inline={inline}
                    className={className}
                    language={match && match[1]}
                    code={code}
                  >
                    {children}
                  </CodeSnippet>
                );
              },
            }}
          >
            {message}
          </ReactMarkdown>
        </div>
        <small className={`${textAlign}`}>
          <em>{dayjs(time).format('DD/MM/YYYY h:mm A')}</em>
        </small>
      </div>
    </div>
  );
}
