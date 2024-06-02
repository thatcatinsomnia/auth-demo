declare global {
  interface Window {
    __preferDark: boolean;
  }
}

export default function ThemeScript() {
  const code = () => {
    const darkColorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

    if (window.localStorage.getItem('preferDark') === 'true') {
      window.__preferDark = true;
      document.documentElement.classList.add('dark');
    } else if (!('preferDark' in window.localStorage) && darkColorSchemeQuery.matches) {
      window.__preferDark = true;
      document.documentElement.classList.add('dark');
    } else {
      window.__preferDark = false;
    }
 };

  return <script dangerouslySetInnerHTML={{ __html: `(${code})()` }} />;
}