
class askException{
    constructor(errorMessage){
        this.errorMessage = errorMessage
    }
}

class Question{
    constructor(question, answer, category, userID, score){
        this.Qid = 5;
        this.question = question
        this.answer = answer
        this.category = category
        this.score = score
        this.userID = userID
    }
}

class QuestionList{
    constructor(){
        this.questionA = []
    }

    addQuestion(question, answer, category, userID,score, index){
        if(question.length == 0)return
        if(question.length < 8)throw new askException("Necesitan ser más de 8 caracteres")

        if(answer.length == 0)return

        if(category.length == 0)return
        if(category.length < 2)throw new askException("Necesitan ser más de 2 caracteres")

        let temp = new Question(question, answer, category, userID, score) 
        this.questionA[index].push(temp)
    }

}

