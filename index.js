// var sort = true;
// if (data.sort != "" && data.sort == "asc") {
//   sort = false;
// }

// var filterName = { "#ut": "userType" };
// var filterValue = { ":ut": "user" };
// var filterExpressionText = "";
// var filterExpressionVal = 0;

// // Filter the active records only
// filterValue[":userAccountStatus"] = "Active";
// filterName["#userAccountStatus"] = "userAccountStatus";
// filterExpressionText = "#userAccountStatus = :userAccountStatus";
// filterExpressionVal = filterExpressionVal + 1;

// if (data.email != "") {
//   filterValue[":email"] = data.email;
//   filterName["#email"] = "email";
//   filterExpressionText = "contains (#email ,:email)";
//   filterExpressionVal = filterExpressionVal + 1;
// }

// if (data.pseudo != "") {
//   filterValue[":username"] = data.pseudo;
//   filterName["#username"] = "username";
//   if (filterExpressionVal > 0) {
//     filterExpressionText += " and ";
//   }
//   filterExpressionText += "contains (#username ,:username)";
//   filterExpressionVal = filterExpressionVal + 1;
// }

// if (data.sex != "") {
//   filterValue[":gender"] = data.sex;
//   filterName["#gender"] = "gender";
//   if (filterExpressionVal > 0) {
//     filterExpressionText += " and ";
//   }
//   filterExpressionText += " #gender = :gender ";
//   filterExpressionVal = filterExpressionVal + 1;
// }

// if (data.referralCode != "") {
//   filterValue[":referralCode"] = data.referralCode;
//   filterName["#referralCode"] = "referralCode";
//   if (filterExpressionVal > 0) {
//     filterExpressionText += " and ";
//   }
//   filterExpressionText += " #referralCode = :referralCode ";
//   filterExpressionVal = filterExpressionVal + 1;
// }

// if (data.city != "") {
//   filterValue[":country"] = data.city;
//   filterName["#country"] = "country";
//   if (filterExpressionVal > 0) {
//     filterExpressionText += " and ";
//   }
//   filterExpressionText += "contains (#country ,:country)";
//   filterExpressionVal = filterExpressionVal + 1;
// }
// var params = {
//   TableName: this.tableName,
//   IndexName: "userType-registrationTimeStamp-index",
//   ProjectionExpression:
//     "userId,email,username,gender,country,isPremium,registrationTime,userAccountStatus,referralCode,trialEndDate,subscriptionEndDate,paymentStatus,subscribedMonths",
//   KeyConditionExpression: "#ut  = :ut",
//   ExpressionAttributeNames: filterName,
//   ExpressionAttributeValues: filterValue,
//   ScanIndexForward: sort,
//   ExclusiveStartKey: LastEvaluatedKey,
//   //Limit: 11
// };

// if (filterExpressionVal > 0) {
//   params["FilterExpression"] = filterExpressionText;
// }

const DYNOBASE_params = {
  TableName: "dev_ll_user",
  IndexName: "userType-registrationTimeStamp-index",
  ProjectionExpression:
    "userId,email,username,gender,country,isPremium,registrationTime,userAccountStatus,referralCode,trialEndDate,subscriptionEndDate,paymentStatus,subscribedMonths",
  KeyConditionExpression: "#DYNOBASE_userType = :pkey",
  ExpressionAttributeValues: {
    ":pkey": "user",
    ":gender": data.sex || undefined,
    ":userAccountStatus": "Active",
    ":email": data.email || undefined,
    ":referralCode": data.referralCode || undefined,
    ":country": data.city || undefined,
    ":username": data.pseudo || undefined,
  },
  ExpressionAttributeNames: {
    "#DYNOBASE_userType": "userType",
    "#DYNOBASE_gender": data.sex ? "gender" : undefined,
    "#DYNOBASE_userAccountStatus": "userAccountStatus",
    "#DYNOBASE_email": data.email ? "email" : undefined,
    "#DYNOBASE_referralCode": data.referralCode ? "referralCode" : undefined,
    "#DYNOBASE_country": data.city ? "country" : undefined,
    "#DYNOBASE_username": data.pseudo ? "username" : undefined,
  },
  ScanIndexForward: true,
  FilterExpression: `
           #DYNOBASE_userAccountStatus = :userAccountStatus
           ${data.sex && "AND #DYNOBASE_gender= :gender"}
           ${data.email && "AND contains(#DYNOBASE_email, :email)"}
           ${data.referralCode && "AND #DYNOBASE_referralCode =:referralCode"}
           ${data.city && "AND contains(#DYNOBASE_country, :country)"}
           ${data.pseudo && "AND contains(#DYNOBASE_username, :username)"}
          `,
  ScanIndexForward: data.sort === "asc" ? true : false,
};
