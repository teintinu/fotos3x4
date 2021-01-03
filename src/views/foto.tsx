import React from 'react';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Zoom from '@material-ui/core/Zoom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Cartao } from './cartao';
import { Foto } from '../state/fotos';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cartao: {
      width: 300,
      height: 400,
      display: 'flex',
      flex: '1 1 0',
      justifyContent: 'center',
      flexDirection: 'column',
      overflow: 'hidden',
    }
  }),
);

export function FotoBox({ foto }: { foto: Foto }) {
  const classes = useStyles();
  return <Cartao>
    <div className={classes.cartao}>
      y
    </div>
  </Cartao>
}