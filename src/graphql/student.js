
export const getStudentQuery = `
query Student($id: String) {
    student(_id: $id) {
      ... on Student {
        
        firstName
        lastName
        userName
        phone
        image
        email
        password
        gender
        dob
        location
        notes {
          noteTitle
          note
        }
        course {
          _id
          course_name
          uploadedAt
          totalVideos
          totalAssignments
          totalProjects
          totalMilestones
          totalMilestones
          status
          createdAt
          updatedAt
          modules {
            _id
            title
            SectionTitle {
              _id
              title
              createdAt
              sectionType
              updatedAt
              description
              data {
                sectionId
                videoProgress
              }
              Section {
                _id
                video
                sourceCode {
                  type
                  code
                }
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
              }
            }
            Challenge {
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
            Project {
              _id
              projectSerialNo
              tasks
              title
              description
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
        }
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
        batch {
          _id
          name
          start
          end
          price
          offerId
          discount
          currentStatus
          createdAt
          updatedAt
        }
        invoice {
          _id
          createdAt
          updatedAt
        }
        subscription {
          id
          startDate
          endDate
          invoiceId
          createdAt
          updatedAt
        }
        tickets {
          _id
          ticket_type
          topic
          first_message
          status
          service_agent
          studentID
          files
          updatedAt
          createdAt
        }
        payments {
          id
          modeOfPay
          status
          orderId
          amountCharged
          details
          transactionId
          createdAt
          updatedAt
        }
        orders {
          _id
          courseId
          couponId
          totalAmount
        totalAmount
          orderDate
          discount
          status
          billingAddress
          batchId
          createdAt
          updatedAt
        }
      jobApp {
          studentId
          resumeId
          createdAt
          updatedAt
          status
          jobs {
            title
            Description
            Skills
            Payscale
            Roles
            CompanyId
            Location
            createdAt
            updatedAt
          }
        }
        challanges {
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
        createdAt
        updatedAt
        progress {
          batchId
          progressData {
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
    }
  }
`

export const addStudentMutation = `
mutation addStudent($input: StudentInput) {
  addStudent(input: $input) {
    ... on res {
      msg
    }
    ... on err {
      err
    }
  }
}
`


export const addNotesMutation = `
mutation Mutation($input: NotesInput) {
  addNotes(input: $input) {
    ... on res {
      msg
    }
    ... on err {
      err
    }
  }
}
`


export const updateStudentMutation = `
    mutation updateStudent($update:StudentUpdate){
        updateStudent(update:$update){
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

export const getStudentsQuery = `
query Students {
    students {
      _id
    _id
      firstName
      lastName
      userName
    userName
      phone
    phone
      image
      email
      password
      gender
      dob
      course {
        _id
        course_name
        uploadedAt
        totalVideos
        totalAssignments
        totalProjects
        totalMilestones
        createdAt
        updatedAt
        status
      }
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
      batch {
        _id
        name
        start
        end
        price
        offerId
        discount
        currentStatus
        createdAt
        updatedAt
      }
      invoice {
        _id
        createdAt
        updatedAt
      }
      subscription {
        id
      }
    subscription {
        id
        startDate
        endDate
        invoiceId
      }
      tickets {
        _id
        ticket_type
        topic
        first_message
        status
        service_agent
        chatLogs {
          _id
          user
          messages {
            _id
            receiverId
            senderId
            emoji
            Message
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        files
        studentID
        createdAt
        updatedAt
      }
      payments {
        id
        modeOfPay
        status
        amountCharged
        orderId
        details
        transactionId
        createdAt
        updatedAt
      }
      orders {
        _id
        courseId
        couponId
        totalAmount
        discount
        orderDate
        status
        billingAddress
        batchId
        createdAt
        updatedAt
      }
    challanges {
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
      progress {
        batchId
        progressData {
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
  }
`;
