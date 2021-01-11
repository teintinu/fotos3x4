import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop/types';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Dialog, Fab, Slider, Snackbar, Tooltip } from '@material-ui/core';
import { novoPub } from '../state/novo';
import { AspectoFoto, aspectosFoto } from '../state/fotos';
import CloseIcon from '@material-ui/icons/Close';
import CropIcon from '@material-ui/icons/Crop';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import { Point } from 'react-easy-crop/types';
import { getCroppedImg } from '../utils/imageUtils';
import { isMobile } from '../utils/isMobile';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imagem: {
      position: 'relative',
      width: '100%',
      height: '100%',
    },
    buttons: {
      position: 'fixed',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      left: 0,
      right: 0,
      bottom: 0,
      padding: 10,
    },
    margin: {
      margin: theme.spacing(1),
    },
  })
)

const marks = [
  {
    value: -90,
    label: '-90°',
  },
  {
    value: -45,
    label: '-45°',
  },
  {
    value: 0,
    label: '0',
  },
  {
    value: 45,
    label: '45°',
  },
  {
    value: 90,
    label: '90°',
  },
];

export function NovoEdit() {
  const classes = useStyles();
  const novoSt = novoPub.use()
  const novoUrl = novoSt.enviando[0]
  const [ajuda, setAjuda] = React.useState(true)
  const [crop, setCrop] = React.useState<Point>({
    x: 0, y: 0
  });
  const [ang, setAng] = React.useState(0)
  const [zoom, setZoomSt] = React.useState(2)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const onCropComplete = React.useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])
  const minZoom = 1
  const maxZoom = 50
  const zoomSpeed = 0.5
  return <Dialog open={true} fullScreen={true}>
    <div className={classes.imagem}>
      <Cropper
        image={novoUrl}
        restrictPosition={false}
        aspect={aspectosFoto[novoSt.aspecto]}
        crop={crop}
        onCropChange={setCrop}
        rotation={ang}
        onRotationChange={setAng}
        zoom={zoom}
        zoomSpeed={zoomSpeed}
        minZoom={minZoom}
        maxZoom={maxZoom}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
      />
    </div>
    <div className={classes.buttons}>
      <Tooltip title={"Mudar tamanho do papel. Tamanho atual: " + novoSt.aspecto}>
        <Fab size="small" color="secondary" aria-label="add" className={classes.margin} onClick={mudaAspect}>
          {novoSt.aspecto}
        </Fab>
      </Tooltip>
      <div style={({ width: 150 })}>
        <Tooltip title={"Rotacionar a foto"}>
          <Slider
            defaultValue={0}
            getAriaValueText={angText}
            aria-labelledby="discrete-slider-custom"
            step={3}
            valueLabelDisplay="auto"
            color='secondary'
            track={false}
            min={-90}
            max={90}
            marks={marks}
            onChange={setAngEv}
          />
        </Tooltip>
      </div>
      <div>
        <Tooltip title={"Aumentar zoom"}>
          <Fab size="small" color="primary" aria-label="Zoom In" className={classes.margin} onClick={zoomIn}>
            <ZoomInIcon />
          </Fab></Tooltip><br />
        <Tooltip title={"Diminuir zoom"}>
          <Fab size="small" color="primary" aria-label="Zoom Out" className={classes.margin} onClick={zoomOut}>
            <ZoomOutIcon />
          </Fab></Tooltip><br />
        <Tooltip title={"Retornar"}>
          <Fab size="small" color="secondary" aria-label="close" className={classes.margin} onClick={novoPub.cancelar}>
            <CloseIcon />
          </Fab>
        </Tooltip><br />
        <Tooltip title={"Recortar foto como " + novoSt.aspecto}>
          <Fab size="small" color="primary" aria-label="add" className={classes.margin} onClick={doCrop}>
            <CropIcon />
          </Fab>
        </Tooltip>
      </div>
    </div>
    <Snackbar open={ajuda} autoHideDuration={6000} message=
      {
        isMobile ?
          "Você pode arrastar e fazer zoom na foto" :
          "Use a rodinha do mouse para zoom e arraste para mover a foto"
      }
      onClose={fechaAjuda}
      anchorOrigin={({ vertical: 'top', horizontal: 'center' })}
    />
  </Dialog >
  function fechaAjuda() {
    setAjuda(false)
  }
  function angText(value: number) {
    return `${value}°`;
  }
  function setAngEv(_: any, value: any) {
    setAng(value)
  }
  function zoomIn() {
    setZoom(zoom * (zoomSpeed * 2.5))
  }
  function zoomOut() {
    setZoom(zoom / (zoomSpeed * 2.5))
  }
  function setZoom(nz: number) {
    nz = Math.min(maxZoom, Math.max(nz, minZoom))
    setZoomSt(nz)
  }
  function mudaAspect() {
    const keys = Object.keys(aspectosFoto)
    const idx = (keys.indexOf(novoSt.aspecto) + 1) % keys.length
    novoPub.setAspecto(keys[idx] as any)
  }
  async function doCrop() {
    if (croppedAreaPixels) {
      const cropped = await getCroppedImg(novoUrl, croppedAreaPixels, ang)
      novoPub.confirmar(cropped)
    }
  }
}