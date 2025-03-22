import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Translator() {
    const [text, setText] = useState("");
    const [fromLang, setFromLang] = useState("en");
    const [toLang, setToLang] = useState("yo");

    // Speech to text with some error handling
   const startListening = () => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition || 
            window.mozSpeechRecognition || window.msSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Your browser does not support speech recognition.");
            return;
        }

        try {
            const recognition = new SpeechRecognition();
            recognition.lang = fromLang;
            recognition.start();

            recognition.onresult = (event) => {
                setText(event.results[0][0].transcript);
            };

            recognition.onerror = (event) => {
                console.error("Speech recognition error:", event.error);
                alert("Something Unexpected went wrong");
            };
        } catch (error) {
            console.error("Speech recognition not supported", error);
            alert("Your browser does not support speech recognition.");
        }
    };

    return (
        <div className="bg-green-50 flex items-center justify-center min-h-screen p-4">
            <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg border border-green-300">
                <h1 className="text-2xl font-bold text-center mb-4 text-green-800">
                    Nigerian Language Translator
                </h1>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative w-full md:w-1/2">
                        <textarea
                            className="w-full h-40 p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-100"
                            placeholder="Enter text to translate..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        ></textarea>
                        <button onClick={startListening} className="absolute right-3 top-3 text-green-700 hover:text-green-900">
                            <i className="fas fa-microphone"></i>
                        </button>
                    </div>

                    <div className="relative w-full md:w-1/2">
                        <textarea
                            readOnly
                            className="w-full h-40 p-3 border border-green-300 rounded-lg focus:outline-none bg-green-100"
                        ></textarea>
                        <button className="absolute right-3 top-3 text-green-700 hover:text-green-900">
                            <i className="fas fa-play"></i>
                        </button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mt-4">
                    <div className="w-full md:w-1/2">
                        <label className="block text-green-700 font-medium">From:</label>
                        <select className="w-full p-2 border border-green-300 rounded-lg focus:outline-none bg-green-100" value={fromLang} onChange={(e) => setFromLang(e.target.value)}>
                            <option value="en">English</option>
                            <option value="yo">Yoruba</option>
                            <option value="ha">Hausa</option>
                            <option value="ig">Igbo</option>
                        </select>
                    </div>

                    <div className="w-full md:w-1/2">
                        <label className="block text-green-700 font-medium">To:</label>
                        <select className="w-full p-2 border border-green-300 rounded-lg focus:outline-none bg-green-100" value={toLang} onChange={(e) => setToLang(e.target.value)}>
                            <option value="yo">Yoruba</option>
                            <option value="ha">Hausa</option>
                            <option value="ig">Igbo</option>
                            <option value="en">English</option>
                        </select>
                    </div>
                </div>

                <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-300">
                    Translate
                </button>
            </div>
        </div>
    );
}
