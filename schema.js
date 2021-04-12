const axios = require("axios")
const { 
    GraphQLObjectType, 
    GraphQLInt, 
    GraphQLString, 
    GraphQLNonNull, 
    GraphQLSchema
} = require("graphql");


var messages=[
    {status : 1, message :'the shortened link comes from the domain that shortens the link, i.e. the link has already been shortene'},
    {status : 2, message:'the entered link is not a link'},
    {status : 5, message : 'the link has not passed the validation. Includes invalid characters'},
    {status : 6, menubar : 'The link provided is from a blocked domain'}
];

const urlType=new GraphQLObjectType({
    name:'shortenURL',
    fields : () => ({
        status: {type:GraphQLInt},
        fullLink: {type : GraphQLString},
        date: {type :GraphQLString},
        shortLink: {type :GraphQLString},
        title: {type :GraphQLString}
    })
})

const RootQuery=new GraphQLObjectType({
    name: 'rootQueryType',
    fields : {
        shortenURL : {type : urlType,
            args : {
                url : {type : GraphQLString} 
            },
         async resolve(parentValue, args){
            const results= await  axios.get('https://cutt.ly/api/api.php?key=609caa580c5532d4ef7ee4b5c1226d5b39b87&short='+args.url, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(response=>response.data.url)            
                return results
            },
      
        }
    }  
});

module.exports=new GraphQLSchema({
    query:RootQuery
})