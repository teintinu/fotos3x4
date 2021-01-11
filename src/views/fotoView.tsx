import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { CircularProgress, Dialog, Fab, Switch, Tooltip } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import PrintIcon from '@material-ui/icons/Print';
import CopyIcon from '@material-ui/icons/FileCopy';
import DownloadIcon from '@material-ui/icons/GetApp';

import { fotosPub, papeisFoto, useFotoPorId, useFotoPrint } from '../state/fotos';
import { makeblob } from '../utils/imageUtils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imagem: {
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      "& img": {
        border: '1px solid black',
        objectFit: 'cover',
        maxWidth: '90%',
        maxHeight: '90%',
      }
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

export function FotoView({ fotoId, onCheck }: { fotoId: string, onCheck: () => void }) {
  const classes = useStyles();
  const [foto] = useFotoPorId(fotoId)
  const fotoPrint = useFotoPrint(foto)

  return <Dialog open={true} fullScreen={true}>
    {
      fotoPrint === undefined ? <CircularProgress /> :
        fotoPrint === null ? <div>erro na foto</div> :
          <React.Fragment>
            <div className={classes.imagem}>
              <img id="fotoToPrint" src={fotoPrint} />
            </div>
            <div className={classes.buttons}>
              <div>
                <Tooltip title="Tamanho do papel em centímetros">
                  <Fab size="large" color="primary" aria-label="add" className={classes.margin} onClick={mudaPapel}>
                    {foto.papel}
                  </Fab>
                </Tooltip><br />

                <Tooltip title="Imprimir grade">
                  <Switch
                    checked={foto.grade}
                    onChange={mudaGrade}
                    name="checkedA"
                    color="primary"
                    inputProps={{ 'aria-label': 'Grade' }}
                  />
                </Tooltip>
                <br />

                <Tooltip title="Imprimir">
                  <Fab size="small" color="secondary" aria-label="imprimir" className={classes.margin} onClick={imprimirFoto}>
                    <PrintIcon />
                  </Fab></Tooltip><br />
                {/* <Tooltip title="Copiar foto para área de trabalho">
                  <Fab size="small" color="primary" aria-label="copiar" className={classes.margin} onClick={copiarFoto}>
                    <CopyIcon />
                  </Fab>
                </Tooltip><br /> */}
                <Tooltip title="Baixar foto">
                  <a href={fotoPrint} download>
                    <Fab size="small" color="primary" aria-label="copiar" className={classes.margin}>
                      <DownloadIcon />
                    </Fab>
                  </a>
                </Tooltip>
              </div>
              <div>
                <Tooltip title="Excluir essa foto">
                  <Fab size="small" color="secondary" aria-label="close" className={classes.margin} onClick={deleteFoto}>
                    <DeleteIcon />
                  </Fab></Tooltip><br />
                <Tooltip title="Retornar ao menu">
                  <Fab size="small" color="primary" aria-label="close" className={classes.margin} onClick={onCheck}>
                    <CheckIcon />
                  </Fab>
                </Tooltip>
              </div>
            </div>
          </React.Fragment>
    }
  </Dialog >

  function mudaPapel() {
    const keys = Object.keys(papeisFoto)
    const idx = (keys.indexOf(foto.papel) + 1) % keys.length
    fotosPub.setPapel(fotoId, keys[idx] as any)
  }
  function mudaGrade(event: React.ChangeEvent<HTMLInputElement>) {
    fotosPub.setGrade(fotoId, event.target.checked)
  }
  function deleteFoto() {
    fotosPub.delete(fotoId)
    onCheck()
  }
  function imprimirFoto() {
    const docst = document.querySelector('style')
    if (docst && window.print) {
      docst.textContent =
        `@media print {
        * { visibility: hidden; }
        #fotoToPrint { visibility: visible; }
     }`;
      window.print();
    }
  }
  async function copiarFoto() {
    if (fotoPrint) {
      const { state } = await navigator.permissions.query({ name: 'clipboard-write' as any })
      if (state === 'granted') {
        const [blob, contentType] = makeblob(fotoPrint)
        await navigator.clipboard.write([new ClipboardItem({ [contentType]: blob })])
      }
    }
  }
}