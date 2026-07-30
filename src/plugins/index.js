const plugins = [];

export function registerPlugin(plugin) {
  if (!plugin?.name || typeof plugin.register !== "function") {
    throw new TypeError("Plugin requires name and register(bot) function");
  }
  plugins.push(plugin.name);
  return plugin;
}

export function loadPlugins(bot, pluginList = []) {
  for (const plugin of pluginList) {
    registerPlugin(plugin).register(bot);
  }
  return plugins;
}

export function listPlugins() {
  return [...plugins];
}
