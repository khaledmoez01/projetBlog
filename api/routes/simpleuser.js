let express = require('express')
let router = express.Router()
let auth = require('./auth')

// Require controller modules.
let simpleUserController = require('../controllers/simpleUserController')

// 18   Récupérer la liste des articles
router.get('/articles', auth.required, simpleUserController.user_articles_get)

// 19   Récupérer les détails d’un article, de son auteur, de ses commentaires et le commentateur de chaque commentateur
router.get('/article/:id_article', auth.required, simpleUserController.user_article_get)

// 20   Récupérer les détails de user authentifié et des articles écrits par ce user et les commentaires écrits par ce user
router.get('/user', auth.required, simpleUserController.user_get)

// 21   body(Contenu, date ) -  Créer un commentaire sur un article. Le commentateur sera ce même utilisateur
router.post('/comment/create', auth.required, simpleUserController.user_comment_create_post)

module.exports = router
