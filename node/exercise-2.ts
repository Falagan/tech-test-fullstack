// Call web service and return total vehicles, (got is library to call url)

const got = {
  get: (path: string): Promise<any> => {
    return new Promise((resolve) => resolve("ok"));
  },
};

async function getTotalVehicles() {
  return await got.get("https://my-webservice.moveecar.com/vehicles/total");
}

function getPlurial() {
  let total;
  getTotalVehicles().then((r) => (total = r));
  if (total <= 0) {
    return "none";
  }
  if (total <= 10) {
    return "few";
  }
  return "many";
}

/* ISSUES:
 getTotalVehicles() is async function, so can be resolved with then() or using async await sugar.
 In this case its resolved using then but the total check occurs outside of the tehn method, so just after
 the function its called but not awating for the resolved then value.
 So we are evaluating total before to be setted by the promised. With this implem. it will retunr always "many".

FIXES:
1. With async and await:
   async function getPlurial() {
     const total = await getTotalVehicles();
     // rest of logic...
   }

2. With Promise:
   function getPlurial() {
     return getTotalVehicles().then((total) => {
       if (total <= 0) return "none";
       if (total <= 10) return "few";
       return "many";
     });
   }
*/
