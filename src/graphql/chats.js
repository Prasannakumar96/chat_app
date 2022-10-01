export const getMessagesQuery = `
query Messages {
    messages {
        _id
        receiverId
        senderId
        emoji
        files
        senderEmail
        receiverEmail
        message
        createdAt
        updatedAt
      }
      }
  
`;

export const addMessagesMutation = `
    mutation addMessages($input:MessagesInput){
        addMessages(input:$input){
            __typename ... on res{
                msg
            }
            __typename ... on err{
                err
            }
        }
    }
`;
export const updateMessagesMutation = `
    mutation updateMessages($update:MessagesUpdate){
        updateMessages(update:$update){
            __typename ... on res{
                msg
            }
            __typename ... on err{
                err
            }
        }
    }
`;

export const addFilesMutation = `
    mutation addFiles($update:MessagesUpdate){
        addFiles(update:$update){
            __typename ... on res{
                msg
            }
            __typename ... on err{
                err
            }
        }
    }
`;
