
export const getSectionQuery = `
query Sections {
  sections {
    _id
    video
    image
    title
    about {
      title
      description
      subDesc
    }
    resources {
      type
      url
    }
    videoId
    createdAt
    updatedAt
    sourceCode {
      type
      code
    }
  }
}
`

export const addSectionMutation = `
mutation addSection($input: SectionInput) {
    addSection (input:$input){
     __typename ... on res {
      msg
    }
     __typename ... on err {
      err
    }
  }
}
`