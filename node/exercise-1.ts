// Call web service and return count user, (got is library to call url)
async function getCountUsers() {
  return {
    total: await got.get("https://my-webservice.moveecar.com/users/count"),
  };
}

// Add total from service with 20
async function computeResult() {
  const result = getCountUsers();
  return result.total + 20;
}

/* ISSUES: 
- Missing await in the call of getCountUsers(), so we get a Promised insted a resolved result.
- So Accessing result.total on a Promise returns undefined
*/

/* FIXES

const result = await getCountUsers();

*/
