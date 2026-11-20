import { usePrefs } from '../i18n.jsx';
import { cv, profile, projects, stack } from '../content.js';
import Cover from '../components/Cover.jsx';
import { Mail } from '../components/Icons.jsx';
import '../deck.css';

function Slide({ children, className = '' }) {
  return <section className={`deck-slide ${className}`}>{children}</section>;
}

export default function DeckExport() {
  const { t, s } = usePrefs();
  return (
    <div className="deck">
      <Slide className="deck-cover">
        <div className="deck-cover-text">
          <p className="deck-tag">{t(profile.role)}</p>
          <h1>{t(profile.name)}</h1>
          <p className="deck-lead">{t(profile.headline)}</p>
          <p className="deck-meta">
            {t(profile.location)} · <bdi dir="ltr">{profile.email}</bdi> · GitHub @molhamaboud0-prog
          </p>
        </div>
        <div className="deck-cover-projects">
          {projects.map((p) => (
            <article key={p.slug} style={{ '--accent': p.accent }}>
              <h2>{t(p.title)}</h2>
              <p>{t(p.summary)}</p>
            </article>
          ))}
        </div>
      </Slide>

      {projects.map((p) => (
        <Slide key={p.slug} className="deck-case" style={{ '--accent': p.accent }}>
          <header className="deck-case-head">
            <div>
              <p className="deck-tag">{t(p.kind)}</p>
              <h2>{t(p.title)}</h2>
              <p className="deck-lead">{t(p.summary)}</p>
            </div>
            <dl className="deck-meta-row">
              {p.meta.map((m) => (
                <div key={t(m.label)}>
                  <dt>{t(m.label)}</dt>
                  <dd>{t(m.value)}</dd>
                </div>
              ))}
            </dl>
          </header>
          <div className="deck-shots">
            <Cover project={p} compact />
          </div>
          {p.metrics?.length > 0 && (
            <div className="deck-metrics">
              {p.metrics.slice(0, 4).map((m) => (
                <div key={t(m.label)}>
                  <strong>{m.value}</strong>
                  <span>{t(m.label)}</span>
                </div>
              ))}
            </div>
          )}
        </Slide>
      ))}

      <Slide className="deck-about">
        <div className="deck-about-grid">
          <div>
            <h2>{s.about}</h2>
            <p>{t(cv.about)}</p>
            <a className="deck-email" href={`mailto:${profile.email}`}>
              <Mail /> <bdi dir="ltr">{profile.email}</bdi>
            </a>
          </div>
          <div>
            <h3>{s.skills}</h3>
            <ul className="deck-tags">
              {stack.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <h3>{s.experience}</h3>
            <ul className="deck-list">
              {cv.experience.slice(0, 3).map((e, i) => (
                <li key={i}>
                  <b>{t(e.title)}</b> — {t(e.org)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Slide>
    </div>
  );
}

function motion({ className, children }) {
  return <div className={className}>{children}</div>;
}