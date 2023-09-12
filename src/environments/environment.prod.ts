export const environment = {
    production: true,
      hmr: false,
      http: {
          apiUrl: '<https://seval.ddns.net>',
      },
      mqtt: {
          server: 'seval.ddns.net',
          protocol: "wss",
          port: 1883
      }
  };