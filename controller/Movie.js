const Movie = require("../model/mongo/Movie");
const MovieComment = require("../model/mongo/MovieComment");

const list = async (req, res, next) => {
  try {
    const {skip=0,limit=10} = req.query
    const {year, genre} = req.query;
    const criteria = {};
    if (year) {
      criteria.year = year;
    }
    if (genre) {
      criteria.genres = genre;
    }
    res.json({
      count: await Movie.countDocuments(criteria),
      items: await Movie.find(criteria).skip(+skip).limit(+limit),
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    res.json({
      item: await Movie.findById(req.params.id),
      comments: await MovieComment.find({movie_id:req.params.id})
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { list, getById };
