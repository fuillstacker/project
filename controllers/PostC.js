const {Post, Comm, Like} = require('../models/models')
const uuid = require('uuid')
const path = require('path')

class PostController {
   async createPost (req, res) {
		 try {
			const {title, desc} = req.body
			const {img} = req.files

			let fileName = uuid.v4() + ".jpg"
      img.mv(path.resolve(__dirname, '..', 'static', fileName))

			const post = await Post.create({
          title,
					img: fileName,
					desc,
					userId: req.user.id
			 })
			 res.json(post)
		 } catch(e) {
			console.log(e)
		 }
	 }

	 async getPosts (req, res) {
		  try {
        const posts = await Post.findAll()
				return res.json(posts)
			} catch(e) {
				console.log(e)
			}
	 }

	 async addComm (req, res) {
		 try {
			const {postId, id} = req.params
			const {text} = req.body

			const post = await Post.findByPk(postId)
        if (!post) {
            return res.status(404).json({ error: 'Post not found' })
        }
        const comment = await Comm.create({ id, userId: req.user.id, text, postId: post.id })
        res.status(201).json(comment)
		 } catch(e) {
			console.log(e)
		 } 
	 }

	 async getComm (req, res) {
		try {
			const {postId} = req.params
			const post = await Post.findByPk(postId, {include: 'comms'})
			if (!post) {
				return res.status(404).json({ error: 'Post not found' });
		}
			return res.json(post.comms)
		} catch(e) {
			console.log(e)
			return res.status(500).json({message: 'Error comm getting'})
		}
	 }

	 async deleteComm (req, res) {
		const { id } = req.params;
    try {
        const comment = await Comm.findByPk(id);
        if (!comment) {
            return res.status(404).json({ error: 'Коментар не знайдено' });
        }
        await comment.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Не вдалося видалити коментар' });
    }
	}

	 async like (req, res) {
		const {postId, userId} = req.params
		try {
			const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ error: 'Пост не знайдено' });
        }
				const existingLike = await Like.findOne({ where: { postId, userId } });
        if (existingLike) {
            return res.status(400).json({ error: 'Ви вже поставили лайк цьому посту' });
        }
			const like = await Like.create({
				userId: req.user.id, postId: post.id
			})
			res.status(201).json(like)
		} catch(e) {
			console.error(e)
			return res.status(500).json({message: 'Liking error'})
		}
	 }

	 async getLike (req, res) {
		try {
      const {postId} = req.params
			const post = await Post.findByPk(postId, {include: 'likes'})
			if (!post) {
				return res.status(404).json({ error: 'Post not found' })
		}
			return res.json(post.likes)
		} catch(e) {
			console.log(e)
			return res.status(500).json({message: 'Error like getting'})
		}
	 }

	 async deleteLike (req, res) {
		const { postId, userId } = req.params;
    try {
        const like = await Like.findOne({ where: { postId, userId } });
        if (!like) {
            return res.status(404).json({ error: 'Лайк не знайдено' });
        }
        await like.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Не вдалося видалити лайк' });
    }
	 }


}

module.exports = new PostController()