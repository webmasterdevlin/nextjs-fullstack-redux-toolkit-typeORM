import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store/reducers";
import {
  Box,
  Button,
  createStyles,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import TitleBar from "src/components/TitleBar";
import UpdateUiLabel from "src/components/UpdateUiLabel";
import Layout from "src/components/Layout";
import FormSubmission from "src/components/FormSubmission";
import {
  deleteHeroAction,
  getHeroesAction,
  postHeroAction,
} from "src/features/heroes/heroAsyncActions";
import { softDeleteHeroAction } from "src/features/heroes/heroSlice";

const HeroesPage = () => {
  const dispatch = useDispatch();
  const { heroes, loading } = useSelector((state: RootState) => state.hero);

  const smallScreen = useMediaQuery("(max-width:600px)");
  const classes = useStyles();

  /*local state*/
  const [counter, setCounter] = useState("0");

  useEffect(() => {
    dispatch(getHeroesAction());
  }, [dispatch]);

  return (
    <Layout title={"Next Redux Toolkit + TypeOrm - Heroes Page"}>
      <TitleBar title={"Super Heroes Page"} />
      <FormSubmission handleCreateAction={postHeroAction} />
      <UpdateUiLabel />
      <>
        {loading ? (
          <Typography data-testid={"loading"} variant={"h2"}>
            Loading.. Please wait..
          </Typography>
        ) : (
          heroes.map((h) => (
            <Box
              key={h.id}
              mb={2}
              display={"flex"}
              flexDirection={smallScreen ? "column" : "row"}
              justifyContent={"space-between"}
              data-testid={"card"}
            >
              <Typography>
                <span>{`${h.firstName} ${h.lastName} is ${h.knownAs}`}</span>
                {counter === h.id && <span> - marked</span>}
              </Typography>
              <div>
                <Button
                  className={classes.button}
                  onClick={() => setCounter(h.id)}
                  variant={"contained"}
                  color={"default"}
                  data-testid={"mark-button"}
                >
                  Mark
                </Button>{" "}
                <Button
                  className={classes.button}
                  onClick={() => dispatch(softDeleteHeroAction(h.id))}
                  variant={"contained"}
                  color={"secondary"}
                  data-testid={"remove-button"}
                >
                  Remove
                </Button>{" "}
                <Button
                  className={classes.button}
                  onClick={async () => await dispatch(deleteHeroAction(h.id))}
                  variant={"outlined"}
                  color={"primary"}
                  data-testid={"delete-button"}
                >
                  DELETE in DB
                </Button>
              </div>
            </Box>
          ))
        )}
      </>
      {heroes.length === 0 && !loading && (
        <Button
          data-testid={"refetch-button"}
          className={classes.button}
          variant={"contained"}
          color={"primary"}
          onClick={async () => await dispatch(getHeroesAction())}
        >
          Re-fetch
        </Button>
      )}
    </Layout>
  );
};

export default HeroesPage;

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      margin: "0 0.5rem",
      "&:focus": {
        outline: "none",
      },
    },
  })
);
