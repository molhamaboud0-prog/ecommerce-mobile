import { usePrefs } from '../i18n.jsx';

/** `framed` images already include a device bezel, so they skip the CSS one. */
export function Phone({ src, alt, children, className = '', framed }) {
  if (framed && src) {
    return (
      <div className={`phone phone-framed ${className}`}>
        <img src={src} alt={alt || ''} loading="lazy" />
      </div>
    );
  }
  return (
    <div className={`phone ${className}`}>
      <div className="phone-screen">{src ? <img src={src} alt={alt || ''} loading="lazy" /> : children}</div>
    </div>
  );
}

const mockCopy = {
  clinic: {
    title: { en: 'Book a visit', ar: 'احجز موعداً' },
    rows: [
      { en: 'Dr. Placeholder · Dermatology', ar: 'د. مؤقت · جلدية' },
      { en: 'Dr. Placeholder · Pediatrics', ar: 'د. مؤقت · أطفال' },
      { en: 'Dr. Placeholder · Dentistry', ar: 'د. مؤقت · أسنان' },
    ],
    cta: { en: 'Confirm booking', ar: 'تأكيد الحجز' },
  },
  restaurant: {
    title: { en: "Today's menu", ar: 'قائمة اليوم' },
    rows: [
      { en: 'Signature dish', ar: 'الطبق المميّز' },
      { en: 'Fresh salad', ar: 'سلطة طازجة' },
      { en: 'House dessert', ar: 'حلوى البيت' },
    ],
    cta: { en: 'Place order', ar: 'إتمام الطلب' },
  },
};

/** Stylised wireframe-ish screen used until real project files arrive. */
export function MockScreen({ variant = 'clinic', screen = 0 }) {
  const { t } = usePrefs();
  const c = mockCopy[variant];
  return (
    <div className={`mock mock-${variant} mock-s${screen}`}>
      <div className="mock-top">
        <span className="mock-dot" />
        <span className="mock-line w40" />
      </div>
      <div className="mock-title">{t(c.title)}</div>
      {variant === 'clinic' ? (
        <div className="mock-days">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={i === 1 ? 'on' : ''}>
              {12 + i}
            </span>
          ))}
        </div>
      ) : (
        <div className="mock-hero" />
      )}
      <div className="mock-list">
        {c.rows.map((r, i) => (
          <div className="mock-row" key={i}>
            <span className="mock-thumb" />
            <span className="mock-text">
              <b>{t(r)}</b>
              <span className="mock-line w60" />
            </span>
          </div>
        ))}
      </div>
      <div className="mock-cta">{t(c.cta)}</div>
    </div>
  );
}

export default function Cover({ project, compact }) {
  const { cover } = project;
  if (cover.type === 'phones') {
    return (
      <div className={`cover cover-phones ${compact ? 'is-compact' : ''}`}>
        {cover.images.map((src, i) => (
          <Phone key={src} src={src} framed={cover.framed} className={`p${i}`} />
        ))}
      </div>
    );
  }
  return (
    <div className={`cover cover-phones ${compact ? 'is-compact' : ''}`}>
      {[0, 1, 2].map((i) => (
        <Phone key={i} className={`p${i}`}>
          <MockScreen variant={cover.variant} screen={i} />
        </Phone>
      ))}
    </div>
  );
}
