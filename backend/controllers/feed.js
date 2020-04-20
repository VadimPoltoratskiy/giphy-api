const giphy = require('giphy-api')()
const qs = require('querystring')
const Card = require('../models/card')
const History = require('../models/history')


exports.getCards = (req, res, next) => {

  const param = qs.parse(req.url.substring(req.url.indexOf('?') + 1))

  let hist = new History()
  hist.searchText = param.qs
  hist.save().then(() => { })

  giphy.search(param.qs)
    .then(
      (giphyResponse) => {
        return (Array.from(giphyResponse.data)).map(element => element.embed_url)
      }
    )
    .then(
      (links) => {
        for (let link of links) {
          let card = new Card()
          card.imageUrl = link
          card.save().then(card => {
            return card
          })
            .then(() => {
              Card.find().exec().then(cards => {
                return res.status(200).json(cards)
              })
            })
        }
      })
    .catch(err => {
      if (!statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
};

exports.getCard = (req, res, next) => {
  const cardId = req.params.cardId
  Card.findById(cardId)
    .then(card => {
      if (!card) {
        const error = new Error('Could not find the post')
        error.statusCode = 404
        throw error
      }
      res.status(200).json({
        card: card,
        message: 'Card fetched'
      })
    })
    .catch(err => {
      if (!statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
};

exports.likeCard = (req, res, next) => {
  const cardId = req.params.cardId
  const like = req.body.like
  Card.findById(cardId)
    .then(card => {
      if (!card) {
        const error = new Error('Could not find the post')
        error.statusCode = 404
        throw error
      }
      card.like = like
      return card.save()
    })
    .then(card => {
      res.status(200).json({
        card: card,
        message: 'Card liked'
      })
    })
    .catch(err => {
      if (!statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
};

exports.getHistory = (req, res, next) => {

  History.find()
  .then(histories => {
    res.status(200).json(histories)
  })
  .catch(err => {
    if (!statusCode) {
      err.statusCode = 500
    }
    next(err)
  })
}


// exports.getCards = async (req, res, next) => {

//   const param = qs.parse(req.url.substring(req.url.indexOf('?') + 1))

//   let hist = new History()
//   hist.searchText = param.qs
//   hist.save().then(() => { })

//   giphy.search(param.qs)
//     .then(
//       (giphyResponse) => {

//         return (Array.from(giphyResponse.data)).map(element => element.embed_url)
//       }
//     )
//     .then(
//       (links) => {
//         for (let link of links) {
//           let card = new Card()
//           card.imageUrl = link
//           card.save().then(card => {
//             return card
//           })
//         }
//       }).catch(err => {
//         if (!statusCode) {
//           err.statusCode = 500
//         }
//         next(err)
//       })

//      await Card.find().then(cards => {
//         res.status(200).json(cards)
//       })
// };


// exports.getHistory = (req, res, next) => {

//   History.find((err, arr) => {
//     res.statusCode(200).json({
//       arr
//     })
//   })
//     .catch(err => {
//       if (!statusCode) {
//         err.statusCode = 500
//       }
//       next(err)
//     })
// }