import { useEffect, useRef } from 'react';

let timeId = null;

export function Typing({ text, delay = 50 }: { text: string; delay?: number }) {
  const textRef = useRef(null);
  useEffect(() => {
    timeId && clearTimeout(timeId);
    let i = 0; // The index of the current letter being typed
    const typingElement = textRef.current;
    typingElement.textContent = '';

    function typeLetter() {
      const letter = text.charAt(i);
      typingElement.textContent += letter;
      i++;

      if (i > text.length) {
        i = 0;
        typingElement.textContent = '';
      }

      timeId = setTimeout(typeLetter, delay);
    }

    typeLetter();
  }, [delay, text]);

  return (
    <div
      className={`prose bg-neutral_smoke relative my-1 min-h-[44px] max-w-xl rounded px-4 py-2 text-gray-700 shadow`}
    >
      <div className="flex h-full w-full items-center">
        <div ref={textRef} className="whitespace-nowrap" />
      </div>
    </div>
  );
}
