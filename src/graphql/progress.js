
export const getProgressQuery = `
query Progress{

    progress{
        batchId
        progressData{
            score
            assignmentsCompleted {
                _id
                code
                submission
                createdAt
                updatedAt   
            }
            projectsCompleted {
                _id
                code
                submission
                createdAt
                updatedAt   
            }
            challengesCompleted {
                _id
                code
                submission
                createdAt
                updatedAt   
            }
            completed
            percentage
            currentState
            currentModule
            Section {
                sectionId
                videoProgress
            }
            lastPlayed {
                sectionId
                videoProgress
            }
        }
        createdAt
        updatedAt
        mileStones
        
    }
}
`

export const addProgressMutation = `
mutation addProgress($input: ProgressInput) {
    addProgress (input:$input){
     __typename ... on res {
      msg
    }
     __typename ... on err {
      err
    }
  }
}`
export const updateProgressMutation = `
mutation updateProgress($updateId:String!,$update: ProgressUpdate) {
    updateProgress (updateId:$updateId,update:$update){
     __typename ... on res {
      msg
    }
     __typename ... on err {
      err
    }
  }
}
`