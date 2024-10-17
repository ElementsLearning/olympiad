
type QuestionCardProps = {
  question: QuestionType
  index: number
}

export const QuestionCard: React.FC<QuestionCardProps> = ({question, index}) => {

  const { bookName, chapter, exercise, questionNumber, level, questionType, class: className, category, subcategory } = question

  return (
    <div className="flex flex-col p-4 rounded-md bg-gradient-to-br from-neutral-800 to-neutral-700 text-white">
      <p className="text-xl font-bold">{`Question ${index + 1}`}</p>
      <p className=""><span className="font-bold italic mr-2">Book Name:</span>{bookName}</p>
      <p className=""><span className="font-bold italic mr-2">Chapter:</span>{chapter}</p>
      <p className=""><span className="font-bold italic mr-2">Exercise:</span>{exercise}</p>
      <p className=""><span className="font-bold italic mr-2">Question Number:</span>{questionNumber}</p>
      <p className=""><span className="font-bold italic mr-2">Type:</span>{questionType}</p>
      <p className=""><span className="font-bold italic mr-2">Class:</span>{className}</p>
      <p className=""><span className="font-bold italic mr-2">Category:</span>{category}</p>
      <p className=""><span className="font-bold italic mr-2">Subcategories:</span>{subcategory.join(", ")}</p>
    </div>

  )
}
