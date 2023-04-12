import { EnvConfigurationService } from "../providers/env-configuration.service";


export function loadSettings(envService: EnvConfigurationService) {
    return () =>
        new Promise((resolver) => {
            envService.load().then((env) => {
                if (env) {
                    resolver(true);
                }
            });
        });
  }