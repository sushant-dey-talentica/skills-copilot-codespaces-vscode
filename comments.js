// Create web server
// 1. Read the comments.json file
// 2. Create a web server
// 3. Create a route for /comments that returns the comments
// 4. Create a route for POST /comments that adds a new comment
// 5. Save the comments to the file after adding a new comment
// 6. Create a route for /comments/:id that returns a single comment
// 7. Create a route for PUT /comments/:id that updates a comment
// 8. Save the comments to the file after updating a comment
// 9. Create a route for DELETE /comments/:id that deletes a comment
// 10. Save the comments to the file after deleting a comment
// 11. Use the body-parser middleware to parse the request body
// 12. Add a timestamp to each comment

const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const commentsPath = './comments.json';

app.use(bodyParser.json());

app.get('/comments', (req, res) => {
  fs.readFile(commentsPath, (err, data) => {
    if (err) {
      res.status(500).send('Error reading comments file');
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.post('/comments', (req, res) => {
  fs.readFile(commentsPath, (err, data) => {
    if (err) {
      res.status(500).send('Error reading comments file');
      return;
    }
    const comments = JSON.parse(data);
    const newComment = req.body;
    newComment.id = comments.length + 1;
    newComment.timestamp = new Date();
    comments.push(newComment);
    fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
      if (err) {
        res.status(500).send('Error writing comments file');
        return;
      }
      res.json(newComment);
    });
  });
});

app.get('/comments/:id', (req, res) => {
  fs.readFile(commentsPath, (err, data) => {
    if (err) {
      res.status(500).send('Error reading comments file');
      return;
    }
    const comments = JSON.parse(data);
    const comment = comments.find((comment) => comment.id === parseInt(req.params.id));
    if (!comment) {
      res.status(404).send('Comment not found');
      return;
    }
    res.json(comment);
  });
});