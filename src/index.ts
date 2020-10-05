import express from 'express';
import { Pokemon } from './pokemon/pokemon';

const app = express();
app.use(express.json());
const port = 8002; // default port to listen

// define a route handler for the default home page
app.get('/', async (request: any, response: any) => {
  response.send({});
});

// Test the pokemon endpoint
app.get('/pokemon', async (request, response) => {
  const p = new Pokemon();
  // Sends in the requested name
  try {
    const result = await p.getPokemonByName(String(request.query.name));
    // Sends back the id of the pokemon
    response.send({
      data: result
    });
  } catch (e) {
    console.log(e);
    response.status(500);
    response.send({
      error: 'Could not find pokemon'
    })
  }
});

// start the Express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
