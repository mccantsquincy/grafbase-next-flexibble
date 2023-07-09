/*
We are creating querys for graphql. Cool feature with grafbase is creating 
querys easily through accessing pathfinder. to access Pathfinder you must run
npx grafbase dev in command line. command + click Pathfinder and create query
*/

export const getUserQuery = `
  query GetUser($email: String!) {
    user(by: { email: $email }) {
        id
        name
        email
        avatarUrl
        description
        githubUrl
        linkedInUrl
    }
  }
`

export const createUserMutation = `
  mutation CreateUser($input: UserCreateInput!) {
    userCreate(input: $input) {
      user {
        name
        email
        avatarUrl
        description
        githubUrl
        linkedInUrl
        id
      }
    }
  }
`