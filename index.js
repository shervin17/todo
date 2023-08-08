import express from "express";
import bodyParser from "body-parser";
import mongoose, { Schema } from "mongoose";
var mylist;    

const app= express();
const port= 3000;

    const listSchema = new mongoose.Schema({ list: String });
    const task = mongoose.model("task", listSchema);

    // mongoose.connect("mongodb://127.0.0.1:27017/Activity", {
    //   useNewUrlParser: true,
    // }); 

    const nameSchema = new mongoose.Schema({ name: String });
    const url= "mongodb+srv://velayoshervin69:rikkahart@cluster1.agbolvq.mongodb.net/Activity";


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// app.get("/:paramName", (req,res)=>{
//     var customRoute= req.params.paramName;
//      const task= mongoose.model(customRoute,nameSchema);


// });


app.get(("/"),(req,res)=>{
  
     
  async function ViewRecord() {
    

    try {
      await mongoose.connect(url, {
        useNewUrlParser: true,
      });
      console.log("loading info");
      mylist = await task.find({}, "list").lean();
      console.log(mylist);
      console.log("****************");
      mylist = mylist.reverse();
      res.render("index.ejs", { data: mylist });
    } catch (error) {
      if (error) {
        console.log(error);
      }
      else{
        console.log(new Date.getTime());
      }
    }
  }
  ViewRecord();
  console.log("print this");
  //When documents are queried, they are returned as Mongoose Documents by default. With the Mongoose lean() method, the documents are returned as plain objects.
});


app.post("/post", (req,res)=>{
var item =req.body.task;
// console.log(item); 
 async function addRecord(item){
// console.log(item);    
try {
        await mongoose.connect(url, {
          useNewUrlParser: true,
        });
        // console.log("connected successfully");
        const temp = new task({ list: item });
    // console.log(item);
    await temp.save();
    res.redirect("/");
} catch (error) {
    if(error){
        console.log(error);
    }
    else{
        console.log("record saved");
    }   
}
finally
{mongoose.connection.close();}

};
addRecord(item);


});

app.post("/del",(req,res)=>{
    const deleteItem = req.body.myCheckbox;

    async function delFunction(deleteItem){
        try {
      await mongoose.connect(url, {
        useNewUrlParser: true,
      });  
        await task.deleteOne({list:deleteItem}); 
        res.redirect("/");
        } catch (error) {
            
        }
        finally{
            mongoose.connection.close();
        }

    }
    delFunction(deleteItem);

});



app.listen(port,()=>{
    console.log(`server has started on port ${port}`)
});