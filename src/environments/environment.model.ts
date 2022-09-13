export interface Environment {
  production: boolean;
  urls?: {
    notes: string;
  },
  constants?: {
    cssOverride: object,
    language: {
      default: string;
      supported: string[];
    },
    logo: {
      forMenu: string;
      forHeader: string;
    }
  },
  featureFlags?: any;
}
