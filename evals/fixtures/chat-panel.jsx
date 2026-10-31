import { useEffect, useRef, useState } from 'react';

// Product: Enter sends, Shift+Enter inserts a newline. sendMessage is asynchronous.
export function ChatPanel({ messages, sendMessage }) {
  const [draft, setDraft] = useState('');
  const end = useRef(null);

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    sendMessage(draft);
    setDraft('');
  };

  return (
    <section className="chat">
      <style>{`
        .chat :focus { outline: none; }
        .chat-log { height: 400px; overflow: auto; }
        .chat .token { display: inline-block; animation: appear 120ms ease; }
        @keyframes appear { from { opacity: 0; filter: blur(6px); } }
      `}</style>
      <div className="chat-log" aria-live="assertive">
        {messages.map(message => (
          <p key={message.id}>
            {message.text.split('').map((character, i) => (
              <span className="token" key={i}>{character}</span>
            ))}
          </p>
        ))}
        <div ref={end} />
      </div>
      <textarea
        value={draft}
        onChange={event => setDraft(event.target.value)}
        onKeyDown={event => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            send();
          }
        }}
      />
      <button onClick={send}>Send</button>
    </section>
  );
}
