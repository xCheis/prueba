import { BehaviorSubject } from 'rxjs';

const config = <any>Object.assign({}, window['environment']);
export const configurationSubject = new BehaviorSubject<any>(config);

/**
 * Resolve the config by enviroment.json.
 *
 * @export
 * @returns {*} Config by environment.json.
 */
export function resolveEnvironmentConfig() {
	return configurationSubject.getValue();
}
