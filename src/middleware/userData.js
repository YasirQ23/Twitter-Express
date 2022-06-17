const axios = require('axios')
const { GraphQLID } = require('graphql')

const userData = async (req, res, next) => {
    if (!req.verifiedUser) {
        next()
        return
    }

    const query = `
        query user($id: ID!) { 
            user( id: $id ) {
                id,
                posts {
                    id,
                    body,
                    likes,
                    timestamps
                }
            } 
        }`
    console.log(req.verifiedUser.user._id)
    let data = {}
    try {
        data = await axios.post(process.env.GRAPHQL_ENDPOINT, 
        { 
            query,
            variables: {
                id: req.verifiedUser.user._id
            }
        },
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }); 
    } catch(e) {
        console.log(e)
    }

    req.verifiedUser.user.posts = data.data.data.user?.posts ?? []


    next()
}

module.exports = { userData }