/**
 * Clamp value between two others
 * @param val - value to clamp
 * @param min - minimum value
 * @param max - maximum value
 * @returns 
 */
export function clamp(val, min, max) {
    return val > max ? max : val < min ? min : val;
}