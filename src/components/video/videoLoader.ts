import { videoCacheManager } from './cacheManager';

export async function initializeVideo(container: Element, isPreloader: boolean = false) {
  const videos = container.querySelectorAll('video');
  const promises = Array.from(videos).map(async (video) => {
    if (video.dataset.initialized === 'true') return;

    video.muted = false;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');

    // Skip caching for preloader video
    if (isPreloader) {
      video.dataset.initialized = 'true';
      return;
    }

    const sources = video.querySelectorAll('source');
    const sourcePromises = Array.from(sources).map(async (source) => {
      const originalSrc = source.getAttribute('src');
      if (!originalSrc) return;

      const cachedSrc = await videoCacheManager.getVideo(originalSrc);
      if (cachedSrc) {
        const newSource = document.createElement('source');
        newSource.src = cachedSrc;
        newSource.type = 'video/mp4';
        source.parentNode?.replaceChild(newSource, source);
      }
    });

    await Promise.all(sourcePromises);
    video.load();
    video.dataset.initialized = 'true';
  });

  await Promise.all(promises);
}
