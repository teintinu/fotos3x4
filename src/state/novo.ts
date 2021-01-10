import { createPub } from "../utils/pub";
import { fotosPub, AspectoFoto, Foto } from "./fotos";

export interface NovoPub {
  enviando: string[]
  aspecto: AspectoFoto
  croppedFotoId: string | false
}

export const novoPub = createPub({
  enviando: [],
  aspecto: '3×4',
  croppedFotoId: false
} as NovoPub, (g, u) => ({
  enviaArquivo(arq: File) {
    const v = g()
    u({
      ...v,
      croppedFotoId: false,
      enviando: [...v.enviando, window.URL.createObjectURL(arq)]
    })
  },
  confirmar(cropped: string) {
    const n = g()
    const croppedFotoId = fotosPub.adicionar(cropped, n.aspecto)
    u({
      ...g(),
      croppedFotoId
    })
  },
  cancelar() {
    const v = g()
    u({
      ...v,
      croppedFotoId: false,
      enviando: v.enviando.slice(1)
    })
  }
}))

export function pegaTamanho(s: string) {
  const [w, h] = s.split('×')
  return [w && parseInt(w) || 0, h && parseInt(h) || 0]
}
