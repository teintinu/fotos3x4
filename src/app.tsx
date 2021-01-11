import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Novo } from './views/novo'
import { FotoBox } from './views/foto'
import { Anuncio } from './views/anuncio';
import { useTodasFotos, useFotoMaisRecente } from './state/fotos';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap'
    },
  }),
);

export function App() {
  const classes = useStyles();
  const fotos = useTodasFotos()
  const maisRecente = useFotoMaisRecente()

  return (
    <div className={classes.root}>
      {maisRecente ? <FotoBox fotoId={maisRecente} /> : ''}
      <Novo />
      <Anuncio />
      {
        fotos
          .filter((f) => f !== maisRecente)
          .map(f => (
            <FotoBox fotoId={f} />
          ))
      }

    </div>
  );
}
