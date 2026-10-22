/** Clave del almacenamiento del navegador donde se recuerda la elección día/noche. */
export const THEME_STORAGE_KEY = "aulafy:theme";

/**
 * Guion que se ejecuta antes de pintar: aplica la elección guardada o, si no hay, la preferencia del sistema.
 * Debe ser autocontenido (se inserta como texto en <head>) y no puede fallar: si el almacenamiento está bloqueado, usa el sistema.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var d;try{var s=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});d=s==="dark"?true:s==="light"?false:window.matchMedia("(prefers-color-scheme: dark)").matches}catch(e){d=window.matchMedia("(prefers-color-scheme: dark)").matches}var h=document.documentElement;h.classList.toggle("dark",d);h.style.colorScheme=d?"dark":"light"}catch(e){}})();`;
