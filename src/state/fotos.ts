export interface Foto {
  ts: number,
  img: string
}

const fotos: Foto[] = []

export function useFotos() {
  return fotos
}

export function useFotoMaisRecente(): Foto | undefined {
  return fotos[0]
}
