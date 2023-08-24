export default function totalPhoneBill(string) {
   let data = string.toLowerCase().split(',');
   let total = 0;
   console.log(data);
   let isValid = true;

   for (let i = 0; i < data.length; i++) {
       if (data[i] === 'call') {
           total += 2.75;
       } else if (data[i] === 'sms') {
           total += 0.65;
       } else {
           isValid = false;
           break;
       }
   }

   if (isValid) {
       return `Your total phone bill R${total.toFixed(2)}`;
   } else {
       return "Invalid input: Only 'call' and 'sms' are allowed separated by a comma.";
   }
}
