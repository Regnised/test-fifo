# Store test API
Implement an API, that support basic inventory actions. To calculate your inventory throughout time, you'll use the FIFO (First in, First out) principle

# Install modules:
npm i

cd front

npm i

//I'm not front-end developer so I put frontend part in my project

# Test
npm run swagger-test

# Description

How many pens does Sebastian have in stock ultimo Jan 11th 2016?
 275

What is the value of the inventory ultimo Jan 11th 2016?
 3750

What are the costs of pen solds ultimo Jan 11th 2016?
 We can't give answer on this question because we don't know the price for each sell operation(in PDF document)

I used Node.js, Express.js, swagger and MongoDB to do this task.

Tests were automatic generated by swagger tool.

Response function was changed (res._end) to unify all responses

You can test every API request using this link https://test-store1.herokuapp.com/docs/

# Use
https://test-store1.herokuapp.com - UI (Angular 6)
https://test-store1.herokuapp.com/docs/ - API doc
https://test-store1.herokuapp.com/api-docs/ - API doc