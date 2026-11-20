import { usePrefs } from '../i18n.jsx';
import { cv, profile, projects, stack } from '../content.js';
import { Mail } from '../components/Icons.jsx';
import '../deck.css';

function Slide({ children, className = '', style }) {
  return (
    <section className={`deck-slide ${className}`} style={style}>
      {children}
    </section>
  );
}

function galleryFor(project) {
  const g = project.sections.find((s) => s.gallery);
  return g?.gallery ?? [];
}

function framedFor(project) {
  return project.sections.find((s) => s.gallery)?.framed || project.cover?.framed;
}

function wideFor(project) {
  return project.sections.find((s) => s.wide)?.wide;
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function ScreenThumb({ src, caption, framed }) {
  const { t } = usePrefs();
  return (
    <figure className={`deck-thumb ${framed ? 'is-framed' : ''}`}>
      <img src={src} alt={caption ? t(caption) : ''} loading="eager" />
      {caption && <figcaption>{t(caption)}</figcaption>}
    </figure>
  );
}

function ProjectIntro({ p, shots }) {
  const { t } = usePrefs();
  const framed = framedFor(p);
  return (
    <Slide className="deck-project" style={{ '--accent': p.accent }}>
      <header className="deck-band">
        <div className="deck-band-main">
          <p className="deck-tag">{t(p.kind)}</p>
          <h2>{t(p.title)}</h2>
          <p className="deck-band-summary">{t(p.summary)}</p>
        </div>
        <dl className="deck-band-meta">
          {p.meta.map((m) => (
            <div key={t(m.label)}>
              <dt>{t(m.label)}</dt>
              <dd>{t(m.value)}</dd>
            </div>
          ))}
        </dl>
      </header>
      <div className="deck-body-fill">
        <div className="deck-strip" style={{ '--shot-cols': shots.length }}>
          {shots.map((g) => (
            <ScreenThumb key={g.src} src={g.src} caption={g.caption} framed={framed} />
          ))}
        </div>
        {p.metrics?.length > 0 && (
          <div className="deck-metrics-bar">
            {p.metrics.map((m) => (
              <div key={t(m.label)}>
                <strong>{m.value}</strong>
                <span>{t(m.label)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Slide>
  );
}

function ProjectGallery({ p, items, extra }) {
  const { t } = usePrefs();
  const framed = framedFor(p);
  const screenTitle = p.sections.find((s) => s.id === 'screens')?.title ?? { en: 'Screens', ar: 'الشاشات' };
  const cols = Math.max(items.length, 1);
  return (
    <Slide className={`deck-gallery-page ${items.length ? '' : 'deck-wide-only'}`} style={{ '--accent': p.accent }}>
      <div className="deck-gallery-head">
        <h2>{t(p.title)}</h2>
        <p>{t(screenTitle)}</p>
      </div>
      {items.length > 0 && (
        <div className={`deck-grid deck-grid-${Math.min(cols, 6)}`}>
          {items.map((g) => (
            <ScreenThumb key={g.src} src={g.src} caption={g.caption} framed={framed} />
          ))}
        </div>
      )}
      {extra && (
        <figure className="deck-wide">
          <img src={extra.src} alt={t(extra.caption)} loading="eager" />
          <figcaption>{t(extra.caption)}</figcaption>
        </figure>
      )}
    </Slide>
  );
}

export default function DeckExport() {
  const { t, s } = usePrefs();
  const mosaic = projects
    .flatMap((p) => galleryFor(p).slice(0, 3).map((g) => ({ ...g, accent: p.accent })))
    .slice(0, 9);

  return (
    <div className="deck">
      <Slide className="deck-cover deck-cover-full">
        <div className="deck-cover-top">
          <div className="deck-cover-lede">
            <p className="deck-tag">{t(profile.role)}</p>
            <h1>{t(profile.name)}</h1>
            <p className="deck-lead deck-cover-intro">{t(profile.intro)}</p>
            <p className="deck-meta">
              {t(profile.location)} · <bdi dir="ltr">{profile.email}</bdi>
            </p>
          </div>
          <div className="deck-cover-stack">
            {stack.slice(0, 12).map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
        </div>
        <div className="deck-mosaic">
          {mosaic.map((g) => (
            <img key={g.src} src={g.src} alt="" loading="eager" style={{ outlineColor: g.accent }} />
          ))}
        </div>
      </Slide>

      {projects.map((p) => {
        const gal = galleryFor(p);
        const wide = wideFor(p);
        const introCount = gal.length <= 6 ? gal.length : 5;
        const introShots = gal.slice(0, introCount);
        const rest = gal.length <= 6 ? [] : gal.slice(introCount);
        const chunks = chunk(rest, 6);
        return (
          <div key={p.slug} className="deck-project-group">
            <ProjectIntro p={p} shots={introShots} />
            {chunks.map((items, i) => (
              <ProjectGallery
                key={i}
                p={p}
                items={items}
                extra={i === chunks.length - 1 ? wide : null}
              />
            ))}
            {chunks.length === 0 && wide && <ProjectGallery p={p} items={[]} extra={wide} />}
          </div>
        );
      })}

      <Slide className="deck-closer">
        <div className="deck-closer-copy">
          <h2>{s.about}</h2>
          <p>{t(cv.about)}</p>
          <a className="deck-email" href={`mailto:${profile.email}`}>
            <Mail /> <bdi dir="ltr">{profile.email}</bdi>
          </a>
        </div>
        <div className="deck-closer-side">
          <h3>{s.selectedWork}</h3>
          <ul className="deck-closer-projects">
            {projects.map((p) => (
              <li key={p.slug} style={{ borderColor: p.accent }}>
                <b>{t(p.title)}</b>
                <span>{t(p.summary)}</span>
              </li>
            ))}
          </ul>
        </div>
      </Slide>
    </div>
  );
}