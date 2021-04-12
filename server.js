const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const axios = require("axios").default;
const fetch= require("node-fetch");
const schema=require("./schema");

var messages=[
    {status : 1, message :'the shortened link comes from the domain that shortens the link, i.e. the link has already been shortene'},
    {status : 2, message:'the entered link is not a link'},
    {status : 5, message : 'the link has not passed the validation. Includes invalid characters'},
    {status : 6, menubar : 'The link provided is from a blocked domain'}
];


const app=express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));


app.listen(3000, () => console.log(
    "server running on port 3000"
))
