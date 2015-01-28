app.factory("CohortMemberFactory", function($http) {
  // Define the Student function
  var Members = function() {
    this.initialize = function() {
      //Request cohort members from REST api
      var self = this;
      var membersData = $http.get('/cohortMember');

      //Resolve promise
      membersData.then(function(response) {
        //Data to be saved
        self.data = []

        //List of unique cohorts
        self.uniqueCohorts = []

        //Get rid of erroneous data
        for(var i = 0; i < response.data.length; i++){
          self.data.push({
            userid: response.data[i].user.id,
            //Surname, Firstname - configurable?
            fullname: response.data[i].user.lastname + ", "
                    + response.data[i].user.firstname,
            cohort: response.data[i].cohort.name
          });

          //Add to list of cohorts
          if(self.uniqueCohorts.indexOf(response.data[i].cohort.name) == -1){
            self.uniqueCohorts.push(response.data[i].cohort.name);
            console.log(response.data[i].cohort.name);
          }
        }

        //Add selected property to  use for filtering the list of users
        self.uniqueCohorts[0] = {name:self.uniqueCohorts[0], selected: true};
        for(var i = 1; i< self.uniqueCohorts.length; i++)
          self.uniqueCohorts[i] = {name:self.uniqueCohorts[i], selected: false};

      },
      function(error){
        console.log(result);
      });
    };

    this.initialize();
  };

  // Return a reference to the function
  return Members;
});
