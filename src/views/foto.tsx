import React from 'react';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Zoom from '@material-ui/core/Zoom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Cartao } from './cartao';
import { Foto, useFotoPorId } from '../state/fotos';
import { FotoView } from './fotoView';

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
      '& img': {
        transition: 'all .2s ease-in-out',
        cursor: 'pointer',
        '&:hover': {
          transform: 'scale(1.1)'
        }
      }
    }
  }),
);

export function FotoBox({ fotoId }: { fotoId: string }) {
  const classes = useStyles();
  const [foto] = useFotoPorId(fotoId)
  const [exibir, setExibir] = React.useState(false)
  return <Cartao>
    <div className={classes.cartao}>
      {foto ?
        <img src={foto.cropped} onClick={exibe} /> :
        <div>?</div>}
    </div>
    {exibir ? <FotoView fotoId={fotoId} onCheck={fecha} /> : null}
  </Cartao>
  function exibe() {
    setExibir(true)
  }
  function fecha() {
    setExibir(false)
  }
}