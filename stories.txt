Project: Blog Post API with Basic Authentication

This project will help you create a REST API for a simple blog platform with user authentication. You'll learn about user management, authentication, and more complex data relationships.

User Stories:

1. As a user, I want to register an account.
2. As a user, I want to log in to my account.
3. As a user, I want to create a new blog post.
4. As a user, I want to view all blog posts.
5. As a user, I want to view a specific blog post.
6. As a user, I want to update my own blog post.
7. As a user, I want to delete my own blog post.
8. As a user, I want to add comments to blog posts.
9. As a user, I want to view comments on a blog post.

Acceptance Criteria:

1. User Registration

   - Endpoint: POST /api/users/register
   - Request body should include username, email, and password
   - Response should include the created user object (excluding password)
   - Return status code 201 (Created) on success
   - Passwords should be hashed before storing

2. User Login

   - Endpoint: POST /api/users/login
   - Request body should include email and password
   - Response should include a JWT (JSON Web Token) for authentication
   - Return status code 200 (OK) on success, 401 (Unauthorized) on failure

3. Create a new blog post

   - Endpoint: POST /api/posts
   - Request body should include title and content
   - Request must include valid JWT in the Authorization header
   - Response should include the created blog post with an auto-generated ID
   - Return status code 201 (Created) on success

4. Retrieve all blog posts

   - Endpoint: GET /api/posts
   - Response should include an array of all blog posts (with author information)
   - Return status code 200 (OK) on success
   - Implement pagination (e.g., limit and offset query parameters)

5. Retrieve a specific blog post

   - Endpoint: GET /api/posts/:id
   - Response should include the blog post with the specified ID (with author information)
   - Return status code 200 (OK) if found, 404 (Not Found) if not found

6. Update an existing blog post

   - Endpoint: PUT /api/posts/:id
   - Request body should include title and content
   - Request must include valid JWT in the Authorization header
   - Only allow updates if the authenticated user is the author
   - Response should include the updated blog post
   - Return status code 200 (OK) if updated, 404 (Not Found) if not found, 403 (Forbidden) if not the author

7. Delete a blog post

   - Endpoint: DELETE /api/posts/:id
   - Request must include valid JWT in the Authorization header
   - Only allow deletion if the authenticated user is the author
   - Response should include a success message
   - Return status code 200 (OK) if deleted, 404 (Not Found) if not found, 403 (Forbidden) if not the author

8. Add a comment to a blog post

   - Endpoint: POST /api/posts/:id/comments
   - Request body should include content
   - Request must include valid JWT in the Authorization header
   - Response should include the created comment
   - Return status code 201 (Created) on success

9. Retrieve comments for a blog post
   - Endpoint: GET /api/posts/:id/comments
   - Response should include an array of comments for the specified blog post
   - Return status code 200 (OK) on success
   - Implement pagination for comments

Additional requirements:

- Use appropriate HTTP status codes for different scenarios
- Implement input validation for all endpoints
- Use JSON for request and response bodies
- Implement proper error handling and return informative error messages
- Use a simple in-memory data store or a lightweight database like SQLite
- Implement middleware for JWT verification
- Use environment variables for configuration (e.g., JWT secret, database connection)
