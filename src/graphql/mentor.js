export const getMentorQuery = `
query Mentor {
    mentors {
      _id
      email
      password
     
      tickets {
        _id
        ticket_type
        topic
        first_message
        status
        chatLogs {
          _id
         messages{
          _id
         }
        }
        createdAt
        updatedAt
      }
      chatLogs {
        _id
       
       messages{
        _id
        senderId
        receiverId
       }
      }
        firstName
        userName
        lastName
        phone
        gender
        address {
          _id
          Flat
          HomeNo
          Street
          Town
          Village
          Landmark
          District
          State
          Pin
          Country
          createdAt
          updatedAt
        }
        dateOfBirth
        createdAt
        updatedAt
        qualification
        experience
        CourseAllocated
      
      updatedAt
      createdAt
    }
  }`;
