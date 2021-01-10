import { Area } from 'react-easy-crop/types';
import { pegaTamanho } from '../state/novo';
import { AspectoFoto, PapelFoto } from '../state/fotos';

export function createImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', error => reject(error))
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = url
  })
}

function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180
}

export async function getCroppedImg(imageSrc: string, pixelCrop: Area, rotation = 0) {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('invalid canvas')

  const maxSize = Math.max(image.width, image.height)
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))

  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = safeArea
  canvas.height = safeArea

  // translate canvas context to a central location on image to allow rotating around the center.
  ctx.translate(safeArea / 2, safeArea / 2)
  ctx.rotate(getRadianAngle(rotation))
  ctx.translate(-safeArea / 2, -safeArea / 2)

  // draw rotated image and store data.
  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  )
  const data = ctx.getImageData(0, 0, safeArea, safeArea)

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  // paste generated rotate image with correct offsets for x,y crop values.
  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
  )

  return canvas.toDataURL('image/jpeg');
}

export async function getPrintedImg(cropredImageSrc: string, tamFoto: AspectoFoto, tamPapel: PapelFoto, grade: boolean) {
  debugger
  if (tamPapel === '-') return cropredImageSrc
  const image = await createImage(cropredImageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('invalid canvas')

  const [pw, ph] = pegaTamanho(tamPapel)
  const [fwb, fhb] = pegaTamanho(tamFoto)
  const fw = fwb + 0.1
  const fh = fhb + 0.1
  const linhas = Math.trunc(ph / fh)
  const colunas = Math.trunc(pw / fw)
  if (linhas < 1 || colunas < 1) return cropredImageSrc

  const resolucao = image.width / fwb
  canvas.width = pw * resolucao
  canvas.height = ph * resolucao
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // for (let linha = 0; linha < linhas; linha++) {
  //   for (let coluna = 0; coluna < colunas; coluna++) {
  ctx.drawImage(
    image,
    0 * fw,
    0 * fh
  )
  ctx.drawImage(
    image,
    1 * fw,
    1 * fh
  )
  //   }
  // }
  return canvas.toDataURL('image/jpeg');
}
