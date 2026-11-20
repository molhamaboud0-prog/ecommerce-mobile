import { useEffect, useState } from 'react';
import { PrefsProvider } from './i18n.jsx';
import { projects } from './content.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import CaseStudy from './pages/CaseStudy.jsx';

function parseHash() {
  const h = window.location.hash.replace(/^#/, '') || '/';
  const m = h.match(/^\/work\/([\w-]+)/);
  if (m) return { page: 'case', slug: m[1] };
  return { page: 'home', anchor: h.startsWith('/') ? h.slice(1) : h };
}

function useRoute() {
  const [route, setRoute] = useState(parseHash);
  useEffect(() => {
    const on = () => setRoute(parseHash());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}

export default function App() {
  const route = useRoute();
  const project = route.page === 'case' ? projects.find((p) => p.slug === route.slug) : null;

  useEffect(() => {
    if (route.page === 'home' && route.anchor) {
      requestAnimationFrame(() => document.getElementById(route.anchor)?.scrollIntoView({ behavior: 'smooth' }));
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [route.page, route.slug, route.anchor]);

  return (
    <PrefsProvider>
      <Header />
      <main key={route.slug || 'home'} className="page-enter">
        {project ? <CaseStudy project={project} /> : <Home />}
      </main>
      <Footer />
    </PrefsProvider>
  );
}
