import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Cartao } from './cartao'
import { Button } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone'
import { novoPub } from '../state/novo';
import { NovoEdit } from './novoCrop';
import { isMobile } from '../utils/isMobile';
import { FotoView } from './fotoView';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cartao: {
      width: 300,
      height: 400,
    },
    buttons: {
      padding: 30,
      display: 'flex',
      flex: '1 1 0',
      justifyContent: 'center',
      flexDirection: 'column',
    }
  }),
);

export function Novo() {
  const classes = useStyles();
  const novoSt = novoPub.use()
  const enviando = novoSt.enviando[0]
  return (
    <Cartao >
      <div className={classes.cartao}>
        {enviando ?
          (novoSt.croppedFotoId ? <FotoView fotoId={novoSt.croppedFotoId} onCheck={novoPub.cancelar} /> : <NovoEdit />)
          :
          <div className={classes.buttons}>
            <DropzoneArea
              dropzoneText={
                isMobile ?
                  "Enviar foto da galeria" :
                  "Arrasta a foto pra cá ou clique aqui"
              }
              maxFileSize={30 * 1024 * 1024}
              showPreviews={false}
              showPreviewsInDropzone={false}
              acceptedFiles={["image/*"]}
              onChange={uploadFiles}
            />
            {/* <div>&nbsp;</div>
            <Button variant="contained" color='secondary'>Tirar uma foto</Button> */}
            {/* <div>&nbsp;</div>
            <Button variant="contained" color='primary'>Colar foto</Button> */}
          </div>
        }
      </div>
    </Cartao>
  );
  function uploadFiles(files: File[]) {
    files.forEach(novoPub.enviaArquivo)
  }
}
