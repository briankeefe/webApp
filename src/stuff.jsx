/* eslint-disable no-unused-vars */
import { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import makeStyles from "@material-ui/styles/makeStyles";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import { spacing } from "@material-ui/system";
import Box from "@material-ui/core/Box";
import { Container, Paper, Card } from "@material-ui/core";
import React from "react";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import blue from "@material-ui/core/colors/blue";
import yellow from "@material-ui/core/colors/yellow"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: blue[200]
  },
  title: {
    flexGrow: 1
  },
  card: {
    backgroundColor: "#ac5353",
    color: "white"
  },
  temp: {
    backgroundColor: yellow[700],
    position: 'sticky'
  },
  box: {
    backgroundColor: blue[200]
  }
}));

function Index() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const sampleCard = (
    <Box my={4}>
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Word of the Day
          </Typography>
          <Typography variant="h5" component="h2">
            be
            {bull}
            nev
            {bull}o{bull}
            lent
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            adjective
          </Typography>
          <Typography variant="body2" component="p">
            well meaning and kindly
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Box>
  );
  return (
    <div className={classes.root}>
      <Box>
        <AppBar className={classes.temp}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box mx={"auto"} my={4}>
        <Paper className={classes.root}>
          <Box>
            {sampleCard}
            {sampleCard}
            {sampleCard}
            {sampleCard}
            {sampleCard}
            {sampleCard}
          </Box>
        </Paper>
      </Box>
    </div>
  );
}

export default Index;
