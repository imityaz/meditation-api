const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const CommunityPosts = require("../../model/community/community");

const createCommunityPost = async (req, res) => {
    try {
        const {userId, userName, text } = req.body;
        const newCommunityPost = new CommunityPosts({
            userId, 
            userName, 
            text
          });
      
        const post = await newCommunityPost.save();
        if(post){
            res.status(200).json({message: "community post saved successfully"});
        }else{
            res.json({message: "community post not added"});
        }
        
    } catch (error) {
        
    }
}

const getCommunityPosts = async (req, res) => {
    try {
        const queryObject = {};
        const totalRecords = await CommunityPosts.countDocuments(queryObject);

        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 5;
        let skip = (page - 1) * limit;

        const apiData = await CommunityPosts.find(queryObject)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        res.status(200).json({
            data: apiData,
            nbHits: totalRecords,
            totalPages: Math.ceil(totalRecords / limit),
            currentPage: page
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports = { createCommunityPost, getCommunityPosts };