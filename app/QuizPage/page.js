import Head from "next/head";
import Link from "next/link";

export default function Categories() {
  const categories = [
    {
      name: "General",
      path: "/QuizPage/TestPage",
      query: "9",
      description: "A variety of topics",
    },
    {
      name: "History",
      path: "/QuizPage/TestPage",
      query: "23",
      description: "Test your historical knowledge",
    },
    {
      name: "Computer Science",
      path: "/quiz/computer-science",
      query: "18",
      description: "Tech and programming quizzes",
    },
    {
      name: "Nature",
      path: "/QuizPage/TestPage",
      query: "27",
      description: "Quizzes about nature and the environment",
    },
    {
      name: "Video Games",
      path: "/QuizPage/TestPage",
      qury: "15",
      description: "Lets know howmuch you know your video games",
    },
    {
      name: "Math",
      path: "/QuizPage/TestPage",
      qury: "19",
      description: "Test your math skills with this quiz",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <Head>
        <title>Choose a Category</title>
        <meta name="description" content="Choose a category for your quiz" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-4xl w-full space-y-8 bg-white p-8 rounded-lg shadow-lg border border-gray-300">
        <div className="text-center">
          <h1
            className="text-4xl font-bold text-gray-900"
            style={{ fontFamily: '"Homemade Apple", cursive' }}
          >
            Choose a Category
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Select a category to start your quiz
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          {categories.map((category) => (
            <Link
              href={{
                pathname: `${category.path}`,
                query: { naw: category.query, name: category.name },
              }}
              key={category.name}
            >
              <button className="group block p-6 w-full bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-300 transform hover:-translate-y-1">
                <div className="text-center">
                  <h2
                    className="text-2xl font-bold text-gray-900 group-hover:text-gray-200 transition-colors duration-300"
                    style={{ fontFamily: '"Homemade Apple", cursive' }}
                  >
                    {category.name}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    {category.description}
                  </p>
                </div>
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
