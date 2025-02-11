export interface S3Config {
  bucketUrl: string;
  prefix?: string;
}

class S3ImageLoader {
  private static instance: S3ImageLoader;
  private imageCache: Map<string, string> = new Map();
  private config: S3Config;

  private constructor(config: S3Config) {
    this.config = config;
  }

  static getInstance(config: S3Config): S3ImageLoader {
    if (!S3ImageLoader.instance) {
      S3ImageLoader.instance = new S3ImageLoader(config);
    }
    return S3ImageLoader.instance;
  }

  async loadImagesFromBucket(): Promise<string[]> {
    try {
      const prefix = this.config.prefix
        ? this.config.prefix.endsWith('/')
          ? this.config.prefix
          : `${this.config.prefix}/`
        : '';

      console.log('Using prefix:', prefix);

      const baseUrl = this.config.bucketUrl.endsWith('/')
        ? this.config.bucketUrl.slice(0, -1)
        : this.config.bucketUrl;

      console.log('Using base URL:', baseUrl);

      // Build list request URL correctly
      const listUrl = `${baseUrl}?list-type=2&prefix=${prefix}&delimiter=/`;
      console.log('Fetching from:', listUrl);

      const response = await fetch(listUrl, {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: '*/*',
        },
      });

      console.log('S3 Response:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers),
      });

      const xmlText = await response.text();
      console.log('Raw XML response:', xmlText);

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

      // Get all Contents nodes
      const contents = xmlDoc.getElementsByTagName('Contents');
      console.log('Found Contents nodes:', contents.length);

      // Extract keys from Contents
      const keys = Array.from(contents)
        .map((content) => content.getElementsByTagName('Key')[0]?.textContent)
        .filter((key) => key && /\.(jpg|jpeg|png|webp)$/i.test(key))
        .filter(Boolean);

      console.log('Found S3 keys:', keys);

      // Build full URLs
      const urls = keys.map((key) => `${baseUrl}/${key}`);
      console.log('Generated image URLs:', urls);

      return urls;
    } catch (error) {
      console.error('Failed to load images from S3:', error);
      return [];
    }
  }

  async preloadImages(urls: string[]): Promise<void> {
    const promises = urls.map((url) => this.loadImage(url));
    await Promise.all(promises);
  }

  private async loadImage(url: string): Promise<void> {
    if (this.imageCache.has(url)) return;

    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous'; // Important for WebGL textures
      img.onload = () => {
        this.imageCache.set(url, url);
        resolve();
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${url}`);
        resolve();
      };
      img.src = url;
    });
  }

  cleanup(): void {
    this.imageCache.clear();
  }
}

export const initS3ImageLoader = (config: S3Config) => S3ImageLoader.getInstance(config);
