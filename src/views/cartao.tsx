import React from 'react';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Zoom from '@material-ui/core/Zoom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      margin: theme.spacing(1),
    },
  })
)

export function Cartao({ children }: { children?: React.ReactNode }) {
  const classes = useStyles();
  return <Zoom in={true}>
    <Paper elevation={4} className={classes.paper}>
      {children}
    </Paper>
  </Zoom>
}