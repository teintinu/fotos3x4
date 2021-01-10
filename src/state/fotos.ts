import React from 'react';
import { createPub } from "../utils/pub"
import { getPrintedImg } from '../utils/imageUtils';

export type AspectoFoto = '3×4' | '5×7'
export const aspectosFoto: {
  [key in AspectoFoto]: number
} = {
  '3×4': 3 / 4,
  '5×7': 5 / 7
}

export type PapelFoto = '-' | '15×10'
export const papeisFoto: {
  [key in PapelFoto]: number
} = {
  '-': 0,
  '15×10': 15 / 10,
}

export interface Foto {
  ts: number,
  cropped: string
  tam: AspectoFoto
  papel: PapelFoto
}

export const fotosPub = createPub({} as { [id: string]: Foto }, (g, u) => ({
  adicionar(cropped: string, tam: AspectoFoto) {
    const ts = Date.now()
    const id = [Math.round(Math.random() * ts), ts].join('')
    const f: Foto = {
      ts,
      cropped,
      tam,
      papel: '15×10'
    }
    u({
      [id]: f,
      ...g(),
    })
    return id
  },
  setPapel(id: string, papel: PapelFoto) {
    const fotos = g()
    const foto = fotos[id]
    if (foto) {
      u({
        ...fotos,
        [id]: {
          ...foto,
          papel
        }
      })
    }
  }
}))

export function useFotoMaisRecente(): Foto | undefined {
  const fotos = fotosPub.use()
  return fotos[0]
}

export function useTodasFotos(): Foto[] {
  const fotos = fotosPub.use()
  const ids = Object.keys(fotos)
  return ids.map((id) => fotos[id])
}

export function useFotoPorId(id: string): [Foto, boolean] {
  const fotos = fotosPub.use()
  const foto = fotos[id]
  return [foto, !!foto]
}

export function useFotoPrint(foto: Foto, grade: boolean) {
  const [printBlobUrl, setPrintBlobUrl] = React.useState<undefined | null | string>(foto ? undefined : null)
  React.useEffect(() => {
    if (foto) {
      getPrintedImg(foto.cropped, foto.tam, foto.papel, grade)
        .then(setPrintBlobUrl)
    }
  }, [foto, foto?.cropped, foto?.tam, foto?.papel, grade])
  return printBlobUrl
}