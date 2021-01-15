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
  }),
);

export function Anuncio() {
  const classes = useStyles();

  return (
    <Cartao >
      <div className={classes.cartao}>
        <ins className="adsbygoogle"
          style={({ display: "inline-block", width: 300, height: 200 })}
          data-ad-client="ca-pub-7270098487606102"
          data-ad-slot="2904311422"></ins>
      </div>
    </Cartao>
  );
}
