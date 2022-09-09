exports.userResponse = (users) => {
    usersResponse = [];

    users.forEach(user => {
        usersResponse.push({
            _id: user._id,
            name: user.name,
            userId: user.userId,
            email: user.email,
            address: user.address,
            userType: user.userType
        });
    })

    return usersResponse
}