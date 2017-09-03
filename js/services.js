angular.module('ngApp.services', [])
.factory('NEDBService',function(){
  
  var Datastore = require('nedb');
 
  
  var db = {};
  return {

    bootstrap : function(){
     db.customers = new Datastore({
        filename: './customers.db', // provide a path to the database file 
        autoload: true, // automatically load the database
        timestampData: true // automatically add and manage the fields createdAt and updatedAt
      });

      db.orders = new Datastore({
        filename: './orders.db', // provide a path to the database file 
        autoload: true, // automatically load the database
        timestampData: true // automatically add and manage the fields createdAt and updatedAt
      });
      





    },
    test : function(){
        

    },
    close : function(){
    },
    find : function(table,offset,limit){

      db[table].find({}).sort({
        updatedAt: -1
      }).exec(function(err, items) {
        if (err) return null;
        return items;
      });

    },
   insert: function(table,item){
      db[table].insert(item, function(err, item) {
        if (err) return null;
        return item;
      });

   }, 
   get(table,id){
      db[table].findOne({
        _id: id
      }, {}, function(err, item) {
        if (err) return null;
        return item;
      });

   },
   delete(table,id){
      db[table].remove({
        _id: id
      }, {}, function(err, item) {
        if (err) return null;
        return 1;
      });

   }
  }
}) 
.factory('DBService',function(MongooseService){
    
    this.pageSize = 10;
    this.offset = 0;
    this.limit = 10;
    var self = this;    
    
    function size(table){

    }
    function find(table,offset,limit){
        return NEDBService.find(table,offset,limit);
    }
    return {
      bootstrap : function(info){
        NEDBService.bootstrap();
        //NEDBService.test();
      },
      getPager: async function(table,pageSize)
      {
          
          self.pageSize = pageSize;
          self.limit = self.pageSize;
          self.size = await size();
          var o =  {
              
              initialPage:function(){

                return find(table,self.offset,self.limit);
              },
              prevPage:function(){
                if(self.offset > 0 )
                { 
                  self.offset -= self.pageSize;
                } 
                 return find(table,self.offset,self.limit);         
              },
              nextPage:function(){
                  if(self.offset  + self.limit <= self.size )
                  {  
                    self.offset +=  self.pageSize;
                  }
                  return find(table,self.offset,self.limit);  
              }
          }
          return o;
          
      }        
    }
});
