import { useEffect, useState } from 'react';
import { usePrefs } from '../i18n.jsx';
import { projects } from '../content.js';
import Reveal from '../components/Reveal.jsx';
import Cover, { MockScreen, Phone } from '../components/Cover.jsx';
import PlaceholderBadge from '../components/Placeholder.jsx';
import { Arrow, ArrowUpRight } from '../components/Icons.jsx';

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-30% 0px -60% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids.join()]);
  return active;
}

function Section({ sec, project }) {
  const { t, s } = usePrefs();
  return (
    <Reveal as="section" id={sec.id} className="cs-section">
      <h2 className="h3">{t(sec.title)}</h2>
      {sec.body && <p className="prose">{t(sec.body)}</p>}
      {sec.steps && (
        <ol className="steps">
          {sec.steps.map((st, i) => (
            <li key={i}>
              <span className="step-n">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <p className="strong">{t(st.title)}</p>
                <p className="muted">{t(st.body)}</p>
              </div>
            </li>
          ))}
        </ol>
      )}
      {sec.list && (
        <ul className="checklist">
          {sec.list.map((x, i) => (
            <li key={i}>{t(x)}</li>
          ))}
        </ul>
      )}
      {sec.gallery && (
        <div className="gallery">
          {sec.gallery.map((g) => (
            <figure key={g.src}>
              <Phone src={g.src} alt={t(g.caption)} framed={sec.framed} />
              <figcaption>{t(g.caption)}</figcaption>
            </figure>
          ))}
        </div>
      )}
      {sec.wide && (
        <figure className="wide-shot">
          <img src={sec.wide.src} alt={t(sec.wide.caption)} loading="lazy" />
          <figcaption>{t(sec.wide.caption)}</figcaption>
        </figure>
      )}
      {sec.mock && (
        <div className="gallery">
          {[0, 1, 2].map((i) => (
            <figure key={i}>
              <Phone>
                <MockScreen variant={sec.mock} screen={i} />
              </Phone>
              <figcaption>{project.placeholder ? s.placeholder : ''}</figcaption>
            </figure>
          ))}
        </div>
      )}
    </Reveal>
  );
}

export default function CaseStudy({ project }) {
  const { t, s } = usePrefs();
  const sections = project.sections.filter((x) => x.body || x.steps || x.list?.length || x.gallery?.length || x.wide || x.mock);
  const active = useActiveSection(sections.map((x) => x.id));
  const idx = projects.indexOf(project);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="case" style={{ '--accent': project.accent }}>
      <header className="container cs-hero">
        <Reveal className="cs-hero-text">
          <a href="#/work" className="back-link">
            <Arrow className="flip" /> {s.backHome}
          </a>
          <p className="eyebrow">{t(project.kind)}</p>
          <h1 className="display">{t(project.title)}</h1>
          <p className="lead">{t(project.summary)}</p>
          {project.placeholder && <PlaceholderBadge />}
          {project.links?.length > 0 && (
            <div className="row gap">
              {project.links.map((l) => (
                <a key={l.href} className="btn btn-ghost" href={l.href} target="_blank" rel="noreferrer">
                  {l.label} <ArrowUpRight />
                </a>
              ))}
            </div>
          )}
        </Reveal>
        <Reveal className="cs-hero-media" delay={120}>
          <Cover project={project} />
        </Reveal>
      </header>

      <div className="container">
        <Reveal as="dl" className="meta-row">
          {project.meta.map((m) => (
            <div key={t(m.label)}>
              <dt>{t(m.label)}</dt>
              <dd>{t(m.value)}</dd>
            </div>
          ))}
        </Reveal>

        {project.metrics?.length > 0 && (
          <Reveal className="metrics">
            {project.metrics.map((m) => (
              <div key={t(m.label)}>
                <p className="stat">{m.value}</p>
                <p className="muted small">{t(m.label)}</p>
              </div>
            ))}
          </Reveal>
        )}

        <div className="cs-layout">
          <nav className="toc" aria-label={s.onThisPage}>
            <p className="eyebrow">{s.onThisPage}</p>
            <ul>
              {sections.map((x) => (
                <li key={x.id}>
                  <button className={active === x.id ? 'on' : ''} onClick={() => document.getElementById(x.id)?.scrollIntoView({ behavior: 'smooth' })}>
                    {t(x.title)}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="cs-content">
            {sections.map((sec) => (
              <Section key={sec.id} sec={sec} project={project} />
            ))}
          </div>
        </div>

        <a href={`#/work/${next.slug}`} className="next-project" style={{ '--accent': next.accent }}>
          <span className="eyebrow">{s.nextProject}</span>
          <span className="h2">{t(next.title)}</span>
          <Arrow />
        </a>
      </div>
    </article>
  );
}
