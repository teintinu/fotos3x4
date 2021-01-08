import { createPub } from "../utils/pub";

export type AspectoFoto = '3×4' | '5×7'
export const aspectosFoto: {
  [key in AspectoFoto]: number
} = {
  '3×4': 3 / 4,
  '5×7': 5 / 7
}

export type PapelFoto = '15×10'
export const papeisFoto: {
  [key in PapelFoto]: number
} = {
  '15×10': 15 / 10,
}

export interface NovoPub {
  enviando: string[]
  cropped: string
  aspecto: AspectoFoto
}

export const novoPub = createPub({
  enviando: [],
  cropped: '',
  aspecto: '3×4'
} as NovoPub, (g, u) => ({
  enviaArquivo(arq: File) {
    const v = g()
    u({
      ...v,
      enviando: [...v.enviando, window.URL.createObjectURL(arq)]
    })
  },
  setCropped(cropped: string) {
    u({
      ...g(),
      cropped
    })
  },
  cancelar() {
    const v = g()
    u({
      ...v,
      cropped: '',
      enviando: v.enviando.slice(1)
    })
  }
}))

export function pegaTamanho(s: string) {
  const [w, h] = s.split('×')
  return [w && parseInt(w) || 0, h && parseInt(h) || 0]
}