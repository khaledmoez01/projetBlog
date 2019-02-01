let express = require('express')
let router = express.Router()
let upload = require('../upload_image')
let auth = require('./auth')

// Require controller modules.
let adminController = require('../controllers/adminController')

// 02   Récupérer le nombre d'articles, d'utilisateurs et de commentaires
router.get('/', auth.required, adminController.admin_count_get)

// 03   Récupérer la liste des articles
router.get('/articles', auth.required, adminController.admin_articles_get)

// 04   body(Titre, contenu, image) - Créer un nouvel article. l’auteur sera ce même utilisateur et les commentaires seront vides.
router.post('/article/create', upload.single('image'), auth.required, adminController.admin_article_create_post)

// 05   Récupérer les détails d’un article, de son auteur, de ses commentaires et le commentateur de chaque commentaire
router.get('/article/:id_article', auth.required, adminController.admin_article_get)

// 06   body(Titre, contenu, image, date) - Mettre à jour un article mais pas ses commentaires qui seront pris en compte plus tard
router.post('/article/:id_article/update', upload.single('image'), auth.required, adminController.admin_article_update_post)

// 07   Suppression des commentaires d’un article puis suppression d’un article
router.post('/article/:id_article/delete', auth.required, adminController.admin_article_delete_post)

// 08   Récupérer la liste des users
router.get('/users', auth.required, adminController.admin_users_get)

// 09 body(firstName, lastName, email, password, role) - Création d’un user par un admin
router.post('/user/create', auth.required, adminController.admin_user_create_post)

// 10   Récupérer les détails d’un user et des articles écrits par ce user et les commentaires écrits par ce user
router.get('/user/:id_user', auth.required, adminController.admin_user_get)

// 11   body(firstName, lastName, email, password, role)  - Modifier un user
router.post('/user/:id_user/update', auth.required, adminController.admin_user_update_post)

// 12   Pour chaque article écrit par :id_user, supprimer tous les commentaires de cet article. Puis supprimer tous les commentaires écrits par ce :id_user, puis supprimer ce :id_user
router.post('/user/:id_user/delete', auth.required, adminController.admin_user_delete_post)

// 13   Récupérer la liste des comments
router.get('/comments', auth.required, adminController.admin_comments_get)

// 14   body(article, Contenu, date) - Créer un commentaire sur un article. Le commentateur sera ce même utilisateur
router.post('/comment/create', auth.required, adminController.admin_comment_create_post)

// 15   Récupérer les détails d’un commentaire, de son article et du commentateur qui y sont liés
router.get('/comment/:id_comment', auth.required, adminController.admin_comment_get)

// 16   body(Contenu, date)  -  Modifier un commentaire
router.post('/comment/:id_comment/update', auth.required, adminController.admin_comment_update_post)

// 17   Supprimer un commentaire
router.post('/comment/:id_comment/delete', auth.required, adminController.admin_comment_delete_post)

module.exports = router
