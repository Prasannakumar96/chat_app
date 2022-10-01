export const loginQuery = `
query($email: String!, $password: String!, $userType: String!){
    login(email: $email, password: $password, userType: $userType) {
      userID
      token
      tokenExpiration
    }
  }
`;