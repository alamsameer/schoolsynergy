import quizModel from "../../model/quiz/quiz.js";
import attemptModel from "../../model/quiz/attemptquiz.js";

const hasCorrectAnswers = (actualAns, resAns) => {
  let isCorrect = false;
  if (actualAns.length == 1) {
    isCorrect = actualAns[0] == resAns[0];
  } else {
    // checking for multiple correct ans
    if (actualAns.length == resAns.length) {
      resAns.forEach((element) => {
        if (!actualAns.includes(element)) {
          return isCorrect;
        }
      });
      isCorrect = true;
    }
  }
  return isCorrect;
};

const getTotalScore = (attemptQuestion) => {
  let score = 0;
  attemptQuestion.forEach((attemptedQuestion) => {
    // If the answer is correct, increment the total score
    if (attemptedQuestion.isCorrect) {
      score++;
    }
  });
  return score;
};

const handleQuestions = (quizQuestions, attemptQuestions) => {
  const serializedQuestionIds = attemptQuestions.map((question) => question._id);

  const attemptedQuestions = quizQuestions.map((question) => {
    const index = serializedQuestionIds.indexOf(String(question._id));
    const answers = index === -1 ? [] : attemptQuestions[index].answers;
    const isCorrect = index !== -1 && hasCorrectAnswers(question.answers, answers);

    return {
      questionId: question._id,
      answers,
      isCorrect,
    };
  });

  return attemptedQuestions;
};

export const studentAttempt = async (req, res) => {
  try {
    const { quizId, studentId, organisationId, attemptQuestions } = req.body;
    // console.log( { quizId, studentId, organisationId, attemptQuestions } );
    const isAttempt=await attemptModel.find({quizId,studentId})
    if(isAttempt){
      return res.status(409).json({ message: "Already Attempted" });
    }
    const quiz = await quizModel.find({ _id:quizId}).populate("questions");
    const attemptAnsQues = handleQuestions(quiz[0].questions, attemptQuestions);

    const studentAttempt = await attemptModel.create({
      quizId,
      studentId,
      organisationId,
      questions: attemptAnsQues,
      totalScore: getTotalScore(attemptAnsQues),
    });
    res.status(200).json({ studentAttempt });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server error",
    });
  }
};
