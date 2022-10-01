
export const getChallengeQuery = `
query Challenge {
    _id
    project
    tasks
    objective
    title
    description
    images
    solution
    hints
    test_cases
    createdAt 
    updatedAt   
}
`

export const addChallengeMutation = `
mutation addChallenge($input: ChallengeInput) {
    addChallenge (input:$input){
     __typename ... on res {
      msg
    }
     __typename ... on err {
      err
    }
  }
}
`