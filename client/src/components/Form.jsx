import {useActionState, useEffect} from "react";
import Explanation from "./Explanation.jsx";
import {explanation} from "../actions/index.js";


const Form = () => {
    const [formState, formAction, isPending] = useActionState(explanation, null);


    // useEffect(() => {
    //     const saved = localStorage.getItem("formState");
    //     if (saved) {
    //         formAction(JSON.parse(saved)); // set the formState to saved value
    //     }
    // }, []);
    //
    // // Save formState to localStorage whenever it changes
    // useEffect(() => {
    //     if (formState) {
    //         localStorage.setItem("formState", JSON.stringify(formState));
    //     }
    // }, [formState]);

    return (
        <div className="w-full mx-auto flex flex-col border border-gray-200 rounded-md p-5">
            <form action={formAction}>
                {/* Language Selection */}
                <div className="w-full mb-10">
                    <label htmlFor="language" className="block text-sm text-gray-700 mb-1">
                        Select Programming Language
                    </label>
                    <select
                        required={true}
                        id="language"
                        name="language"
                        className="w-full text-sm  border border-gray-200 text-gray-500 rounded-md focus:outline-none py-1 px-2"
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="cpp">C++</option>
                        <option value="c">C</option>
                    </select>
                </div>

                {/* Code Textarea */}
                <div className="w-full mb-4">
                    <label htmlFor="code" className="block text-sm text-gray-700 mb-1">
                        Enter your code
                    </label>
                    <textarea
                        required={true}
                        id="code"
                        name="code"
                        rows="6"
                        placeholder="Enter your code here..."
                        className="block w-full px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none resize-none"
                    />
                </div>

                {/* Submit Button */}
                <div className="w-full mt-8">
                    <button
                        disabled={isPending}
                        type="submit"
                        className= {`${isPending && "opacity-50"} px-6 py-2 bg-blue-500 text-white text-sm font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                        {isPending ? "Processing..." : "Submit"}
                    </button>
                </div>
            </form>
            {
                isPending ? (
                    <div className="flex items-center mt-6">
                        <span className="flex space-x-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.4s]"></span>
                        </span>
                        <span className="ml-3 text-blue-600 font-medium text-sm">Thinking...</span>
                    </div>
                ) : formState?.status ? (
                    <Explanation formState={formState?.data}/>
                ) : formState?.status === false && (
                    <p className="text-red-500">Error: {formState.error}</p>
                )
            }

        </div>
    );
};

export default Form;
