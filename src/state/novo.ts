import { createPub } from "../utils/pub";

export interface NovoPub {
  enviando: string[]
}

export const novoPub = createPub({
  enviando: []
} as NovoPub, (g, u) => ({
  enviaArquivo(arq: File) {
    const v = g()
    u({
      ...v,
      enviando: [...v.enviando, window.URL.createObjectURL(arq)]
    }
    )
  }
}))