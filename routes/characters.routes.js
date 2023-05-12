const router = require("express").Router();
const axios = require("axios");

/* GET home page */
router.get("/characters", (req, res, next) => {
  axios
    .get("https://ih-crud-api.herokuapp.com/characters")
    .then((responseFromAPI) => {
      //   console.log(responseFromAPI);
      res.render("characters/list-characters", {
        characters: responseFromAPI.data,
      });
    })
    .catch((err) => console.error(err));
});

router.get("/characters/create", (req, res, next) => {
  res.render("characters/create-character");
});

router.post("/characters/create", async (req, res, next) => {
  try {
    let { name, occupation, debt, weapon } = req.body;

    if (req.body.debt) {
      debt = true;
    } else {
      debt = false;
    }

    await axios
      .post("https://ih-crud-api.herokuapp.com/characters", {
        name,
        occupation,
        debt,
        weapon,
      })
      .then((response) => {
        res.json(response.data);
        res.redirect("/characters");
      })
      .catch((error) => console.log(error));
  } catch (error) {
    next(error);
  }
});

router.get("/characters/character/:id", (req, res, next) => {
  axios
    .get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then((responseFromAPI) => {
      // console.log("details: ", responseFromAPI.data)
      res.render("characters/details-character", {
        character: responseFromAPI.data,
      });
    })
    .catch((err) => console.error(err));
});

router.get("/characters/character/:id/edit", async (req, res, next) => {
  const response = await axios.get(
    `https://ih-crud-api.herokuapp.com/characters/${req.params.id}`
  );
  const character = response.data;
  res.render("characters/edit-character", { character });
});

router.post("/characters/character/:id/edit", async (req, res, next) => {
  try {
    let { name, occupation, debt, weapon } = req.body;
    if (req.body.debt) {
      debt = true;
    } else {
      debt = false;
    }

    await axios.put(
      `https://ih-crud-api.herokuapp.com/characters/${req.params.id}`,
      {
        name,
        occupation,
        debt,
        weapon,
      }
    );
    res.redirect(`/characters/character/${req.params.id}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

// https://ih-crud-api.herokuapp.com/characters
