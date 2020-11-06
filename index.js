import app from './app.js';

app.listen(process.env.PORT, () => {
  console.log('Running server at port:', process.env.PORT);
});
