exports.userRsponse = (users) => {

    userResult = [];

    users.forEach(user => {

        userResult.push({
            name : user.name,
            userid :user.userId,
            email : user.email,
            userType : user.userType,
            userStatus : user.userStatus,
            createrAt : user.createrAt,
            updatedAt: user.updatedAt

        })
    })
    return userResult;
    
}