import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop/types';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Dialog, Fab, Slider, Snackbar } from '@material-ui/core';
import { AspectoFoto, aspectosFoto, novoPub } from '../state/novo';
import CloseIcon from '@material-ui/icons/Close';
import CropIcon from '@material-ui/icons/Crop';
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
  const novoUrl = novoPub.use().enviando[0]
  const [ajuda, setAjuda] = React.useState(true)
  const [crop, setCrop] = React.useState<Point>({
    x: 0, y: 0
  });
  const [ang, setAng] = React.useState(0)
  const [zoom, setZoom] = React.useState(2)
  const [aspecto, setAspecto] = React.useState<AspectoFoto>('3×4')
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const onCropComplete = React.useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])
  return <Dialog open={true} fullScreen={true}>
    <div className={classes.imagem}>
      <Cropper
        image={novoUrl}
        restrictPosition={false}
        aspect={aspectosFoto[aspecto]}
        crop={crop}
        onCropChange={setCrop}
        rotation={ang}
        onRotationChange={setAng}
        zoom={zoom}
        zoomSpeed={0.5}
        maxZoom={50}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
      />
    </div>
    <div className={classes.buttons}>
      <Fab size="small" color="secondary" aria-label="add" className={classes.margin} onClick={mudaAspect}>
        {aspecto}
      </Fab>
      <div style={({ width: 150 })}>
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
      </div>
      <div>
        <Fab size="small" color="secondary" aria-label="close" className={classes.margin} onClick={novoPub.cancelar}>
          <CloseIcon />
        </Fab><br />
        <Fab size="small" color="primary" aria-label="add" className={classes.margin} onClick={doCrop}>
          <CropIcon />
        </Fab>
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
  function mudaAspect() {
    const keys = Object.keys(aspectosFoto)
    const idx = (keys.indexOf(aspecto) + 1) % keys.length
    setAspecto(keys[idx] as any)
  }
  async function doCrop() {
    if (croppedAreaPixels) {
      const cropped = await getCroppedImg(novoUrl, croppedAreaPixels, ang)
      novoPub.setCropped(cropped)
    }
  }
}