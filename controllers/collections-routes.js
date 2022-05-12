const router = require("express").Router();
const { ArtPiece, Collection, User } = require("../models");
const sequelize = require("../config/connection");

//Get route for /collections
router.get("/", async (req, res) => {
  try {
    res.render("allCollection", { loggedIn: req.session.loggedIn });
  } catch (error) {
    res.status(500);
  }
});

//Get route for /collections/id
router.get("/:id", async (req, res) => {
  try {
    const specificCollection = await Collection.findOne({
      where: {
        id: req.params.id,
      },
      include: [User, ArtPiece],
    });
    const theCollection = specificCollection.get({ plain: true });
    res.render("singleCollection", {
      theCollection,
      loggedIn: req.session.loggedIn,
    });
  } catch (error) {
      res.status(500);
  }
});

router.post("/", (req, res) => {
  Collection.create({
    title: req.body.title,
    user_id: req.session.user_id,
  })
    .then((collectionDbData) => res.json(collectionDbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.put("/:id", (req, res) => {
  Collection.update(
    {
      title: req.body.title,
      // update with artpiece id
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((collectionDbData) => {
      if (!collectionDbData) {
        res
          .status(404)
          .json({ message: "No collection data found with this id" });
        return;
      }
      res.json(collectionDbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Collection.destroy({
    where: {
      id: req.params.id,
    },
  }).then((collectionDbData) => {
    if (!collectionDbData) {
      res.status(404).json({ message: "No collection found with this id" });
      return;
    }
    res.json(collectionDbData);
  });
});

router.delete("/:id", (req, res) => {
  Collection.destroy({
    where: {
      id: req.params.id,
    },
  }).then((collectionDbData) => {
    if (!collectionDbData) {
      res.status(404).json({ message: "No collection found with this id" });
      return;
    }
    res.json(collectionDbData);
  });
});
module.exports = router;
