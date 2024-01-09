import quizModel from "../../model/quiz/attemptquiz.js";
import attemptModel from "../../model/quiz/attemptquiz.js";


const hasCorrectAnswers = (actualAns, resAns) => {
  const isCorrect = false;
  if (actualAns.length == 1) {
    isCorrect = actualAns[0] == resAns[0];
  } else  {
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
  attemptAnsQues.forEach((attemptedQuestion) => {
    // If the answer is correct, increment the total score
    if (attemptedQuestion.isCorrect) {
      score++;
    }
  });
  return score;
};

const handleQuestions = (quizQuestions, attemptQuestions) => {
  var serializedQuestionIds = attemptQuestions.map(
    (question) => question.questionId
  );
  var attemptedQuestions = quizQuestions.map((question, i) => {
    var index = serializedQuestionIds.indexOf(String(question._id));
    return {
      questionId: question._id,
      answers: index == -1 ? [] : question.answers,
      isCorrect:
        index == -1
          ? false
          : hasCorrectAnswers(
              question.answers,
              attemptQuestions[index].answers
            ),
    };
  });
  return attemptedQuestions;
};

export const studentAttempt = async (req, res) => {
  try {
    const { quizId, studentId, organisationId, questions, attemptQuestions } =
      req.body;
    const quiz = await quizModel
      .find({ quizId, studentId, organisationId })
      .populate(questions);

    const attemptAnsQues = handleQuestions(quiz.questions, attemptQuestions);

    const studentAttempt=await attemptModel.create({
      quizId,
      studentId,
      organisationId,
      questions: attemptAnsQues,
      totalScore: getTotalScore(attemptAnsQues),
    });
    res.status(200).json({studentAttempt})

  } catch (error) {
    res.status(500).json({
        message:"server error"
    })
  }
};
