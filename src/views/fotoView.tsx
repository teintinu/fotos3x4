import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { CircularProgress, Dialog, Fab } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CropIcon from '@material-ui/icons/Crop';
import { Foto, fotosPub, papeisFoto, useFotoPorId, useFotoPrint } from '../state/fotos';
import { novoPub } from '../state/novo';

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

export function FotoView({ fotoId }: { fotoId: string }) {
  const classes = useStyles();
  const [foto] = useFotoPorId(fotoId)
  const fotoPrint = useFotoPrint(foto, false)

  return <Dialog open={true} fullScreen={true}>
    {
      fotoPrint === undefined ? <CircularProgress /> :
        fotoPrint === null ? <div>erro na foto</div> :
          <React.Fragment>
            <div className={classes.imagem}>
              <img src={fotoPrint} />
            </div>
            <div className={classes.buttons}>
              <Fab size="small" color="secondary" aria-label="add" className={classes.margin} onClick={mudaPapel}>
                {foto.papel}
              </Fab>
              <div>
                <Fab size="small" color="secondary" aria-label="close" className={classes.margin} onClick={novoPub.cancelar}>
                  <CloseIcon />
                </Fab><br />
              </div>
            </div>
          </React.Fragment>
    }
  </Dialog >

  function mudaPapel() {
    const keys = Object.keys(papeisFoto)
    const idx = (keys.indexOf(foto.papel) + 1) % keys.length
    fotosPub.setPapel(fotoId, keys[idx] as any)
  }
}