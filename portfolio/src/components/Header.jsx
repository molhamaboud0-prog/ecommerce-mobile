import { usePrefs } from '../i18n.jsx';
import { profile } from '../content.js';
import { Globe, Moon, Sun } from './Icons.jsx';

export default function Header() {
  const { t, s, theme, toggleTheme, toggleLang } = usePrefs();
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#/" className="brand" aria-label={t(profile.name)}>
          <span className="brand-mark">{profile.initials}</span>
          <span className="brand-name">{t(profile.name)}</span>
        </a>
        <nav className="nav" aria-label="Primary">
          <a href="#/work">{s.nav.work}</a>
          <a href="#/about">{s.nav.about}</a>
          <a href="#/contact">{s.nav.contact}</a>
        </nav>
        <div className="header-actions">
          <button className="icon-btn lang-btn" onClick={toggleLang} aria-label="Switch language">
            <Globe />
            <span>{s.toggleLang}</span>
          </button>
          <button className="icon-btn" onClick={toggleTheme} aria-label={s.toggleTheme} title={s.toggleTheme}>
            {theme === 'dark' ? <Sun /> : <Moon />}
          </button>
        </div>
      </div>
    </header>
  );
}
