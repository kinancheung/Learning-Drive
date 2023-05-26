<h1 align="center">
<img align="center" height="84" src="https://user-images.githubusercontent.com/39721828/167603076-79ba79d9-689f-4886-abc4-5dcc21a78488.png"/>
<br/><br/>
Learning Drive App
</h1>

## Contents

- [Overview](#overview)
- [Running the Project](#run)
- [Running the Tests](#testing)
- [Storybook](#storybook)
- [API Specification](#api)
- [Features](#features)
- [Credits](#credits)

<h2 id="overview">Overview</h2>

Learning Drive is a social media platform that allows for users to post about the content they have learned. Users can then also react to and comment on peoples post adding their own opinions. The user can see posts from three sources. From the global feed, Activity feed, and directly on a users profile. Each user has a profile that can be followed, showing their information, statistics and post history.

<h2 id="run">Running the Project</h2>

To run the project, Clone the repository, then `cd` into the root of the repository

```sh
> git clone git@github.com:UOA-CS732-SE750-Students-2022/project-group-zesty-zuchons.git

> cd ./project-group-zesty-zuchons

```

Ensure that the environment files have been placed within the `backend` folder (`.env` and `service-account.json`). These have been provided by email.

### Running the Backend

```sh
# Navigate to the backend directory
> cd backend

# Install dependencies
> yarn

# Start the server
> yarn start
```

The server should now be running on http://localhost:5000

### Running the Frontend

```sh
# Navigate to the frontend directory
> cd frontend

# Install dependencies
> yarn

# Start the app
> yarn start
```

You should now be able to view the app at http://localhost:3000 in the browser

<h2 id="testing">Running the Tests</h2>
  
### Backend
The backend has a full test suite on Postman which covers all endpoints with various edge cases and scenarios. To run / view this test suite properly, you must have Postman installed.

1. Install [Postman](https://www.postman.com/downloads/)
2. [ Import ](https://learning.postman.com/docs/getting-started/importing-and-exporting-data/) the Postman tests located at `learning-drive/backend/backend-tests.postman_collection.json` in the repository
3. Run script to get auth token for running tests:
   - from backend directory:
   - run `npm run token -- 6SZoYTBzY6ewF5Rkko7hi1QMF8C3`
   - This will generate a JWT which then must be used as an [ environment variable ](https://learning.postman.com/docs/sending-requests/variables/) within Postman
   - Inside of the collection in Postman, there is an eye icon.
   - Select this icon and paste the generated auth token into the `CURRENT VALUE` text field for the variable `token`.
4. Before running the tests it is important to re-seed the database, otherwise some of the tests may fail:
   - run `npx prisma db seed` from within the backend directory.
     - IMPORTANT: This will reset the database back to a very minimal number of posts, so please use it sparingly or not at all.
5. Start the backend by following the instructions in the `Running the Project` section of this document
6. Then inside the collection `backend-test` in Postman, select run `Run collection` option, and run all tests.

### Frontend

The frontend has a test suite of unit tests written in jest.

From the `frontend` directory, run `yarn test`. This will start the test runner in "watch" mode, and tests will rerun when files are changed.

<h2 id="storybook">Storybook</h2>

The frontend uses storybook to create a library of components used in the application. To view it, run `yarn storybook` from within the frontend directory. This should start storybook at http://localhost:6006

<h2 id="api">API Specification</h2>

The specification for our Rest API is defined according to the OpenAPI Specification in [spec.yaml](https://github.com/UOA-CS732-SE750-Students-2022/project-group-zesty-zuchons/blob/main/spec.yaml/).

[Click here to view our API Docs](https://uoa-cs732-se750-students-2022.github.io/project-group-zesty-zuchons/index.html)

<h2 id="features">⭐ Features</h2>

Learning Drive has the following features:

### Users

- Users can create sign up and sign in to the application
- Users can choose to follow other users by their handle
- Users can unfollow people they follow

### Profile Page

- Users can see the profile page of users
- This shows their profile information such as:
  - Profile image, name, and account handle
  - Number of followers
  - Number of people they follow
- Activity, including:
  - The users current streak
  - A heatmap of posts within the past 3 months
  - Number of posts in past 3 months
- Post History:
  - A time ordered list of their post history
  - Ability to filter post history by:
    - Post Message and Categories
- The create post shortcut button is removed on a users Profile Page

### Account page

The Account page is very similar and has all of the features to the profile Page. With the only differences is being:

- The option to sign out is provided in the top left
- Instead of being able to Follow and Unfollow a user, it now gives the option to:
  - See a list of your followers, with a link to their profile
  - See a list of your following, with a link to their profile
- The create post shortcut appears on Account page.

### Posts

A post can be made by a published by a user, as well as edited. Posts show up in feeds, or can be viewed on a detailed Post page.

- The Post Page allows users to reply / comment on posts, as well as, see its nested replies or comments.

- Includes user profile information
  - Image and name of author
- Date and Time of publish or lasted edit
- Categories or topics that the post is related to (upto 3 categories)
- Content, the text that the user can enter to explain what they learnt (10 to 250 characters)
- Resource, an OpenGraph link to a website (or resource) that the user wants to link, to allow people to learn more
  - Includes:
    - OpenGraph image
    - OpenGraph link or source
    - OpenGraph title
- Number of reactions
  - Ability to React / Unreact
- Number of comments
  - Ability to go to comments
    - Ability to reply to a post
    - Ability to reply and React to a comment
- Shareable link to the post can be obtained
  - This is copied to the users clipboard

### Comments

A child of a post is a comment. This means people can leave their thoughts and comments on a post. To see a comment, the user must press the comments button on a post.
A comment has an Id similar to that of a post, and has the same requirements, except it will not show up on a users profile, global or activity feeds.

- Comments can be Reacted / Unreacted to and show the number of Reactions
- Comments can be commented on and shows the number of child comments
- Comments Include:
  - A parent post
  - User Profile information including:
    - User profile, and name
- Time and Date of commenting or last edit
- Content, the text of the comment (10 to 250 characters)
- Resource, an OpenGraph link to a resource, containing:
  - OpenGraph title
  - OpenGraph link or resource
  - OpenGraph image
- Shareable link to the comment can be obtained
  - This is copied to the users clipboard

### Global and Activity Feeds

Learning Drive allows for users to see posts of others learning in feeds. On each feed page and post page, their is a shortcut floating button in the bottom right, allowing users to quick create posts.

- Global feed is the post feed of peoples learning's that contains posts from the most recent posts on the platform. This means that the user does not have to follow another user to see posts on this page.

- Activity feed is the post feed of only people that the user follows and by default contains the most recent posts of people they follow. This means only posts of those they follow will appear. Meaning this page is more tailored to the user.

### Search:

- At the top of both feeds, as well as, a users profile page, a search option is given to allow to filter the feeds.
- Searching allows the users to filter by:
  - Sentences or keywords in a posts Content
  - Categories used to tag posts (upto 3 categories)
- The search filter can be cleared once applied.
- Results still show up in most recent order.

<h2 id="credits">Credits</h2>

Loading Icon created by Sam Herbert https://github.com/SamHerbert/SVG-Loaders

Other icons taken from the Lucide Icon library, a fork of Feather Icons https://lucide.dev/

All other graphics were created by us
