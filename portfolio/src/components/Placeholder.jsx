import { usePrefs } from '../i18n.jsx';

export default function PlaceholderBadge() {
  const { s } = usePrefs();
  return <span className="placeholder-badge">{s.placeholder}</span>;
}
