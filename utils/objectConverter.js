exports.multipleUserResponse = (users) => {
  userResult = [];

  users.forEach((user) => {
    userResult.push({
      _id: user._id,
      name: user.name,
      userId: user.userId,
      email: user.email,
      userType: user.userType,
      userStatus: user.userStatus,
    });
  });
  return userResult;
};

exports.singleUserResponse = (user) => {
  const response = {
    _id: user._id,
    name: user.name,
    userId: user.userId,
    email: user.email,
    userType: user.userType,
    userStatus: user.userStatus,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
  return response;
};
