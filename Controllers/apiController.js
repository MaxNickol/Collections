const User = require('../models/User');
const Collections = require('../models/Collections');

class apiController {

    async addCollection(req, res) {
        const {title, description, topic, owner_username} = JSON.parse(req.body.data);

        if(req.file) {
            const image = {
                originalName: req.file.originalname,
                url: req.file.path
            }
            try{
                const createdCollection = await new Collections({
                    title,
                    description,
                    image_url: image.url,
                    topic,
                    owner_username
                })
                await createdCollection.save();

                res.json({message: 'Collection was created!'})
            }
            catch(err) {
                res.json({message: "Error occured"})
            }
        }
        else{
            try{
                const createdCollection = await new Collections({
                    title,
                    description,
                    topic,
                    owner_username
                })
        
                await createdCollection.save();
    
                res.json({message: 'Collection was created!'})
            }
            catch(e) {
                res.json({message: "Error occured"});
            }

        }
        
        
        
    }

    async addItem(req, res) {
        
    }

    async delete(req, res) {
        const {id} = req.body;

        await Collections.deleteOne({_id:id});
        
        res.json({message:'Collection was removed!'})
    }

    async removeItem(req, res) {

    }

    async getCollections(req, res) {
        const {owner_username} = req.body;

        try{
            const allCollections = await Collections.find({owner_username:owner_username});

            res.status(200).json({collections: allCollections});
        }
        catch(e) {
            res.json({error: e});
        }
        
    }

    async editCollection(req, res) {
        
    }

    async editItem(req, res) {
        
    }

    async removeCollection(req, res) {
        
    }

    async removeItem(req, res) {
        
    }

    async getProfile(req, res) {
        const requestedUser = req.body.user;

        const foundUser = await User.find({username: requestedUser});

        if(foundUser) {
            res.status(200).json({user: foundUser});
        }
        else{
            res.json({message:'User is not found'});
        }
    }
}


module.exports = new apiController();