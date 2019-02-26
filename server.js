const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const { makeExecutableSchema } = require('graphql-tools');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

const port = process.env.port || 9000;

const app = express();

//register middleware
app.use(bodyParser.json(), cors());
app.listen(port, () => console.log(`server is up and running at ${port} `));

//Adding type definition
const typeDefinition = `
    type Query {
        greeting: String
    }
`;

//Adding resolver
const resolverObject = {
    Query: {
        greeting: () => 'Hello World from Samay!'
    }
};

const schema = makeExecutableSchema({ typeDefs: typeDefinition, resolvers: resolverObject });

//create routes for graphql and graphiql
app.use('/graphql', graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
