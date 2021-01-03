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
    },
    anuncio: {
      width: 300,
      height: 200,
    }
  }),
);

export function Anuncio() {
  const classes = useStyles();

  return (
    <Cartao >
      <div className={classes.cartao}>
        <div className={classes.anuncio}>
          anuncio 1
      </div>
        <div className={classes.anuncio}>
          anuncio 2
      </div>
      </div>
    </Cartao>
  );
}
