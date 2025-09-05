import Header from "./components/Header.jsx";
import Form from "./components/Form.jsx";

const App = () => {

    return (
        <div className="w-full max-h-screen md:max-w-4xl mx-auto px-4 md:px-0">
            <Header />
            <Form/>
        </div>
    );
};

export default App;