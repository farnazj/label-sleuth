import { Stack } from "@mui/material";
import {
  SmallTitle,
  LargeTitle,
  MainContent,
  PrimaryButton,
  SecondaryButton,
  InnerModalContent,
  OuterModalContent,
  InnerModal,
  OuterModal,
} from "./components";
import { useState, useEffect } from "react";
import "./index.css";
import check from "./assets/check.svg";
import cross from "./assets/cross.svg";
import info_icon from "../../../assets/workspace/help.svg";
import { Fade } from "@mui/material";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function importAll(r) {
  return r.keys().map(r);
}

const media = importAll(require.context("./assets/v2/", false));

const Tutorial = ({ tutorialOpen, setTutorialOpen }) => {
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    if (tutorialOpen) {
      setStageIndex(0);
    }
  }, [tutorialOpen]);

  const onPrimaryButtonClickDefault = () => {
    setStageIndex(stageIndex + 1);
  };

  const onSecondaryButtonClickDefault = () => {
    setStageIndex(stageIndex - 1);
  };

  const stages = [
    {
      largeTitle: "Welcome to the Label Sleuth Tutorial",
      content: (
        <div>
          <a href="http://label-sleuth.org/" target="_blank">Label Sleuth</a> 
        is a no-code system for quickly creating custom text classifiers; no technical expertise required! Label Sleuth guides you
        through the data annotation process, while automatically creating an AI model in the background. This process is iterative,
        with the system automatically improving the model as you annotate more examples. The goal is to get a high-performance text
        classification model for your use case with just a few hours of interaction with Label Sleuth.
        </div>
      ),
    },
    {
      largeTitle: "Category",
      content: (
        <div className="stage-content">
          <p>
            Start by creating a new category describing the aspect of the dataset that you want to identify. Make sure that the category
            is well-defined and it is clear to you whether a given text belongs to the category or not. In Label Sleuth you will be working
            one category at a time; a design decision that has been made to make the data annotation and model building process more efficient.
            However, you may create several categories within a workspace and switch between them as needed.
          </p>
        </div>
      ),
    },
    {
      largeTitle: "Data",
      content: (
        <div>
          <p>
            You can start labeling the data now! Labeling is a process that
            helps the AI model to understanding the criteria to your category.
            The label system is binary - positive and negative. You can go back
            and edit your labels as many times as you’d like.
          </p>
          <div style={{ marginLeft: "35px" }}>
            <span className="positive-label">
              <img src={check} />
              Positive - it maches
            </span>
            <span className="negative-label">
              <img src={cross} />
              Negative
            </span>
          </div>
        </div>
      ),
    },
    {
      largeTitle: "Search",
      content: (
        <div>
          <p>
            You can search by keywords if you are looking for anything specific.
            Give search a try!
          </p>
        </div>
      ),
    },
    {
      largeTitle: "Model Update & Prediction",
      content: (
        <div>
          <p>
            The AI model will be updated every 5 labels. You can track your
            model version and progress on the left.
          </p>
          <p>
            Whenever the model finishes updating, a confetti will appear! It
            tells you that there is now a new model.
          </p>
          <p>
            Additionally, the model will also make predictions and mark
            recommend to label text entries in your dataset. You can use these
            as guides to accelerate and fine-tune your model.
          </p>
          <div style={{ marginTop: "20px" }}>
            <span className="prediction">
              Positive prediction example:
              <div className="predicted-element">
                <p> I am a text entry that was predicted as positive! </p>
              </div>
            </span>
          </div>
        </div>
      ),
    },
    {
      largeTitle: "Recommended to label",
      content: (
        <div>
          <p>
            Here, you can see a list of recommend to label text entires on the
            right. Prioritize on labeling these will help improve the model
            classification result.
          </p>
        </div>
      ),
    },
    {
      smallTitle: "Tutorial completed",
      largeTitle: "That’s all!",
      content: (
        <p>
          If you need to revisit the tutorial, go to the top left of the screen
          and click on
          <img src={info_icon} className="tutorial-icon" alt="Open Tutorial" />
        </p>
      ),
      primaryButtonTitle: "Start labeling",
      onPrimaryButtonClick: () => setTutorialOpen(false),
      secondaryButtonTitle: "Restart from beginning",
      onSecondaryButtonClick: () => setStageIndex(0),
    },
  ];

  const currentStage = stages[stageIndex];

  return (
    <OuterModal open={tutorialOpen} onClose={() => setTutorialOpen(false)}>
      <Fade in={tutorialOpen} timeout={{ enter: 1000, exit: 0 }}>
        <OuterModalContent>
          <img
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            src={media[stageIndex]}
          />
          <InnerModal
            open={tutorialOpen}
            onClose={() => setTutorialOpen(false)}
            hideBackdrop
          >
            <InnerModalContent>
              <div
                style={{
                  marginTop: "5px",
                  marginLeft: "25px",
                  display: "block",
                }}
              >
                <div style={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      order: 1, 
                      flex: "0 0 auto",
                }}>
                  <IconButton
                    aria-label="close"
                    style={{color: "white"}}
                    onClick={() => setTutorialOpen(false)}
                    sizeMedium
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                </div>
                <SmallTitle>{currentStage.smallTitle || "Tutorial"}</SmallTitle>
                <LargeTitle>{currentStage.largeTitle}</LargeTitle>
                <MainContent>{currentStage.content}</MainContent>
              </div>
              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-end"
                spacing={0}
                style={{ width: "100%", flex: "none", order: 1, flexGrow: 0, marginTop: "15px" }}
              >
                {stageIndex !== 0 ? (
                  <SecondaryButton
                    onClick={
                      currentStage.onSecondaryButtonClick ||
                      onSecondaryButtonClickDefault
                    }
                  >
                    {currentStage.secondaryButtonTitle || "Previous"}
                  </SecondaryButton>
                ) : null}
                <PrimaryButton
                  onClick={
                    currentStage.onPrimaryButtonClick ||
                    onPrimaryButtonClickDefault
                  }
                >
                  {currentStage.primaryButtonTitle || "Next"}
                </PrimaryButton>
              </Stack>
            </InnerModalContent>
          </InnerModal>
        </OuterModalContent>
      </Fade>
    </OuterModal>
  );
};

export default Tutorial;
