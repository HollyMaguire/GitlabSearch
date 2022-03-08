This was a coding challenge from Point.io, with the parameters being:
Create an app which allows the user to search Gitlab projects and display details about each project.
You have the choice to create either:
a mobile React Native app (no expo please), or
a web app using React and / or react-native-web
The app should be built using:
Typescript,
GraphQL,
the Gitlab GraphQL API (https://docs.gitlab.com/ee/api/graphql/ )
Details:
display an input field where a user can type their search string to search for projects in Gitlab.
when the user hits enter or when a search button is clicked, run a GraphQL query and fetch the list of projects that match the search
string
fetch only the first 20 projects and display them in a list. Each list cell should have the name and description of the project. The list
should be ordered by the name of the project in ASC order.
when the user clicks or taps on a project from the list, present a details view containing more info about the chosen project. This details
view should include:
name of project,
description of project,
users within the project,
link to the project (when clicked, the project URL should open separately)
user readable creation date,
whether or not it is archived.
User should be able to navigate back to the list screen (and then back to the top Search screen if that was built as a separate screen)
