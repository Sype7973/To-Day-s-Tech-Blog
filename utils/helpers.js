module.exports = {

    format_date: (date) => {
      // Format date as MM DD YYYY H:M AM/PM
      const options = { weekday: 'short', day: 'numeric', month: 'short', 
      year: 'numeric', hour: 'numeric', minute: 'numeric'};
  
      const formattedTimeStamp = date.toLocaleDateString(undefined, options);
  
      const parts = formattedTimeStamp.split(' ');
      const formattedDate = `${parts[0]} ${parts[2]} ${parts[1]} ${parts[3]} ${parts[4]} ${parts[5]}`;
      
  
      return formattedDate.replace(/,/g, '');
    },
};