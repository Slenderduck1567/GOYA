import { useEffect } from 'react';

// Content stays visible without animation support. Only transform and opacity animate.
export function useEditorialMotion(route) {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer;
    const animations = new Set();
    const animate = (element, frames, options) => {
      if (!element.animate || element.contains(document.activeElement)) return;
      const animation = element.animate(frames, options);
      animations.add(animation);
      animation.finished.catch(() => {}).finally(() => animations.delete(animation));
    };
    const start = () => {
      observer?.disconnect();
      animations.forEach(a => a.cancel());
      animations.clear();
      if (preference.matches) return;
      const ease = 'cubic-bezier(.22,1,.36,1)';
      document.querySelectorAll('.hero-copy > *, .hero-next, .page-intro > *, .form-intro > *, .netball-intro h1').forEach((el, i) => {
        animate(el, [{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}], {duration:850,delay:Math.min(i,4)*85,easing:ease,fill:'backwards'});
      });
      document.querySelectorAll('.hero-image').forEach(el => animate(el, [{transform:'scale(1.045)'},{transform:'scale(1)'}], {duration:1600,easing:ease}));
      if (!('IntersectionObserver' in window)) return;
      observer = new IntersectionObserver(entries => {
        entries.filter(entry => entry.isIntersecting).forEach((entry, i) => {
          observer.unobserve(entry.target);
          animate(entry.target,[{opacity:0,transform:'translateY(28px)'},{opacity:1,transform:'translateY(0)'}],{duration:750,delay:Math.min(i,3)*70,easing:ease});
        });
      }, {threshold:0.08});
      document.querySelectorAll('.section-top, .event-card, .editorial-copy, .editorial-split figure, .house-photo, .gallery-grid figure, .weekend-banner, .weekend-note, .event-facts, .weekend-lineup > a, .identity-strip > *, .album-card, .story-article, .venue-steps article, .junior-age-grid article, .closing > *').forEach(el => observer.observe(el));
    };
    start();
    preference.addEventListener('change',start);
    return () => {
      observer?.disconnect();
      animations.forEach(a => a.cancel());
      preference.removeEventListener('change',start);
    };
  }, [route]);
}
