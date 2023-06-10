export function round(number: number) {
  return Math.round(number * 1e2) / 1e2
}

export function velocityPerSecond(velocity: number, frameDuration: number) {
  return frameDuration ? velocity * (1000 / frameDuration) : 0
}
