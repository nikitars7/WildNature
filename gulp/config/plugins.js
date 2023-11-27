import replace from "gulp-replace"; // Search and replace
import plumber from "gulp-plumber"; // Error handling
import notify from "gulp-notify"; // Messages (prompts)
import browsersync from "browser-sync"; //Local host
import newer from "gulp-newer"; // Check updates
import ifPlugin from "gulp-if"; // If statement
export const plugins = {
  replace,
  plumber,
  notify,
  browsersync,
  newer,
  if: ifPlugin,
};
