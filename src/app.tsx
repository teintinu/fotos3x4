import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Novo } from './views/novo'
import { FotoBox } from './views/foto'
import { Anuncio } from './views/anuncio';
import { useFotos, useFotoMaisRecente } from './state/fotos';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },

  }),
);

export function App() {
  const classes = useStyles();
  const fotos = useFotos()
  const maisRecente = useFotoMaisRecente()

  return (
    <div className={classes.root}>
      {maisRecente ? <FotoBox foto={maisRecente} /> : ''}
      <Novo />
      <Anuncio />
      {
        fotos
          .filter((f) => f !== maisRecente)
          .map(f => (
            <FotoBox foto={f} />
          ))
      }

    </div>
  );
}
