import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { createPost } from "../../../actions/posts";
import { useSelector } from "react-redux";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { getUsers } from "../../../api";

const Tweet = () => {
  const user = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [cancelToken, setCancelToken] = useState(() => {});
  const dispatch = useDispatch();
  const [isPoll, setIsPoll] = useState(false);
  const [formData, setFormData] = useState({
    tweet: "",
    image: "",
    video: "",
    poll: {
      question: "",
      choices: {},
      exp: { hours: 0, minutes: 0, days: 0 },
    },
  });

  useEffect(() => {
    cancelToken();
  }, [cancelToken, formData.tweet]);
  const [width, setWidth] = useState(0);
  const [inputs, setInputs] = useState(1);
  const [showDiv, setShowDiv] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.tweet || formData.image) {
      dispatch(createPost(user._id, formData));
    } else if (
      isPoll &&
      formData.poll.question.length &&
      Object.keys(formData.poll.choices).length
    ) {
      dispatch(createPost(user._id, { ...formData, isPoll: true }));
    }
    setIsPoll(false);
    setFormData({
      tweet: "",
      image: "",
      video: "",
      isPoll,
      poll: {
        question: "",
        choices: {},
        exp: { hours: 0, minutes: 0, days: 0 },
      },
    });
  };

  const deleteImage = () => {
    setFormData({ ...formData, image: "" });
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const name = e.target.name;
      let files = e.target.files;
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (e) => {
        setFormData({
          ...formData,
          [name]: e.target.result,
        });
      };
    } else if (
      e.target.name === "hours" ||
      e.target.name === "days" ||
      e.target.name === "minutes"
    ) {
      setFormData({
        ...formData,
        poll: {
          ...formData.poll,
          exp: {
            ...formData.poll.exp,
            [e.target.name]: e.target.value,
          },
        },
      });
    } else if (e.target.name === "tweet") {
      isPoll
        ? setFormData({
            ...formData,
            poll: { ...formData.poll, question: e.target.value },
          })
        : setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
      const mywidth = Math.floor((formData.tweet.length / 160) * 100);
      setWidth(mywidth);
    } else if (e.target.name.startsWith("choice")) {
      setFormData({
        ...formData,
        poll: {
          ...formData.poll,
          choices: {
            ...formData.poll.choices,
            [e.target.name]: e.target.value,
          },
        },
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
    // console.log(formData);
  };

  async function handleSockets(e) {
    const usernames = formData.tweet
      .split(" ")
      .find((row) => row.startsWith("@"));
    if (usernames) {
      const data = await getUsers(usernames.replace("@", ""), setCancelToken);
      setUsers(data);
      if (users.length) {
        setShowDiv(true);
      }
    } else {
      setShowDiv(false);
    }
  }
  return (
    <Wrap>
      <div>
        {" "}
        <div className="avatar">
          {user?.avatar ? (
            <>
              <img src={user.avatar} alt={"user "} />
            </>
          ) : (
            <i className="fa fa-user"></i>
          )}
        </div>
      </div>
      <div className="right">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <textarea
            placeholder={isPoll ? "Ask a question" : "What's happening?"}
            type="text"
            name={"tweet"}
            value={isPoll ? formData.poll.question : formData.tweet}
            maxLength="160"
            onFocus={() => {
              setShowDiv(true);
            }}
            onBlur={() => {
              setShowDiv(false);
              setUsers([]);
            }}
            onChange={(e) => {
              handleChange(e);
              handleSockets(e);
            }}
          />

          {showDiv && users.length > 0 && (
            <UserPreview>
              {users.map((user, i) => {
                return (
                  <div key={i} className="user">
                    <div style={{ minWidth: "50px" }}>
                      {" "}
                      <div className="avatar">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user} />
                        ) : (
                          <i className={"fa fa-user"}></i>
                        )}
                      </div>
                    </div>
                    <div className="userMS">
                      <h6>{user.name}</h6>
                      <p>@{user.username}</p>
                    </div>
                  </div>
                );
              })}
            </UserPreview>
          )}

          {isPoll && (
            <PollView>
              {Array(inputs)
                .fill(null)
                .map((value, index) => (
                  <div key={index} className="PollInputs">
                    <div>
                      <TextInput
                        id="outlined-basic"
                        label={`Choice ${index + 1} ${
                          index === 0 ? "*" : "(optional)"
                        }`}
                        variant="outlined"
                        name={`choice${index + 1}`}
                        // value={formData.poll.choices[`choice${index + 1}`]}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                    </div>

                    {index === inputs - 1 ? (
                      <i
                        className="fa fa-plus"
                        onClick={() => {
                          setInputs((state) => Number(state) + 1);
                        }}
                      ></i>
                    ) : (
                      <span style={{ width: "50px", height: "100%" }}></span>
                    )}
                  </div>
                ))}

              <div className="dateTime">
                <div className="input-wrapper">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Days</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formData.poll.exp.days}
                      label="Days"
                      name="days"
                      onChange={handleChange}
                    >
                      {Array(8)
                        .fill(null)
                        .map((arr, index) => {
                          return (
                            <MenuItem key={index} value={index}>
                              {index}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </div>
                <div className="input-wrapper">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Hours</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formData.poll.exp.hours}
                      label="Hours"
                      name="hours"
                      onChange={handleChange}
                    >
                      {Array(25)
                        .fill(null)
                        .map((arr, index) => {
                          return (
                            <MenuItem key={index} value={index}>
                              {index}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </div>

                <div className="input-wrapper">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Minutes
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formData.poll.exp.minutes}
                      label="Hours"
                      name="minutes"
                      onChange={handleChange}
                    >
                      {Array(61)
                        .fill(null)
                        .map((arr, index) => {
                          return (
                            <MenuItem key={index} value={index}>
                              {index}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="btn-cont">
                <button
                  className="alert"
                  onClick={() => {
                    setIsPoll(false);
                    setInputs(1);
                  }}
                >
                  Remove Poll
                </button>
              </div>
            </PollView>
          )}

          {formData?.image?.length > 0 && (
            <PhotoPreview>
              <img src={formData.image} alt="" />
              <i
                className="fal fa-times"
                onClick={() => {
                  deleteImage();
                }}
              ></i>

              <button>Edit</button>
            </PhotoPreview>
          )}
          <div className="bottom">
            <label htmlFor="photo">
              <i className="fal fa-images"></i>
            </label>
            <input
              type="file"
              id="photo"
              name="image"
              // value={formData.image}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            {/* <GifIcon color="#03abff" background={"#03abff".toString()} /> */}
            <label htmlFor="video">
              <i className="fal fa-video"></i>
            </label>
            <input
              type="file"
              id="video"
              name="video"
              // value={formData.video}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <i
              className="fa fa-poll-h"
              onClick={() => {
                setIsPoll(true);
              }}
            ></i>
            <i className="fal fa-grin"></i>
            <i className="fal fa-calendar"></i>
            <i className="fal fa-map-marker-alt"></i>
            <div className="alighnRight">
              <CircularProgress
                size={28}
                className="Progress"
                variant="determinate"
                value={Number(width)}
              />
              {/* <Progress width={width}>
                <div></div>
              </Progress> */}
              <button>Tweet</button>
            </div>
          </div>
        </form>
      </div>
    </Wrap>
  );
};

export default Tweet;

// const Progress = styled.div`
//   display: block;
//   height: 2px;
//   border: none;
//   outline: none;
//   pointer-events: none;
//   margin-right: 15px;
//   width: 70px;
//   border-radius: 100px;
//   background: var(--borderLight);
//   > div {
//     border-radius: 100px;
//     background: var(--primaryColor);
//     width: ${(props) => props.width + "%"};
//     height: 100%;
//   }
// `;

const UserPreview = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50px;
  left: 15px;
  /* gap: 10px; */
  width: 400px;
  background: white;
  z-index: 100;
  padding: 20px;
  max-height: 600px;
  overflow-y: auto;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.16) 0px 1px 2px 0px;
  .user {
    display: flex;
    gap: 10px;
    padding: 3px 0;
  }
  .userMS {
    /* flex: 1; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    h6 {
      font-size: var(--textFont-md);
      cursor: pointer;
    }
    p {
      font-size: var(--textFont-sm);
      cursor: pointer;
      opacity: 0.7;
    }
  }
  .avtrs {
    overflow: hidden;
    background: var(--borderLight);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 28px !important;
    height: 28px !important;
    border-radius: 50% !important;
    flex-shrink: 0;
    i {
      font-size: 23px;
    }
  }
`;
const TextInput = styled(TextField)`
  width: 100%;
`;

const PollView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 5px 15px 0px;
  padding: 10px;
  outline: 1px solid var(--borderLight);
  border-radius: 10px;

  .dateTime {
    display: flex;
    gap: 10px;
    > div {
      flex: 1;
    }
  }
  .dateTime,
  .btn-cont {
    width: 100%;

    height: 3.4375em;
    border-radius: 4px;
    margin: 5px 0;

    /* input {
      height: 100%;
      outline: none;
      border: none;
      width: 100%;
    } */
  }

  .btn-cont {
    display: flex;
    align-items: center;
    justify-content: center;
    outline: 1px solid var(--borderLight);
    button {
      background: transparent;
      border: none;
      outline: none;
    }
  }
  > .PollInputs {
    display: flex;
    align-items: center;
    margin: 5px 0;
    > div {
      flex: 1;
    }
    i {
      color: var(--primaryColor);
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  /* input {
    width: 100%;
    height: 40px;
    border: none;
    outline: 1px solid rgba(0, 0, 0, 0.07);
  } */
`;

const PhotoPreview = styled.div`
  display: flex;

  grid-gap: 5px;
  background: var(--borderLight);
  /* padding: 10px; */
  min-height: 300px;
  margin: 20px 15px;
  overflow: hidden;
  border-radius: 13px;
  position: relative;

  position: relative;
  height: 200px;
  overflow: hidden;
  border-radius: 13px;

  .fa-times {
    background: rgba(0, 0, 0, 0.5);
    color: white;
    width: 25px;
    height: 25px;
    padding: 2px;
    cursor: pointer;
    border-radius: 50%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 2%;
    left: 1%;
  }
  img {
    /* display: grid; */

    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
    display: grid;
    overflow: hidden;

    &:nth-child(1) {
      grid-area: "1";
    }
    &:nth-child(2) {
      grid-area: "2";
    }
    &:nth-child(3) {
      grid-area: "3";
    }
    &:nth-child(4) {
      grid-area: "4";
    }
  }

  > button {
    background: rgba(0, 0, 0, 0.5);
    border: none;
    padding: 2px 4px;
    min-width: 70px;
    color: white;

    height: 35px;
    position: absolute;
    bottom: 3%;
    cursor: pointer;
    right: 2%;
    border-radius: 200px;
  }
`;

const Wrap = styled.div`
  border-bottom: 1px solid;
  border-color: var(--borderLight);
  height: auto;
  display: flex;
  align-items: center;
  padding: 15px;
  .alighnRight {
    margin-left: auto;
    display: flex;
    align-items: center;
    .Progress {
      fill: var(--borderLight);
    }
    button {
      margin-left: 10px !important;
    }
  }
  .avatar {
    background: var(--borderLight);
    flex: 0.08;
    height: 50px;
    width: 50px;
    border-radius: 50% !important;
    /* padding: 2px; */
    display: flex;
    /* flex-grow: 0; */
    flex-shrink: 0;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .right {
    flex: 1;
    /* min-height: 80%; */

    form {
      margin-left: 20px;
      width: 100%;
      /* min-height: 100%; */
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: fit-content;
      max-height: 80vh;
      padding-right: 15px;
      position: relative;

      .bottom {
        display: flex;
        align-items: center;
        button {
          border: none;
          width: 70px;
          height: 30px;
          border-radius: 400px;
          background-color: var(--primaryColor);
          margin-left: auto;
          margin-right: 15px;
          cursor: pointer;
        }
        i {
          margin: 0 5px;
          cursor: pointer;
          font-size: var(--texFont-lg);
          color: var(--primaryColor);
        }
        #photo {
          display: none;
        }
        #video {
          display: none;
        }
      }
      textarea {
        display: flex;
        flex-grow: 1;
        /* align-items: center; */
        resize: none;
        width: 80%;
        max-height: 80vh;
        margin-bottom: 15px;

        outline: none;
        padding: 10px 0;
        &:focus {
          /* outline: 1px solid var(--borderLight); */
        }
        &::-webkit-scrollbar {
          display: none;
        }
        /* padding: 0 10px; */

        /* padding: auto; */
        border: none;
      }
    }
  }
`;
