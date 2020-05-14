type EnvConfig = {
  readonly sentry: {
    dsn: string;
  };
};

type Config = {
  readonly development: EnvConfig;
  readonly production: EnvConfig;
};

const config: Config = {
  development: {
    sentry: {
      dsn: ""
    }
  },
  production: {
    sentry: {
      dsn:
        "https://a4537e18a1014f908068985f7dc12609@o391523.ingest.sentry.io/5240240"
    }
  }
};

export const getConfig = (): EnvConfig =>
  config[process.env.NODE_ENV] || config.development;
