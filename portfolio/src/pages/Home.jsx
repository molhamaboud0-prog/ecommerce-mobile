import { usePrefs } from '../i18n.jsx';
import { cv, profile, projects, stack } from '../content.js';
import Reveal from '../components/Reveal.jsx';
import Cover from '../components/Cover.jsx';
import PlaceholderBadge from '../components/Placeholder.jsx';
import { Arrow, ArrowUpRight, Mail, Pin } from '../components/Icons.jsx';

function Bento() {
  const { t, s } = usePrefs();
  const featured = projects[0];
  return (
    <section className="container bento" aria-label="Intro">
      <Reveal className="tile tile-intro">
        {profile.available && (
          <span className="status">
            <span className="pulse" /> {t(profile.availability)}
          </span>
        )}
        <h1 className="display">{t(profile.headline)}</h1>
        <p className="lead">{t(profile.intro)}</p>
        <div className="row gap">
          <a href="#/work" className="btn btn-primary">
            {s.selectedWork} <Arrow />
          </a>
          <a href={`mailto:${profile.email}`} className="btn btn-ghost">
            <Mail /> {s.nav.contact}
          </a>
        </div>
      </Reveal>

      <Reveal className="tile tile-profile" delay={80}>
        <div className="avatar" aria-hidden>
          {profile.initials}
        </div>
        <div>
          <p className="strong">{t(profile.name)}</p>
          <p className="muted small">{t(profile.role)}</p>
          <p className="muted small row-inline">
            <Pin /> {t(profile.location)}
          </p>
        </div>
      </Reveal>

      <Reveal as="a" href={`#/work/${featured.slug}`} className="tile tile-featured" delay={140} style={{ '--accent': featured.accent }}>
        <div className="tile-featured-text">
          <span className="chip">{s.featured}</span>
          <p className="strong">{t(featured.title)}</p>
          <span className="link-arrow">
            {s.viewCase} <Arrow />
          </span>
        </div>
        <Cover project={featured} compact />
      </Reveal>

      <Reveal className="tile tile-stack" delay={200}>
        <p className="eyebrow">{s.stackTitle}</p>
        <ul className="tags">
          {stack.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="tile tile-stat" delay={260}>
        <p className="stat">{projects.length}</p>
        <p className="muted small">{s.projects}</p>
      </Reveal>

      <Reveal as="a" href={profile.links[0].href} target="_blank" rel="noreferrer" className="tile tile-gh" delay={320}>
        <span className="strong">GitHub</span>
        <bdi className="muted small" dir="ltr">@molhamaboud0-prog</bdi>
        <ArrowUpRight />
      </Reveal>
    </section>
  );
}

function Work() {
  const { t, s } = usePrefs();
  return (
    <section id="work" className="container section">
      <Reveal className="section-head">
        <p className="eyebrow">{s.nav.work}</p>
        <h2 className="h2">{s.selectedWork}</h2>
        <p className="muted">{s.selectedWorkSub}</p>
      </Reveal>
      <div className="work-list">
        {projects.map((p, i) => (
          <Reveal as="a" key={p.slug} href={`#/work/${p.slug}`} className={`work-card ${p.placeholder ? 'is-placeholder' : ''}`} style={{ '--accent': p.accent }} delay={i * 60}>
            <div className="work-media">
              <Cover project={p} />
            </div>
            <div className="work-body">
              <p className="eyebrow">
                {String(i + 1).padStart(2, '0')} · {t(p.kind)}
              </p>
              <h3 className="h3">{t(p.title)}</h3>
              <p className="muted">{t(p.summary)}</p>
              {p.placeholder && <PlaceholderBadge />}
              <ul className="meta-mini">
                {p.meta.slice(0, 3).map((m) => (
                  <li key={t(m.label)}>
                    <span>{t(m.label)}</span>
                    {t(m.value)}
                  </li>
                ))}
              </ul>
              <span className="link-arrow">
                {s.viewCase} <Arrow />
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function About() {
  const { t, s } = usePrefs();
  return (
    <section id="about" className="container section">
      <Reveal className="section-head">
        <p className="eyebrow">CV</p>
        <h2 className="h2">{s.about}</h2>
        {cv.placeholder && <PlaceholderBadge />}
      </Reveal>
      <div className="cv-grid">
        <Reveal className="cv-about">
          <p className="lead">{t(cv.about)}</p>
          {profile.cvFile && (
            <a className="btn btn-primary" href={profile.cvFile} download>
              {s.downloadCv}
            </a>
          )}
          <div className="skills">
            {cv.skills.map((g) => (
              <div key={t(g.group)}>
                <p className="eyebrow">{t(g.group)}</p>
                <ul className="tags">
                  {g.items.map((x) => (
                    <li key={t(x)}>{t(x)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal className="cv-timeline" delay={100}>
          {[
            [s.experience, cv.experience],
            [s.education, cv.education],
            [s.courses, cv.courses],
          ].map(([label, items]) =>
            items?.length ? (
              <div key={label} className="timeline">
                <p className="eyebrow">{label}</p>
                <ol>
                  {items.map((e, i) => (
                    <li key={i}>
                      <span className="tl-period">{t(e.period)}</span>
                      <div>
                        <p className="strong">{t(e.title)}</p>
                        {e.org && <p className="muted small">{t(e.org)}</p>}
                        {e.body && <p className="small">{t(e.body)}</p>}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null,
          )}
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Bento />
      <Work />
      <About />
    </>
  );
}
