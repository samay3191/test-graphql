// const bodyParser = require('body-parser');
// const cors = require('cors');
// const express = require('express');
// const { makeExecutableSchema } = require('graphql-tools');
// const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

// const port = process.env.port || 9000;

// const app = express();

// //register middleware
// app.use(bodyParser.json(), cors());
// app.listen(port, () => console.log(`server is up and running at ${port} `));

// //Adding type definition
// const typeDefinition = `
//     type Query {
//         greeting: String
//     }
// `;

// //Adding resolver
// const resolverObject = {
//     Query: {
//         greeting: () => 'Hello World from Samay!'
//     }
// };

// const schema = makeExecutableSchema({ typeDefs: typeDefinition, resolvers: resolverObject });

// //create routes for graphql and graphiql
// app.use('/graphql', graphqlExpress({ schema }));
// app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));



const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const db = require('./db');

const port = process.env.PORT || 9000;
const app = express();

//loading type definition from schema file
const fs = require('fs');
const typeDefs = fs.readFileSync('./schema-app/schema.graphql',{encoding:'utf-8'});

//loading resolvers
const resolvers = require('./resolvers');

//binding schema and resolvers
const {makeExecutableSchema} = require('graphql-tools');
const schema = makeExecutableSchema({typeDefs, resolvers});

//enabling cross domain calls and form post
app.use(cors(), bodyParser.json());

//enabling routes
const  {graphiqlExpress,graphqlExpress} = require('apollo-server-express');
app.use('/graphql',graphqlExpress({schema}));
app.use('/graphiql',graphiqlExpress({endpointURL:'/graphql'}));

//registering port
app.listen(
   port, () => console.info(
      `Server started on port ${port}`
   )
);
