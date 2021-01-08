import React, { useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Dialog, Fab } from '@material-ui/core';
import { novoPub } from '../state/novo';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

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

export function NovoEdit() {
  const classes = useStyles();
  const novoUrl = novoPub.use().enviando[0]
  const [crop, setCrop] = React.useState<Crop>({
    aspect: 3 / 4,
  });
  return <Dialog open={true}>
    <div className={classes.imagem}>
      <ReactCrop src={novoUrl} crop={crop} onChange={newCrop => setCrop(newCrop)} />
    </div>
    <div className={classes.buttons}>
      <Fab size="small" color="secondary" aria-label="add" className={classes.margin}>
        <EditIcon />
      </Fab>
      <Fab size="small" color="primary" aria-label="add" className={classes.margin}>
        <AddIcon />
      </Fab>
    </div>
  </Dialog >
}