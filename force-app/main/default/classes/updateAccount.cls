global class updateAccount implements Schedulable {

   global void execute(SchedulableContext SC) {
      Account acc =[select name,website,phone from Account where id = '0016F00002T42Q6QAJ'];
       acc.Phone = acc.Phone + 1;
       update acc;
   }
}