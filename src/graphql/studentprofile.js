export const getStudentsQuery = `
query{
  student{
    ... on Student {
      _id
      firstName
      userName
      lastName
      phone
      email
      image
      password
      gender
      location
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
      dob
      createdAt
      updatedAt
    
      batch {
        _id
        name
        course {
          course_name
        }
      }
      subscription {
        id
        startDate
        course{
          course_name
        }
        endDate
        invoiceId
     
      }
      invoice {
        _id
        order{
          totalAmount
        }
        createdAt
        updatedAt
        payment{
          createdAt
        }
      }
      tickets {
        _id
        ticket_type
        topic
        status
        createdAt
        updatedAt
      }
      payments {
          id
          modeOfPay
          status
          amountCharged
          details
          orderId
          transactionId
        }
  
      token
      otp
    }
    ... on err {
      err
    }
  }
}
  
`;
// export const getStudentQuery = `
//       query student($id: String) {
//         student(_id: $id) {

//         }
//       }
// `;
export const addStudentsMutation = `
    mutation addStudent($input:StudentInput){
        addStudent(input:$input){
            __typename ... on res{
                msg
            }
            __typename ... on err{
                err
            }
        }
    }
`;
export const updateStudentMutation = `
mutation($update: StudentUpdate, $updateId: String){
  updateStudent(update: $update,updateID: $updateId){
    __typename ... on res{
      msg
    }
    __typename ... on err{
      err
    }
  }
}
`;

export const updateProfilePicMutation = `
    mutation updateProfilePic($url :String,$userType:String){
      updateProfilePic(url :$url,userType:$userType){
            __typename ... on res{
                msg
            }
            __typename ... on err{
                err
            }
        }
    }
`;
