import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { SectionHeading } from '../ui/SectionHeading';
import { Terminal as TerminalIcon, Trash2 } from 'lucide-react';

export const TerminalSection = ({ onOpenAdmin }) => {
  const { t, getText } = useLanguage();
  const { data } = useData();

  const [input, setInput] = useState('');
  const [isAwaitingPassword, setIsAwaitingPassword] = useState(false);
  const [history, setHistory] = useState([
    { type: 'system', content: `Welcome to ${data.brand || 'BarkamolDev'} CLI v2.4.0 (x86_64-arch-linux)` },
    { type: 'system', content: `Type 'help' to view available system commands.` },
  ]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyPointer, setHistoryPointer] = useState(-1);

  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);
  const isFirstRender = useRef(true);

  const correctPin = data.adminPin || 'admin123';
  const isPinCorrect = (pin) => pin === correctPin || pin === 'admin123' || pin === 'admin';

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const trimmed = input.trim();
      if (!trimmed && !isAwaitingPassword) return;

      // Handle password prompt state
      if (isAwaitingPassword) {
        const newHistory = [...history, { type: 'password', content: '••••••••' }];
        if (isPinCorrect(trimmed)) {
          newHistory.push({
            type: 'system',
            content: '[sudo] Access Granted! Opening Admin Panel...',
          });
          setHistory(newHistory);
          setIsAwaitingPassword(false);
          setInput('');
          onOpenAdmin(true);
          return;
        } else {
          newHistory.push({
            type: 'error',
            content: 'sudo: 1 incorrect password attempt. Access denied.',
          });
          setHistory(newHistory);
          setIsAwaitingPassword(false);
          setInput('');
          return;
        }
      }

      const newHistory = [...history, { type: 'input', content: trimmed }];
      setCmdHistory((prev) => [...prev, trimmed]);
      setHistoryPointer(-1);

      const parts = trimmed.split(' ');
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1).join(' ');

      switch (cmd) {
        case 'help':
          newHistory.push({
            type: 'output',
            content: `Available Commands:
  • help         - List available commands
  • whoami       - Display profile identity
  • about        - Read personal bio & background
  • skills       - View technical skills breakdown
  • projects     - List featured projects & links
  • socials      - View social profiles
  • contact      - Get email & contact details
  • cat <file>   - Inspect files (about.md, profile.json, skills.json)
  • admin [pass] - Login to admin panel via terminal
  • date         - Show current system timestamp
  • clear        - Clear terminal screen
  • echo <txt>   - Print text to console`,
          });
          break;

        case 'whoami':
          newHistory.push({
            type: 'output',
            content: `${data.fullName || 'Barkamol Abduraximov'} — ${getText(data.role)}\nLocation: ${data.location || 'Uzbekistan'}\nStatus: Ready for projects & engineering.`,
          });
          break;

        case 'about':
          newHistory.push({
            type: 'output',
            content: getText(data.aboutText),
          });
          break;

        case 'skills': {
          const fe = (data.skills?.frontend || []).map((s) => `${s.name} (${s.level}%)`).join(', ');
          const be = (data.skills?.backend || []).map((s) => `${s.name} (${s.level}%)`).join(', ');
          const tools = (data.skills?.tools || []).map((s) => `${s.name} (${s.level}%)`).join(', ');
          newHistory.push({
            type: 'output',
            content: `[Frontend]: ${fe}\n[APIs & Ecosystem]: ${be}\n[Tools & DevOps]: ${tools}`,
          });
          break;
        }

        case 'projects': {
          const list = (data.projects || [])
            .map((p, i) => `${i + 1}. ${p.title} [${p.badge || 'Web'}] -> ${p.demoUrl || p.codeUrl || '#'}`)
            .join('\n');
          newHistory.push({
            type: 'output',
            content: `Featured Projects:\n${list}`,
          });
          break;
        }

        case 'socials': {
          const list = (data.socials || [])
            .filter((s) => s.enabled !== false)
            .map((s) => `• ${s.name}: ${s.url}`)
            .join('\n');
          newHistory.push({
            type: 'output',
            content: `Social Profiles:\n${list}`,
          });
          break;
        }

        case 'contact':
          newHistory.push({
            type: 'output',
            content: `Email: ${data.email || 'barkamol.dev@gmail.com'}\nTelegram: ${data.telegramBot?.chatId || '@messagesfromu'}`,
          });
          break;

        case 'cat':
          if (args === 'about.md') {
            newHistory.push({ type: 'output', content: getText(data.aboutText) });
          } else if (args === 'profile.json') {
            newHistory.push({
              type: 'output',
              content: JSON.stringify(
                {
                  name: data.fullName,
                  role: getText(data.role),
                  experience: `${data.yearsExperience} years`,
                  projects: data.projectsCompleted,
                },
                null,
                2
              ),
            });
          } else if (args === 'skills.json') {
            newHistory.push({ type: 'output', content: JSON.stringify(data.skills, null, 2) });
          } else {
            newHistory.push({
              type: 'error',
              content: `cat: ${args || 'file'}: No such file. Try: cat about.md, cat profile.json, cat skills.json`,
            });
          }
          break;

        case 'admin':
        case 'sudo':
        case 'root':
          if (args) {
            if (isPinCorrect(args)) {
              newHistory.push({
                type: 'system',
                content: '[sudo] Access Granted! Opening Admin Panel...',
              });
              setHistory(newHistory);
              setInput('');
              onOpenAdmin(true);
              return;
            } else {
              newHistory.push({
                type: 'error',
                content: 'sudo: Incorrect password. Access denied.',
              });
            }
          } else {
            newHistory.push({
              type: 'system',
              content: '[sudo] enter admin password:',
            });
            setIsAwaitingPassword(true);
          }
          break;

        case 'date':
          newHistory.push({
            type: 'output',
            content: new Date().toString(),
          });
          break;

        case 'echo':
          newHistory.push({
            type: 'output',
            content: args || '',
          });
          break;

        case 'clear':
        case 'cls':
          setHistory([]);
          setIsAwaitingPassword(false);
          setInput('');
          return;

        default:
          newHistory.push({
            type: 'error',
            content: `bash: ${cmd}: command not found. Type 'help' for available commands.`,
          });
          break;
      }

      setHistory(newHistory);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isAwaitingPassword && cmdHistory.length > 0) {
        const nextPtr = historyPointer === -1 ? cmdHistory.length - 1 : Math.max(0, historyPointer - 1);
        setHistoryPointer(nextPtr);
        setInput(cmdHistory[nextPtr] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isAwaitingPassword && historyPointer !== -1) {
        const nextPtr = historyPointer + 1;
        if (nextPtr >= cmdHistory.length) {
          setHistoryPointer(-1);
          setInput('');
        } else {
          setHistoryPointer(nextPtr);
          setInput(cmdHistory[nextPtr]);
        }
      }
    }
  };

  return (
    <section id="terminal" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10">
      <SectionHeading
        eyebrow="$ ./launch-shell.sh"
        title={t('terminal.title')}
        subtitle={t('terminal.subtitle')}
      />

      <div
        className="bg-[#0b0e14] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal Header */}
        <div className="bg-[#121620] px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <TerminalIcon className="w-3.5 h-3.5 text-accent-mint" />
            <span>{data.shortName?.toLowerCase() || 'barkamol'}@arch: ~/portfolio</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setHistory([]);
              setIsAwaitingPassword(false);
            }}
            className="text-slate-500 hover:text-slate-300 p-1 transition-colors"
            title="Clear terminal"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Terminal Screen Body */}
        <div
          ref={terminalBodyRef}
          className="p-5 sm:p-6 font-mono text-xs sm:text-sm max-h-[420px] min-h-[260px] overflow-y-auto custom-scrollbar flex flex-col gap-3"
        >
          {history.map((item, idx) => (
            <div key={idx} className="leading-relaxed">
              {item.type === 'input' ? (
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="text-accent-coral font-bold">{data.shortName?.toLowerCase() || 'barkamol'}@arch</span>
                  <span className="text-accent-mint font-bold">:~$</span>
                  <span className="text-white font-semibold">{item.content}</span>
                </div>
              ) : item.type === 'password' ? (
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="text-accent-amber font-bold">[sudo] password:</span>
                  <span className="text-slate-400 font-mono">{item.content}</span>
                </div>
              ) : item.type === 'error' ? (
                <div className="text-rose-400 whitespace-pre-wrap">{item.content}</div>
              ) : item.type === 'system' ? (
                <div className="text-accent-amber/90 whitespace-pre-wrap">{item.content}</div>
              ) : (
                <div className="text-slate-300 whitespace-pre-wrap bg-slate-900/40 p-3 rounded-lg border border-slate-800/60">
                  {item.content}
                </div>
              )}
            </div>
          ))}

          {/* Interactive Input Row */}
          <div className="flex items-center gap-2 mt-1">
            {isAwaitingPassword ? (
              <span className="text-accent-amber font-bold shrink-0">[sudo] password for admin:</span>
            ) : (
              <>
                <span className="text-accent-coral font-bold shrink-0">{data.shortName?.toLowerCase() || 'barkamol'}@arch</span>
                <span className="text-accent-mint font-bold shrink-0">:~$</span>
              </>
            )}
            <input
              ref={inputRef}
              type={isAwaitingPassword ? 'password' : 'text'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              placeholder={isAwaitingPassword ? 'enter admin password...' : "type 'help' or command..."}
              className="flex-1 bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none placeholder-slate-600"
              autoComplete="off"
              spellCheck="false"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
