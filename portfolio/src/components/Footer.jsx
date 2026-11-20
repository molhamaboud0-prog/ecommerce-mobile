import { useState } from 'react';
import { usePrefs } from '../i18n.jsx';
import { profile } from '../content.js';
import { ArrowUpRight, Copy, Mail } from './Icons.jsx';

export default function Footer() {
  const { t, s } = usePrefs();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <footer id="contact" className="site-footer">
      <div className="container">
        <p className="eyebrow">{s.nav.contact}</p>
        <h2 className="cta-title">{s.contactTitle}</h2>
        <div className="cta-actions">
          <a className="btn btn-primary btn-lg" href={`mailto:${profile.email}`}>
            <Mail /> <bdi dir="ltr">{profile.email}</bdi>
          </a>
          <button className="btn btn-ghost btn-lg" onClick={copy}>
            <Copy /> {copied ? s.copied : s.copyEmail}
          </button>
        </div>
        <div className="footer-bottom">
          <ul className="social">
            {profile.links.filter((l) => !l.placeholder).map((l) => (
              <li key={l.label}>
                <a href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className={l.placeholder ? 'is-placeholder' : ''}>
                  {l.label} <ArrowUpRight />
                </a>
              </li>
            ))}
          </ul>
          <p className="muted small">
            © {new Date().getFullYear()} · {s.rights} {t(profile.name)}
          </p>
        </div>
      </div>
    </footer>
  );
}
