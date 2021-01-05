const User = require('../models/User');
const Collections = require('../models/Collections');

class apiController {

    async addCollection(req, res) {
        const {title, description, topic, owner_id} = req.body;
        try{
            const createdCollection = await new Collections({
                title,
                description,
                topic,
                owner_id
            })
    
            await createdCollection.save();
    
            res.json({message: 'Collection was created!'})
        }
        catch(e) {
            res.json({error: e});
        }
        
    }

    async addItem(req, res) {
        
    }

    async getCollections(req, res) {
        const {owner_id} = req.body;

        try{
            const allCollections = await Collections.find({owner_id:owner_id});

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