import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Dialog, Fab } from '@material-ui/core';
import { novoPub } from '../state/novo';
import CloseIcon from '@material-ui/icons/Close';
import CropIcon from '@material-ui/icons/Crop';

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

export function NovoGen() {
  const classes = useStyles();
  const novoSt = novoPub.use()
  const papel = '15×10'

  return <Dialog open={true} fullScreen={true}>
    <div className={classes.imagem}>
      <img src={novoSt.cropped} />
    </div>
    <div className={classes.buttons}>
      <Fab size="small" color="secondary" aria-label="add" className={classes.margin} onClick={mudaAspect}>
        {papel}
      </Fab>
      <div>
        <Fab size="small" color="secondary" aria-label="close" className={classes.margin} onClick={novoPub.cancelar}>
          <CloseIcon />
        </Fab><br />
        <Fab size="small" color="primary" aria-label="add" className={classes.margin}>
          <CropIcon />
        </Fab>
      </div>
    </div>
  </Dialog >

  function mudaAspect() {

  }
}