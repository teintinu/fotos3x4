import React from 'react';
import { createPub } from "../utils/pub"
import { getPrintedImg } from '../utils/imageUtils';
import { saveDB } from './db';

export type AspectoFoto = '3×4' | '5×7'
export const aspectosFoto: {
  [key in AspectoFoto]: number
} = {
  '3×4': 3 / 4,
  '5×7': 5 / 7
}

export type PapelFoto = '-' | '12×7' | '15×10' | '18×13'

export const papeisFoto: {
  [key in PapelFoto]: [number, number]
} = {
  '-': [0, 0],
  '12×7': [1500, 900],
  '15×10': [1800, 1200],
  '18×13': [2100, 1500],
}

export interface Foto {
  ts: number,
  cropped: string
  grade: boolean
  tam: AspectoFoto
  papel: PapelFoto
}

export interface FotosPub {
  maisRecente?: string
  byId: { [id: string]: Foto }
}
export const fotosPub = createPub({
  byId: {}
} as FotosPub, (g, u) => ({
  load(dados: FotosPub) {
    u(dados)
  },
  dump() {
    return g()
  },
  adicionar(cropped: string, tam: AspectoFoto) {
    const ts = Date.now()
    const id = [Math.round(Math.random() * ts), ts].join('')
    const f: Foto = {
      ts,
      cropped,
      grade: true,
      tam,
      papel: '15×10'
    }
    const db = { ...g() }
    db.maisRecente = id
    db.byId[id] = f
    u(db)
    saveDB()
    return id
  },
  setPapel(id: string, papel: PapelFoto) {
    const db = { ...g() }
    const foto = db.byId[id]
    if (foto) {
      foto.papel = papel
      u(db)
    }
    saveDB()
  },
  setGrade(id: string, grade: boolean) {
    const db = { ...g() }
    const foto = db.byId[id]
    if (foto) {
      foto.grade = grade
      u(db)
    }
    saveDB()
  },
  delete(id: string) {
    const db = { ...g() }
    delete db.byId[id]
    if (id === db.maisRecente)
      delete db.maisRecente
    u(db)
    saveDB()
  }
}))

export function useFotoMaisRecente(): string | undefined {
  const db = fotosPub.use()
  return db.maisRecente
}

export function useTodasFotos(): string[] {
  const db = fotosPub.use()
  const fotos = db.byId
  const ids = Object.keys(fotos)
  return ids
}

export function useFotoPorId(id: string): [Foto, boolean] {
  const db = fotosPub.use()
  const fotos = db.byId
  const foto = fotos[id]
  return [foto, !!foto]
}

export function useFotoPrint(foto: Foto) {
  const [printBlobUrl, setPrintBlobUrl] = React.useState<undefined | null | string>(foto ? undefined : null)
  React.useEffect(() => {
    if (foto) {
      getPrintedImg(foto.cropped, foto.tam, foto.papel, foto.grade)
        .then(setPrintBlobUrl)
    }
  }, [foto, foto?.cropped, foto?.tam, foto?.papel, foto.grade])
  return printBlobUrl
}
