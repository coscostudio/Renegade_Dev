class VideoCacheManager {
  private static instance: VideoCacheManager;
  private videoCache: Map<string, string> = new Map();
  private isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  private constructor() {
    this.startPreloading();
  }

  static getInstance(): VideoCacheManager {
    if (!VideoCacheManager.instance) {
      VideoCacheManager.instance = new VideoCacheManager();
    }
    return VideoCacheManager.instance;
  }

  private async startPreloading() {
    const videoUrls = Array.from(document.querySelectorAll('video source'))
      .map((source) => source.getAttribute('src'))
      .filter((src): src is string => src !== null);

    if (this.isSafari) {
      videoUrls.forEach((url) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'video';
        link.href = url;
        document.head.appendChild(link);
      });
    } else {
      const batchSize = 3;
      for (let i = 0; i < videoUrls.length; i += batchSize) {
        const batch = videoUrls.slice(i, i + batchSize);
        await Promise.all(batch.map((url) => this.getVideo(url)));
      }
    }
  }

  async getVideo(url: string): Promise<string | undefined> {
    if (this.isSafari) return url;
    if (this.videoCache.has(url)) return this.videoCache.get(url);

    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      this.videoCache.set(url, objectUrl);
      return objectUrl;
    } catch (error) {
      console.warn(`Video fetch failed: ${url}`, error);
      return undefined;
    }
  }

  cleanup(): void {
    if (!this.isSafari) {
      this.videoCache.forEach((objectUrl) => URL.revokeObjectURL(objectUrl));
      this.videoCache.clear();
    }
  }
}

export const videoCacheManager = VideoCacheManager.getInstance();
