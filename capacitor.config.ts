import type { CapacitorConfig } from "@capacitor/cli";



const config: CapacitorConfig = {

  plugins: {

    CapacitorHttp: {

      enabled: true,

    },

  },

  appId: "com.ucc.smtfrontend",

  appName: "SMTApp",

  webDir: "dist"

};



export default config;

