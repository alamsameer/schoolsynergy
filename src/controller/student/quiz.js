import quizModel from "../../model/quiz/quiz.js"

// show all quiz list based on class and organisaton and subject id

const getAllQuiz=async(req,res)=>{
    try{
        const{studentId, organisationId,subjectId}=req.body
        const quiz=await quizModel.find({studentId, organisationId,subjectId})
        if(!quiz){
            res.status(404).json({message:"you have  not assigned any quiz "})
        }
        res.status(200).json({quiz})
        
    }catch(error){
        res.status(500).json({
            message:"server error"
        })
    }
}
/* show the performace for specific quiz --
list of questions, correct or not , overall score 
*/

// send the performace for quizwise - to show graph 
// send data  for comparision - quizwise 