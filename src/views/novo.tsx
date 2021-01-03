import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Cartao } from './cartao'
import { Button } from '@material-ui/core';

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
      padding: 30,
    }
  }),
);

export function Novo() {
  const classes = useStyles();

  return (
    <Cartao >
      <div className={classes.cartao}>
        <Button variant="contained" color='primary'>Enviar uma foto</Button>
        <div>&nbsp;</div>
        <Button variant="contained" color='secondary'>Tirar uma foto</Button>
        <div>&nbsp;</div>
        <Button variant="contained" color='primary'>Colar foto</Button>
      </div>
    </Cartao>
  );
}
