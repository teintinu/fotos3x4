import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { CircularProgress, Dialog, Fab, Switch } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { fotosPub, papeisFoto, useFotoPorId, useFotoPrint } from '../state/fotos';

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
              <img src={fotoPrint} />
            </div>
            <div className={classes.buttons}>
              <div>
                <Switch
                  checked={foto.grade}
                  onChange={mudaGrade}
                  name="checkedA"
                  inputProps={{ 'aria-label': 'Grade' }}
                />
                <br />
                <Fab size="small" color="secondary" aria-label="add" className={classes.margin} onClick={mudaPapel}>
                  {foto.papel}
                </Fab>
              </div>
              <div>
                <Fab size="small" color="secondary" aria-label="close" className={classes.margin} onClick={onCheck}>
                  <CheckIcon />
                </Fab><br />
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
  };
}